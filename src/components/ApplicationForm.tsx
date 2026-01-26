import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { validateEmail, validatePhone, validateURL } from '../utils/validation';
import { announceToScreenReader } from '../utils/accessibility';
import type { ApplicationFormData, ReferralSource } from '../types';
import styles from '../styles/components/form.module.css';
import heroStyles from '../styles/components/hero.module.css';

// Nigerian states list
const nigerianStates = [
  'Abia', 'Adamawa', 'Akwa Ibom', 'Anambra', 'Bauchi', 'Bayelsa', 'Benue', 'Borno',
  'Cross River', 'Delta', 'Ebonyi', 'Edo', 'Ekiti', 'Enugu', 'FCT', 'Gombe',
  'Imo', 'Jigawa', 'Kaduna', 'Kano', 'Katsina', 'Kebbi', 'Kogi', 'Kwara',
  'Lagos', 'Nasarawa', 'Niger', 'Ogun', 'Ondo', 'Osun', 'Oyo', 'Plateau',
  'Rivers', 'Sokoto', 'Taraba', 'Yobe', 'Zamfara'
];

// Zod schema for form validation
const formSchema = z.object({
  firstName: z.string().min(2, 'Please enter your first name.'),
  lastName: z.string().min(2, 'Please enter your last name.'),
  email: z.string().email('Please enter a valid email address.').refine(validateEmail, 'Please enter a valid email address.'),
  phone: z.string().min(10, 'Please enter a valid phone number.').refine(validatePhone, 'Please enter a valid phone number.'),
  state: z.string().min(1, 'Please select your state in Nigeria.'),
  age: z.number().min(21, 'You must be at least 21 years old to apply.').max(70, 'Age must be 70 or less.'),
  occupation: z.string().min(2, 'Please tell us your current occupation.'),
  experience: z.string().min(20, 'Please share at least a few lines about your experience.'),
  whyYou: z.string().min(20, 'This field is required.'),
  socials: z.string().min(1, 'Social media link is required.').refine(validateURL, 'Please enter a valid URL.'),
  video: z.instanceof(FileList)
    .refine((files) => files.length > 0, 'Please upload a video.')
    .refine((files) => {
      if (files.length === 0) return false;
      const file = files[0];
      return file.type.startsWith('video/');
    }, 'Please upload a valid video file.')
    .refine((files) => {
      if (files.length === 0) return false;
      const file = files[0];
      return file.size <= 100 * 1024 * 1024; // 100MB max
    }, 'Video file size must be less than 100MB.'),
  referral: z.enum(['social', 'email', 'tv', 'friend', 'event', 'other'], {
    required_error: 'Please select an option.',
  }),
  consent: z.boolean().refine((val) => val === true, 'You must confirm this before submitting.'),
});

type FormData = z.infer<typeof formSchema>;

const FORM_STORAGE_KEY = 'ceo-reality-show-application-draft';
const AUTO_SAVE_DELAY = 2000; // 2 seconds

/**
 * Application form component with validation, auto-save, and submission handling
 */
export default function ApplicationForm() {
  const [savedDraft, setSavedDraft] = useLocalStorage<Partial<ApplicationFormData>>(FORM_STORAGE_KEY, {});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);
  const [lastSaved, setLastSaved] = useState<Date | null>(null);
  const [videoDuration, setVideoDuration] = useState<number | null>(null);
  const [videoError, setVideoError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isDirty },
    watch,
    reset,
    setValue,
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: savedDraft as Partial<FormData>,
    mode: 'onBlur',
  });

  // Watch form values for auto-save
  const formValues = watch();

  // Auto-save to localStorage
  useEffect(() => {
    if (!isDirty) return;

    const timer = setTimeout(() => {
      const dataToSave: Record<string, unknown> = {
        firstName: formValues.firstName,
        lastName: formValues.lastName,
        email: formValues.email,
        phone: formValues.phone,
        state: formValues.state,
        age: formValues.age,
        occupation: formValues.occupation,
        socials: formValues.socials,
        referral: formValues.referral as ReferralSource,
      };
      setSavedDraft(dataToSave);
      setLastSaved(new Date());
    }, AUTO_SAVE_DELAY);

    return () => clearTimeout(timer);
  }, [formValues, isDirty, setSavedDraft]);

  // Handle video duration check
  const handleVideoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) {
      setVideoDuration(null);
      setVideoError(null);
      return;
    }

    const video = document.createElement('video');
    video.preload = 'metadata';

    video.onloadedmetadata = () => {
      window.URL.revokeObjectURL(video.src);
      const duration = video.duration;
      setVideoDuration(duration);

      if (duration > 60) {
        setVideoError(`Video is ${Math.round(duration)} seconds. It must be exactly 1 minute (60 seconds).`);
      } else {
        setVideoError(null);
      }
    };

    video.src = URL.createObjectURL(file);
  };

  // Load draft on mount
  useEffect(() => {
    if (savedDraft && Object.keys(savedDraft).length > 0) {
      Object.entries(savedDraft).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          setValue(key as keyof FormData, value as FormData[keyof FormData]);
        }
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    setShowError(false);
    setShowSuccess(false);

    // Check video duration before submission
    if (data.video && data.video.length > 0) {
      const file = data.video[0];
      const video = document.createElement('video');
      video.preload = 'metadata';
      
      await new Promise<void>((resolve, reject) => {
        video.onloadedmetadata = () => {
          window.URL.revokeObjectURL(video.src);
          const duration = video.duration;
          if (duration > 60) {
            setVideoError(`Video is ${Math.round(duration)} seconds. It must be exactly 1 minute (60 seconds).`);
            setIsSubmitting(false);
            reject(new Error('Video duration exceeds 1 minute'));
            return;
          }
          resolve();
        };
        video.onerror = () => {
          setIsSubmitting(false);
          reject(new Error('Failed to load video metadata'));
        };
        video.src = URL.createObjectURL(file);
      });
    }

    try {
      // Send email using mailto link (opens email client)
      const email = 'info@saproductiontv.com';
      const subject = encodeURIComponent('KeystoDCity Reality Show Application');
      const body = encodeURIComponent(
        `New Application Submission\n\n` +
        `First Name: ${data.firstName}\n` +
        `Last Name: ${data.lastName}\n` +
        `Email: ${data.email}\n` +
        `Phone: ${data.phone}\n` +
        `State: ${data.state}\n` +
        `Age: ${data.age}\n` +
        `Occupation: ${data.occupation}\n` +
        `Social Media: ${data.socials}\n` +
        `Video Uploaded: Yes\n` +
        `Referral Source: ${data.referral}\n` +
        `Submitted At: ${new Date().toISOString()}`
      );

      // Store in localStorage first
      const submissions = JSON.parse(localStorage.getItem('ceo-reality-show-submissions') || '[]');
      submissions.push({
        ...data,
        submittedAt: new Date().toISOString(),
      });
      localStorage.setItem('ceo-reality-show-submissions', JSON.stringify(submissions));

      // Clear draft
      setSavedDraft({});
      localStorage.removeItem(FORM_STORAGE_KEY);

      // Open email client to send the application
      window.location.href = `mailto:${email}?subject=${subject}&body=${body}`;

      // Small delay to allow email client to open, then show success
      await new Promise((resolve) => setTimeout(resolve, 500));

      // Reset form
      reset();
      setShowSuccess(true);
      setLastSaved(null);

      // Announce success to screen readers
      announceToScreenReader('Your application has been submitted successfully. Our team will review and contact shortlisted candidates via email.', 'polite');

      // Scroll to success message
      setTimeout(() => {
        const successBanner = document.getElementById('formSuccess');
        if (successBanner) {
          successBanner.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
          successBanner.focus();
        }
      }, 100);
    } catch (error) {
      console.error('Form submission error:', error);
      setShowError(true);
      announceToScreenReader('There was an error submitting your application. Please try again.', 'assertive');
    } finally {
      setIsSubmitting(false);
    }
  };

  const referralOptions = [
    { value: 'social', label: 'Social Media (Instagram, Facebook, TikTok, X)' },
    { value: 'email', label: 'Email / Newsletter' },
    { value: 'tv', label: 'TV / Radio' },
    { value: 'friend', label: 'Friend / Family / Colleague' },
    { value: 'event', label: 'Event / Training' },
    { value: 'other', label: 'Other' },
  ];

  return (
    <div id="apply">
      <form
        className={`${styles.formCard} ${isSubmitting ? styles.formLoading : ''}`}
        onSubmit={handleSubmit(onSubmit)}
        noValidate
        aria-label="Application form for KeystoDCity Reality Show"
      >
        <div className={styles.formHeader}>
          <h3>Apply Now to Join KeystoDCity Reality Show</h3>
          <p>
            Fill out the form below carefully. Share clearly who you are, what you've done
            and why you should be considered for this once-in-a-lifetime opportunity.
          </p>
          {lastSaved && (
            <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.5rem' }}>
              Draft saved {lastSaved.toLocaleTimeString()}
            </p>
          )}
        </div>

        <div
          className={`${styles.successBanner} ${showSuccess ? styles.show : ''}`}
          id="formSuccess"
          role="alert"
          aria-live="polite"
        >
          ✅ Your application has been recorded on this page.
          <span style={{ opacity: 0.9 }}>
            Our team will review and contact shortlisted candidates via email.
          </span>
        </div>
        <div
          className={`${styles.errorBanner} ${showError ? styles.show : ''}`}
          id="formError"
          role="alert"
          aria-live="assertive"
        >
          ⚠️ Please fix the highlighted fields and try again.
        </div>

        <div className={styles.formGrid}>
          <div className={styles.formGroup}>
            <label htmlFor="firstName">
              First Name
              <span className={styles.requiredStar} aria-label="required">*</span>
            </label>
            <input
              type="text"
              id="firstName"
              {...register('firstName')}
              placeholder="Enter your first name"
              className={errors.firstName ? styles.error : ''}
              aria-invalid={!!errors.firstName}
              aria-describedby={errors.firstName ? 'firstName-error' : undefined}
            />
            {errors.firstName && (
              <div className={`${styles.errorText} ${styles.show}`} id="firstName-error" role="alert">
                {errors.firstName.message}
              </div>
            )}
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="lastName">
              Last Name
              <span className={styles.requiredStar} aria-label="required">*</span>
            </label>
            <input
              type="text"
              id="lastName"
              {...register('lastName')}
              placeholder="Enter your last name"
              className={errors.lastName ? styles.error : ''}
              aria-invalid={!!errors.lastName}
              aria-describedby={errors.lastName ? 'lastName-error' : undefined}
            />
            {errors.lastName && (
              <div className={`${styles.errorText} ${styles.show}`} id="lastName-error" role="alert">
                {errors.lastName.message}
              </div>
            )}
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="email">
              Email Address
              <span className={styles.requiredStar} aria-label="required">*</span>
            </label>
            <input
              type="email"
              id="email"
              {...register('email')}
              placeholder="you@example.com"
              className={errors.email ? styles.error : ''}
              aria-invalid={!!errors.email}
              aria-describedby={errors.email ? 'email-error' : undefined}
            />
            {errors.email && (
              <div className={`${styles.errorText} ${styles.show}`} id="email-error" role="alert">
                {errors.email.message}
              </div>
            )}
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="phone">
              Phone Number (WhatsApp Preferred)
              <span className={styles.requiredStar} aria-label="required">*</span>
            </label>
            <input
              type="tel"
              id="phone"
              {...register('phone')}
              placeholder="+234..."
              className={errors.phone ? styles.error : ''}
              aria-invalid={!!errors.phone}
              aria-describedby={errors.phone ? 'phone-error' : undefined}
            />
            {errors.phone && (
              <div className={`${styles.errorText} ${styles.show}`} id="phone-error" role="alert">
                {errors.phone.message}
              </div>
            )}
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="state">
              State in Nigeria
              <span className={styles.requiredStar} aria-label="required">*</span>
            </label>
            <select
              id="state"
              {...register('state')}
              className={errors.state ? styles.error : ''}
              aria-invalid={!!errors.state}
              aria-describedby={errors.state ? 'state-error' : undefined}
            >
              <option value="">Select your state</option>
              {nigerianStates.map((state) => (
                <option key={state} value={state}>
                  {state}
                </option>
              ))}
            </select>
            {errors.state && (
              <div className={`${styles.errorText} ${styles.show}`} id="state-error" role="alert">
                {errors.state.message}
              </div>
            )}
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="age">
              Age
              <span className={styles.requiredStar} aria-label="required">*</span>
            </label>
            <input
              type="number"
              id="age"
              {...register('age', { valueAsNumber: true })}
              min="18"
              max="70"
              placeholder="e.g. 28"
              className={errors.age ? styles.error : ''}
              aria-invalid={!!errors.age}
              aria-describedby={errors.age ? 'age-error' : undefined}
            />
            {errors.age && (
              <div className={`${styles.errorText} ${styles.show}`} id="age-error" role="alert">
                {errors.age.message}
              </div>
            )}
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="occupation">
              Current Occupation / Role
              <span className={styles.requiredStar} aria-label="required">*</span>
            </label>
            <input
              type="text"
              id="occupation"
              {...register('occupation')}
              placeholder="Entrepreneur, Sales Lead, Consultant, etc."
              className={errors.occupation ? styles.error : ''}
              aria-invalid={!!errors.occupation}
              aria-describedby={errors.occupation ? 'occupation-error' : undefined}
            />
            {errors.occupation && (
              <div className={`${styles.errorText} ${styles.show}`} id="occupation-error" role="alert">
                {errors.occupation.message}
              </div>
            )}
          </div>
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="socials">
            Link to your social media / website
            <span className={styles.requiredStar} aria-label="required">*</span>
          </label>
          <input
            type="text"
            id="socials"
            {...register('socials')}
            placeholder="Instagram, LinkedIn, website or portfolio link"
            className={errors.socials ? styles.error : ''}
            aria-invalid={!!errors.socials}
            aria-describedby={errors.socials ? 'socials-error' : undefined}
          />
          {errors.socials && (
            <div className={`${styles.errorText} ${styles.show}`} id="socials-error" role="alert">
              {errors.socials.message}
            </div>
          )}
          <div className={styles.helperText}>
            This helps us understand your personal brand, work and background better.
          </div>
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="video">
            Upload 1-Minute Video
            <span className={styles.requiredStar} aria-label="required">*</span>
          </label>
          <input
            type="file"
            id="video"
            accept="video/*"
            {...register('video')}
            onChange={handleVideoChange}
            className={errors.video || videoError ? styles.error : ''}
            aria-invalid={!!errors.video || !!videoError}
            aria-describedby={errors.video || videoError ? 'video-error' : undefined}
          />
          {videoDuration !== null && (
            <div style={{ 
              marginTop: '0.5rem', 
              fontSize: '0.85rem',
              color: videoDuration > 60 ? 'var(--accent)' : 'var(--text-muted)'
            }}>
              Video duration: {Math.round(videoDuration)} seconds
            </div>
          )}
          {videoError && (
            <div className={`${styles.errorText} ${styles.show}`} id="video-error" role="alert" style={{ marginTop: '0.5rem' }}>
              ⚠️ {videoError}
            </div>
          )}
          {errors.video && (
            <div className={`${styles.errorText} ${styles.show}`} id="video-error" role="alert">
              {errors.video.message}
            </div>
          )}
          <div className={styles.helperText} style={{ color: 'var(--accent)', fontWeight: '600' }}>
            ⚠️ Warning: Your video must be exactly 1 minute (60 seconds). Videos longer than 1 minute will not be accepted.
          </div>
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="referral">
            How did you hear about KeystoDCity Reality Show?
            <span className={styles.requiredStar} aria-label="required">*</span>
          </label>
          <select
            id="referral"
            {...register('referral')}
            className={errors.referral ? styles.error : ''}
            aria-invalid={!!errors.referral}
            aria-describedby={errors.referral ? 'referral-error' : undefined}
          >
            <option value="">Select an option</option>
            {referralOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          {errors.referral && (
            <div className={`${styles.errorText} ${styles.show}`} id="referral-error" role="alert">
              {errors.referral.message}
            </div>
          )}
        </div>

        <div className={styles.formGroup}>
          <label>
            Availability & Consent
            <span className={styles.requiredStar} aria-label="required">*</span>
          </label>
          <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '0.2rem' }}>
            <input
              type="checkbox"
              id="consent"
              {...register('consent')}
              style={{ width: 'auto', marginRight: '0.4rem' }}
              aria-invalid={!!errors.consent}
              aria-describedby={errors.consent ? 'consent-error' : undefined}
            />
            <label htmlFor="consent" style={{ fontWeight: 'normal', textTransform: 'none', letterSpacing: 'normal' }}>
              I confirm that the information provided is accurate and that I'm available to
              participate fully if selected.
            </label>
          </div>
          {errors.consent && (
            <div className={`${styles.errorText} ${styles.show}`} id="consent-error" role="alert">
              {errors.consent.message}
            </div>
          )}
        </div>

        <div className={styles.formFooter}>
          <button
            type="submit"
            className={heroStyles.btnPrimary}
            disabled={isSubmitting}
            aria-busy={isSubmitting}
          >
            {isSubmitting ? 'Submitting...' : 'Submit Application'}
            {!isSubmitting && <span aria-hidden="true">➜</span>}
          </button>
          <p className={styles.formNote}>
            By submitting, you agree to be contacted by the official production and talent
            team regarding your application and next steps.
          </p>
        </div>
      </form>
    </div>
  );
}


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

// Zod schema for form validation
const formSchema = z.object({
  fullName: z.string().min(2, 'Please enter your full name.'),
  email: z.string().email('Please enter a valid email address.').refine(validateEmail, 'Please enter a valid email address.'),
  phone: z.string().min(10, 'Please enter a valid phone number.').refine(validatePhone, 'Please enter a valid phone number.'),
  country: z.string().min(2, 'Please enter your country of residence.'),
  age: z.number().min(21, 'You must be at least 21 years old to apply.').max(70, 'Age must be 70 or less.'),
  occupation: z.string().min(2, 'Please tell us your current occupation.'),
  experience: z.string().min(20, 'Please share at least a few lines about your experience.'),
  whyYou: z.string().min(20, 'This field is required.'),
  socials: z.string().optional().refine((val) => !val || validateURL(val), 'Please enter a valid URL.'),
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
      const dataToSave: Partial<ApplicationFormData> = {
        fullName: formValues.fullName,
        email: formValues.email,
        phone: formValues.phone,
        country: formValues.country,
        age: formValues.age,
        occupation: formValues.occupation,
        experience: formValues.experience,
        whyYou: formValues.whyYou,
        socials: formValues.socials,
        referral: formValues.referral as ReferralSource,
      };
      setSavedDraft(dataToSave);
      setLastSaved(new Date());
    }, AUTO_SAVE_DELAY);

    return () => clearTimeout(timer);
  }, [formValues, isDirty, setSavedDraft]);

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

    try {
      // Send email using mailto link (opens email client)
      const email = 'info@saproductiontv.com';
      const subject = encodeURIComponent('KeytoDCity Reality Show Application');
      const body = encodeURIComponent(
        `New Application Submission\n\n` +
        `Full Name: ${data.fullName}\n` +
        `Email: ${data.email}\n` +
        `Phone: ${data.phone}\n` +
        `Country: ${data.country}\n` +
        `Age: ${data.age}\n` +
        `Occupation: ${data.occupation}\n` +
        `Experience: ${data.experience}\n` +
        `Why You: ${data.whyYou}\n` +
        `Social Media: ${data.socials || 'N/A'}\n` +
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
        aria-label="Application form for KeytoDCity Reality Show"
      >
        <div className={styles.formHeader}>
          <h3>Apply Now to Join KeytoDCity Reality Show</h3>
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
            <label htmlFor="fullName">
              Full Name
              <span className={styles.requiredStar} aria-label="required">*</span>
            </label>
            <input
              type="text"
              id="fullName"
              {...register('fullName')}
              placeholder="Enter your full name"
              className={errors.fullName ? styles.error : ''}
              aria-invalid={!!errors.fullName}
              aria-describedby={errors.fullName ? 'fullName-error' : undefined}
            />
            {errors.fullName && (
              <div className={`${styles.errorText} ${styles.show}`} id="fullName-error" role="alert">
                {errors.fullName.message}
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
            <label htmlFor="country">
              Country of Residence
              <span className={styles.requiredStar} aria-label="required">*</span>
            </label>
            <input
              type="text"
              id="country"
              {...register('country')}
              placeholder="e.g. Nigeria"
              className={errors.country ? styles.error : ''}
              aria-invalid={!!errors.country}
              aria-describedby={errors.country ? 'country-error' : undefined}
            />
            {errors.country && (
              <div className={`${styles.errorText} ${styles.show}`} id="country-error" role="alert">
                {errors.country.message}
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
          <label htmlFor="experience">
            Briefly describe your business / leadership experience
            <span className={styles.requiredStar} aria-label="required">*</span>
          </label>
          <textarea
            id="experience"
            {...register('experience')}
            placeholder="Share your experience building businesses, leading teams, hitting targets or creating impact..."
            className={errors.experience ? styles.error : ''}
            aria-invalid={!!errors.experience}
            aria-describedby={errors.experience ? 'experience-error' : undefined}
          />
          {errors.experience && (
            <div className={`${styles.errorText} ${styles.show}`} id="experience-error" role="alert">
              {errors.experience.message}
            </div>
          )}
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="whyYou">
            Why should you be selected for KeytoDCity Reality Show?
            <span className={styles.requiredStar} aria-label="required">*</span>
          </label>
          <textarea
            id="whyYou"
            {...register('whyYou')}
            placeholder="Tell us what makes you different. What will you bring to the show, and why do you believe you can win?"
            className={errors.whyYou ? styles.error : ''}
            aria-invalid={!!errors.whyYou}
            aria-describedby={errors.whyYou ? 'whyYou-error' : undefined}
          />
          {errors.whyYou && (
            <div className={`${styles.errorText} ${styles.show}`} id="whyYou-error" role="alert">
              {errors.whyYou.message}
            </div>
          )}
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="socials">
            Link to your social media / website (optional)
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
          <label htmlFor="referral">
            How did you hear about KeytoDCity Reality Show?
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


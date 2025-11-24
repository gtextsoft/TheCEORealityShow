import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { validateEmail, validatePhone } from '../utils/validation';
import { announceToScreenReader } from '../utils/accessibility';
import styles from '../styles/components/form.module.css';
import heroStyles from '../styles/components/hero.module.css';

// Form schema matching MailingBoss form
const formSchema = z.object({
  email: z.string().email('Please enter a valid email address.').refine(validateEmail, 'Please enter a valid email address.'),
  name: z.string().min(2, 'Please enter your name.'),
  phonePrefix: z.string().min(1, 'Please select a country code.'),
  phone: z.string().min(7, 'Please enter a valid phone number.').refine(validatePhone, 'Please enter a valid phone number.'),
  country: z.string().min(2, 'Please enter your country.'),
  organisation: z.string().min(2, 'Please enter your organisation.'),
  jobRole: z.string().min(2, 'Please enter your job role.'),
  state: z.string().min(2, 'Please enter your state.'),
  age: z.number().min(18, 'You must be at least 18 years old.').max(100, 'Please enter a valid age.'),
  referral: z.string().min(1, 'Please select how you heard about this show.'),
  professionalStatus: z.enum(['Employee', 'Employer'], {
    required_error: 'Please select your professional status.',
  }),
  socialMedia: z.string().optional(),
});

type FormData = z.infer<typeof formSchema>;

// MailingBoss form endpoint
const MAILINGBOSS_ENDPOINT = 'https://app.mailingboss.com/lists/691cc8c4832c9/subscribe';

// Country phone prefixes (matching the original form)
const phonePrefixes = [
  { value: '+1', label: 'USA (+1)' },
  { value: '+55', label: 'Brazil (+55)' },
  { value: '+234', label: 'Nigeria (+234)' },
  { value: '+44', label: 'United Kingdom (+44)' },
  { value: '+27', label: 'South Africa (+27)' },
  { value: '+233', label: 'Ghana (+233)' },
  { value: '+254', label: 'Kenya (+254)' },
  { value: '+256', label: 'Uganda (+256)' },
  { value: '+255', label: 'Tanzania (+255)' },
  { value: '+250', label: 'Rwanda (+250)' },
  { value: '+237', label: 'Cameroon (+237)' },
  { value: '+225', label: "Côte d'Ivoire (+225)" },
  { value: '+221', label: 'Senegal (+221)' },
  { value: '+212', label: 'Morocco (+212)' },
  { value: '+20', label: 'Egypt (+20)' },
  { value: '+213', label: 'Algeria (+213)' },
  { value: '+33', label: 'France (+33)' },
  { value: '+49', label: 'Germany (+49)' },
  { value: '+39', label: 'Italy (+39)' },
  { value: '+34', label: 'Spain (+34)' },
  { value: '+31', label: 'Netherlands (+31)' },
  { value: '+32', label: 'Belgium (+32)' },
  { value: '+41', label: 'Switzerland (+41)' },
  { value: '+43', label: 'Austria (+43)' },
  { value: '+46', label: 'Sweden (+46)' },
  { value: '+47', label: 'Norway (+47)' },
  { value: '+45', label: 'Denmark (+45)' },
  { value: '+358', label: 'Finland (+358)' },
  { value: '+351', label: 'Portugal (+351)' },
  { value: '+353', label: 'Ireland (+353)' },
  { value: '+61', label: 'Australia (+61)' },
  { value: '+64', label: 'New Zealand (+64)' },
  { value: '+91', label: 'India (+91)' },
  { value: '+86', label: 'China (+86)' },
  { value: '+81', label: 'Japan (+81)' },
  { value: '+82', label: 'Korea South (+82)' },
  { value: '+65', label: 'Singapore (+65)' },
  { value: '+60', label: 'Malaysia (+60)' },
  { value: '+62', label: 'Indonesia (+62)' },
  { value: '+66', label: 'Thailand (+66)' },
  { value: '+84', label: 'Vietnam (+84)' },
  { value: '+971', label: 'United Arab Emirates (+971)' },
  { value: '+966', label: 'Saudi Arabia (+966)' },
  { value: '+974', label: 'Qatar (+974)' },
  { value: '+965', label: 'Kuwait (+965)' },
  { value: '+973', label: 'Bahrain (+973)' },
  { value: '+968', label: 'Oman (+968)' },
  { value: '+52', label: 'Mexico (+52)' },
  { value: '+55', label: 'Brazil (+55)' },
  { value: '+54', label: 'Argentina (+54)' },
  { value: '+56', label: 'Chile (+56)' },
  { value: '+57', label: 'Colombia (+57)' },
  { value: '+51', label: 'Peru (+51)' },
];

const referralSources = [
  'Social Media',
  'Email / Newsletter',
  'TV / Radio',
  'Friend / Family / Colleague',
  'Stephen Akintayo Event / Training',
  'Online Advertisement',
  'Other',
];

/**
 * MailingBoss form component integrated with the original form structure
 */
export default function MailingBossForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    mode: 'onBlur',
  });

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    setShowError(false);
    setShowSuccess(false);

    try {
      // Prepare form data for MailingBoss
      const formData = new FormData();
      formData.append('email', data.email);
      formData.append('name', data.name);
      formData.append('phone', `${data.phonePrefix}${data.phone}`);
      formData.append('country', data.country);
      formData.append('organisation', data.organisation);
      formData.append('jobRole', data.jobRole);
      formData.append('state', data.state);
      formData.append('age', data.age.toString());
      formData.append('referral', data.referral);
      formData.append('professionalStatus', data.professionalStatus);
      if (data.socialMedia) {
        formData.append('socialMedia', data.socialMedia);
      }

      // Submit to MailingBoss endpoint
      await fetch(MAILINGBOSS_ENDPOINT, {
        method: 'POST',
        body: formData,
        mode: 'no-cors', // MailingBoss may not support CORS
      });

      // Since we're using no-cors, we can't check the response
      // Assume success if no error is thrown
      reset();
      setShowSuccess(true);
      announceToScreenReader('Your application has been submitted successfully. Thank you for applying!', 'polite');

      // Scroll to success message
      setTimeout(() => {
        const successBanner = document.getElementById('mailingbossSuccess');
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
            Fill out the form below to apply for KeytoDCity Reality Show with Dr. Stephen Akintayo.
            All fields marked with an asterisk (*) are required.
          </p>
        </div>

        <div
          className={`${styles.successBanner} ${showSuccess ? styles.show : ''}`}
          id="mailingbossSuccess"
          role="alert"
          aria-live="polite"
        >
          ✅ Your application has been submitted successfully!
          <span style={{ opacity: 0.9 }}>
            Our team will review and contact shortlisted candidates via email.
          </span>
        </div>
        <div
          className={`${styles.errorBanner} ${showError ? styles.show : ''}`}
          id="mailingbossError"
          role="alert"
          aria-live="assertive"
        >
          ⚠️ Please fix the highlighted fields and try again.
        </div>

        <div className={styles.formGrid}>
          <div className={styles.formGroup}>
            <label htmlFor="email">
              E-mail
              <span className={styles.requiredStar} aria-label="required">*</span>
            </label>
            <input
              type="email"
              id="email"
              {...register('email')}
              placeholder="your.email@example.com"
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
            <label htmlFor="name">
              Name
              <span className={styles.requiredStar} aria-label="required">*</span>
            </label>
            <input
              type="text"
              id="name"
              {...register('name')}
              placeholder="Enter your full name"
              className={errors.name ? styles.error : ''}
              aria-invalid={!!errors.name}
              aria-describedby={errors.name ? 'name-error' : undefined}
            />
            {errors.name && (
              <div className={`${styles.errorText} ${styles.show}`} id="name-error" role="alert">
                {errors.name.message}
              </div>
            )}
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="phonePrefix">
              Phone Prefix
              <span className={styles.requiredStar} aria-label="required">*</span>
            </label>
            <select
              id="phonePrefix"
              {...register('phonePrefix')}
              className={errors.phonePrefix ? styles.error : ''}
              aria-invalid={!!errors.phonePrefix}
              aria-describedby={errors.phonePrefix ? 'phonePrefix-error' : undefined}
            >
              <option value="">Select country code</option>
              {phonePrefixes.map((prefix) => (
                <option key={prefix.value} value={prefix.value}>
                  {prefix.label}
                </option>
              ))}
            </select>
            {errors.phonePrefix && (
              <div className={`${styles.errorText} ${styles.show}`} id="phonePrefix-error" role="alert">
                {errors.phonePrefix.message}
              </div>
            )}
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="phone">
              Phone
              <span className={styles.requiredStar} aria-label="required">*</span>
            </label>
            <input
              type="tel"
              id="phone"
              {...register('phone')}
              placeholder="Phone number"
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
              Country
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
            <label htmlFor="organisation">
              Organisation You Work For
              <span className={styles.requiredStar} aria-label="required">*</span>
            </label>
            <input
              type="text"
              id="organisation"
              {...register('organisation')}
              placeholder="Your organisation name"
              className={errors.organisation ? styles.error : ''}
              aria-invalid={!!errors.organisation}
              aria-describedby={errors.organisation ? 'organisation-error' : undefined}
            />
            {errors.organisation && (
              <div className={`${styles.errorText} ${styles.show}`} id="organisation-error" role="alert">
                {errors.organisation.message}
              </div>
            )}
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="jobRole">
              Your Job Role
              <span className={styles.requiredStar} aria-label="required">*</span>
            </label>
            <input
              type="text"
              id="jobRole"
              {...register('jobRole')}
              placeholder="e.g. CEO, Manager, Entrepreneur"
              className={errors.jobRole ? styles.error : ''}
              aria-invalid={!!errors.jobRole}
              aria-describedby={errors.jobRole ? 'jobRole-error' : undefined}
            />
            {errors.jobRole && (
              <div className={`${styles.errorText} ${styles.show}`} id="jobRole-error" role="alert">
                {errors.jobRole.message}
              </div>
            )}
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="state">
              State
              <span className={styles.requiredStar} aria-label="required">*</span>
            </label>
            <input
              type="text"
              id="state"
              {...register('state')}
              placeholder="Your state or province"
              className={errors.state ? styles.error : ''}
              aria-invalid={!!errors.state}
              aria-describedby={errors.state ? 'state-error' : undefined}
            />
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
              max="100"
              placeholder="e.g. 21"
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
            <label htmlFor="referral">
              How Did You Hear About This Show?
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
              {referralSources.map((source) => (
                <option key={source} value={source}>
                  {source}
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
            <label htmlFor="professionalStatus">
              Professional Status
              <span className={styles.requiredStar} aria-label="required">*</span>
            </label>
            <select
              id="professionalStatus"
              {...register('professionalStatus')}
              className={errors.professionalStatus ? styles.error : ''}
              aria-invalid={!!errors.professionalStatus}
              aria-describedby={errors.professionalStatus ? 'professionalStatus-error' : undefined}
            >
              <option value="">Select status</option>
              <option value="Employee">Employee</option>
              <option value="Employer">Employer</option>
            </select>
            {errors.professionalStatus && (
              <div className={`${styles.errorText} ${styles.show}`} id="professionalStatus-error" role="alert">
                {errors.professionalStatus.message}
              </div>
            )}
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="socialMedia">
              Social Media Handles (Optional)
            </label>
            <input
              type="text"
              id="socialMedia"
              {...register('socialMedia')}
              placeholder="Instagram, LinkedIn, Twitter handles"
              className={errors.socialMedia ? styles.error : ''}
              aria-invalid={!!errors.socialMedia}
            />
            {errors.socialMedia && (
              <div className={`${styles.errorText} ${styles.show}`} role="alert">
                {errors.socialMedia.message}
              </div>
            )}
          </div>
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
            By submitting, you agree to be contacted by the official production team regarding your application.
          </p>
        </div>
      </form>
    </div>
  );
}


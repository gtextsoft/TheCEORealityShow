import ApplicationForm from '../components/ApplicationForm';
import AnimatedSection from '../components/AnimatedSection';
import styles from '../styles/components/sections.module.css';

/**
 * Application/Form page component
 */
export default function ApplicationPage() {
  return (
    <AnimatedSection id="application">
      <div className={styles.sectionHeader}>
        <div>
          <p className={styles.sectionTag}>Apply Now</p>
          <h2 className={styles.sectionTitle}>
            Start Your <span>Application</span>
          </h2>
        </div>
        <p className={styles.sectionSubtitle}>
          Complete the form below to apply for the KeystoDCity Reality Show. Make sure you have your 
          Real Estate Course Certificate ready before submitting.
        </p>
      </div>

      <ApplicationForm />
    </AnimatedSection>
  );
}

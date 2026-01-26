import FAQ from '../components/FAQ';
import AnimatedSection from '../components/AnimatedSection';
import styles from '../styles/components/sections.module.css';

const eligibilityCriteria = [
  'A Real Estate Course Certificate is a good addition.',
  'Must be at least 21 years old at the time of application.',
  'Open to Nigerians and Africans in the diaspora (valid travel documents may be required if selected).',
  'Must be able to commit to the full duration of filming if selected as a housemate.',
  'Must have demonstrable passion for Real Estate, leadership, innovation or social impact.',
  'Must be willing to appear on television, online media and all official show platforms.',
  "Must agree to the show's official terms & conditions, code of conduct and media release forms.",
];

const faqItems = [
  {
    question: 'Is there any fee to apply?',
    answer:
      'There is <strong>no fee</strong> required to submit your initial application on this page. If any payment is ever required at a later stage, it will only be communicated through <strong>verified official channels</strong>.',
  },
  {
    question: 'Do I need to be an existing entrepreneur?',
    answer:
      'No. Existing entrepreneurs, working professionals, sales leaders, creatives and high-potential talents are all welcome. What matters is your mindset, skill and hunger to grow.',
  },
  {
    question: 'Where will the show be filmed?',
    answer:
      'The show will be filmed in a secure, fully equipped location that reflects the standards of a modern Real Estate environment. Exact location and dates will be shared privately with selected contestants.',
  },
  {
    question: "How will I know if I've been shortlisted?",
    answer:
      'Successful applicants will be contacted directly via the email and phone number submitted in the form. Please double-check your contact details before submitting.',
  },
];

/**
 * Eligibility page component
 */
export default function EligibilityPage() {
  return (
    <AnimatedSection id="eligibility">
      <div className={styles.sectionHeader}>
        <div>
          <p className={styles.sectionTag}>Requirements & Application</p>
          <h2 className={styles.sectionTitle}>
            Who Can Apply & <span>How to Get In</span>
          </h2>
        </div>
        <p className={styles.sectionSubtitle}>
          We're looking for serious, growth-driven individuals who are ready to be stretched.
          Whether you're an entrepreneur, a professional or a rising talent, if you're hungry, you
          should apply.
        </p>
      </div>

      <div className={styles.grid2}>
        <article className={styles.card}>
          <h3>Eligibility Criteria</h3>
          <ul className={styles.eligibilityList}>
            {eligibilityCriteria.map((criterion, index) => (
              <li key={index}>{criterion}</li>
            ))}
          </ul>
        </article>

        <FAQ items={faqItems} />
      </div>

      {/* Certificate Requirement Notice */}
      {/* <div style={{
        marginTop: '2.5rem',
        padding: '2rem',
        background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.1) 0%, rgba(124, 58, 237, 0.1) 100%)',
        border: '2px solid var(--primary)',
        borderRadius: '12px',
        textAlign: 'center'
      }}>
        <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>📜</div>
        <h3 style={{
          fontSize: '1.5rem',
          marginBottom: '1rem',
        }}>
          Certificate Required
        </h3>
        <p style={{ marginBottom: '1.5rem', lineHeight: '1.8' }}>
          All applicants must have a Real Estate Course Certificate. Don't have one?{' '}
          <a
            href="https://rim.stephenakintayofoundation.org/"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: 'var(--primary)', textDecoration: 'underline', fontWeight: 'bold' }}
          >
            Get certified here
          </a>
        </p>
      </div> */}
    </AnimatedSection>
  );
}

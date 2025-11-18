import FAQ from './FAQ';
import AnimatedSection from './AnimatedSection';
import styles from '../styles/components/sections.module.css';
import heroStyles from '../styles/components/hero.module.css';

const eligibilityCriteria = [
  'Must be at least 21 years old at the time of application.',
  'Open to Nigerians and Africans in the diaspora (valid travel documents may be required if selected).',
  'Must be able to commit to the full duration of filming if selected as a housemate.',
  'Must have demonstrable passion for business, leadership, innovation or social impact.',
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
      'The show will be filmed in a secure, fully equipped location that reflects the standards of a modern business environment. Exact location and dates will be shared privately with selected contestants.',
  },
  {
    question: "How will I know if I've been shortlisted?",
    answer:
      'Successful applicants will be contacted directly via the email and phone number submitted in the form. Please double-check your contact details before submitting.',
  },
];

/**
 * Eligibility section component with criteria and FAQ
 */
export default function Eligibility() {
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

      <div style={{ marginTop: '3rem', textAlign: 'center' }}>
        <button 
          className={heroStyles.btnPrimary}
          onClick={() => window.open('https://app.mailingboss.com/lists/691cc8c4832c9/subscribe', '_blank')}
          style={{ fontSize: '1.1rem', padding: '1rem 2rem' }}
        >
          Apply Now - Start Your Application
          <span aria-hidden="true">➜</span>
        </button>
        <p style={{ marginTop: '1rem', color: 'var(--text-muted)', fontSize: '0.9rem' }}>
          Click above to open the application form in a new window
        </p>
      </div>
    </AnimatedSection>
  );
}


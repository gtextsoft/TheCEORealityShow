import FAQ from '../components/FAQ';
import AnimatedSection from '../components/AnimatedSection';
import styles from '../styles/components/sections.module.css';

const faqItems = [
  {
    question: 'Is there any fee to apply?',
    answer:
      'There is <strong>no fee</strong> required to submit your initial application. If any payment is ever required at a later stage, it will only be communicated through <strong>verified official channels</strong>.',
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
  {
    question: 'What is the application deadline?',
    answer:
      'Applications close on <strong>March 1, 2026</strong>. Make sure to submit your complete application before the deadline.',
  },
  {
    question: 'Do I need a Real Estate Certificate?',
    answer:
      'Yes, all applicants must have a Real Estate Course Certificate. You can obtain one at <a href="https://rim.stephenakintayofoundation.org/" target="_blank" rel="noopener noreferrer">rim.stephenakintayofoundation.org</a> if you don\'t have one yet.',
  },
  {
    question: 'What happens after I apply?',
    answer:
      'After submitting your application, our team will review it. Shortlisted candidates will be contacted for virtual and/or physical auditions, interviews and additional assessments before final housemates are selected.',
  },
  {
    question: 'Can I apply if I live outside Nigeria?',
    answer:
      'Yes! The show is open to Nigerians and Africans in the diaspora. If selected, you may need valid travel documents to participate in filming.',
  },
];

/**
 * FAQ page component
 */
export default function FAQPage() {
  return (
    <AnimatedSection id="faq">
      <div className={styles.sectionHeader}>
        <div>
          <p className={styles.sectionTag}>Frequently Asked Questions</p>
          <h2 className={styles.sectionTitle}>
            Everything You Need <span>To Know</span>
          </h2>
        </div>
        <p className={styles.sectionSubtitle}>
          Find answers to common questions about the KeytoDCity Reality Show, application process, 
          eligibility, and more.
        </p>
      </div>

      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        <FAQ items={faqItems} />
      </div>
    </AnimatedSection>
  );
}

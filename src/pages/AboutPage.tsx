import AnimatedSection from '../components/AnimatedSection';
import styles from '../styles/components/sections.module.css';
import aboutStyles from '../styles/components/about.module.css';

/**
 * About page component
 */
export default function AboutPage() {
  return (
    <AnimatedSection id="about">
      <div className={styles.sectionHeader}>
        <div>
          <p className={styles.sectionTag}>About the Show</p>
          <h2 className={styles.sectionTitle}>
            The Business Reality Show <span>That Changes Lives</span>
          </h2>
        </div>
        <p className={styles.sectionSubtitle}>
          This is not entertainment for entertainment's sake. It's an intense, high-level
          business immersion designed to produce a leader who can build and scale real
          companies in the real world.
        </p>
      </div>

      {/* Certificate Requirement Banner */}
      <div style={{
        background: 'linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)',
        padding: '2rem',
        borderRadius: '16px',
        marginBottom: '3rem',
        textAlign: 'center',
        color: 'white',
        boxShadow: '0 10px 40px rgba(139, 92, 246, 0.4)'
      }}>
        <div style={{ fontSize: '3rem', marginBottom: '0.5rem' }}>📜</div>
        <h3 style={{
          fontSize: '2rem',
          fontWeight: 'bold',
          marginBottom: '1rem',
          color: 'white'
        }}>
          IMPORTANT: Certificate Requirement
        </h3>
        <p style={{
          fontSize: '1.25rem',
          lineHeight: '1.8',
          marginBottom: '1.5rem',
          maxWidth: '900px',
          margin: '0 auto 1.5rem',
          color: 'rgba(255, 255, 255, 0.95)'
        }}>
          All applicants <strong>MUST</strong> have a <strong>Real Estate Course Certificate</strong> to be eligible for KeytoDCity Reality Show.
          <br />
          Don't have one yet? No problem! Get certified through our official program below:
        </p>
        <button
          onClick={() => window.open('https://rim.stephenakintayofoundation.org/', '_blank')}
          style={{
            background: 'white',
            color: '#8b5cf6',
            fontSize: '1.25rem',
            fontWeight: 'bold',
            padding: '1.25rem 3rem',
            borderRadius: '12px',
            border: 'none',
            cursor: 'pointer',
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.2)',
            transition: 'transform 0.2s',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.5rem'
          }}
          onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
          onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
        >
          Get Your Certificate Now 🎓
        </button>
      </div>


      <div className={styles.grid2}>
        <article className={styles.card}>
          <div className={aboutStyles.imageContainer}>
            <img
              src="/images/about-show.jpg"
              alt="KeytoDCity Reality Show contestants in boardroom"
              className={aboutStyles.aboutImage}
              onError={(e) => {
                e.currentTarget.style.display = 'none';
              }}
            />
          </div>
          <h3>What is "KeytoDCity Reality Show"?</h3>
          <p>
            KeytoDCity Reality Show is a business and leadership television experience where
            selected contestants live, learn and compete in a structured environment that
            mirrors the real world of entrepreneurship.
          </p>
          <ul className={styles.bulletList}>
            <li>
              You will work on real-life business challenges across multiple industries including
              real estate, fintech, media, technology and more.
            </li>
            <li>
              You will be mentored and assessed by a panel of top business leaders.
            </li>
            <li>
              Every week, contestants will face tasks in sales, leadership, operations, finance,
              marketing, innovation and impact.
            </li>
            <li>
              Only one contestant will emerge as the
              <strong> Winner & Chief Executive Officer</strong>
              of a fast-growing subsidiary company.
            </li>
          </ul>
          <div className={styles.pillRow}>
            <span className={styles.pill}>Business</span>
            <span className={styles.pill}>Strategy</span>
            <span className={styles.pill}>Execution</span>
            <span className={styles.pill}>Leadership</span>
          </div>
        </article>

        <article className={styles.card} id="how-it-works">
          <div className={aboutStyles.imageContainer}>
            <img
              src="/images/how-it-works.jpg"
              alt="Reality show process and steps"
              className={aboutStyles.aboutImage}
              onError={(e) => {
                e.currentTarget.style.display = 'none';
              }}
            />
          </div>
          <h3>How the Reality Show Works</h3>
          <p>
            From the moment you walk into the house, you are on the clock. Every task is a test
            of your character, your competence and your capacity to lead people and manage
            resources.
          </p>

          <div className={styles.steps}>
            <div className={styles.step}>
              <div className={styles.stepNumber}>Step 1</div>
              <div className={styles.stepTitle}>Apply Online</div>
              <div className={styles.stepText}>
                Complete the application form with accurate details about who you are, what you
                do and why you want to become a CEO.
              </div>
            </div>
            <div className={styles.step}>
              <div className={styles.stepNumber}>Step 2</div>
              <div className={styles.stepTitle}>Shortlisting & Auditions</div>
              <div className={styles.stepText}>
                Shortlisted applicants will be contacted for virtual and/or physical auditions,
                interviews and additional assessments before final housemates are selected.
              </div>
            </div>
            <div className={styles.step}>
              <div className={styles.stepNumber}>Step 3</div>
              <div className={styles.stepTitle}>Enter the CEO House</div>
              <div className={styles.stepText}>
                Live in the house, compete weekly, face boardroom reviews, avoid eviction and
                position yourself to win the grand prize and a CEO role.
              </div>
            </div>
          </div>
        </article>
      </div>
    </AnimatedSection>
  );
}

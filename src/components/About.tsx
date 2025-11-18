import AnimatedSection from './AnimatedSection';
import styles from '../styles/components/sections.module.css';
import aboutStyles from '../styles/components/about.module.css';

/**
 * About section component
 */
export default function About() {
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

      <div className={styles.grid2}>
        <article className={styles.card}>
          <div className={aboutStyles.imageContainer}>
            <img 
              src="/images/about-show.jpg" 
              alt="CEO Reality Show contestants in boardroom"
              className={aboutStyles.aboutImage}
              onError={(e) => {
                e.currentTarget.style.display = 'none';
              }}
            />
          </div>
          <h3>What is "The CEO Reality Show with Dr. Stephen Akintayo"?</h3>
          <p>
            The CEO Reality Show is a business and leadership television experience where
            selected contestants live, learn and compete in a structured environment that
            mirrors the real world of entrepreneurship.
          </p>
          <ul className={styles.bulletList}>
            <li>
              You will work on real-life business challenges across multiple industries including
              real estate, fintech, media, technology and more.
            </li>
            <li>
              You will be mentored and assessed by Dr. Stephen Akintayo and a panel of top
              business leaders.
            </li>
            <li>
              Every week, contestants will face tasks in sales, leadership, operations, finance,
              marketing, innovation and impact.
            </li>
            <li>
              Only one contestant will emerge as the
              <strong> Winner & Chief Executive Officer</strong>
              of a fast-growing subsidiary under the Stephen Akintayo group.
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
                do and why you want to become a CEO under Dr. Stephen.
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


import { smoothScrollTo } from '../utils/scroll';
import CountdownTimer from './CountdownTimer';
import type { Prize } from '../types';
import styles from '../styles/components/hero.module.css';

interface HeroProps {
  deadline: Date;
  prizes: Prize[];
}

/**
 * Hero section component with countdown timer and call-to-action
 */
export default function Hero({ deadline, prizes }: HeroProps) {
  const handleCtaClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    window.open('https://docs.google.com/forms/d/e/1FAIpQLSfGTdoSAiEbuWCMTinTVbDDJt23hKXwE-RAaasDFjkAj58MXQ/viewform?usp=publish-editor', '_blank');
  };

  return (
    <section className={styles.hero}>
      <div className={styles.heroLeft}>
        <div className={styles.heroBadge}>
          <span className={styles.heroBadgeDot} aria-hidden="true"></span>
          Season 1 • 2026
          <span>Applications Now Open</span>
        </div>

        <h1 className={styles.heroTitle}>
        KeytoDCity CEO Challenge
          <span className={styles.highlight}> Reality Show</span>
        </h1>

        <p className={styles.heroSubtitle}>
          <strong>Step into the boardroom, not the background.</strong>
          Join the <strong> KeytoDCity Reality Show with Dr. Stephen Akintayo</strong> and compete for
          a chance to win the following prizes:
          <strong> ₦100,000,000 cash, a brand new car, 1 acre of land</strong>, and
          <strong> 1 year as CEO</strong> of one of his company's fast-growing subsidiaries.
        </p>

        <div className={styles.heroPrizes}>
          {prizes.map((prize, index) => (
            <div key={index} className={styles.prizeCard}>
              <div className={styles.prizeLabel}>{prize.label}</div>
              <div className={styles.prizeValue}>
                {prize.value} <span>{prize.subtitle}</span>
              </div>
            </div>
          ))}
        </div>

        <div className={styles.heroCtaGroup}>
          <button className={styles.btnPrimary} onClick={handleCtaClick} aria-label="Apply to join the show">
            Apply to Join the Show
            <span aria-hidden="true">⚡</span>
          </button>
          <button className={styles.btnOutline} onClick={(e) => { e.preventDefault(); smoothScrollTo('how-it-works'); }} aria-label="Learn how the reality show works">
            How the Reality Show Works
          </button>
        </div>

        <div className={styles.heroMeta}>
          <span>🎬 Filming: <strong>2026</strong> (Exact dates to be announced)</span>
          <span>🌍 Open to applicants across <strong>Nigeria & the diaspora</strong></span>
          <span>📺 Business, strategy, sales, leadership & impact</span>
        </div>
      </div>

      <div className={styles.heroRight}>
        <div className={styles.heroCard}>
          <div className={styles.heroGlow} aria-hidden="true"></div>

          <div className={styles.heroCardHeader}>
            <div className={styles.heroCardTitle}>Reality Show Application</div>
            <span className={styles.heroStatusPill}>Now Open</span>
          </div>

          <div>
            <p className={styles.heroMainText}>
              Are you ready to sit in the CEO chair?
            </p>
            <p className={styles.heroMainSubtext}>
      Only a selected group of ambitious entrepreneurs and professionals will make it into the show. Prove your intelligence, resilience, creativity and leadership under pressure.
            </p>
          </div>
          <CountdownTimer deadline={deadline} />
          <button
            className={styles.btnPrimary}
            onClick={() => window.open('https://docs.google.com/forms/d/e/1FAIpQLSfGTdoSAiEbuWCMTinTVbDDJt23hKXwE-RAaasDFjkAj58MXQ/viewform?usp=publish-editor', '_blank')}
            style={{ width: '100%', justifyContent: 'center' }}
            aria-label="Start your application"
          >
            Start Your Application
          </button>

          <p className={styles.heroCtaNote} style={{
            background: 'rgba(249, 115, 22, 0.1)',
            padding: '0.75rem',
            borderRadius: '8px',
            border: '1px solid rgba(249, 115, 22, 0.3)',
            marginBottom: '0.75rem'
          }}>
            <strong>📜 Certificate Required:</strong> You must have a Real Estate Course Certificate to apply.{' '}
            <a
              href="https://rim.stephenakintayofoundation.org/"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: 'var(--primary)', textDecoration: 'underline', fontWeight: 'bold' }}
            >
              Get one here
            </a> if you don't have it yet.
          </p>

          <p className={styles.heroCtaNote}>
            No payment required at this stage. Shortlisted candidates will be contacted directly
            by the show's official team.
          </p>

          <div className={styles.heroTagline} aria-hidden="true">
            Strategy • Execution • Leadership • Impact
          </div>
        </div>
      </div>
    </section>
  );
}


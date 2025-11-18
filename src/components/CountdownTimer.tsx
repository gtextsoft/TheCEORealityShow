import { useCountdown } from '../hooks/useCountdown';
import styles from '../styles/components/hero.module.css';

interface CountdownTimerProps {
  deadline: Date;
  onComplete?: () => void;
}

/**
 * Countdown timer component displaying days, hours, minutes, and seconds
 */
export default function CountdownTimer({ deadline, onComplete }: CountdownTimerProps) {
  const { days, hours, minutes, seconds, isExpired } = useCountdown(deadline, onComplete);

  if (isExpired) {
    return (
      <div className={styles.heroCountdown}>
        <div className={styles.heroCountdownItem}>
          <div className={styles.heroCountdownNumber}>00</div>
          <div className={styles.heroCountdownLabel}>Days</div>
        </div>
        <div className={styles.heroCountdownItem}>
          <div className={styles.heroCountdownNumber}>00</div>
          <div className={styles.heroCountdownLabel}>Hours</div>
        </div>
        <div className={styles.heroCountdownItem}>
          <div className={styles.heroCountdownNumber}>00</div>
          <div className={styles.heroCountdownLabel}>Minutes</div>
        </div>
        <div className={styles.heroCountdownItem}>
          <div className={styles.heroCountdownNumber}>00</div>
          <div className={styles.heroCountdownLabel}>Seconds</div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.heroCountdown} role="timer" aria-live="polite" aria-label="Application deadline countdown">
      <div className={styles.heroCountdownItem}>
        <div className={styles.heroCountdownNumber} data-unit="days">
          {String(days).padStart(2, '0')}
        </div>
        <div className={styles.heroCountdownLabel}>Days</div>
      </div>
      <div className={styles.heroCountdownItem}>
        <div className={styles.heroCountdownNumber} data-unit="hours">
          {String(hours).padStart(2, '0')}
        </div>
        <div className={styles.heroCountdownLabel}>Hours</div>
      </div>
      <div className={styles.heroCountdownItem}>
        <div className={styles.heroCountdownNumber} data-unit="minutes">
          {String(minutes).padStart(2, '0')}
        </div>
        <div className={styles.heroCountdownLabel}>Minutes</div>
      </div>
      <div className={styles.heroCountdownItem}>
        <div className={styles.heroCountdownNumber} data-unit="seconds">
          {String(seconds).padStart(2, '0')}
        </div>
        <div className={styles.heroCountdownLabel}>Seconds</div>
      </div>
    </div>
  );
}


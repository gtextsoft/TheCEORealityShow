import { useCountdown } from '../hooks/useCountdown';
import styles from '../styles/components/hero.module.css';

interface CountdownTimerProps {
  deadline: Date;
  onComplete?: () => void;
}

/**
 * Countdown timer component displaying days, hours, minutes, and seconds
 */
function formatUnit(n: number): string {
  const value = Number.isFinite(n) && n >= 0 ? n : 0;
  return String(Math.floor(value)).padStart(2, '0');
}

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
          {formatUnit(days)}
        </div>
        <div className={styles.heroCountdownLabel}>Days</div>
      </div>
      <div className={styles.heroCountdownItem}>
        <div className={styles.heroCountdownNumber} data-unit="hours">
          {formatUnit(hours)}
        </div>
        <div className={styles.heroCountdownLabel}>Hours</div>
      </div>
      <div className={styles.heroCountdownItem}>
        <div className={styles.heroCountdownNumber} data-unit="minutes">
          {formatUnit(minutes)}
        </div>
        <div className={styles.heroCountdownLabel}>Minutes</div>
      </div>
      <div className={styles.heroCountdownItem}>
        <div className={styles.heroCountdownNumber} data-unit="seconds">
          {formatUnit(seconds)}
        </div>
        <div className={styles.heroCountdownLabel}>Seconds</div>
      </div>
    </div>
  );
}


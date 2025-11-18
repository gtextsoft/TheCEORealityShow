import { useState, useEffect } from 'react';
import type { CountdownTime } from '../types';

/**
 * Custom hook for countdown timer functionality
 * Calculates time remaining until a deadline
 */
export function useCountdown(deadline: Date, onComplete?: () => void): CountdownTime & { isExpired: boolean } {
  const [timeLeft, setTimeLeft] = useState<CountdownTime>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [isExpired, setIsExpired] = useState(false);

  useEffect(() => {
    const calculateTimeLeft = (): CountdownTime => {
      const now = new Date().getTime();
      const deadlineTime = deadline.getTime();
      const difference = deadlineTime - now;

      if (difference <= 0) {
        setIsExpired(true);
        if (onComplete) {
          onComplete();
        }
        return { days: 0, hours: 0, minutes: 0, seconds: 0 };
      }

      setIsExpired(false);
      return {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((difference % (1000 * 60)) / 1000),
      };
    };

    // Calculate immediately
    setTimeLeft(calculateTimeLeft());

    // Update every second
    const interval = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(interval);
  }, [deadline, onComplete]);

  return { ...timeLeft, isExpired };
}


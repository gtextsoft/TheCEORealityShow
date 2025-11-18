// Re-export all types
export * from './form';

// Component prop types
export interface CountdownTime {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export interface CountdownTimerProps {
  deadline: Date;
  onComplete?: () => void;
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface Step {
  number: string;
  title: string;
  text: string;
}

export interface Prize {
  label: string;
  value: string;
  subtitle: string;
}


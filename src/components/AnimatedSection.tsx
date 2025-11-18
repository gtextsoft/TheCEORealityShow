import { ReactNode } from 'react';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';
import styles from '../styles/components/sections.module.css';

interface AnimatedSectionProps {
  children: ReactNode;
  className?: string;
  id?: string;
}

/**
 * Wrapper component that adds fade-in animation when section comes into view
 */
export default function AnimatedSection({ children, className = '', id }: AnimatedSectionProps) {
  const [ref, isIntersecting] = useIntersectionObserver();

  return (
    <section
      ref={ref as React.RefObject<HTMLElement>}
      className={`${styles.section} ${className}`}
      id={id}
      style={{
        opacity: isIntersecting ? 1 : 0.3,
        transform: isIntersecting ? 'translateY(0)' : 'translateY(20px)',
        transition: 'opacity 0.6s ease, transform 0.6s ease',
      }}
    >
      {children}
    </section>
  );
}


import { useEffect } from 'react';
import { useScroll } from '../hooks/useScroll';
import { scrollToTop } from '../utils/scroll';
import styles from '../styles/components/scroll-to-top.module.css';

/**
 * Scroll to top button that appears when user scrolls down
 */
export default function ScrollToTop() {
  const { isScrolled } = useScroll(300);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    scrollToTop();
  };

  return (
    <button
      className={`${styles.scrollToTop} ${isScrolled ? styles.visible : ''}`}
      onClick={handleClick}
      aria-label="Scroll to top"
      title="Scroll to top"
      type="button"
    >
      ↑
    </button>
  );
}


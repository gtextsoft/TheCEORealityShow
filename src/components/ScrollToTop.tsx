import { useEffect, useState } from 'react';
import { useScroll } from '../hooks/useScroll';
import { smoothScrollTo } from '../utils/scroll';
import styles from '../styles/components/scroll-to-top.module.css';

/**
 * Scroll to top button that appears when user scrolls down
 */
export default function ScrollToTop() {
  const { isScrolled } = useScroll(300);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(isScrolled);
  }, [isScrolled]);

  const handleClick = () => {
    smoothScrollTo('top');
  };

  if (!isVisible) return null;

  return (
    <button
      className={`${styles.scrollToTop} ${isVisible ? styles.visible : ''}`}
      onClick={handleClick}
      aria-label="Scroll to top"
      title="Scroll to top"
    >
      ↑
    </button>
  );
}


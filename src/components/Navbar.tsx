import { useState, useEffect } from 'react';
import { smoothScrollTo } from '../utils/scroll';
import styles from '../styles/components/navbar.module.css';

/**
 * Navigation bar component with mobile menu toggle
 */
export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  // Close mobile menu when clicking outside or on a link
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (isOpen && !target.closest(`.${styles.nav}`)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('click', handleClickOutside);
      // Prevent body scroll when menu is open
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.removeEventListener('click', handleClickOutside);
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();
    smoothScrollTo(targetId);
    setIsOpen(false);
  };

  const handleCtaClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    window.open('https://docs.google.com/forms/d/e/1FAIpQLSfGTdoSAiEbuWCMTinTVbDDJt23hKXwE-RAaasDFjkAj58MXQ/viewform?usp=publish-editor', '_blank');
    setIsOpen(false);
  };

  const handleDonateClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    smoothScrollTo('sponsorship');
    setIsOpen(false);
  };

  return (
    <header className={`${styles.nav} ${isOpen ? styles.navOpen : ''}`} role="banner">
      <div className={styles.navInner}>
        <a href="#top" className={styles.brand} aria-label="Go to top">
          <div className={styles.brandIcon} aria-hidden="true">SA</div>
          <div className={styles.brandText}>
            <span>Dr. Stephen Akintayo</span>
            <span>The CEO Reality Show</span>
          </div>
        </a>

        <button
          className={styles.navToggle}
          onClick={() => setIsOpen(!isOpen)}
          aria-expanded={isOpen}
          aria-controls="navLinks"
          aria-label="Toggle navigation menu"
        >
          Menu
          <span aria-hidden="true">☰</span>
        </button>

        <nav className={styles.navLinks} id="navLinks" role="navigation" aria-label="Main navigation">
          <a href="#about" onClick={(e) => handleNavClick(e, 'about')}>
            About
          </a>
          <a href="#prizes" onClick={(e) => handleNavClick(e, 'prizes')}>
            Prizes
          </a>
          <a href="#eligibility" onClick={(e) => handleNavClick(e, 'eligibility')}>
            Eligibility
          </a>
          <a href="#sponsorship" onClick={(e) => handleNavClick(e, 'sponsorship')}>
            Sponsor
          </a>
          <a href="#faq" onClick={(e) => handleNavClick(e, 'faq')}>
            FAQ
          </a>
        </nav>

        <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
          <button 
            className={styles.navDonate} 
            onClick={handleDonateClick} 
            aria-label="Donate to support the show"
          >
            💝 Donate
          </button>
          <button className={styles.navCta} onClick={handleCtaClick} aria-label="Apply now">
            Apply Now
            <span aria-hidden="true">➜</span>
          </button>
        </div>
      </div>
    </header>
  );
}


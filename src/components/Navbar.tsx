import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import styles from '../styles/components/navbar.module.css';

/**
 * Navigation bar component with mobile menu toggle
 */
export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

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

  // const handleDonateClick = (e: React.MouseEvent<HTMLButtonElement>) => {
  //   e.preventDefault();
  //   smoothScrollTo('sponsorship');
  //   setIsOpen(false);
  // };

  return (
    <header className={`${styles.nav} ${isOpen ? styles.navOpen : ''}`} role="banner">
      <div className={styles.navInner}>
        <Link to="/" className={styles.brand} aria-label="Go to home">
          <img 
            src="/images/logo.jpeg" 
            alt="Stephen Akintayo Foundation Logo" 
            className={styles.brandLogo}
            onError={(e) => {
              // Fallback to text icon if image fails to load
              e.currentTarget.style.display = 'none';
              const fallback = e.currentTarget.nextElementSibling as HTMLElement;
              if (fallback) fallback.style.display = 'flex';
            }}
          />
          <div className={styles.brandIcon} aria-hidden="true" style={{ display: 'none' }}>SA</div>
          <div className={styles.brandText}>
            <span>Dr. Stephen Akintayo</span>
            <span>KeytoDCity Reality Show</span>
          </div>
        </Link>

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
          <Link to="/about" onClick={() => setIsOpen(false)} className={location.pathname === '/about' ? styles.active : ''}>
            About
          </Link>
          <Link to="/prizes" onClick={() => setIsOpen(false)} className={location.pathname === '/prizes' ? styles.active : ''}>
            Prizes
          </Link>
          <Link to="/eligibility" onClick={() => setIsOpen(false)} className={location.pathname === '/eligibility' ? styles.active : ''}>
            Eligibility
          </Link>
          <Link to="/sponsorship" onClick={() => setIsOpen(false)} className={location.pathname === '/sponsorship' ? styles.active : ''}>
            Sponsor
          </Link>
          <Link to="/faq" onClick={() => setIsOpen(false)} className={location.pathname === '/faq' ? styles.active : ''}>
            FAQ
          </Link>
        </nav>

        <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
          {/* <button 
            className={styles.navDonate} 
            onClick={handleDonateClick} 
            aria-label="Donate to support the show"
          >
            💝 Donate
          </button> */}
          <Link to="/apply" className={styles.navCta} onClick={() => setIsOpen(false)} aria-label="Apply now">
            Apply Now
            <span aria-hidden="true">➜</span>
          </Link>
        </div>
      </div>
    </header>
  );
}


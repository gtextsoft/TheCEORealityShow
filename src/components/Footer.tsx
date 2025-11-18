import { smoothScrollTo } from '../utils/scroll';
import styles from '../styles/components/footer.module.css';

/**
 * Footer component with copyright and links
 */
export default function Footer() {
  const currentYear = new Date().getFullYear();

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, targetId?: string) => {
    if (targetId) {
      e.preventDefault();
      smoothScrollTo(targetId);
    }
  };

  return (
    <footer className={styles.footer} role="contentinfo">
      <div className={styles.footerInner}>
        <p>
          © {currentYear} The CEO Reality Show with Dr. Stephen Akintayo. All rights reserved.
        </p>
        <div className={styles.footerLinks}>
          <a href="#top" onClick={(e) => handleLinkClick(e, 'top')}>
            Back to top
          </a>
          <a href="javascript:void(0)" aria-label="Terms and conditions (coming soon)">
            Official Terms & Conditions (Coming Soon)
          </a>
          <a href="javascript:void(0)" aria-label="Privacy notice">
            Privacy Notice
          </a>
        </div>
      </div>
    </footer>
  );
}


import { smoothScrollTo } from '../utils/scroll';
import { FacebookIcon, InstagramIcon, YouTubeIcon, TwitterIcon } from './SocialIcons';
import styles from '../styles/components/footer.module.css';

import { Link } from 'react-router-dom';

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
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}>
          {/* <img 
            src="/images/logo.jpeg" 
            alt="KeystoDCity Reality Show Logo" 
            className={styles.footerLogo}
            onError={(e) => {
              e.currentTarget.style.display = 'none';
            }}
          /> */}
           <Link to="/" className={styles.brand} aria-label="Go to home">
          <div className={styles.brandLogoContainer}>
            <img 
              src="/images/half-logo2.png" 
              alt="KeystoDCity Reality Show Logo" 
              className={styles.brandLogo}
              onError={(e) => {
                e.currentTarget.style.display = 'none';
              }}
            />
            <img 
              src="/images/half-logo.png" 
              alt="KeystoDCity Reality Show Logo" 
              className={styles.brandLogo}
              onError={(e) => {
                e.currentTarget.style.display = 'none';
              }}
            />
          </div>
     </Link>
          <p>
            © {currentYear} KeystoDCity Reality Show. All rights reserved.
          </p>
        </div>
        <div className={styles.footerSocial}>
          <h3 className={styles.footerSocialTitle}>Follow Us</h3>
          <div className={styles.footerSocialLinks}>
            <a 
              href="https://facebook.com" 
              target="_blank" 
              rel="noopener noreferrer"
              aria-label="Follow us on Facebook"
              className={styles.socialLink}
            >
              <FacebookIcon className={styles.socialIcon} />
              <span>Facebook</span>
            </a>
            <a 
              href="https://instagram.com" 
              target="_blank" 
              rel="noopener noreferrer"
              aria-label="Follow us on Instagram"
              className={styles.socialLink}
            >
              <InstagramIcon className={styles.socialIcon} />
              <span>Instagram</span>
            </a>
            <a 
              href="https://youtube.com" 
              target="_blank" 
              rel="noopener noreferrer"
              aria-label="Follow us on YouTube"
              className={styles.socialLink}
            >
              <YouTubeIcon className={styles.socialIcon} />
              <span>YouTube</span>
            </a>
            <a 
              href="https://twitter.com" 
              target="_blank" 
              rel="noopener noreferrer"
              aria-label="Follow us on Twitter"
              className={styles.socialLink}
            >
              <TwitterIcon className={styles.socialIcon} />
              <span>Twitter</span>
            </a>
          </div>
        </div>
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


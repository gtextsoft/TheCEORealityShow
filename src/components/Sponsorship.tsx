import AnimatedSection from './AnimatedSection';
import styles from '../styles/components/sections.module.css';
import sponsorStyles from '../styles/components/sponsorship.module.css';
import heroStyles from '../styles/components/hero.module.css';
import { smoothScrollTo } from '../utils/scroll';

interface SponsorshipTier {
  name: string;
  benefits: string[];
  icon: string;
}

const sponsorshipTiers: SponsorshipTier[] = [
  {
    name: 'Platinum Sponsor',
    benefits: [
      'Prime logo placement on all marketing materials',
      'Exclusive product placement during show',
      'Speaking opportunity at grand finale',
      'Brand integration in 5+ episodes',
      'VIP access to all events',
      'Social media mentions (1M+ reach)',
    ],
    icon: '💎',
  },
  {
    name: 'Gold Sponsor',
    benefits: [
      'Logo placement on marketing materials',
      'Product placement in 3+ episodes',
      'VIP access to finale event',
      'Social media mentions (500K+ reach)',
      'Brand integration opportunities',
    ],
    icon: '🥇',
  },
  {
    name: 'Silver Sponsor',
    benefits: [
      'Logo placement on website and materials',
      'Product placement in 2+ episodes',
      'Access to premiere and finale events',
      'Social media mentions (250K+ reach)',
    ],
    icon: '🥈',
  },
  {
    name: 'Bronze Sponsor',
    benefits: [
      'Logo placement on website',
      'Mention in show credits',
      'Access to finale event',
      'Social media mention',
    ],
    icon: '🥉',
  },
];

const contributionOptions = [
  {
    title: 'Individual Contribution',
    description: 'Support the show and help discover Africa\'s next CEO',
  },
  {
    title: 'Corporate Partnership',
    description: 'Partner with us to create Africa\'s most impactful Real Estate reality show',
  },
];

/**
 * Sponsorship and contribution section
 */
export default function Sponsorship() {
  const handleContactClick = () => {
    window.location.href = 'mailto:sponsorships@stephenakintayo.com?subject=Sponsorship Inquiry - KeystoDCity Reality Show';
  };

  return (
    <AnimatedSection id="sponsorship" className={sponsorStyles.sponsorshipSection}>
      <div className={styles.sectionHeader}>
        <div>
          <p className={styles.sectionTag}>Partnership & Sponsorship</p>
          <h2 className={styles.sectionTitle}>
            Sponsor & <span>Support the Show</span>
          </h2>
        </div>
        <p className={styles.sectionSubtitle}>
          Join us in creating Africa's most impactful Real Estate reality show. 
          Partner with us and gain massive brand exposure while supporting the next generation of African leaders.
        </p>
      </div>

      <div className={sponsorStyles.sponsorshipGrid}>
        {sponsorshipTiers.map((tier, index) => (
          <div key={index} className={sponsorStyles.tierCard}>
            <div className={sponsorStyles.tierIcon}>{tier.icon}</div>
            <h3 className={sponsorStyles.tierName}>{tier.name}</h3>
            <ul className={sponsorStyles.tierBenefits}>
              {tier.benefits.map((benefit, idx) => (
                <li key={idx}>{benefit}</li>
              ))}
            </ul>
            <button 
              className={heroStyles.btnPrimary}
              onClick={handleContactClick}
              style={{ width: '100%', marginTop: '1rem' }}
            >
              Become a {tier.name.split(' ')[0]} Sponsor
            </button>
          </div>
        ))}
      </div>

      <div className={sponsorStyles.contributionSection}>
        <h3 className={sponsorStyles.contributionTitle}>Other Ways to Contribute</h3>
        <div className={sponsorStyles.contributionGrid}>
          {contributionOptions.map((option, index) => (
            <div key={index} className={sponsorStyles.contributionCard}>
              <h4>{option.title}</h4>
              <p>{option.description}</p>
              <button 
                className={heroStyles.btnOutline}
                onClick={handleContactClick}
                style={{ width: '100%', marginTop: '1rem' }}
              >
                Learn More
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className={sponsorStyles.donationSection}>
        <div className={sponsorStyles.donationCard}>
          <div className={sponsorStyles.donationIcon}>💝</div>
          <h3 className={sponsorStyles.donationTitle}>Support the Show</h3>
          <p className={sponsorStyles.donationDescription}>
            Your donation helps us create Africa's most impactful Real Estate reality show and discover the next generation of leaders.
            Every contribution makes a difference!
          </p>
          <button 
            className={heroStyles.btnPrimary}
            onClick={handleContactClick}
            style={{ 
              fontSize: '1.2rem', 
              padding: '1.2rem 3rem',
              marginTop: '1.5rem',
              boxShadow: '0 25px 60px rgba(249, 115, 22, 0.5)',
            }}
          >
            Donate Now
            <span aria-hidden="true">❤️</span>
          </button>
          <p className={sponsorStyles.donationNote}>
            All donations go directly to supporting the show's production and prize pool
          </p>
        </div>
      </div>

      <div className={sponsorStyles.ctaSection}>
        <div className={sponsorStyles.ctaCard}>
          <h3>Ready to Partner With Us?</h3>
          <p>
            Contact our sponsorship team to discuss custom partnership packages tailored to your brand's needs.
            Let's create something extraordinary together.
          </p>
          <div className={sponsorStyles.ctaButtons}>
            <button className={heroStyles.btnPrimary} onClick={handleContactClick}>
              Contact Sponsorship Team
              <span aria-hidden="true">📧</span>
            </button>
            <button 
              className={heroStyles.btnOutline}
              onClick={() => smoothScrollTo('about')}
            >
              Learn More About the Show
            </button>
          </div>
        </div>
      </div>
    </AnimatedSection>
  );
}


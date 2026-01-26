import AnimatedSection from '../components/AnimatedSection';
import styles from '../styles/components/sections.module.css';
import sponsorStyles from '../styles/components/sponsorship.module.css';
import heroStyles from '../styles/components/hero.module.css';

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
    description: 'Partner with us to create Africa\'s most impactful business reality show',
  },
];

/**
 * Sponsorship page component
 */
export default function SponsorshipPage() {
  const handleContactClick = () => {
    window.location.href = 'mailto:sponsorships@stephenakintayo.com?subject=Sponsorship Inquiry - KeytoDCity Reality Show';
  };

  return (
    <AnimatedSection id="sponsorship" className={sponsorStyles.sponsorshipSection}>
      <div className={styles.sectionHeader}>
        <div>
          <p className={styles.sectionTag}>Sponsorship & Partnership</p>
          <h2 className={styles.sectionTitle}>
            Partner With Us <span>To Make History</span>
          </h2>
        </div>
        <p className={styles.sectionSubtitle}>
          Join us in creating Africa's most impactful business reality show. Partner with KeytoDCity 
          and reach millions of ambitious entrepreneurs across the continent.
        </p>
      </div>

      <div className={sponsorStyles.tiersGrid}>
        {sponsorshipTiers.map((tier, index) => (
          <div key={index} className={sponsorStyles.tierCard}>
            <div className={sponsorStyles.tierIcon}>{tier.icon}</div>
            <h3 className={sponsorStyles.tierName}>{tier.name}</h3>
            <ul className={sponsorStyles.tierBenefits}>
              {tier.benefits.map((benefit, benefitIndex) => (
                <li key={benefitIndex}>{benefit}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className={sponsorStyles.contributionSection}>
        <h3 className={sponsorStyles.contributionTitle}>Ways to Contribute</h3>
        <div className={sponsorStyles.contributionGrid}>
          {contributionOptions.map((option, index) => (
            <div key={index} className={sponsorStyles.contributionCard}>
              <h4>{option.title}</h4>
              <p>{option.description}</p>
            </div>
          ))}
        </div>
      </div>

      <div className={sponsorStyles.ctaSection}>
        <button
          className={heroStyles.btnPrimary}
          onClick={handleContactClick}
          style={{ fontSize: '1.1rem', padding: '1rem 2.5rem' }}
        >
          Contact Us About Sponsorship
        </button>
        <p style={{ marginTop: '1rem', color: 'var(--text-muted)', fontSize: '0.9rem' }}>
          Email us at sponsorships@stephenakintayo.com for detailed partnership packages
        </p>
      </div>
    </AnimatedSection>
  );
}

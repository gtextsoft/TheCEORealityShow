import AnimatedSection from './AnimatedSection';
import styles from '../styles/components/sections.module.css';
import prizeStyles from '../styles/components/prizes.module.css';

interface PrizeDetail {
  title: string;
  value: string;
  description: string;
  icon: string;
  image?: string;
}

const prizes: PrizeDetail[] = [
  {
    title: 'Grand Prize',
    value: '₦100,000,000',
    description: 'Massive cash reward to kickstart your entrepreneurial journey',
    icon: '💰',
    image: 'https://images.pexels.com/photos/6120397/pexels-photo-6120397.jpeg',
  },
  {
    title: 'Brand New Car',
    value: 'Premium Vehicle',
    description: 'A brand new luxury car to match your CEO status',
    icon: '🚗',
    image: 'https://images.pexels.com/photos/9494958/pexels-photo-9494958.jpeg',
  },
  {
    title: 'Prime Real Estate',
    value: '1 Acre of Land',
    description: 'Prime location land in a strategic development area',
    icon: '🏞️',
    image: 'https://images.pexels.com/photos/210617/pexels-photo-210617.jpeg',
  },
  {
    title: 'CEO Position',
    value: '1 Year as CEO',
    description: 'Lead a fast-growing subsidiary company under the Stephen Akintayo group',
    icon: '👔',
    image: 'https://images.pexels.com/photos/653429/pexels-photo-653429.jpeg',
  },
  {
    title: 'Business Mentorship',
    value: 'Lifetime Access',
    description: 'Ongoing mentorship from Dr. Stephen Akintayo and top business leaders',
    icon: '🎓',
    image: 'https://images.pexels.com/photos/8124412/pexels-photo-8124412.jpeg',
  },
  {
    title: 'Media Exposure',
    value: 'National Coverage',
    description: 'Featured on television, online media, and all official show platforms',
    icon: '📺',
    image: 'https://images.pexels.com/photos/976863/pexels-photo-976863.jpeg',
  },
];

/**
 * Prizes section showcasing all rewards and benefits
 */
export default function Prizes() {
  return (
    <AnimatedSection id="prizes" className={prizeStyles.prizesSection}>
      <div className={styles.sectionHeader}>
        <div>
          <p className={styles.sectionTag}>Grand Prizes & Rewards</p>
          <h2 className={styles.sectionTitle}>
            Win Life-Changing <span>Rewards</span>
          </h2>
        </div>
        <p className={styles.sectionSubtitle}>
          The winner takes home an incredible package worth over ₦150,000,000 including cash, 
          assets, and opportunities that will transform their life and career.
        </p>
      </div>

      <div className={prizeStyles.prizesGrid}>
        {prizes.map((prize, index) => (
          <div key={index} className={prizeStyles.prizeCard}>
            <div className={prizeStyles.prizeIcon}>{prize.icon}</div>
            <div className={prizeStyles.prizeImage}>
              <img 
                src={prize.image || `/images/prize-${index + 1}.jpg`} 
                alt={prize.title}
                onError={(e) => {
                  // Fallback if image doesn't exist
                  e.currentTarget.style.display = 'none';
                }}
              />
            </div>
            <div className={prizeStyles.prizeContent}>
              <h3 className={prizeStyles.prizeTitle}>{prize.title}</h3>
              <div className={prizeStyles.prizeValue}>{prize.value}</div>
              <p className={prizeStyles.prizeDescription}>{prize.description}</p>
            </div>
          </div>
        ))}
      </div>

      <div className={prizeStyles.totalValue}>
        <div className={prizeStyles.totalValueCard}>
          <div className={prizeStyles.totalValueLabel}>Total Prize Value</div>
          <div className={prizeStyles.totalValueAmount}>₦150,000,000+</div>
          <p className={prizeStyles.totalValueNote}>
            Plus lifetime opportunities, mentorship, and network access
          </p>
        </div>
      </div>
    </AnimatedSection>
  );
}


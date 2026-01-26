import AnimatedSection from './AnimatedSection';
import styles from '../styles/components/sections.module.css';
import showcaseStyles from '../styles/components/showcase.module.css';

/**
 * Video/Content showcase section similar to DStv's entertainment section
 */
export default function Showcase() {
  const showcaseItems = [
    {
      type: 'video',
      title: 'Meet the Contestants',
      description: 'Get to know the ambitious entrepreneurs competing for the CEO position',
      thumbnail: '/images/about-show.jpg',
      duration: '5:30',
    },
    {
      type: 'video',
      title: 'Behind the Scenes',
      description: 'Exclusive look at the boardroom challenges and real-world business tasks',
      thumbnail: '/images/how-it-works.jpg',
      duration: '8:15',
    },
    {
      type: 'video',
      title: 'Dr. Akintayo\'s Vision',
      description: 'Hear from the organizer about creating opportunities for the next generation',
      thumbnail: '/images/drsa.jpeg',
      duration: '12:00',
    },
    {
      type: 'news',
      title: 'Applications Now Open',
      description: 'The 2026 season is accepting applications. Don\'t miss your chance!',
      date: 'Jan 22, 2026',
    },
    {
      type: 'news',
      title: 'Prize Pool Announced',
      description: '₦100M cash, luxury car, land ownership, and CEO position up for grabs',
      date: 'Jan 15, 2026',
    },
    {
      type: 'video',
      title: 'Success Stories',
      description: 'Previous participants share their journey and transformation',
      thumbnail: '/images/hero-ceo.jpg',
      duration: '15:45',
    },
  ];

  return (
    <AnimatedSection id="showcase">
      <div className={styles.sectionHeader}>
        <div>
          <p className={styles.sectionTag}>Entertainment & Updates</p>
          <h2 className={styles.sectionTitle}>
            Content <span>Loved by Entrepreneurs</span>
          </h2>
        </div>
        <p className={styles.sectionSubtitle}>
          Watch exclusive videos, read the latest news, and stay connected with the KeytoDCity community.
        </p>
      </div>

      <div className={showcaseStyles.showcaseGrid}>
        {showcaseItems.map((item, index) => (
          <div key={index} className={showcaseStyles.showcaseCard}>
            {item.type === 'video' && item.thumbnail && (
              <div className={showcaseStyles.thumbnailContainer}>
                <img
                  src={item.thumbnail}
                  alt={item.title}
                  className={showcaseStyles.thumbnail}
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                  }}
                />
                <div className={showcaseStyles.playButton} aria-hidden="true">
                  <span>▶</span>
                </div>
                {item.duration && (
                  <div className={showcaseStyles.duration}>{item.duration}</div>
                )}
                <div className={showcaseStyles.overlay}></div>
              </div>
            )}
            {item.type === 'news' && (
              <div className={showcaseStyles.newsBadge}>
                <span>📰</span> News
              </div>
            )}
            <div className={showcaseStyles.content}>
              <h3 className={showcaseStyles.title}>{item.title}</h3>
              <p className={showcaseStyles.description}>{item.description}</p>
              {item.date && (
                <span className={showcaseStyles.date}>{item.date}</span>
              )}
            </div>
          </div>
        ))}
      </div>
    </AnimatedSection>
  );
}

import Hero from '../components/Hero';
// import Showcase from '../components/Showcase';
import type { Prize } from '../types';

// Application deadline - May 1, 2026, 23:59:59 local time (month is 0-indexed)
const APPLICATION_DEADLINE = new Date(2026, 4, 1, 23, 59, 59);

// Prize information
const prizes: Prize[] = [
  {
    label: 'Grand Prize',
    value: '₦100,000,000',
    subtitle: 'Cash Reward',
  },
  {
    label: 'Brand New Car',
    value: 'Premium Vehicle',
    subtitle: 'Luxury Car',
  },
  {
    label: 'Ownership',
    value: '1 Acre of Land',
    subtitle: 'Prime Location',
  },
  {
    label: 'Leadership',
    value: '1 Year as CEO',
    subtitle: 'Subsidiary Company',
  },
];

/**
 * Home page component
 */
export default function HomePage() {
  return (
    <>
      <Hero deadline={APPLICATION_DEADLINE} prizes={prizes} />
      {/* <Showcase /> */}
    </>
  );
}

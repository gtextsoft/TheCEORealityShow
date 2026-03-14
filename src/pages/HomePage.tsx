import Hero from '../components/Hero';
// import Showcase from '../components/Showcase';
import type { Prize } from '../types';

// Application deadline - April 30, 2026 (40 days after launch date)
const APPLICATION_DEADLINE = new Date('2026-05-1T23:59:59');

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

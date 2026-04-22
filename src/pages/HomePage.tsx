import Hero from '../components/Hero';
// import Showcase from '../components/Showcase';
import type { Prize } from '../types';

// Application deadline - 40 days from now
const APPLICATION_DEADLINE = new Date(Date.now() + 40 * 24 * 60 * 60 * 1000);

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

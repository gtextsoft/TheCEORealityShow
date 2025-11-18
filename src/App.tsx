import { useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Prizes from './components/Prizes';
import Eligibility from './components/Eligibility';
import Sponsorship from './components/Sponsorship';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import SEOHead from './components/SEOHead';
import type { Prize } from './types';
import './styles/globals.css';

// Application deadline - March 1, 2026
const APPLICATION_DEADLINE = new Date('2026-03-01T23:59:59');

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
 * Main App component
 */
function App() {
  // Add skip link for accessibility
  useEffect(() => {
    const skipLink = document.createElement('a');
    skipLink.href = '#main-content';
    skipLink.className = 'skip-link';
    skipLink.textContent = 'Skip to main content';
    skipLink.addEventListener('click', (e) => {
      e.preventDefault();
      const main = document.getElementById('main-content');
      if (main) {
        main.focus();
        main.scrollIntoView({ behavior: 'smooth' });
      }
    });
    document.body.insertBefore(skipLink, document.body.firstChild);

    return () => {
      if (skipLink.parentNode) {
        skipLink.parentNode.removeChild(skipLink);
      }
    };
  }, []);

  return (
    <>
      <SEOHead />
      <div className="page">
        <Navbar />
        <main id="main-content" tabIndex={-1}>
          <Hero deadline={APPLICATION_DEADLINE} prizes={prizes} />
          <About />
          <Prizes />
          <Eligibility />
          <Sponsorship />
        </main>
        <Footer />
        <ScrollToTop />
      </div>
    </>
  );
}

export default App;


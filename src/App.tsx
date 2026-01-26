import { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import PrizesPage from './pages/PrizesPage';
import EligibilityPage from './pages/EligibilityPage';
import SponsorshipPage from './pages/SponsorshipPage';
import FAQPage from './pages/FAQPage';
import ApplicationPage from './pages/ApplicationPage';
import './styles/globals.css';

/**
 * Main App component with routing
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
    <BrowserRouter>
      <Routes>
        <Route 
          path="/" 
          element={
            <Layout 
              title="KeytoDCity Reality Show"
              description="Apply for KeytoDCity Reality Show and stand a chance to win ₦100,000,000, 1 acre of land, and 1 year as CEO of a top subsidiary."
            >
              <HomePage />
            </Layout>
          } 
        />
        <Route 
          path="/about" 
          element={
            <Layout 
              title="About the Show | KeytoDCity Reality Show"
              description="Learn about the KeytoDCity Reality Show and how it works."
            >
              <AboutPage />
            </Layout>
          } 
        />
        <Route 
          path="/prizes" 
          element={
            <Layout 
              title="Prizes & Rewards | KeytoDCity Reality Show"
              description="Win life-changing rewards worth over ₦150,000,000 including cash, car, land, and CEO position."
            >
              <PrizesPage />
            </Layout>
          } 
        />
        <Route 
          path="/eligibility" 
          element={
            <Layout 
              title="Eligibility & Requirements | KeytoDCity Reality Show"
              description="Find out who can apply and what you need to join the KeytoDCity Reality Show."
            >
              <EligibilityPage />
            </Layout>
          } 
        />
        <Route 
          path="/sponsorship" 
          element={
            <Layout 
              title="Sponsorship & Partnership | KeytoDCity Reality Show"
              description="Partner with us to create Africa's most impactful business reality show."
            >
              <SponsorshipPage />
            </Layout>
          } 
        />
        <Route 
          path="/faq" 
          element={
            <Layout 
              title="FAQ | KeytoDCity Reality Show"
              description="Frequently asked questions about the KeytoDCity Reality Show application process and requirements."
            >
              <FAQPage />
            </Layout>
          } 
        />
        <Route 
          path="/apply" 
          element={
            <Layout 
              title="Apply Now | KeytoDCity Reality Show"
              description="Apply for the KeytoDCity Reality Show. Complete the application form to get started."
            >
              <ApplicationPage />
            </Layout>
          } 
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;


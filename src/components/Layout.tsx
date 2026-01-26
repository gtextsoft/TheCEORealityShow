import { ReactNode } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import ScrollToTop from './ScrollToTop';
import SEOHead from './SEOHead';
import LogoColorExtractor from './LogoColorExtractor';

interface LayoutProps {
  children: ReactNode;
  title?: string;
  description?: string;
}

/**
 * Layout component that wraps all pages with Navbar, Footer, and common elements
 */
export default function Layout({ children, title, description }: LayoutProps) {
  return (
    <>
      <SEOHead 
        title={title}
        description={description}
      />
      <LogoColorExtractor />
      <div className="page">
        <Navbar />
        <main id="main-content" tabIndex={-1}>
          {children}
        </main>
        <Footer />
        <ScrollToTop />
      </div>
    </>
  );
}

import { useEffect } from 'react';

interface SEOHeadProps {
  title?: string;
  description?: string;
  ogImage?: string;
  ogUrl?: string;
}

/**
 * Component to manage SEO meta tags dynamically
 */
export default function SEOHead({
  title = 'KeytoDCity Reality Show',
  description = 'Apply for KeytoDCity Reality Show and stand a chance to win ₦100,000,000, 1 acre of land, and 1 year as CEO of a top subsidiary.',
  ogImage = '/og-image.jpg',
  ogUrl = typeof window !== 'undefined' ? window.location.href : '',
}: SEOHeadProps) {
  useEffect(() => {
    // Update document title
    document.title = title;

    // Update or create meta tags
    const updateMetaTag = (name: string, content: string, isProperty = false) => {
      const attribute = isProperty ? 'property' : 'name';
      let meta = document.querySelector(`meta[${attribute}="${name}"]`);
      
      if (!meta) {
        meta = document.createElement('meta');
        meta.setAttribute(attribute, name);
        document.head.appendChild(meta);
      }
      meta.setAttribute('content', content);
    };

    // Basic meta tags
    updateMetaTag('description', description);
    updateMetaTag('viewport', 'width=device-width, initial-scale=1.0');

    // Open Graph tags
    updateMetaTag('og:title', title, true);
    updateMetaTag('og:description', description, true);
    updateMetaTag('og:type', 'website', true);
    updateMetaTag('og:url', ogUrl, true);
    if (ogImage) {
      updateMetaTag('og:image', ogImage, true);
    }

    // Twitter Card tags
    updateMetaTag('twitter:card', 'summary_large_image');
    updateMetaTag('twitter:title', title);
    updateMetaTag('twitter:description', description);
    if (ogImage) {
      updateMetaTag('twitter:image', ogImage);
    }

    // Additional SEO tags
    updateMetaTag('theme-color', '#0f766e');
    updateMetaTag('author', 'KeytoDCity Reality Show');
  }, [title, description, ogImage, ogUrl]);

  return null;
}


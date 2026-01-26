import { useEffect } from 'react';
import { extractColorsFromImage, applyColorsToTheme } from '../utils/colorExtractor';

/**
 * Component that extracts colors from the logo and applies them to the theme
 * This runs once when the component mounts
 */
export default function LogoColorExtractor() {
  useEffect(() => {
    const extractLogoColors = async () => {
      try {
        // Extract colors from the logo
        const colors = await extractColorsFromImage('/images/logo.jpeg');
        
        // Apply colors to CSS variables
        if (colors.length > 0) {
          applyColorsToTheme(colors);
          console.log('Logo colors extracted and applied:', colors);
        }
      } catch (error) {
        console.warn('Could not extract colors from logo, using default colors:', error);
        // Fallback to default colors if extraction fails
      }
    };

    // Wait a bit for the page to load before extracting colors
    const timer = setTimeout(extractLogoColors, 500);
    
    return () => clearTimeout(timer);
  }, []);

  // This component doesn't render anything
  return null;
}

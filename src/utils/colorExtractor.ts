/**
 * Utility to extract dominant colors from an image
 * This will be used to extract colors from the logo and apply them to the theme
 */

interface ColorRGB {
  r: number;
  g: number;
  b: number;
}

/**
 * Extract dominant colors from an image
 */
export async function extractColorsFromImage(imagePath: string): Promise<ColorRGB[]> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    
    img.onload = () => {
      try {
        // Create canvas to analyze image
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        
        if (!ctx) {
          reject(new Error('Could not get canvas context'));
          return;
        }
        
        // Limit canvas size for performance (max 500px)
        const maxSize = 500;
        let width = img.width;
        let height = img.height;
        
        if (width > maxSize || height > maxSize) {
          const ratio = Math.min(maxSize / width, maxSize / height);
          width = Math.floor(width * ratio);
          height = Math.floor(height * ratio);
        }
        
        canvas.width = width;
        canvas.height = height;
        ctx.drawImage(img, 0, 0, width, height);
        
        // Get image data
        const imageData = ctx.getImageData(0, 0, width, height);
        const data = imageData.data;
        
        // Extract colors (sample pixels for performance)
        const colors: ColorRGB[] = [];
        const sampleSize = 5000; // Sample up to 5k pixels
        const step = Math.max(1, Math.floor((data.length / 4) / sampleSize));
        
        for (let i = 0; i < data.length; i += step * 4) {
          const r = data[i];
          const g = data[i + 1];
          const b = data[i + 2];
          const a = data[i + 3];
          
          // Skip transparent pixels, very dark (likely shadows), and very light (likely highlights)
          // Keep vibrant colors
          if (a > 100 && r + g + b > 100 && r + g + b < 650) {
            // Prefer more saturated colors
            const max = Math.max(r, g, b);
            const min = Math.min(r, g, b);
            const saturation = max > 0 ? (max - min) / max : 0;
            
            // Keep colors with some saturation (more vibrant)
            if (saturation > 0.2) {
              colors.push({ r, g, b });
            }
          }
        }
        
        if (colors.length === 0) {
          // Fallback: get any non-transparent colors
          for (let i = 0; i < data.length; i += step * 4) {
            const r = data[i];
            const g = data[i + 1];
            const b = data[i + 2];
            const a = data[i + 3];
            
            if (a > 100) {
              colors.push({ r, g, b });
            }
          }
        }
        
        // Get most common colors
        const dominantColors = getDominantColors(colors, 3);
        resolve(dominantColors);
      } catch (error) {
        reject(error);
      }
    };
    
    img.onerror = () => {
      reject(new Error('Failed to load image'));
    };
    
    // Try to load the image
    // If it's a relative path, it should work from public folder
    img.src = imagePath.startsWith('http') ? imagePath : imagePath;
  });
}

/**
 * Get dominant colors from a color array
 */
function getDominantColors(colors: ColorRGB[], count: number): ColorRGB[] {
  // Group similar colors together
  const colorGroups: ColorRGB[][] = [];
  const threshold = 30; // Color similarity threshold
  
  for (const color of colors) {
    let added = false;
    
    for (const group of colorGroups) {
      const avgColor = group[0];
      const distance = Math.sqrt(
        Math.pow(color.r - avgColor.r, 2) +
        Math.pow(color.g - avgColor.g, 2) +
        Math.pow(color.b - avgColor.b, 2)
      );
      
      if (distance < threshold) {
        group.push(color);
        added = true;
        break;
      }
    }
    
    if (!added) {
      colorGroups.push([color]);
    }
  }
  
  // Sort by frequency and get averages
  colorGroups.sort((a, b) => b.length - a.length);
  
  return colorGroups.slice(0, count).map(group => {
    const sum = group.reduce((acc, c) => ({
      r: acc.r + c.r,
      g: acc.g + c.g,
      b: acc.b + c.b
    }), { r: 0, g: 0, b: 0 });
    
    return {
      r: Math.round(sum.r / group.length),
      g: Math.round(sum.g / group.length),
      b: Math.round(sum.b / group.length)
    };
  });
}

/**
 * Convert RGB to hex color
 */
export function rgbToHex(r: number, g: number, b: number): string {
  return '#' + [r, g, b].map(x => {
    const hex = x.toString(16);
    return hex.length === 1 ? '0' + hex : hex;
  }).join('');
}

/**
 * Apply colors to CSS variables
 */
export function applyColorsToTheme(colors: ColorRGB[]): void {
  if (colors.length === 0) return;
  
  const root = document.documentElement;
  
  // Use first color as primary
  if (colors[0]) {
    const primary = colors[0];
    const primaryHex = rgbToHex(primary.r, primary.g, primary.b);
    root.style.setProperty('--primary', primaryHex);
    
    // Create darker and lighter variants
    root.style.setProperty('--primary-dark', rgbToHex(
      Math.max(0, primary.r - 40),
      Math.max(0, primary.g - 40),
      Math.max(0, primary.b - 40)
    ));
    root.style.setProperty('--primary-light', rgbToHex(
      Math.min(255, primary.r + 30),
      Math.min(255, primary.g + 30),
      Math.min(255, primary.b + 30)
    ));
  }
  
  // Use second color as secondary (if available)
  if (colors[1]) {
    const secondary = colors[1];
    const secondaryHex = rgbToHex(secondary.r, secondary.g, secondary.b);
    root.style.setProperty('--secondary', secondaryHex);
    
    root.style.setProperty('--secondary-dark', rgbToHex(
      Math.max(0, secondary.r - 40),
      Math.max(0, secondary.g - 40),
      Math.max(0, secondary.b - 40)
    ));
    root.style.setProperty('--secondary-light', rgbToHex(
      Math.min(255, secondary.r + 30),
      Math.min(255, secondary.g + 30),
      Math.min(255, secondary.b + 30)
    ));
  }
  
  // Use third color as accent (if available)
  if (colors[2]) {
    const accent = colors[2];
    const accentHex = rgbToHex(accent.r, accent.g, accent.b);
    root.style.setProperty('--accent', accentHex);
    
    root.style.setProperty('--accent-dark', rgbToHex(
      Math.max(0, accent.r - 40),
      Math.max(0, accent.g - 40),
      Math.max(0, accent.b - 40)
    ));
    root.style.setProperty('--accent-light', rgbToHex(
      Math.min(255, accent.r + 30),
      Math.min(255, accent.g + 30),
      Math.min(255, accent.b + 30)
    ));
  }
}

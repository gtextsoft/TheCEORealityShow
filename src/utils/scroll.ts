// Scroll utility functions
export function smoothScrollTo(elementId: string): void {
  const element = document.getElementById(elementId);
  if (element) {
    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}

/**
 * Smoothly scroll to the top of the page
 */
export function scrollToTop(): void {
  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  });
}

export function getScrollProgress(): number {
  const windowHeight = window.innerHeight;
  const documentHeight = document.documentElement.scrollHeight;
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  const scrollableHeight = documentHeight - windowHeight;
  
  if (scrollableHeight <= 0) return 0;
  return (scrollTop / scrollableHeight) * 100;
}


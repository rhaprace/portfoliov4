/**
 * Scroll to top utility
 * Ensures page always starts at the top on load/refresh
 */

export const scrollToTop = () => {
  // Immediate scroll to top
  window.scrollTo(0, 0);
  
  // Also set scroll position in history state
  if ('scrollRestoration' in history) {
    history.scrollRestoration = 'manual';
  }
};

/**
 * Initialize scroll to top on page load
 */
export const initScrollToTop = () => {
  // Scroll to top immediately
  scrollToTop();
  
  // Also handle page show event (for back/forward navigation)
  window.addEventListener('pageshow', (event) => {
    if (event.persisted) {
      scrollToTop();
    }
  });
};


// src/hooks/useSmoothScroll.ts
import { useCallback } from 'react';

const useSmoothScroll = () => {
  const scrollTo = useCallback((selector: string, onScrollComplete?: () => void) => {
    const element = document.querySelector(selector);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      // Note: scrollIntoView({ behavior: 'smooth' }) doesn't have a reliable native callback
      // for when the smooth scroll *finishes*.
      // If `onScrollComplete` needs to run *after* the animation,
      // you might need a more complex solution involving observing scroll events
      // or using a library. For simple cases like closing a menu,
      // calling it immediately is often acceptable.
      if (onScrollComplete) {
        // You might want to delay this slightly if the visual scroll needs to appear first
        // setTimeout(onScrollComplete, 50); // Example delay
        onScrollComplete();
      }
    } else {
      console.warn(`SmoothScroll: Element with selector "${selector}" not found.`);
    }
  }, []);

  return scrollTo;
};

export default useSmoothScroll;
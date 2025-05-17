// src/hooks/useSmoothScroll.ts
import { useCallback } from 'react';

const useSmoothScroll = () => {
  const scrollTo = useCallback((selector: string, onScrollComplete?: () => void, offset = 0) => {
    console.log(`Attempting to scroll to: ${selector} with offset: ${offset}`);
    
    // First try to find the element directly
    const element = document.querySelector(selector);
    console.log('Element found:', element);
    
    if (!element) {
      console.warn(`SmoothScroll: Element with selector "${selector}" not found.`);
      return;
    }
    
    // Find the scroll container (snap-container)
    const scrollContainer = document.querySelector('.snap-container');
    
    if (scrollContainer) {
      console.log('Found snap-container, using it as scroll container');
      
      // Get element's position relative to the document
      const elementPosition = element.getBoundingClientRect();
      const containerPosition = scrollContainer.getBoundingClientRect();
      
      // Calculate position in the container
      const scrollTop = elementPosition.top - containerPosition.top + scrollContainer.scrollTop - offset;
      
      console.log('Scrolling container to:', {
        elementPosition,
        containerPosition,
        scrollTop
      });
      
      // Scroll the container
      scrollContainer.scrollTo({
        top: scrollTop,
        behavior: 'smooth'
      });
    } else {
      // Fall back to window scrolling if no container is found
      console.log('No snap-container found, using window.scrollTo');
      
      const elementRect = element.getBoundingClientRect();
      const absoluteElementTop = elementRect.top + window.pageYOffset;
      const offsetScrollPosition = absoluteElementTop - offset;
      
      console.log('Window scroll calculations:', {
        elementRect,
        pageYOffset: window.pageYOffset,
        absoluteElementTop,
        offsetScrollPosition
      });
      
      window.scrollTo({
        top: offsetScrollPosition,
        behavior: 'smooth'
      });
    }

    if (onScrollComplete) {
      // A small timeout to allow the scroll to begin before executing callback
      setTimeout(onScrollComplete, 100);
    }
  }, []);

  return scrollTo;
};

export default useSmoothScroll;
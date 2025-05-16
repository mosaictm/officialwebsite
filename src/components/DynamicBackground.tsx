// src/components/DynamicBackground.tsx
import { useEffect, useState } from 'react';

const DynamicBackground = () => {
  const [scrollPosition, setScrollPosition] = useState(0);
  // Removed mousePosition state and effect as it adds overhead

  useEffect(() => {
    const handleScroll = () => {
      const position = window.scrollY;
      setScrollPosition(position);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Calculate a simple opacity based on scroll for the gradient overlay
  const overlayOpacity = Math.min(0.3, scrollPosition / 3000);

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
      {/* Gradient base layer */}
      <div className="absolute inset-0 bg-gradient-to-b from-mosaic-dark to-mosaic-dark/95"></div>

      {/* Simplified elements - significantly reduced count and complexity */}
      {/* Example: A few subtle large blurred shapes */}
      <div
        className="absolute top-1/4 right-1/4 w-96 h-96 bg-mosaic-blue/10 rounded-full blur-[120px] transition-transform duration-1000 ease-out"
        style={{ transform: `translateY(${scrollPosition * 0.02}px)` }}
      ></div>
      <div
        className="absolute bottom-1/3 left-1/3 w-72 h-72 bg-mosaic-blue-light/10 rounded-full blur-[100px] transition-transform duration-1000 ease-out"
        style={{ transform: `translateY(${-scrollPosition * 0.01}px)` }}
      ></div>


      {/* OPTIONAL: Simple Grid Pattern (Less demanding than particles/hexagons) */}
      {/* <div className="absolute inset-0 bg-grid-pattern opacity-5"></div> */}


      {/* Color transition based on scroll position - Kept */}
      <div
        className="absolute inset-0 bg-gradient-to-tr from-mosaic-blue-dark/5 to-mosaic-blue/2 opacity-30 mix-blend-multiply transition-opacity"
        style={{ opacity: overlayOpacity }}
      ></div>
    </div>
  );
};

export default DynamicBackground;
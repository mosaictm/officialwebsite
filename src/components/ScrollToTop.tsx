
import { useState, useEffect } from 'react';
import { ChevronUpIcon } from 'lucide-react';

const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  
  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };
    
    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);
  
  const scrollToTop = () => {
    setIsAnimating(true);
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
    
    // Reset animation state after scroll completes
    setTimeout(() => {
      setIsAnimating(false);
    }, 1000);
  };
  
  return (
    <>
      {isVisible && (
        <button
          onClick={scrollToTop}
          className={`fixed bottom-6 left-6 z-500 w-12 h-12 rounded-full bg-mosaic-blue flex items-center justify-center text-white shadow-lg hover:bg-mosaic-blue-dark transition-all ${
            isAnimating ? 'animate-bounce' : ''
          }`}
          aria-label="العودة إلى الأعلى"
        >
          <ChevronUpIcon size={24} />
          <span className="absolute -inset-2 rounded-full bg-mosaic-blue/20 animate-ping opacity-75"></span>
        </button>
      )}
    </>
  );
};

export default ScrollToTop;

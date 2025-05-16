
import { useEffect, useState, useRef, RefObject } from 'react';

type AnimationOptions = {
  threshold?: number;
  rootMargin?: string;
};

export function useScrollAnimation<T extends HTMLElement>(options: AnimationOptions = {}): {
  ref: RefObject<T>;
  isVisible: boolean;
} {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<T>(null);
  const { threshold = 0.1, rootMargin = "0px" } = options;

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (ref.current) observer.unobserve(ref.current);
        }
      },
      { threshold, rootMargin }
    );

    const currentRef = ref.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [threshold, rootMargin]);

  return { ref, isVisible };
}

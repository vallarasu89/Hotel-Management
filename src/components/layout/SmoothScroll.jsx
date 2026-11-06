import { useEffect } from 'react';
import Lenis from 'lenis';

export const SmoothScroll = ({ children }) => {
  useEffect(() => {
    // Respect user motion preference or touch-only devices
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }

    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

    // On touch devices, use 100% native hardware 120Hz scrolling
    if (isTouchDevice) {
      return;
    }

    const lenis = new Lenis({
      duration: 0.7, // Snappy & responsive (reduced from 1.2s lag)
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1.0,
      touchMultiplier: 1.0,
      infinite: false
    });

    let rafId;
    function raf(time) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }

    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
};

export default SmoothScroll;

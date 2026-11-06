import React, { useEffect, useState, useRef } from 'react';

export const AnimatedCounter = ({ value, duration = 2000 }) => {
  const [displayValue, setDisplayValue] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);
  const elementRef = useRef(null);

  // Parse numerical part and suffix/prefix (e.g. "35+" -> target 35, suffix "+"; "1.2M+" -> target 1.2, suffix "M+")
  const match = value.match(/^([\d.]+)(.*)$/);
  const targetNumber = match ? parseFloat(match[1]) : 0;
  const suffix = match ? match[2] : '';
  const isFloat = match ? match[1].includes('.') : false;

  useEffect(() => {
    // Respect reduced motion
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setDisplayValue(targetNumber);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasAnimated) {
          setHasAnimated(true);

          const startTime = performance.now();
          const step = (currentTime) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            // Ease out quartic
            const easeOut = 1 - Math.pow(1 - progress, 4);
            const current = targetNumber * easeOut;

            setDisplayValue(isFloat ? parseFloat(current.toFixed(1)) : Math.floor(current));

            if (progress < 1) {
              requestAnimationFrame(step);
            } else {
              setDisplayValue(targetNumber);
            }
          };

          requestAnimationFrame(step);
        }
      },
      { threshold: 0.2 }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => observer.disconnect();
  }, [targetNumber, duration, hasAnimated, isFloat]);

  return (
    <span ref={elementRef} className="tabular-nums">
      {displayValue}
      {suffix}
    </span>
  );
};

export default AnimatedCounter;


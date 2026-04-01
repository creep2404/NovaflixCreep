import React, { useEffect, useState } from 'react';

export const TopProgressBar = ({ isAnimating }: { isAnimating: boolean }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (isAnimating) {
      setProgress(0);
      const interval = setInterval(() => {
        setProgress(p => {
          if (p >= 90) {
            clearInterval(interval);
            return 90;
          }
          return p + Math.random() * 15;
        });
      }, 100);
      return () => clearInterval(interval);
    } else {
      setProgress(100);
      const timeout = setTimeout(() => setProgress(0), 300);
      return () => clearTimeout(timeout);
    }
  }, [isAnimating]);

  if (progress === 0) return null;

  return (
    <div className="fixed top-0 left-0 w-full h-1 z-[100] pointer-events-none">
      <div 
        className="h-full bg-primary transition-all duration-200 ease-out shadow-[0_0_10px_rgba(255,255,255,0.5)]"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
};

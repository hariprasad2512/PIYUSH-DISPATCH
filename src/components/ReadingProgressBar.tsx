'use client';

import React, { useState, useEffect } from 'react';

export function ReadingProgressBar() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const updateProgress = () => {
      const currentScroll = window.scrollY;
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (scrollHeight > 0) {
        const percentage = Math.min(100, Math.max(0, (currentScroll / scrollHeight) * 100));
        setProgress(percentage);
      }
    };

    window.addEventListener('scroll', updateProgress, { passive: true });
    updateProgress();

    return () => window.removeEventListener('scroll', updateProgress);
  }, []);

  return (
    <div className="fixed top-0 left-0 w-full h-[3px] z-[999] pointer-events-none bg-transparent">
      <div
        className="h-full bg-gradient-to-r from-[var(--accent)] via-purple-500 to-[var(--accent)] transition-all duration-150 ease-out shadow-xs"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}

export default ReadingProgressBar;

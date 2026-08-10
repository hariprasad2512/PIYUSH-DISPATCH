'use client';

import React, { useState, useEffect } from 'react';

export function ReadingProgressBar() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const updateProgress = () => {
      const currentScroll = window.scrollY || window.pageYOffset || document.documentElement.scrollTop;
      const totalHeight = Math.max(
        document.body.scrollHeight,
        document.documentElement.scrollHeight,
        document.body.offsetHeight,
        document.documentElement.offsetHeight
      ) - window.innerHeight;

      if (totalHeight > 0) {
        const pct = Math.min(100, Math.max(0, (currentScroll / totalHeight) * 100));
        setProgress(pct);
      }
    };

    window.addEventListener('scroll', updateProgress, { passive: true });
    window.addEventListener('resize', updateProgress, { passive: true });
    updateProgress();

    return () => {
      window.removeEventListener('scroll', updateProgress);
      window.removeEventListener('resize', updateProgress);
    };
  }, []);

  return (
    <>
      {/* Viewport Top Progress Bar - Theme Matching & Fullscreen Compatible */}
      <div className="fixed top-0 left-0 w-full h-[5px] z-[100000] pointer-events-none bg-[var(--border-color)]/30">
        <div
          className="h-full bg-[var(--accent)] transition-all duration-150 ease-out shadow-[0_0_12px_var(--accent)]"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Floating Reading Percentage Badge - Theme Matching & Fullscreen Compatible */}
      {progress > 1 && (
        <div className="fixed top-4 right-6 z-[100000] flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[var(--surface)] border border-[var(--border-color)] shadow-xl text-xs font-mono font-bold text-[var(--accent)] transition-all animate-fadeIn">
          <span className="w-2 h-2 rounded-full bg-[var(--accent)] animate-pulse" />
          <span>{Math.round(progress)}% READ</span>
        </div>
      )}
    </>
  );
}

export default ReadingProgressBar;

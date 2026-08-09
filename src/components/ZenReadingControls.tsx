'use client';

import React, { useState, useEffect } from 'react';

export function ZenReadingControls() {
  const [isZen, setIsZen] = useState(false);

  const toggleZen = () => {
    const nextZen = !isZen;
    setIsZen(nextZen);

    if (nextZen) {
      document.body.classList.add('zen-mode');
      if (document.documentElement.requestFullscreen) {
        document.documentElement.requestFullscreen().catch(() => {});
      }
    } else {
      document.body.classList.remove('zen-mode');
      if (document.exitFullscreen && document.fullscreenElement) {
        document.exitFullscreen().catch(() => {});
      }
    }
  };

  useEffect(() => {
    const handleFullscreenChange = () => {
      if (!document.fullscreenElement && isZen) {
        setIsZen(false);
        document.body.classList.remove('zen-mode');
      }
    };
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, [isZen]);

  return (
    <>
      {/* Inline controls bar button */}
      <div className="flex items-center gap-2">
        <button
          onClick={toggleZen}
          aria-label="Toggle Fullscreen Focus Mode"
          className={`px-3.5 py-1.5 rounded-full text-xs font-semibold flex items-center gap-1.5 transition-all border shadow-xs ${
            isZen 
              ? 'bg-[var(--accent)] text-white border-[var(--accent)]'
              : 'bg-[var(--surface)] text-[var(--text-primary)] border-[var(--border-color)] hover:border-[var(--accent)]'
          }`}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            {isZen ? (
              <>
                <polyline points="4 14 10 14 10 20" />
                <polyline points="20 10 14 10 14 4" />
                <line x1="14" y1="10" x2="21" y2="3" />
                <line x1="3" y1="21" x2="10" y2="14" />
              </>
            ) : (
              <>
                <polyline points="15 3 21 3 21 9" />
                <polyline points="9 21 3 21 3 15" />
                <line x1="21" y1="3" x2="14" y2="10" />
                <line x1="3" y1="21" x2="10" y2="14" />
              </>
            )}
          </svg>
          <span>{isZen ? 'Exit Fullscreen' : 'Zen Focus'}</span>
        </button>
      </div>

      {/* Floating Exit Button visible only in Zen Mode */}
      {isZen && (
        <button
          onClick={toggleZen}
          aria-label="Exit Fullscreen Mode"
          className="zen-exit-floating-btn fixed top-6 right-6 z-[9999] px-4 py-2 bg-[var(--accent)] text-white rounded-full text-xs font-bold shadow-2xl flex items-center gap-2 border border-white/20 hover:scale-105 transition-transform"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="4 14 10 14 10 20" />
            <polyline points="20 10 14 10 14 4" />
            <line x1="14" y1="10" x2="21" y2="3" />
            <line x1="3" y1="21" x2="10" y2="14" />
          </svg>
          <span>Exit Zen Fullscreen</span>
        </button>
      )}
    </>
  );
}

export default ZenReadingControls;

'use client';

import React, { useState, useEffect } from 'react';

export function SubscribeDrawer() {
  const [isVisible, setIsVisible] = useState(false);
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const isDismissed = sessionStorage.getItem('subscribe-drawer-dismissed');
    if (!isDismissed) {
      const handleScroll = () => {
        if (window.scrollY > 400) {
          setIsVisible(true);
        }
      };
      window.addEventListener('scroll', handleScroll, { passive: true });
      return () => window.removeEventListener('scroll', handleScroll);
    }
  }, []);

  const handleDismiss = () => {
    setIsVisible(false);
    sessionStorage.setItem('subscribe-drawer-dismissed', 'true');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubmitted(true);
    setTimeout(() => {
      handleDismiss();
    }, 2500);
  };

  if (!isVisible) return null;

  return (
    <aside className="fixed bottom-4 left-4 right-4 md:left-auto md:right-6 md:max-w-md z-50 animate-slideUp">
      <div className="bg-[var(--surface)] border border-[var(--border-color)] p-5 rounded-2xl shadow-xl backdrop-blur-md relative">
        <button
          onClick={handleDismiss}
          className="absolute top-3 right-3 text-[var(--text-secondary)] hover:text-[var(--text-primary)] p-1 rounded-full hover:bg-[var(--bg)] transition-colors"
          aria-label="Dismiss newsletter drawer"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>

        {submitted ? (
          <div className="text-center py-2 space-y-1">
            <div className="text-2xl">🎉</div>
            <h4 className="font-bold text-[var(--text-primary)] text-sm">Welcome aboard!</h4>
            <p className="text-xs text-[var(--text-secondary)]">You are now subscribed to Piyush's Dispatch.</p>
          </div>
        ) : (
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-[var(--accent)]">
                Piyush's Dispatch Weekly
              </span>
            </div>

            <div>
              <h4 className="font-bold text-sm text-[var(--text-primary)] leading-tight">
                High-Signal AI & Engineering Briefings
              </h4>
              <p className="text-xs text-[var(--text-secondary)] mt-0.5">
                Join 10,000+ developers, researchers, and technical leaders.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="flex gap-2">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address..."
                className="flex-1 bg-[var(--bg)] border border-[var(--border-color)] px-3 py-2 rounded-xl text-xs text-[var(--text-primary)] placeholder-[var(--text-secondary)] focus:outline-none focus:border-[var(--accent)]"
              />
              <button
                type="submit"
                className="bg-[var(--accent)] text-white px-4 py-2 rounded-xl text-xs font-semibold hover:opacity-90 transition-opacity active:scale-95 shadow-2xs shrink-0"
              >
                Join Free
              </button>
            </form>
          </div>
        )}
      </div>
    </aside>
  );
}

export default SubscribeDrawer;

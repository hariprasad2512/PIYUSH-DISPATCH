'use client';

import React, { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';

export function ShareActions() {
  const [copied, setCopied] = useState(false);
  const [bookmarked, setBookmarked] = useState(false);
  const [url, setUrl] = useState('');

  useEffect(() => {
    queueMicrotask(() => {
      setUrl(window.location.href);
      const saved = localStorage.getItem(`bookmark-${window.location.pathname}`);
      if (saved) setBookmarked(true);
    });
  }, []);

  const handleCopy = () => {
    if (navigator.clipboard && window.location.href) {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleBookmark = () => {
    const key = `bookmark-${window.location.pathname}`;
    if (bookmarked) {
      localStorage.removeItem(key);
      setBookmarked(false);
    } else {
      localStorage.setItem(key, 'true');
      setBookmarked(true);
    }
  };

  return (
    <div className="flex flex-row lg:flex-col gap-3 py-4 lg:py-0 border-y lg:border-y-0 border-[var(--border-color)] mb-8 lg:mb-0">
      <h3 className="hidden lg:block font-semibold text-xs tracking-wider uppercase text-[var(--text-secondary)] mb-2 font-mono">Share</h3>
      
      {/* Twitter / X */}
      <a 
        href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Share on Twitter"
        className="w-10 h-10 flex items-center justify-center rounded-full border border-[var(--border-color)] bg-[var(--surface)] hover:border-[var(--accent)] text-[var(--text-secondary)] hover:text-[var(--accent)] transition-all shadow-xs"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M4 4l11.733 16h4.267l-11.733 -16z" />
          <path d="M4 20l6.768 -6.768m2.46 -2.46l6.772 -6.772" />
        </svg>
      </a>
      
      {/* LinkedIn */}
      <a 
        href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Share on LinkedIn"
        className="w-10 h-10 flex items-center justify-center rounded-full border border-[var(--border-color)] bg-[var(--surface)] hover:border-[var(--accent)] text-[var(--text-secondary)] hover:text-[var(--accent)] transition-all shadow-xs"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
          <rect x="2" y="9" width="4" height="12"></rect>
          <circle cx="4" cy="4" r="2"></circle>
        </svg>
      </a>
      
      {/* Copy Link */}
      <button 
        onClick={handleCopy}
        aria-label="Copy link"
        className="relative w-10 h-10 flex items-center justify-center rounded-full border border-[var(--border-color)] bg-[var(--surface)] hover:border-[var(--accent)] text-[var(--text-secondary)] hover:text-[var(--accent)] transition-all shadow-xs group"
      >
        {copied ? (
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-green-500">
            <polyline points="20 6 9 17 4 12"></polyline>
          </svg>
        ) : (
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
            <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
          </svg>
        )}
        {copied && (
          <span className="absolute left-1/2 -translate-x-1/2 -top-9 bg-[var(--text-primary)] text-[var(--bg)] text-[10px] font-mono px-2 py-1 rounded shadow-md whitespace-nowrap">
            Copied!
          </span>
        )}
      </button>

      <div className="hidden lg:block w-full h-[1px] bg-[var(--border-color)] my-2"></div>
      
      {/* Bookmark */}
      <button 
        onClick={handleBookmark}
        aria-label={bookmarked ? "Remove bookmark" : "Bookmark"}
        className={cn(
          "w-10 h-10 flex items-center justify-center rounded-full border transition-all shadow-xs",
          bookmarked 
            ? "border-[var(--accent)] text-white bg-[var(--accent)]" 
            : "border-[var(--border-color)] bg-[var(--surface)] hover:border-[var(--accent)] text-[var(--text-secondary)] hover:text-[var(--accent)]"
        )}
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill={bookmarked ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path>
        </svg>
      </button>
    </div>
  );
}

export default ShareActions;

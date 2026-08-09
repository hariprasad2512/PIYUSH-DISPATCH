'use client';

import React, { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';

export interface ShareActionsProps {
  title?: string;
  url?: string;
  className?: string;
  layout?: 'icon-list' | 'pill-bar' | 'compact';
}

export function ShareActions({ title, url: propUrl, className, layout = 'icon-list' }: ShareActionsProps) {
  const [copied, setCopied] = useState(false);
  const [bookmarked, setBookmarked] = useState(false);
  const [shareUrl, setShareUrl] = useState(propUrl || '');

  useEffect(() => {
    queueMicrotask(() => {
      const currentUrl = propUrl || window.location.href;
      setShareUrl(currentUrl);
      const saved = localStorage.getItem(`bookmark-${window.location.pathname}`);
      if (saved) setBookmarked(true);
    });
  }, [propUrl]);

  const handleCopy = () => {
    const targetUrl = shareUrl || window.location.href;
    if (navigator.clipboard && targetUrl) {
      navigator.clipboard.writeText(targetUrl);
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

  const shareText = title ? `"${title}" by @PiyushPal143104` : `Piyush's Dispatch — High-Signal Technical Briefings`;
  const xShareLink = `https://x.com/intent/post?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`;
  const linkedInShareLink = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`;

  if (layout === 'pill-bar') {
    return (
      <div className={cn("flex flex-wrap items-center gap-3", className)}>
        {/* Share on X */}
        <a
          href={xShareLink}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Share on X"
          title="Share on X (formerly Twitter)"
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full border border-[var(--border-color)] bg-[var(--bg)] hover:border-[var(--accent)] text-[var(--text-primary)] hover:text-[var(--accent)] font-mono text-xs font-semibold transition-all shadow-xs"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M4 4l11.733 16h4.267l-11.733 -16z" />
            <path d="M4 20l6.768 -6.768m2.46 -2.46l6.772 -6.772" />
          </svg>
          <span>Share on X</span>
        </a>

        {/* Share on LinkedIn */}
        <a
          href={linkedInShareLink}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Share on LinkedIn"
          title="Share on LinkedIn"
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full border border-[var(--border-color)] bg-[var(--bg)] hover:border-[var(--accent)] text-[var(--text-primary)] hover:text-[var(--accent)] font-mono text-xs font-semibold transition-all shadow-xs"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
            <rect x="2" y="9" width="4" height="12"></rect>
            <circle cx="4" cy="4" r="2"></circle>
          </svg>
          <span>Share on LinkedIn</span>
        </a>

        {/* Copy Link */}
        <button
          onClick={handleCopy}
          aria-label="Copy link"
          className="relative inline-flex items-center gap-2 px-4 py-2.5 rounded-full border border-[var(--border-color)] bg-[var(--bg)] hover:border-[var(--accent)] text-[var(--text-primary)] hover:text-[var(--accent)] font-mono text-xs font-semibold transition-all shadow-xs cursor-pointer"
        >
          {copied ? (
            <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-green-500">
              <polyline points="20 6 9 17 4 12"></polyline>
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
              <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
            </svg>
          )}
          <span>{copied ? 'Copied!' : 'Copy Link'}</span>
        </button>

        {/* Bookmark */}
        <button
          onClick={handleBookmark}
          aria-label={bookmarked ? "Bookmarked" : "Bookmark issue"}
          className={cn(
            "inline-flex items-center gap-2 px-4 py-2.5 rounded-full border font-mono text-xs font-semibold transition-all shadow-xs cursor-pointer",
            bookmarked
              ? "border-[var(--accent)] text-white bg-[var(--accent)]"
              : "border-[var(--border-color)] bg-[var(--bg)] hover:border-[var(--accent)] text-[var(--text-primary)] hover:text-[var(--accent)]"
          )}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill={bookmarked ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path>
          </svg>
          <span>{bookmarked ? 'Bookmarked' : 'Bookmark'}</span>
        </button>
      </div>
    );
  }

  return (
    <div className={cn("flex flex-row lg:flex-col gap-3 py-4 lg:py-0 border-y lg:border-y-0 border-[var(--border-color)] mb-8 lg:mb-0", className)}>
      <h3 className="hidden lg:block font-semibold text-xs tracking-wider uppercase text-[var(--text-secondary)] mb-2 font-mono">Share</h3>
      
      {/* Share on X */}
      <a 
        href={xShareLink}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Share on X"
        title="Share on X (Twitter)"
        className="w-10 h-10 flex items-center justify-center rounded-full border border-[var(--border-color)] bg-[var(--surface)] hover:border-[var(--accent)] text-[var(--text-secondary)] hover:text-[var(--accent)] transition-all shadow-xs"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M4 4l11.733 16h4.267l-11.733 -16z" />
          <path d="M4 20l6.768 -6.768m2.46 -2.46l6.772 -6.772" />
        </svg>
      </a>
      
      {/* Share on LinkedIn */}
      <a 
        href={linkedInShareLink}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Share on LinkedIn"
        title="Share on LinkedIn"
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
        title="Copy link to clipboard"
        className="relative w-10 h-10 flex items-center justify-center rounded-full border border-[var(--border-color)] bg-[var(--surface)] hover:border-[var(--accent)] text-[var(--text-secondary)] hover:text-[var(--accent)] transition-all shadow-xs cursor-pointer group"
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
        title={bookmarked ? "Remove bookmark" : "Bookmark issue"}
        className={cn(
          "w-10 h-10 flex items-center justify-center rounded-full border transition-all shadow-xs cursor-pointer",
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

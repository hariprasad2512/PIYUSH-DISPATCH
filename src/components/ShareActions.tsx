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

      // Check bookmark status against canonical saved_dispatches
      try {
        const pathSlug = window.location.pathname.split('/').pop() || '';
        const saved: string[] = JSON.parse(localStorage.getItem('saved_dispatches') || '[]');
        if (saved.includes(pathSlug)) {
          setBookmarked(true);
        }
      } catch {
        setBookmarked(false);
      }
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
    try {
      const pathSlug = window.location.pathname.split('/').pop() || '';
      if (!pathSlug) return;

      const saved: string[] = JSON.parse(localStorage.getItem('saved_dispatches') || '[]');
      let updated: string[];

      if (saved.includes(pathSlug)) {
        updated = saved.filter(s => s !== pathSlug);
        setBookmarked(false);
      } else {
        updated = [...saved, pathSlug];
        setBookmarked(true);
      }

      localStorage.setItem('saved_dispatches', JSON.stringify(updated));
      window.dispatchEvent(new Event('saved-dispatches-updated'));
    } catch (err) {
      console.error('Error toggling bookmark from share menu:', err);
    }
  };

  const shareText = title ? `"${title}" by Piyush's Dispatch` : `Piyush's Dispatch — High-Signal Technical Briefings`;
  const xShareLink = `https://x.com/intent/post?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`;
  const linkedInShareLink = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`;
  const whatsAppShareLink = `https://api.whatsapp.com/send?text=${encodeURIComponent(`${shareText}: ${shareUrl}`)}`;

  if (layout === 'pill-bar') {
    return (
      <div className={cn("flex flex-wrap items-center gap-2.5", className)}>
        {/* Share on X */}
        <a
          href={xShareLink}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Share on X"
          title="Share on X (formerly Twitter)"
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full border border-[var(--border-color)] bg-[var(--bg)] hover:border-[var(--accent)] text-[var(--text-primary)] hover:text-[var(--accent)] font-mono text-xs font-semibold transition-all shadow-2xs"
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
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full border border-[var(--border-color)] bg-[var(--bg)] hover:border-[var(--accent)] text-[var(--text-primary)] hover:text-[var(--accent)] font-mono text-xs font-semibold transition-all shadow-2xs"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
            <rect x="2" y="9" width="4" height="12"></rect>
            <circle cx="4" cy="4" r="2"></circle>
          </svg>
          <span>Share on LinkedIn</span>
        </a>

        {/* Share on WhatsApp */}
        <a
          href={whatsAppShareLink}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Share on WhatsApp"
          title="Share via WhatsApp"
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full border border-[var(--border-color)] bg-[var(--bg)] hover:border-[var(--accent)] text-[var(--text-primary)] hover:text-[var(--accent)] font-mono text-xs font-semibold transition-all shadow-2xs"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M3 21l1.65-3.8a9 9 0 1 1 3.4 2.9L3 21" />
            <path d="M9 10a.5.5 0 0 0 1 0V9a.5.5 0 0 0-1 0v1a5 5 0 0 0 5 5h1a.5.5 0 0 0 0-1h-1a.5.5 0 0 0 0 1" />
          </svg>
          <span>WhatsApp</span>
        </a>

        {/* Copy Link */}
        <button
          onClick={handleCopy}
          aria-label="Copy link"
          className="relative inline-flex items-center gap-2 px-4 py-2.5 rounded-full border border-[var(--border-color)] bg-[var(--bg)] hover:border-[var(--accent)] text-[var(--text-primary)] hover:text-[var(--accent)] font-mono text-xs font-semibold transition-all shadow-2xs cursor-pointer"
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
            "inline-flex items-center gap-2 px-4 py-2.5 rounded-full border font-mono text-xs font-semibold transition-all shadow-2xs cursor-pointer",
            bookmarked
              ? "border-amber-500/30 text-amber-600 dark:text-amber-400 bg-amber-500/10"
              : "border-[var(--border-color)] bg-[var(--bg)] hover:border-[var(--accent)] text-[var(--text-primary)] hover:text-[var(--accent)]"
          )}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill={bookmarked ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
          </svg>
          <span>{bookmarked ? 'Saved' : 'Save Issue'}</span>
        </button>
      </div>
    );
  }

  // Horizontal Side-by-Side Share Bar Layout
  return (
    <div className={cn("flex flex-col gap-2 w-full", className)}>
      <h3 className="font-mono font-bold text-xs tracking-wider uppercase text-[var(--text-secondary)] mb-1">
        Share Dispatch
      </h3>
      
      <div className="flex flex-row items-center gap-2.5 flex-wrap">
        {/* Share on X */}
        <a 
          href={xShareLink}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Share on X"
          title="Share on X (Twitter)"
          className="w-9 h-9 flex items-center justify-center rounded-full border border-[var(--border-color)] bg-[var(--surface)] hover:border-[var(--accent)] text-[var(--text-secondary)] hover:text-[var(--accent)] transition-all shadow-2xs shrink-0"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
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
          className="w-9 h-9 flex items-center justify-center rounded-full border border-[var(--border-color)] bg-[var(--surface)] hover:border-[var(--accent)] text-[var(--text-secondary)] hover:text-[var(--accent)] transition-all shadow-2xs shrink-0"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
            <rect x="2" y="9" width="4" height="12"></rect>
            <circle cx="4" cy="4" r="2"></circle>
          </svg>
        </a>

        {/* Share on WhatsApp */}
        <a 
          href={whatsAppShareLink}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Share on WhatsApp"
          title="Share via WhatsApp"
          className="w-9 h-9 flex items-center justify-center rounded-full border border-[var(--border-color)] bg-[var(--surface)] hover:border-[var(--accent)] text-[var(--text-secondary)] hover:text-[var(--accent)] transition-all shadow-2xs shrink-0"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M3 21l1.65-3.8a9 9 0 1 1 3.4 2.9L3 21" />
            <path d="M9 10a.5.5 0 0 0 1 0V9a.5.5 0 0 0-1 0v1a5 5 0 0 0 5 5h1a.5.5 0 0 0 0-1h-1a.5.5 0 0 0 0 1" />
          </svg>
        </a>
        
        {/* Copy Link */}
        <button 
          onClick={handleCopy}
          aria-label="Copy link"
          title="Copy link to clipboard"
          className="relative w-9 h-9 flex items-center justify-center rounded-full border border-[var(--border-color)] bg-[var(--surface)] hover:border-[var(--accent)] text-[var(--text-secondary)] hover:text-[var(--accent)] transition-all shadow-2xs cursor-pointer shrink-0"
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
        </button>
        
        {/* Bookmark */}
        <button 
          onClick={handleBookmark}
          aria-label={bookmarked ? "Remove bookmark" : "Bookmark"}
          title={bookmarked ? "Saved in personal vault" : "Save issue to vault"}
          className={cn(
            "w-9 h-9 flex items-center justify-center rounded-full border transition-all shadow-2xs cursor-pointer shrink-0",
            bookmarked 
              ? "border-amber-500/30 text-amber-600 dark:text-amber-400 bg-amber-500/10" 
              : "border-[var(--border-color)] bg-[var(--surface)] hover:border-[var(--accent)] text-[var(--text-secondary)] hover:text-[var(--accent)]"
          )}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill={bookmarked ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
          </svg>
        </button>
      </div>
    </div>
  );
}

export default ShareActions;

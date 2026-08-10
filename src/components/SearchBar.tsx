'use client';

import React, { useRef, useEffect } from 'react';
import { cn } from '@/lib/utils';

export interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  onClear?: () => void;
  autoFocus?: boolean;
  className?: string;
}

export function SearchBar({
  value,
  onChange,
  placeholder = "Search The Daily Nodes, Deep Nodes, topics, keywords...",
  onClear,
  autoFocus = false,
  className,
}: SearchBarProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (autoFocus && inputRef.current) {
      inputRef.current.focus();
    }
  }, [autoFocus]);

  const handleClear = () => {
    onChange('');
    if (onClear) onClear();
    if (inputRef.current) inputRef.current.focus();
  };

  return (
    <div className={cn("w-full", className)}>
      {/* Modern Glassmorphic Search Bar */}
      <div className="relative group transition-all duration-300">
        {/* Ambient Gradient Glow Effect on Focus */}
        <div className="absolute -inset-0.5 bg-gradient-to-r from-[var(--accent)] to-purple-600 rounded-3xl blur-md opacity-20 group-hover:opacity-40 group-focus-within:opacity-75 transition duration-500" />
        
        <div className="relative flex items-center bg-[var(--surface)] border border-[var(--border-color)] rounded-2xl shadow-xl backdrop-blur-xl overflow-hidden group-focus-within:border-[var(--accent)] transition-all">
          {/* Search Icon */}
          <div className="pl-5 pr-3 text-[var(--text-secondary)] group-focus-within:text-[var(--accent)] transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
          </div>

          {/* Search Input */}
          <input
            ref={inputRef}
            id="search-input"
            type="text"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder}
            className="w-full bg-transparent py-4 pr-24 text-base md:text-lg text-[var(--text-primary)] placeholder:text-[var(--text-secondary)]/60 focus:outline-none font-medium"
          />

          {/* Right Action Controls */}
          <div className="absolute right-4 flex items-center gap-2">
            {value ? (
              <button
                type="button"
                onClick={handleClear}
                className="p-1.5 rounded-full text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg)] transition-colors"
                title="Clear search query"
                aria-label="Clear search"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            ) : (
              <kbd className="hidden sm:inline-flex items-center gap-1 px-2.5 py-1 text-[11px] font-mono font-bold text-[var(--text-secondary)] bg-[var(--bg)] border border-[var(--border-color)] rounded-lg shadow-xs">
                <span>/</span>
              </kbd>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default SearchBar;

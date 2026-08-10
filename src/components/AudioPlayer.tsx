'use client';

import React, { useState, useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';

interface AudioPlayerProps {
  title: string;
  textToRead: string;
  readingTimeMinutes?: number;
}

export function AudioPlayer({ title, textToRead, readingTimeMinutes = 5 }: AudioPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [rate, setRate] = useState<number>(1);
  const [isSupported, setIsSupported] = useState(true);
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);

  useEffect(() => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      setIsSupported(true);
    } else {
      setIsSupported(false);
    }

    return () => {
      if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  const cleanText = (rawMdx: string) => {
    return rawMdx
      .replace(/---[\s\S]*?---/g, '') // remove frontmatter
      .replace(/!\[.*?\]\(.*?\)/g, '') // remove images
      .replace(/\[(.*?)\]\(.*?\)/g, '$1') // remove link syntax
      .replace(/[*_#`~>|-]/g, ' ') // remove markdown symbols
      .replace(/\s+/g, ' ')
      .trim();
  };

  const handlePlayPause = () => {
    if (!isSupported) return;

    if (isPlaying) {
      window.speechSynthesis.pause();
      setIsPlaying(false);
    } else {
      if (window.speechSynthesis.paused) {
        window.speechSynthesis.resume();
        setIsPlaying(true);
      } else {
        window.speechSynthesis.cancel();

        const speechText = `${title}. ${cleanText(textToRead).slice(0, 3000)}`;
        const utterance = new SpeechSynthesisUtterance(speechText);
        utterance.rate = rate;
        utterance.pitch = 1;

        utterance.onend = () => setIsPlaying(false);
        utterance.onerror = () => setIsPlaying(false);

        utteranceRef.current = utterance;
        window.speechSynthesis.speak(utterance);
        setIsPlaying(true);
      }
    }
  };

  const handleSpeedChange = (newRate: number) => {
    setRate(newRate);
    if (isPlaying) {
      window.speechSynthesis.cancel();
      const speechText = `${title}. ${cleanText(textToRead).slice(0, 3000)}`;
      const utterance = new SpeechSynthesisUtterance(speechText);
      utterance.rate = newRate;
      utterance.onend = () => setIsPlaying(false);
      utterance.onerror = () => setIsPlaying(false);
      utteranceRef.current = utterance;
      window.speechSynthesis.speak(utterance);
    }
  };

  if (!isSupported) return null;

  return (
    <div className="w-full bg-[var(--surface)] border border-[var(--border-color)] rounded-2xl p-4 md:px-6 md:py-4 flex items-center justify-between shadow-2xs transition-all">
      <div className="flex items-center gap-3.5">
        {/* Play/Pause Button */}
        <button
          onClick={handlePlayPause}
          className="w-11 h-11 rounded-full bg-[var(--accent)] text-white flex items-center justify-center hover:opacity-90 transition-transform active:scale-95 shadow-xs shrink-0"
          aria-label={isPlaying ? "Pause audio" : "Listen to issue"}
        >
          {isPlaying ? (
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <rect x="6" y="4" width="4" height="16" rx="1" />
              <rect x="14" y="4" width="4" height="16" rx="1" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor" className="ml-0.5">
              <polygon points="5 3 19 12 5 21 5 3" />
            </svg>
          )}
        </button>

        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-[var(--accent)]">
              Listen to Briefing
            </span>
            {isPlaying && (
              <span className="flex items-center gap-0.5 h-3">
                <span className="w-0.5 h-full bg-[var(--accent)] animate-bounce" style={{ animationDelay: '0ms' }} />
                <span className="w-0.5 h-full bg-[var(--accent)] animate-bounce" style={{ animationDelay: '150ms' }} />
                <span className="w-0.5 h-full bg-[var(--accent)] animate-bounce" style={{ animationDelay: '300ms' }} />
              </span>
            )}
          </div>
          <p className="text-xs text-[var(--text-secondary)] font-medium">
            {readingTimeMinutes} min audio narration
          </p>
        </div>
      </div>

      {/* Speed Controls */}
      <div className="flex items-center gap-1 bg-[var(--bg)] border border-[var(--border-color)] p-1 rounded-xl">
        {[1, 1.25, 1.5, 2].map((s) => (
          <button
            key={s}
            onClick={() => handleSpeedChange(s)}
            className={cn(
              "px-2.5 py-1 text-[11px] font-mono font-bold rounded-lg transition-colors",
              rate === s
                ? "bg-[var(--accent)] text-white shadow-2xs"
                : "text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
            )}
          >
            {s}x
          </button>
        ))}
      </div>
    </div>
  );
}

export default AudioPlayer;

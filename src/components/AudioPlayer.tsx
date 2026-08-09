'use client';

import React, { useState, useRef, useEffect } from 'react';

interface AudioPlayerProps {
  title: string;
  readingTime: number;
}

export function AudioPlayer({ title, readingTime }: AudioPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [playbackSpeed, setPlaybackSpeed] = useState<'1.0x' | '1.25x' | '1.5x' | '2.0x'>('1.0x');
  const [progress, setProgress] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Simulated professional audio playback
  useEffect(() => {
    if (isPlaying) {
      const speedMultiplier = parseFloat(playbackSpeed.replace('x', ''));
      intervalRef.current = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            setIsPlaying(false);
            return 0;
          }
          return prev + 0.5 * speedMultiplier;
        });
      }, 300);
    } else if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isPlaying, playbackSpeed]);

  const toggleSpeed = () => {
    const speeds: ('1.0x' | '1.25x' | '1.5x' | '2.0x')[] = ['1.0x', '1.25x', '1.5x', '2.0x'];
    const nextIdx = (speeds.indexOf(playbackSpeed) + 1) % speeds.length;
    setPlaybackSpeed(speeds[nextIdx]);
  };

  return (
    <div className="w-full bg-[var(--surface)] border border-[var(--border-color)] rounded-2xl p-4 sm:p-5 shadow-xs mb-10 transition-all">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        {/* Play/Pause Button & Title */}
        <div className="flex items-center gap-4">
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            aria-label={isPlaying ? "Pause briefing audio" : "Listen to briefing audio"}
            className="w-12 h-12 rounded-full bg-[var(--accent)] text-white flex items-center justify-center flex-shrink-0 hover:opacity-90 transition-all shadow-sm hover:scale-105 active:scale-95"
          >
            {isPlaying ? (
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <rect x="6" y="4" width="4" height="16" />
                <rect x="14" y="4" width="4" height="16" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor" className="ml-0.5">
                <polygon points="5 3 19 12 5 21 5 3" />
              </svg>
            )}
          </button>

          <div>
            <div className="flex items-center gap-2 text-[11px] font-mono text-[var(--accent)] font-bold tracking-wider uppercase">
              <span className="w-2 h-2 rounded-full bg-[var(--accent)] animate-pulse" />
              <span>Listen to Briefing ({readingTime} min)</span>
            </div>
            <h4 className="text-sm font-serif font-bold text-[var(--text-primary)] line-clamp-1 mt-0.5">
              {title}
            </h4>
          </div>
        </div>

        {/* Controls & Waveform */}
        <div className="flex items-center gap-4 flex-1 max-w-xs sm:max-w-md">
          {/* Progress Bar */}
          <div className="flex-1 bg-[var(--bg)] h-2 rounded-full overflow-hidden border border-[var(--border-color)] relative">
            <div 
              className="bg-[var(--accent)] h-full transition-all duration-300 rounded-full"
              style={{ width: `${progress}%` }}
            />
          </div>

          {/* Speed Toggle */}
          <button
            onClick={toggleSpeed}
            title="Adjust audio playback speed"
            className="px-2.5 py-1 rounded-lg border border-[var(--border-color)] bg-[var(--bg)] text-xs font-mono font-bold text-[var(--text-primary)] hover:border-[var(--accent)] transition-colors flex-shrink-0"
          >
            {playbackSpeed}
          </button>
        </div>
      </div>
    </div>
  );
}

export default AudioPlayer;

'use client';

import React, { useState } from 'react';
import { cn } from '@/lib/utils';

interface SubscribeFormProps {
  variant?: 'inline' | 'full';
}

export function SubscribeForm({ variant = 'inline' }: SubscribeFormProps) {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const isFull = variant === 'full';

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!email || !email.includes('@')) return;

    setStatus('loading');

    const formData = new FormData(e.currentTarget);

    try {
      const response = await fetch('/api/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          source: variant,
          website: formData.get('website'),
        }),
      });

      const result = await response.json() as { message?: string };

      if (!response.ok) {
        setStatus('error');
        setMessage(result.message || 'Subscription failed. Please try again.');
        return;
      }

      setStatus('success');
      setMessage(result.message || "You're subscribed. Check your inbox for confirmation.");
      setEmail('');
    } catch {
      setStatus('error');
      setMessage('Subscription service is unavailable. Please try again later.');
    }
  };

  return (
    <div className={cn(
      "w-full bg-[var(--surface)] text-[var(--text-primary)] rounded-3xl border border-[var(--border-color)]",
      isFull ? "p-8 md:p-12 text-center" : "p-6 md:p-8"
    )}>
      <div className={cn(
        "max-w-2xl mx-auto",
        !isFull && "flex flex-col md:flex-row md:items-center gap-8"
      )}>
        
        <div className={cn(isFull ? "mb-8" : "flex-1")}>
          <h2 className={cn(
            "font-serif font-bold text-[var(--text-primary)] mb-2",
            isFull ? "text-3xl md:text-4xl" : "text-2xl"
          )}>
            Get the daily dispatch.
          </h2>
          <p className={cn(
            "text-[var(--text-secondary)]",
            isFull ? "text-lg max-w-xl mx-auto" : "text-base"
          )}>
            One thoughtful briefing on AI, software architecture, and technology shaping the future.
          </p>
        </div>

        <div className={cn(isFull ? "max-w-md mx-auto w-full" : "w-full md:w-[380px]")}>
          {status === 'success' ? (
            <div className="bg-green-500/10 border border-green-500/30 text-green-700 dark:text-green-300 p-4 rounded-2xl flex items-center justify-center gap-3">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="shrink-0"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
              <p className="text-sm font-semibold">{message}</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-3">
              <input
                type="text"
                name="website"
                tabIndex={-1}
                autoComplete="off"
                className="sr-only"
                aria-hidden="true"
              />
              <div className="relative flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="absolute left-4 text-[var(--text-secondary)]"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
                <input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address..." 
                  required
                  disabled={status === 'loading'}
                  className="w-full pl-11 pr-4 py-3.5 bg-[var(--bg)] border border-[var(--border-color)] rounded-full focus:outline-none focus:ring-2 focus:ring-[var(--accent)] text-[var(--text-primary)] text-sm disabled:opacity-50 transition-shadow"
                />
              </div>
              <button 
                type="submit" 
                disabled={status === 'loading'}
                className="w-full bg-[var(--accent)] hover:opacity-90 text-white font-semibold py-3.5 rounded-full transition-all shadow-md disabled:opacity-70 flex justify-center items-center h-[48px] text-sm"
              >
                {status === 'loading' ? (
                  <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                ) : (
                  "Subscribe for Free"
                )}
              </button>
              {status === 'error' && (
                <p className="text-sm text-red-600 dark:text-red-300" role="alert">
                  {message}
                </p>
              )}
            </form>
          )}
          {status !== 'success' && (
            <p className="text-xs text-[var(--text-secondary)] mt-3 text-center">
              Zero spam. Unsubscribe anytime.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default SubscribeForm;

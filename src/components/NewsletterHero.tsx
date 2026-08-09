import React from 'react';
import Link from 'next/link';

export function NewsletterHero() {
  return (
    <section className="py-20 md:py-32 relative overflow-hidden bg-[var(--bg)] text-[var(--text-primary)]">
      {/* Subtle decorative vertical line */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1px] h-32 bg-gradient-to-b from-[var(--border-color)] to-transparent"></div>
      
      <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-12 text-center relative z-10">
        <div className="inline-block mb-6 px-4.5 py-1.5 border border-[var(--border-color)] bg-[var(--surface)] rounded-full text-xs font-mono tracking-widest text-[var(--accent)] uppercase font-bold shadow-xs">
          Daily Technical Briefing
        </div>
        
        <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl font-black text-[var(--text-primary)] mb-8 tracking-tight leading-[1.05] max-w-5xl mx-auto">
          PIYUSH&apos;S DISPATCH
        </h1>
        
        <p className="text-xl md:text-2xl text-[var(--text-secondary)] mb-12 max-w-4xl mx-auto leading-relaxed font-normal">
          Understanding the technology behind the headlines, the architecture behind the products, and the ideas behind the companies shaping the future.
        </p>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-5">
          <Link 
            href="/issues/latest" 
            className="bg-[var(--accent)] hover:opacity-90 text-white px-9 py-4 rounded-full font-semibold text-lg transition-all shadow-md hover:shadow-lg w-full sm:w-auto text-center flex items-center justify-center gap-3"
          >
            Read today&apos;s dispatch
            <span aria-hidden="true">&rarr;</span>
          </Link>
          <Link 
            href="/issues" 
            className="bg-[var(--surface)] border border-[var(--border-color)] text-[var(--text-primary)] hover:border-[var(--accent)] px-9 py-4 rounded-full font-semibold text-lg transition-all w-full sm:w-auto text-center"
          >
            Browse full archive
          </Link>
        </div>
      </div>
      
      {/* Decorative separator */}
      <div className="mt-24 w-full max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-12">
        <div className="w-full h-[1px] bg-[var(--border-color)]"></div>
      </div>
    </section>
  );
}

export default NewsletterHero;

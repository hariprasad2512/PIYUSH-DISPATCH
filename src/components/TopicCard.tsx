import React from 'react';
import Link from 'next/link';

interface TopicCardProps {
  topic: {
    name: string;
    slug: string;
    count: number;
    description: string;
  };
}

export function TopicCard({ topic }: TopicCardProps) {
  return (
    <Link 
      href={`/topics/${topic.slug}`}
      className="group block p-7 bg-[var(--surface)] border border-[var(--border-color)] rounded-2xl hover:border-[var(--accent)] hover:shadow-lg transition-all duration-300 relative overflow-hidden"
    >
      <div className="relative z-10 flex flex-col justify-between h-full">
        <div>
          <div className="flex justify-between items-start mb-4">
            <h3 className="font-serif text-2xl font-bold text-[var(--text-primary)] group-hover:text-[var(--accent)] transition-colors">
              {topic.name}
            </h3>
            <span className="inline-flex items-center justify-center bg-[var(--bg)] border border-[var(--border-color)] text-xs font-mono px-2.5 py-1 rounded-full text-[var(--accent)] font-semibold shrink-0">
              {topic.count} {topic.count === 1 ? 'issue' : 'issues'}
            </span>
          </div>
          
          <p className="text-[var(--text-secondary)] text-sm leading-relaxed mb-6">
            {topic.description}
          </p>
        </div>
        
        <div className="text-xs font-semibold text-[var(--accent)] flex items-center gap-1 mt-auto">
          Explore domain 
          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="group-hover:translate-x-1 transition-transform duration-300">
            <line x1="5" y1="12" x2="19" y2="12"></line>
            <polyline points="12 5 19 12 12 19"></polyline>
          </svg>
        </div>
      </div>
    </Link>
  );
}

export default TopicCard;

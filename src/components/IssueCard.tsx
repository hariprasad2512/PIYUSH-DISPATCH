import React from 'react';
import Link from 'next/link';
import { IssueSummary } from '@/types';
import { formatDate, cn } from '@/lib/utils';

interface IssueCardProps {
  issue: IssueSummary;
  variant?: 'default' | 'compact';
}

export function IssueCard({ issue, variant = 'default' }: IssueCardProps) {
  const isCompact = variant === 'compact';

  return (
    <article className={cn(
      "group relative bg-[var(--surface)] transition-all duration-300 border border-[var(--border-color)] rounded-2xl p-6 md:p-8 flex flex-col justify-between hover:shadow-lg hover:border-[var(--accent)]",
      isCompact ? "py-6" : "py-8"
    )}>
      <div>
        <div className="flex items-center justify-between gap-4 mb-4 text-xs font-mono text-[var(--text-secondary)]">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-[var(--accent)] bg-[var(--bg)] px-2.5 py-1 rounded-full border border-[var(--border-color)]">
              The Daily Nodes #{String(issue.issueNumber).padStart(3, '0')}
            </span>
          </div>
          <time dateTime={issue.date}>{formatDate(issue.date)}</time>
        </div>
        
        <Link href={`/issues/${issue.slug}`} className="relative z-10 block group-hover:text-[var(--accent)] transition-colors">
          <h3 className={cn(
            "font-serif font-bold text-[var(--text-primary)] leading-tight mb-3",
            isCompact ? "text-xl" : "text-2xl"
          )}>
            {issue.title}
          </h3>
        </Link>

        {issue.subtitle && (
          <p className="text-sm font-medium text-[var(--text-secondary)] mb-3 line-clamp-1 italic">
            {issue.subtitle}
          </p>
        )}

        <p className="text-sm text-[var(--text-secondary)] mb-6 leading-relaxed line-clamp-3">
          {issue.excerpt}
        </p>
      </div>

      <div className="pt-4 border-t border-[var(--border-color)] flex items-center justify-between mt-auto relative z-10">
        <div className="flex items-center gap-3 ml-auto">
          {issue.readingTime > 0 && (
            <span className="text-xs font-mono text-[var(--text-secondary)] flex items-center gap-1">
              <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10" />
                <polyline points="12 6 12 12 16 14" />
              </svg>
              {issue.readingTime} min read
            </span>
          )}
          <Link href={`/issues/${issue.slug}`} className="text-xs font-semibold text-[var(--accent)] flex items-center gap-1 group-hover:translate-x-1 transition-transform">
            Read issue <span aria-hidden="true">&rarr;</span>
          </Link>
        </div>
      </div>

      {/* Clickable Card Link Overlay */}
      <Link href={`/issues/${issue.slug}`} className="absolute inset-0 z-0 opacity-0" aria-label={`Read issue ${issue.title}`}>
        {issue.title}
      </Link>
    </article>
  );
}

export default IssueCard;

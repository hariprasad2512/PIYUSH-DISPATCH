'use client';

import { useState, useMemo, useDeferredValue } from 'react';
import { IssueSummary } from '@/types';
import IssueCard from '@/components/IssueCard';
import { cn } from '@/lib/utils';

interface IssueArchiveClientProps {
  initialIssues: IssueSummary[];
}

export default function IssueArchiveClient({ initialIssues }: IssueArchiveClientProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null);
  const [visibleCount, setVisibleCount] = useState(12);

  // Defer search filtering for instant typing
  const deferredSearchQuery = useDeferredValue(searchQuery);

  // Extract unique topics from issues
  const allTopics = useMemo(() => {
    const topics = new Set<string>();
    initialIssues.forEach(issue => {
      issue.topics.forEach(topic => topics.add(topic));
    });
    return Array.from(topics).sort();
  }, [initialIssues]);

  const filteredIssues = useMemo(() => {
    let filtered = initialIssues;
    
    if (deferredSearchQuery.trim()) {
      const q = deferredSearchQuery.toLowerCase();
      filtered = filtered.filter(issue => 
        issue.title.toLowerCase().includes(q) || 
        (issue.subtitle && issue.subtitle.toLowerCase().includes(q)) ||
        issue.excerpt.toLowerCase().includes(q) ||
        issue.topics.some(t => t.toLowerCase().includes(q)) ||
        issue.tags.some(t => t.toLowerCase().includes(q))
      );
    }
    
    if (selectedTopic) {
      filtered = filtered.filter(issue => issue.topics.includes(selectedTopic));
    }
    
    return filtered;
  }, [initialIssues, deferredSearchQuery, selectedTopic]);

  const visibleIssues = filteredIssues.slice(0, visibleCount);
  const hasMore = visibleCount < filteredIssues.length;

  return (
    <div className="space-y-12 w-full">
      {/* Search & Topic Filters Bar */}
      <div className="flex flex-col gap-6 bg-[var(--surface)] p-6 md:p-8 rounded-3xl border border-[var(--border-color)] shadow-xs">
        {/* Prominent Search Bar */}
        <div className="relative w-full">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[var(--text-secondary)]">
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
          </div>
          <input
            type="search"
            placeholder="Search all dispatches, topics, keywords..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-10 py-3.5 rounded-2xl border border-[var(--border-color)] bg-[var(--bg)] text-[var(--text-primary)] placeholder:text-[var(--text-secondary)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)] text-base transition-all shadow-xs"
          />
          {searchQuery && (
            <button 
              onClick={() => setSearchQuery('')}
              className="absolute inset-y-0 right-0 pr-4 flex items-center text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
              aria-label="Clear search input"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
          )}
        </div>
        
        {/* Topic Filter Pills */}
        <div className="flex flex-wrap gap-2 items-center pt-2 border-t border-[var(--border-color)]">
          <span className="text-xs font-mono uppercase tracking-wider text-[var(--text-secondary)] mr-2 font-bold">Topics:</span>
          <button
            onClick={() => setSelectedTopic(null)}
            className={cn(
              "px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all border",
              selectedTopic === null 
                ? "bg-[var(--accent)] text-white border-[var(--accent)] shadow-xs" 
                : "bg-[var(--bg)] text-[var(--text-secondary)] border-[var(--border-color)] hover:border-[var(--accent)]"
            )}
          >
            All ({initialIssues.length})
          </button>
          {allTopics.map(topic => (
            <button
              key={topic}
              onClick={() => setSelectedTopic(topic)}
              className={cn(
                "px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all border",
                selectedTopic === topic
                  ? "bg-[var(--accent)] text-white border-[var(--accent)] shadow-xs" 
                  : "bg-[var(--bg)] text-[var(--text-secondary)] border-[var(--border-color)] hover:border-[var(--accent)]"
              )}
            >
              {topic}
            </button>
          ))}
        </div>
      </div>

      {/* Results Header */}
      <div className="flex items-center justify-between pb-3 border-b border-[var(--border-color)]">
        <h2 className="font-serif text-2xl font-bold text-[var(--text-primary)]">
          {searchQuery ? `Results for "${searchQuery}"` : 'Vault Archive'}
        </h2>
        <span className="text-xs font-mono text-[var(--text-secondary)]">
          {filteredIssues.length} {filteredIssues.length === 1 ? 'dispatch' : 'dispatches'}
        </span>
      </div>

      {/* Grid */}
      {visibleIssues.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {visibleIssues.map(issue => (
            <IssueCard key={issue.id} issue={issue} />
          ))}
        </div>
      ) : (
        <div className="py-20 text-center bg-[var(--surface)] rounded-3xl border border-[var(--border-color)]">
          <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="mx-auto mb-4 text-[var(--text-secondary)] opacity-50"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
          <h3 className="text-xl font-serif font-bold text-[var(--text-primary)] mb-2">No matching dispatches found</h3>
          <p className="text-[var(--text-secondary)] text-sm max-w-md mx-auto mb-6">
            We couldn&apos;t find any issues matching &quot;{searchQuery}&quot;. Try broadening your search terms or clearing active filters.
          </p>
          <button
            onClick={() => { setSearchQuery(''); setSelectedTopic(null); }}
            className="px-5 py-2.5 rounded-full bg-[var(--accent)] text-white text-xs font-semibold hover:opacity-90 transition-opacity"
          >
            Clear all search filters
          </button>
        </div>
      )}

      {/* Load More */}
      {hasMore && (
        <div className="flex justify-center pt-8">
          <button
            onClick={() => setVisibleCount(prev => prev + 12)}
            className="px-8 py-3.5 rounded-full border border-[var(--border-color)] bg-[var(--surface)] font-semibold text-sm text-[var(--text-primary)] hover:border-[var(--accent)] hover:text-[var(--accent)] transition-all shadow-xs"
          >
            Load More Dispatches ({filteredIssues.length - visibleCount} remaining)
          </button>
        </div>
      )}
    </div>
  );
}

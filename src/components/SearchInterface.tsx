'use client';

import React, { useState, useMemo, useEffect, useDeferredValue } from 'react';
import { IssueSummary } from '@/types';
import { IssueCard } from './IssueCard';
import { cn } from '@/lib/utils';

interface SearchInterfaceProps {
  issues?: IssueSummary[];
  initialIssues?: IssueSummary[];
}

export function SearchInterface({ issues, initialIssues }: SearchInterfaceProps) {
  const allIssuesList = useMemo(() => issues || initialIssues || [], [issues, initialIssues]);
  const [query, setQuery] = useState('');
  const [activeTopic, setActiveTopic] = useState<string | null>(null);
  const [activeNodeType, setActiveNodeType] = useState<'daily-node' | 'deep-node' | null>(null);

  // Defer query filtering so typing remains 60fps instant
  const deferredQuery = useDeferredValue(query);

  const allTopics = useMemo(() => {
    const topicsSet = new Set<string>();
    allIssuesList.forEach(issue => {
      issue.topics.forEach(topic => topicsSet.add(topic));
    });
    return Array.from(topicsSet).sort();
  }, [allIssuesList]);

  const filteredIssues = useMemo(() => {
    let filtered = allIssuesList;
    if (activeTopic) {
      filtered = filtered.filter(issue => issue.topics.includes(activeTopic));
    }
    if (activeNodeType) {
      filtered = filtered.filter(issue => (issue.nodeType || 'daily-node') === activeNodeType);
    }
    if (deferredQuery.trim()) {
      const q = deferredQuery.toLowerCase();
      filtered = filtered.filter(issue => {
        const badgeText = `the daily nodes #${String(issue.issueNumber).padStart(3, '0')}`.toLowerCase();
        const rawBadgeText = `daily-nodes#${String(issue.issueNumber).padStart(3, '0')}`.toLowerCase();
        const nodeTypeText = (issue.nodeType || 'daily-node').toLowerCase();
        const nodeTypeDisplay = nodeTypeText === 'deep-node' ? 'deep node' : 'daily node';
        const altNodeText = `node-${issue.issueNumber}`.toLowerCase();
        const altNodeSpaceText = `node ${issue.issueNumber}`.toLowerCase();

        return (
          issue.title.toLowerCase().includes(q) || 
          issue.subtitle.toLowerCase().includes(q) ||
          issue.excerpt.toLowerCase().includes(q) ||
          issue.topics.some(t => t.toLowerCase().includes(q)) ||
          issue.tags.some(t => t.toLowerCase().includes(q)) ||
          nodeTypeText.includes(q) ||
          nodeTypeDisplay.includes(q) ||
          badgeText.includes(q) ||
          rawBadgeText.includes(q) ||
          altNodeText.includes(q) ||
          altNodeSpaceText.includes(q)
        );
      });
    }
    return filtered;
  }, [allIssuesList, deferredQuery, activeTopic, activeNodeType]);

  useEffect(() => {
    const searchInput = document.getElementById('search-input');
    if (searchInput) {
      searchInput.focus();
    }
  }, []);

  return (
    <div className="max-w-5xl mx-auto w-full">
      {/* Search Input */}
      <div className="relative mb-8 group">
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
          <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[var(--text-secondary)]">
            <circle cx="11" cy="11" r="8"></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
          </svg>
        </div>
        <input
          id="search-input"
          type="search"
          placeholder="Search daily-node, deep-node, topics, keywords..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full bg-[var(--bg)] border border-[var(--border-color)] rounded-2xl py-4 pl-12 pr-4 text-lg text-[var(--text-primary)] placeholder:text-[var(--text-secondary)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)] transition-all shadow-xs"
        />
        {query && (
          <button 
            onClick={() => setQuery('')}
            className="absolute inset-y-0 right-0 pr-4 flex items-center text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
            aria-label="Clear search"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        )}
      </div>

      {/* Node Type & Topic Filters */}
      <div className="mb-10 space-y-6">
        {/* Node Type Selector */}
        <div>
          <h3 className="text-xs uppercase font-mono font-semibold text-[var(--text-secondary)] mb-3 tracking-wider flex items-center gap-2">
            <span>Filter by Node Format</span>
            <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent)]" />
          </h3>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setActiveNodeType(null)}
              className={cn(
                "px-4 py-2 rounded-full text-xs font-mono font-bold transition-all border",
                activeNodeType === null
                  ? "bg-[var(--accent)] text-white border-[var(--accent)] shadow-xs"
                  : "bg-[var(--bg)] text-[var(--text-secondary)] border-[var(--border-color)] hover:border-[var(--accent)]"
              )}
            >
              All Formats ({allIssuesList.length})
            </button>
            <button
              onClick={() => setActiveNodeType('daily-node')}
              className={cn(
                "px-4 py-2 rounded-full text-xs font-mono font-bold transition-all border flex items-center gap-1.5",
                activeNodeType === 'daily-node'
                  ? "bg-blue-600 text-white border-blue-600 shadow-xs"
                  : "bg-[var(--bg)] text-[var(--text-secondary)] border-[var(--border-color)] hover:border-blue-500 hover:text-blue-500"
              )}
            >
              <span>⚡ DAILY-NODE</span>
              <span className="opacity-75">({allIssuesList.filter(i => (i.nodeType || 'daily-node') === 'daily-node').length})</span>
            </button>
            <button
              onClick={() => setActiveNodeType('deep-node')}
              className={cn(
                "px-4 py-2 rounded-full text-xs font-mono font-bold transition-all border flex items-center gap-1.5",
                activeNodeType === 'deep-node'
                  ? "bg-purple-600 text-white border-purple-600 shadow-xs"
                  : "bg-[var(--bg)] text-[var(--text-secondary)] border-[var(--border-color)] hover:border-purple-500 hover:text-purple-500"
              )}
            >
              <span>🧠 DEEP-NODE</span>
              <span className="opacity-75">({allIssuesList.filter(i => i.nodeType === 'deep-node').length})</span>
            </button>
          </div>
        </div>

        {/* Topic Filters */}
        <div>
          <h3 className="text-xs uppercase font-mono font-semibold text-[var(--text-secondary)] mb-3 tracking-wider">Filter by Topic</h3>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setActiveTopic(null)}
              className={cn(
                "px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all border",
                activeTopic === null
                  ? "bg-[var(--accent)] text-white border-[var(--accent)] shadow-xs"
                  : "bg-[var(--bg)] text-[var(--text-secondary)] border-[var(--border-color)] hover:border-[var(--accent)]"
              )}
            >
              All Topics
            </button>
            {allTopics.map(topic => (
              <button
                key={topic}
                onClick={() => setActiveTopic(topic)}
                className={cn(
                  "px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all border",
                  activeTopic === topic
                    ? "bg-[var(--accent)] text-white border-[var(--accent)] shadow-xs"
                    : "bg-[var(--bg)] text-[var(--text-secondary)] border-[var(--border-color)] hover:border-[var(--accent)]"
                )}
              >
                {topic}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Results Summary */}
      <div className="mb-6 pb-3 border-b border-[var(--border-color)] flex justify-between items-end">
        <h2 className="font-serif text-2xl font-bold text-[var(--text-primary)]">
          {query ? `Results for "${query}"` : 'All Dispatches'}
        </h2>
        <span className="text-sm font-mono text-[var(--text-secondary)]">
          {filteredIssues.length} {filteredIssues.length === 1 ? 'issue' : 'issues'} found
        </span>
      </div>

      {/* Results List Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredIssues.length > 0 ? (
          filteredIssues.map((issue) => (
            <IssueCard key={issue.id} issue={issue} variant="compact" />
          ))
        ) : (
          <div className="col-span-full text-center py-20 bg-[var(--bg)] rounded-2xl border border-[var(--border-color)]">
            <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="mx-auto text-[var(--text-secondary)] mb-4 opacity-50">
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
            <h3 className="text-xl font-serif font-bold text-[var(--text-primary)] mb-2">No dispatches found</h3>
            <p className="text-[var(--text-secondary)] text-sm max-w-md mx-auto mb-6">
              We couldn&apos;t find any issues matching &quot;{query}&quot;. Try broadening your search terms.
            </p>
            <button 
              onClick={() => { setQuery(''); setActiveTopic(null); }}
              className="px-5 py-2.5 bg-[var(--accent)] text-white text-xs font-semibold rounded-full hover:opacity-90 transition-opacity"
            >
              Clear search filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default SearchInterface;

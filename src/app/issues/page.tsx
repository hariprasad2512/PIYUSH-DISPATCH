import { getIssueSummaries } from '@/lib/content';
import IssueArchiveClient from './IssueArchiveClient';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'All Dispatches',
  description: "Browse the complete archive of PIYUSH'S DISPATCH daily newsletter issues.",
  alternates: {
    canonical: '/issues',
  },
};

export default async function IssuesArchivePage() {
  const issues = await getIssueSummaries();

  return (
    <main className="w-full max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-12 py-12 md:py-20 min-h-screen">
      <header className="mb-12 md:mb-16 border-b border-[var(--border-color)] pb-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <div className="inline-block mb-3 px-3 py-1 border border-[var(--border-color)] bg-[var(--surface)] rounded-full text-xs font-mono text-[var(--accent)] uppercase font-semibold">
              Knowledge Vault &amp; Archive
            </div>
            <h1 className="font-serif text-4xl md:text-6xl font-bold text-[var(--text-primary)] tracking-tight">
              All Dispatches
            </h1>
          </div>
          <div className="text-[var(--text-secondary)] text-sm font-mono flex items-center gap-3">
            <p>Every daily briefing, preserved in one searchable vault.</p>
            <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent)]" />
            <span className="font-bold text-[var(--text-primary)]">{issues.length} issues</span>
          </div>
        </div>
      </header>

      <IssueArchiveClient initialIssues={issues} />
    </main>
  );
}

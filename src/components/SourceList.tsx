import React from 'react';

interface Source {
  title: string;
  publisher: string;
  date: string;
  url: string;
}

interface SourceListProps {
  sources: Source[];
}

export function SourceList({ sources }: SourceListProps) {
  if (!sources || sources.length === 0) return null;

  return (
    <section className="mt-16 pt-8 border-t border-[#E8E6E1] dark:border-[#2A2A2A]">
      <h3 className="font-sans font-semibold text-lg text-[#1A1A1A] dark:text-[#E8E6E1] mb-6 flex items-center gap-2">
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20"/></svg>
        Sources & References
      </h3>
      <ol className="list-decimal list-outside ml-5 space-y-4 text-sm text-[#6B6B6B] dark:text-[#8A8A8A]">
        {sources.map((source, index) => (
          <li key={index} className="pl-2">
            <a 
              href={source.url} 
              target="_blank" 
              rel="noopener noreferrer"
              className="group inline-flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-2 hover:text-[#1A1A1A] dark:hover:text-[#E8E6E1] transition-colors"
            >
              <span className="font-medium text-[#1A1A1A] dark:text-[#E8E6E1] border-b border-transparent group-hover:border-[#1A1A1A] dark:group-hover:border-[#E8E6E1] transition-colors">
                {source.title}
              </span>
              <span className="flex items-center gap-1 opacity-80">
                <span className="italic">{source.publisher}</span>
                <span>•</span>
                <span>{source.date}</span>
                <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="ml-1 opacity-50 group-hover:opacity-100 transition-opacity"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
              </span>
            </a>
          </li>
        ))}
      </ol>
    </section>
  );
}

export default SourceList;


import { getAllTopics } from '@/lib/content';
import TopicCard from '@/components/TopicCard';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Explore Topics',
  description: "Browse newsletter issues categorized by topic and domain.",
  alternates: {
    canonical: '/topics',
  },
};

export default async function TopicsPage() {
  const topics = await getAllTopics();

  return (
    <main className="w-full max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-12 py-12 md:py-20 min-h-screen">
      <header className="mb-12 border-b border-[var(--border-color)] pb-8">
        <div className="inline-block mb-3 px-3 py-1 border border-[var(--border-color)] bg-[var(--surface)] rounded-full text-xs font-mono text-[var(--accent)] uppercase font-semibold">
          Domain Index
        </div>
        <h1 className="font-serif text-4xl md:text-6xl font-bold text-[var(--text-primary)] tracking-tight mb-4">
          Explore Topics
        </h1>
        <p className="text-[var(--text-secondary)] text-lg max-w-2xl">
          Browse our structured knowledge archives by domain. From AI architecture and agentic loops to business models and technology analysis.
        </p>
      </header>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {topics.map((topic) => (
          <TopicCard key={topic.slug} topic={topic} />
        ))}
      </div>
    </main>
  );
}

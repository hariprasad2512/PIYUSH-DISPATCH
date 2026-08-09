import type { Metadata } from 'next';
import SubscribeForm from '@/components/SubscribeForm';

export const metadata: Metadata = {
  title: 'About the Author',
  description: "Learn more about Piyush and the editorial philosophy behind PIYUSH'S DISPATCH.",
  alternates: {
    canonical: '/about',
  },
};

export default function AboutPage() {
  return (
    <main className="w-full max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-12 py-12 md:py-20 min-h-screen">
      <header className="mb-16 border-b border-[var(--border-color)] pb-10 text-center max-w-4xl mx-auto">
        <div className="inline-block mb-4 px-3.5 py-1 border border-[var(--border-color)] bg-[var(--surface)] rounded-full text-xs font-mono text-[var(--accent)] uppercase font-semibold">
          Editorial Manifesto
        </div>
        <h1 className="font-serif text-4xl md:text-6xl font-bold text-[var(--text-primary)] tracking-tight mb-6">
          About PIYUSH&apos;S DISPATCH
        </h1>
        <p className="text-xl text-[var(--text-secondary)] leading-relaxed font-light">
          A daily technical briefing exploring AI, software architecture, machine learning, and the ideas shaping the future of technology.
        </p>

        {/* Social Links */}
        <div className="flex justify-center gap-4 mt-8">
          <a 
            href="https://x.com/PiyushPal143104" 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2 rounded-full border border-[var(--border-color)] bg-[var(--surface)] text-xs font-mono font-medium text-[var(--text-primary)] hover:border-[var(--accent)] hover:text-[var(--accent)] transition-all shadow-xs"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M4 4l11.733 16h4.267l-11.733 -16z" />
              <path d="M4 20l6.768 -6.768m2.46 -2.46l6.772 -6.772" />
            </svg>
            <span>@PiyushPal143104</span>
          </a>

          <a 
            href="https://github.com/xrcodexcode" 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2 rounded-full border border-[var(--border-color)] bg-[var(--surface)] text-xs font-mono font-medium text-[var(--text-primary)] hover:border-[var(--accent)] hover:text-[var(--accent)] transition-all shadow-xs"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
            </svg>
            <span>@xrcodexcode</span>
          </a>

          <a 
            href="https://www.linkedin.com/in/xrcodex/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2 rounded-full border border-[var(--border-color)] bg-[var(--surface)] text-xs font-mono font-medium text-[var(--text-primary)] hover:border-[var(--accent)] hover:text-[var(--accent)] transition-all shadow-xs"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
              <rect x="2" y="9" width="4" height="12"></rect>
              <circle cx="4" cy="4" r="2"></circle>
            </svg>
            <span>in/xrcodex</span>
          </a>
        </div>
      </header>

      <div className="max-w-[760px] mx-auto space-y-12 text-lg leading-relaxed text-[var(--text-primary)]">
        <section className="space-y-4">
          <h2 className="font-serif text-3xl font-bold text-[var(--text-primary)] border-b border-[var(--border-color)] pb-2">
            The Vision
          </h2>
          <p>
            In an era dominated by clickbait timelines, superficial buzzwords, and fragmented short-form content, <strong>Piyush&apos;s Dispatch</strong> exists to provide a permanent home for serious, long-form technical analysis.
          </p>
          <p>
            Every daily newsletter issue is written from first principles — breaking down complex shifts in artificial intelligence, software infrastructure, and startup economics into clear, actionable mental models.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="font-serif text-3xl font-bold text-[var(--text-primary)] border-b border-[var(--border-color)] pb-2">
            What We Cover
          </h2>
          <ul className="list-disc pl-6 space-y-3">
            <li><strong>Artificial Intelligence &amp; LLMs:</strong> Agentic frameworks, context engineering, RAG, loop engineering, and graph systems.</li>
            <li><strong>Software Engineering &amp; Systems:</strong> Modern devtools, cloud infrastructure, MLOps, and scalable architecture.</li>
            <li><strong>Startups &amp; Business Strategy:</strong> Unit economics, founder playbooks, product-market fit, and market dynamics.</li>
            <li><strong>First-Principles Observations:</strong> Critical analysis of hype cycles, research papers, and emerging technology trends.</li>
          </ul>
        </section>

        <section className="space-y-4">
          <h2 className="font-serif text-3xl font-bold text-[var(--text-primary)] border-b border-[var(--border-color)] pb-2">
            Editorial Philosophy
          </h2>
          <blockquote className="my-6 pl-6 border-l-4 border-[var(--accent)] italic font-serif text-xl text-[var(--text-primary)] bg-[var(--surface)] p-6 rounded-r-2xl">
            &quot;Every new AI buzzword is a new floor — not a demolition crew. Fundamentals compound over time.&quot;
          </blockquote>
          <p>
            This website is designed <strong>Reading First</strong>. Every article is formatted with optimal typography, distraction-free reading controls, multiple paper/dark themes, zero pop-up ads, and immediate retrievability.
          </p>
        </section>

        <div className="pt-12 border-t border-[var(--border-color)]">
          <div className="text-center">
            <h3 className="font-serif text-2xl font-bold mb-4 text-[var(--text-primary)]">
              Subscribe to the Daily Briefing
            </h3>
            <p className="text-[var(--text-secondary)] mb-8 text-base max-w-md mx-auto">
              Get the briefing in your inbox, with sources and practical context preserved.
            </p>
            <SubscribeForm variant="inline" />
          </div>
        </div>
      </div>
    </main>
  );
}

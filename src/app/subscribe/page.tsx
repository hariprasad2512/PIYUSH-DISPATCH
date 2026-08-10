import type { Metadata } from 'next';
import SubscribeForm from '@/components/SubscribeForm';

export const metadata: Metadata = {
  title: 'Subscribe Daily — Piyush\'s Dispatch',
  description: "Subscribe to get daily briefings on technology, AI, software architecture, and business.",
  alternates: {
    canonical: '/subscribe',
  },
};

const benefits = [
  'Daily essays and briefings delivered straight to your inbox via Substack',
  'First-principles analysis of AI models, agents, and tech strategy',
  'No spam, no fake urgency, and full 1-click unsubscribe support',
  'A permanent technical archive you can search and filter by topic',
  'Curated research references, practical code examples, and architecture diagrams'
];

export default function SubscribePage() {
  const substackUrl = 'https://xrcodex.substack.com/subscribe';

  return (
    <main className="w-full max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-12 py-16 md:py-24 min-h-[80vh] flex items-center justify-center">
      <div className="w-full max-w-5xl">
        <div className="grid md:grid-cols-2 gap-12 lg:gap-16 items-center">
          
          <div className="space-y-8">
            <div>
              <div className="inline-flex items-center gap-2 mb-3 px-3 py-1 border border-orange-500/30 bg-orange-500/10 rounded-full text-xs font-mono text-orange-500 font-bold uppercase">
                <span>⚡ Substack Official Dispatch</span>
              </div>
              <h1 className="font-serif text-4xl md:text-5xl font-bold mb-4 text-[var(--text-primary)] leading-tight">
                Subscribe to PIYUSH&apos;S DISPATCH
              </h1>
              <p className="text-lg md:text-xl text-[var(--text-secondary)] leading-relaxed">
                Get clear technical analysis on AI and software systems without timeline noise or unsupported hype.
              </p>
            </div>

            <ul className="space-y-4">
              {benefits.map((benefit, i) => (
                <li key={i} className="flex items-start gap-3.5 text-[var(--text-primary)]">
                  <span className="mt-1 flex-shrink-0 text-[var(--accent)] p-1 rounded-full bg-[var(--surface)] border border-[var(--border-color)]">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                  </span>
                  <span className="text-base leading-relaxed">{benefit}</span>
                </li>
              ))}
            </ul>

            <div className="pt-2">
              <a
                href={substackUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-orange-600 hover:bg-orange-700 text-white font-semibold text-sm transition-all shadow-md hover:shadow-lg"
              >
                <span>Subscribe directly on Substack</span>
                <span className="text-base">↗</span>
              </a>
            </div>
          </div>

          <div>
            <SubscribeForm variant="full" />
            
            <p className="text-xs text-center text-[var(--text-secondary)] mt-6 font-mono">
              Powered by Substack (xrcodex.substack.com). Zero spam. Unsubscribe anytime.
            </p>
          </div>

        </div>
      </div>
    </main>
  );
}

import type { Metadata } from 'next';
import SubscribeForm from '@/components/SubscribeForm';

export const metadata: Metadata = {
  title: 'Subscribe Daily',
  description: "Subscribe to get daily briefings on technology, AI, software architecture, and business.",
  alternates: {
    canonical: '/subscribe',
  },
};

const benefits = [
  'Daily essays and briefings delivered straight to your inbox',
  'First-principles analysis of AI models, agents, and tech strategy',
  'No spam, no fake urgency, and unsubscribe support through the email provider',
  'A permanent archive you can search, filter by topic, and revisit',
  'Curated research references, practical examples, and architecture diagrams'
];

export default function SubscribePage() {
  return (
    <main className="w-full max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-12 py-16 md:py-24 min-h-[80vh] flex items-center justify-center">
      <div className="w-full max-w-5xl">
        <div className="grid md:grid-cols-2 gap-12 lg:gap-16 items-center">
          
          <div className="space-y-8">
            <div>
              <div className="inline-block mb-3 px-3 py-1 border border-[var(--border-color)] bg-[var(--surface)] rounded-full text-xs font-mono text-[var(--accent)] uppercase font-semibold">
                Daily Subscription
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
          </div>

          <div>
            <SubscribeForm variant="full" />
            
            <p className="text-xs text-center text-[var(--text-secondary)] mt-6 font-mono">
              Your email is used for this publication. Read the privacy policy for details.
            </p>
          </div>

        </div>
      </div>
    </main>
  );
}

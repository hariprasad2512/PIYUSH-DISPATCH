import type { Metadata } from 'next';
import Link from 'next/link';
import { siteConfig } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Contact',
  description: "Contact Piyush's Dispatch for feedback, corrections, source notes, and collaboration requests.",
  alternates: {
    canonical: '/contact',
  },
};

export default function ContactPage() {
  return (
    <main className="w-full max-w-[960px] mx-auto px-4 sm:px-8 lg:px-12 py-16 md:py-24 min-h-[70vh]">
      <header className="mb-12 border-b border-[var(--border-color)] pb-8">
        <div className="inline-block mb-4 px-3.5 py-1 border border-[var(--border-color)] bg-[var(--surface)] rounded-full text-xs font-mono text-[var(--accent)] uppercase font-semibold">
          Contact
        </div>
        <h1 className="font-serif text-4xl md:text-6xl font-bold text-[var(--text-primary)] mb-5">
          Reach the editor
        </h1>
        <p className="text-lg md:text-xl text-[var(--text-secondary)] leading-relaxed max-w-2xl">
          Send corrections, source suggestions, guest ideas, sponsorship notes, or thoughtful feedback.
        </p>
      </header>

      <div className="grid md:grid-cols-2 gap-8">
        <section className="border border-[var(--border-color)] bg-[var(--surface)] rounded-2xl p-6">
          <h2 className="font-serif text-2xl font-bold mb-3 text-[var(--text-primary)]">Email</h2>
          <p className="text-[var(--text-secondary)] mb-5">
            Best for corrections, private notes, and business inquiries.
          </p>
          <a className="text-[var(--accent)] font-semibold hover:underline" href={`mailto:${siteConfig.contactEmail}`}>
            {siteConfig.contactEmail}
          </a>
        </section>

        <section className="border border-[var(--border-color)] bg-[var(--surface)] rounded-2xl p-6">
          <h2 className="font-serif text-2xl font-bold mb-3 text-[var(--text-primary)]">Social</h2>
          <p className="text-[var(--text-secondary)] mb-5">
            Follow public notes, experiments, and issue discussions.
          </p>
          <div className="flex flex-wrap gap-3 text-sm font-semibold">
            <a href="https://x.com/PiyushPal143104" target="_blank" rel="noopener noreferrer" className="text-[var(--accent)] hover:underline">X</a>
            <a href="https://github.com/xrcodexcode" target="_blank" rel="noopener noreferrer" className="text-[var(--accent)] hover:underline">GitHub</a>
            <a href="https://www.linkedin.com/in/xrcodex/" target="_blank" rel="noopener noreferrer" className="text-[var(--accent)] hover:underline">LinkedIn</a>
          </div>
        </section>
      </div>

      <p className="mt-10 text-sm text-[var(--text-secondary)]">
        For data questions, read the <Link href="/privacy" className="text-[var(--accent)] hover:underline">privacy policy</Link>.
      </p>
    </main>
  );
}

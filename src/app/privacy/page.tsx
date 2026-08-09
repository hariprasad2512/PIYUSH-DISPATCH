import type { Metadata } from 'next';
import { siteConfig } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Privacy',
  description: "Privacy policy for Piyush's Dispatch.",
  alternates: {
    canonical: '/privacy',
  },
};

export default function PrivacyPage() {
  return (
    <main className="w-full max-w-[880px] mx-auto px-4 sm:px-8 lg:px-12 py-16 md:py-24 min-h-[70vh]">
      <header className="mb-12 border-b border-[var(--border-color)] pb-8">
        <div className="inline-block mb-4 px-3.5 py-1 border border-[var(--border-color)] bg-[var(--surface)] rounded-full text-xs font-mono text-[var(--accent)] uppercase font-semibold">
          Privacy
        </div>
        <h1 className="font-serif text-4xl md:text-6xl font-bold text-[var(--text-primary)] mb-5">
          Privacy policy
        </h1>
        <p className="text-lg text-[var(--text-secondary)] leading-relaxed">
          Last updated August 9, 2026.
        </p>
      </header>

      <div className="prose prose-lg max-w-none">
        <h2>What this site collects</h2>
        <p>
          If you subscribe, the site collects the email address you submit and optional metadata required to process that request through the configured email provider.
        </p>

        <h2>How your email is used</h2>
        <p>
          Your email is used to send Piyush&apos;s Dispatch and related publication updates. It is not sold or rented.
        </p>

        <h2>Third-party processors</h2>
        <p>
          Email delivery may be handled by the newsletter provider configured for this site. That provider may process your email address under its own data processing terms.
        </p>

        <h2>Unsubscribing</h2>
        <p>
          Every production email should include an unsubscribe link. You can also request removal by emailing <a href={`mailto:${siteConfig.contactEmail}`}>{siteConfig.contactEmail}</a>.
        </p>

        <h2>Contact</h2>
        <p>
          For privacy questions, corrections, or deletion requests, email <a href={`mailto:${siteConfig.contactEmail}`}>{siteConfig.contactEmail}</a>.
        </p>
      </div>
    </main>
  );
}

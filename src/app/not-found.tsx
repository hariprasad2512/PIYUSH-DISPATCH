import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "404 - Page Not Found | PIYUSH'S DISPATCH",
};

export default function NotFound() {
  return (
    <main className="min-h-[70vh] flex items-center justify-center py-20 px-4">
      <div className="text-center max-w-md">
        <h1 className="font-serif text-8xl font-bold text-[#1A1A1A] dark:text-[#E8E6E1] mb-6">
          404
        </h1>
        <h2 className="text-2xl font-semibold text-[#1A1A1A] dark:text-[#E8E6E1] mb-4">
          Page not found
        </h2>
        <p className="text-[#6B6B6B] dark:text-[#8A8A8A] mb-8">
          The page or issue you are looking for doesn&apos;t exist or has been moved.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link 
            href="/"
            className="px-6 py-3 rounded-lg bg-[#1A1A1A] dark:bg-[#E8E6E1] text-white dark:text-[#141414] font-medium hover:bg-black dark:hover:bg-white transition-colors"
          >
            Return Home
          </Link>
          <Link 
            href="/issues"
            className="px-6 py-3 rounded-lg border border-[#E8E6E1] dark:border-[#2A2A2A] text-[#1A1A1A] dark:text-[#E8E6E1] font-medium hover:bg-[#FAFAF7] dark:hover:bg-[#2A2A2A] transition-colors"
          >
            Browse Archive
          </Link>
        </div>
      </div>
    </main>
  );
}

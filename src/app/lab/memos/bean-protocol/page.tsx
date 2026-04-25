import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Bean Protocol Memo',
  robots: {
    index: false,
    follow: false,
  },
};

export default function BeanProtocolMemoPage() {
  return (
    <main className="min-h-screen bg-black px-4 py-10 text-white">
      <div className="mx-auto max-w-3xl">
        <Link href="/" className="text-sm text-white/50 hover:text-white">
          ← back to main system
        </Link>

        <article className="mt-10 rounded-2xl border border-white/10 bg-white/[0.03] p-6 font-mono">
          <p className="mb-4 text-xs uppercase tracking-[0.3em] text-white/40">
            {'// internal memo'}
          </p>

          <h1 className="mb-6 text-3xl font-semibold tracking-tight">
            Bean Protocol
          </h1>

          <p className="text-white/60">
            This page is not in the main sitemap. It is just a strange little
            memo for people who went digging.
          </p>
        </article>
      </div>
    </main>
  );
}
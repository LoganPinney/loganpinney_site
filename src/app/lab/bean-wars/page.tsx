// src/app/lab/bean-wars/page.tsx

import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Bean Wars | Logan Pinney Lab',
  description: 'A small browser experiment from Logan Pinney.',
  robots: {
    index: false,
    follow: false,
  },
};

export default function BeanWarsPage() {
  return (
    <main className="min-h-screen bg-black px-4 py-8 text-white">
      <div className="mx-auto max-w-6xl">
        <Link
          href="/"
          className="mb-6 inline-block text-sm text-white/50 transition hover:text-white"
        >
          ← back to main system
        </Link>

        <section className="mb-6 rounded-2xl border border-white/10 bg-white/[0.03] p-5">
          <p className="mb-2 font-mono text-xs uppercase tracking-[0.3em] text-white/40">
            {'// lab'}
          </p>

          <h1 className="mb-2 text-3xl font-semibold tracking-tight">
            Bean Wars
          </h1>

          <p className="max-w-2xl text-sm leading-6 text-white/60">
            A small browser experiment hidden inside the system. Not everything
            useful has to be serious.
          </p>
        </section>

        <div className="overflow-hidden rounded-xl border border-white/10 bg-black shadow-2xl">
          <iframe
            src="/games/bean-wars/"
            width="100%"
            height="780"
            className="block w-full border-0 bg-black"
            title="Bean Wars"
            allow="fullscreen; gamepad; autoplay"
          />
        </div>
      </div>
    </main>
  );
}
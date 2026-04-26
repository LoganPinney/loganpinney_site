// src/app/lab/stock-wars/page.tsx

import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Stock Wars | Logan Pinney Lab',
  description:
    'A 10-day fake stock simulator. Six absurd tickers, headlines that move the tape, no real financial advice.',
  robots: {
    index: false,
    follow: false,
  },
};

export default function StockWarsPage() {
  return (
    <main className="min-h-screen bg-black px-3 py-6 text-white sm:px-4 sm:py-8">
      <div className="mx-auto max-w-5xl">
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
            Stock Wars
          </h1>

          <p className="max-w-2xl text-sm leading-6 text-white/60">
            Ten days. Six fake tickers. Random headlines move the tape and you
            try to retire before the closing bell. Pairs with the Bean Wars
            terminal — same desk, different desk job.
          </p>
        </section>

        <div className="mx-auto max-w-[920px]">
          <div className="overflow-hidden rounded-xl border border-white/10 bg-black shadow-2xl">
            <iframe
              src="/games/stock-wars/"
              className="block h-[88vh] min-h-[640px] w-full sm:min-h-[720px] lg:h-[860px]"
              title="Stock Wars"
              allow="fullscreen"
            />
          </div>
        </div>
      </div>
    </main>
  );
}

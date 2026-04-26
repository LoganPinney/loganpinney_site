import type { Metadata } from 'next';
import Link from 'next/link';
import MarketSimGame from './MarketSimGame';

export const metadata: Metadata = {
  title: 'Market Sim | Logan Pinney Lab',
  description: 'A hidden fake-market simulation from Logan Pinney.',
  robots: {
    index: false,
    follow: false,
  },
};

export default function MarketSimPage() {
  return (
    <main className="min-h-screen bg-black px-3 py-6 text-white sm:px-4 sm:py-8">
      <div className="mx-auto max-w-6xl">
        <Link
          href="/"
          className="mb-6 inline-block font-mono text-sm text-white/50 transition hover:text-white"
        >
          {'<- back to main system'}
        </Link>

        <section className="mb-6 rounded-2xl border border-white/10 bg-white/[0.03] p-5">
          <p className="mb-2 font-mono text-xs uppercase tracking-[0.3em] text-white/40">
            {'// lab / simulations'}
          </p>

          <h1 className="mb-2 text-3xl font-semibold tracking-tight">
            Market Sim
          </h1>

          <p className="max-w-2xl text-sm leading-6 text-white/60">
            Ten days in a fake terminal market where headlines move nonsense
            tickers and every confident theory gets stress-tested by breakfast.
          </p>
        </section>

        <MarketSimGame />
      </div>
    </main>
  );
}

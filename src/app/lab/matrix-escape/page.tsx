import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Matrix Escape | Logan Pinney Lab',
  description: 'A hidden first-person green-screen maze from Logan Pinney.',
  robots: {
    index: false,
    follow: false,
  },
};

export default function MatrixEscapePage() {
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
            {'// lab'}
          </p>

          <h1 className="mb-2 text-3xl font-semibold tracking-tight">
            Matrix Escape
          </h1>

          <p className="max-w-2xl text-sm leading-6 text-white/60">
            A green-screen maze buried under the lab floor. Find the exit before
            the signal runs out.
          </p>
        </section>

        <div className="mx-auto max-w-[960px]">
          <div className="overflow-hidden rounded-xl border border-white/10 bg-black shadow-2xl">
            <iframe
              src="/games/matrix-escape/"
              className="block h-[82vh] min-h-[640px] w-full"
              title="Matrix Escape"
              allow="fullscreen; pointer-lock"
            />
          </div>
        </div>
      </div>
    </main>
  );
}

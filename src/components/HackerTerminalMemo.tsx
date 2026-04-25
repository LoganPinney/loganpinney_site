'use client';

import Link from 'next/link';
import { useEffect, useMemo, useRef, useState } from 'react';

type HackerTerminalMemoProps = {
  eyebrow?: string;
  title: string;
  lines: string[];
  backHref?: string;
  backLabel?: string;
  nextHref?: string;
  nextLabel?: string;
};

export default function HackerTerminalMemo({
  eyebrow = 'public memo',
  title,
  lines,
  backHref = '/',
  backLabel = 'back to main system',
  nextHref,
  nextLabel = 'next log',
}: HackerTerminalMemoProps) {
  const [visibleChars, setVisibleChars] = useState(0);
  const outputRef = useRef<HTMLPreElement | null>(null);

  const fullText = useMemo(() => lines.join('\n'), [lines]);

  useEffect(() => {
    setVisibleChars(0);

    const reduceMotion =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (reduceMotion) {
      setVisibleChars(fullText.length);
      return;
    }

    const interval = window.setInterval(() => {
      setVisibleChars((current) => {
        const next = current + 9;

        if (next >= fullText.length) {
          window.clearInterval(interval);
          return fullText.length;
        }

        return next;
      });
    }, 12);

    return () => window.clearInterval(interval);
  }, [fullText]);

  useEffect(() => {
    if (!outputRef.current) return;

    outputRef.current.scrollTop = outputRef.current.scrollHeight;
  }, [visibleChars]);

  const visibleText = fullText.slice(0, visibleChars);
  const isComplete = visibleChars >= fullText.length;

  return (
    <main className="min-h-screen bg-black px-4 py-8 text-green-300">
      <div className="mx-auto max-w-5xl">
        <div className="mb-6 flex items-center justify-between gap-4">
          <Link
            href={backHref}
            className="font-mono text-sm text-green-400/60 transition hover:text-green-200"
          >
            ← {backLabel}
          </Link>

          {nextHref ? (
            <Link
              href={nextHref}
              className="font-mono text-sm text-green-400/60 transition hover:text-green-200"
            >
              {nextLabel} →
            </Link>
          ) : null}
        </div>

        <section className="overflow-hidden rounded-2xl border border-green-400/20 bg-black shadow-2xl shadow-green-950/30">
          <div className="flex items-center gap-2 border-b border-green-400/20 bg-green-950/10 px-4 py-3">
            <span className="h-3 w-3 rounded-full bg-green-500/80" />
            <span className="h-3 w-3 rounded-full bg-green-500/50" />
            <span className="h-3 w-3 rounded-full bg-green-500/30" />

            <span className="ml-3 font-mono text-xs uppercase tracking-[0.35em] text-green-400/45">
              {eyebrow}
            </span>
          </div>

          <div className="border-b border-green-400/10 px-5 py-5">
            <p className="mb-2 font-mono text-xs uppercase tracking-[0.35em] text-green-400/40">
              {'// terminal archive'}
            </p>

            <h1 className="font-mono text-2xl font-semibold tracking-tight text-green-200 md:text-4xl">
              {title}
            </h1>
          </div>

          <pre
            ref={outputRef}
            className="h-[70vh] overflow-y-auto whitespace-pre-wrap px-5 py-6 font-mono text-sm leading-7 text-green-300/85 md:text-base"
          >
            {visibleText}
            {!isComplete ? <span className="animate-pulse">█</span> : null}
          </pre>
        </section>
      </div>
    </main>
  );
}
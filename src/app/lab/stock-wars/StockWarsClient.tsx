'use client';

import { useEffect, useState } from 'react';
import { hasCompleted, isUnlocked, markCompleted } from '@/lib/labProgress';

type CompletePayload = {
  type: 'stock-wars:complete';
  net: number;
  rank: string;
};

function isCompletePayload(value: unknown): value is CompletePayload {
  if (typeof value !== 'object' || value === null) return false;
  const v = value as Record<string, unknown>;
  return v.type === 'stock-wars:complete';
}

export default function StockWarsClient() {
  const [unlocked, setUnlocked] = useState<boolean | null>(null);
  const [completedRun, setCompletedRun] = useState<CompletePayload | null>(null);
  const [persistedComplete, setPersistedComplete] = useState(false);

  useEffect(() => {
    setUnlocked(isUnlocked('stock-wars'));
    setPersistedComplete(hasCompleted('stock-wars'));

    function onMessage(event: MessageEvent) {
      // Same-origin only; the iframe posts with window.location.origin.
      if (event.origin !== window.location.origin) return;
      if (!isCompletePayload(event.data)) return;
      markCompleted('stock-wars');
      setPersistedComplete(true);
      setCompletedRun(event.data);
    }

    window.addEventListener('message', onMessage);
    return () => window.removeEventListener('message', onMessage);
  }, []);

  if (unlocked === null) {
    return (
      <section className="rounded-2xl border border-white/10 bg-black p-5 font-mono shadow-2xl shadow-black/40">
        <p className="text-emerald-300">checking lab access...</p>
      </section>
    );
  }

  if (!unlocked) {
    return (
      <section className="rounded-2xl border border-white/10 bg-black p-5 font-mono shadow-2xl shadow-black/40">
        <p className="mb-3 text-xs uppercase tracking-[0.28em] text-white/35">
          stock_wars access gate
        </p>
        <p className="mb-2 text-lg text-red-300">
          locked // dependency incomplete
        </p>
        <p className="max-w-2xl text-sm leading-6 text-white/60">
          Trace Route must be completed before this desk opens. The trading
          floor refuses to seat you until the routing layer can prove it knows
          where anything goes.
        </p>
      </section>
    );
  }

  return (
    <div className="mx-auto max-w-[920px]">
      {(completedRun || persistedComplete) && (
        <div className="mb-3 rounded-lg border border-emerald-300/40 bg-emerald-300/10 p-3 font-mono text-xs text-emerald-200">
          {completedRun
            ? `closing bell // run sealed at $${completedRun.net.toLocaleString('en-US')} — ${completedRun.rank.toLowerCase()}`
            : 'lab.stock-wars.complete = true // play another run any time'}
        </div>
      )}
      <div className="overflow-hidden rounded-xl border border-white/10 bg-black shadow-2xl">
        <iframe
          src="/games/stock-wars/"
          className="block h-[88vh] min-h-[640px] w-full sm:min-h-[720px] lg:h-[860px]"
          title="Stock Wars"
          allow="fullscreen"
        />
      </div>
    </div>
  );
}

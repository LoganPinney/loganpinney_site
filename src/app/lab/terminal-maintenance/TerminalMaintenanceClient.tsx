'use client';

import { useEffect, useState } from 'react';
import { hasCompleted, markCompleted } from '@/lib/labProgress';

type CompletePayload = {
  type: 'terminal-maintenance:complete';
  integrity: number;
  cycles: number;
  cleaned: number;
  total: number;
};

function isCompletePayload(value: unknown): value is CompletePayload {
  if (typeof value !== 'object' || value === null) return false;
  const v = value as Record<string, unknown>;
  return v.type === 'terminal-maintenance:complete';
}

export default function TerminalMaintenanceClient() {
  const [completedRun, setCompletedRun] = useState<CompletePayload | null>(null);
  const [persistedComplete, setPersistedComplete] = useState(false);

  useEffect(() => {
    setPersistedComplete(hasCompleted('terminal-maintenance'));

    function onMessage(event: MessageEvent) {
      if (event.origin !== window.location.origin) return;
      if (!isCompletePayload(event.data)) return;

      markCompleted('terminal-maintenance');
      setPersistedComplete(true);
      setCompletedRun(event.data);
    }

    window.addEventListener('message', onMessage);
    return () => window.removeEventListener('message', onMessage);
  }, []);

  return (
    <div className="mx-auto max-w-[980px]">
      {(completedRun || persistedComplete) && (
        <div className="mb-3 rounded-lg border border-emerald-300/40 bg-emerald-300/10 p-3 font-mono text-xs text-emerald-200">
          {completedRun
            ? `maintenance sealed // ${completedRun.cleaned}/${completedRun.total} targets cleared, integrity ${completedRun.integrity}, cycles ${completedRun.cycles}`
            : 'lab.terminal-maintenance.complete = true // run another sweep any time'}
        </div>
      )}

      <div className="overflow-hidden rounded-xl border border-white/10 bg-black shadow-2xl">
        <iframe
          src="/games/terminal-maintenance/"
          className="block h-[92vh] min-h-[720px] w-full sm:min-h-[780px] lg:h-[920px]"
          title="Terminal Maintenance"
          allow="fullscreen"
        />
      </div>
    </div>
  );
}

'use client';

import Link from 'next/link';
import { FormEvent, useEffect, useMemo, useState } from 'react';
import type { LabGame } from '@/config/lab.config';
import { unlockGame } from '@/lib/labProgress';

const accessCode = 'order66';
const accessFlag = 'lab.admin.unlocked';

type LabAccessClientProps = {
  games: LabGame[];
};

export default function LabAccessClient({ games }: LabAccessClientProps) {
  const [code, setCode] = useState('');
  const [unlocked, setUnlocked] = useState(false);
  const [failed, setFailed] = useState(false);

  const liveGames = useMemo(
    () => games.filter((game) => game.status === 'live'),
    [games]
  );

  useEffect(() => {
    try {
      if (window.localStorage.getItem(accessFlag) === 'true') {
        setUnlocked(true);
        liveGames.forEach((game) => unlockGame(game.id));
      }
    } catch {
      setUnlocked(false);
    }
  }, [liveGames]);

  function unlockAll() {
    try {
      window.localStorage.setItem(accessFlag, 'true');
    } catch {
      // The page can still unlock for this session if storage is unavailable.
    }

    liveGames.forEach((game) => unlockGame(game.id));
    setUnlocked(true);
    setFailed(false);
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (code.trim().toLowerCase() === accessCode) {
      unlockAll();
      return;
    }

    setFailed(true);
  }

  return (
    <div className="mx-auto max-w-5xl px-6 py-20 sm:px-8 sm:py-24">
      <section className="pb-12">
        <p className="glow-text mb-4 font-mono text-xs uppercase tracking-widest text-[var(--accent)]">
          {'// lab access'}
        </p>

        <h1 className="mb-4 text-4xl font-medium leading-tight tracking-tight text-white sm:text-5xl">
          Backdoor lab console
        </h1>

        <p className="max-w-2xl text-base leading-7 text-[var(--text-dim)]">
          Full access to the hidden lab games, wrappers, and experiments in the
          system.
        </p>
      </section>

      {!unlocked ? (
        <section
          className="card-glow rounded-md border border-[var(--border)] bg-[var(--bg-card)] p-5 sm:p-6"
          aria-label="Lab unlock"
        >
          <form onSubmit={handleSubmit} className="max-w-xl">
            <label
              htmlFor="lab-code"
              className="mb-3 block font-mono text-xs uppercase tracking-widest text-[var(--text-faint)]"
            >
              unlock code
            </label>

            <div className="flex flex-col gap-3 sm:flex-row">
              <input
                id="lab-code"
                value={code}
                onChange={(event) => {
                  setCode(event.target.value);
                  setFailed(false);
                }}
                autoComplete="off"
                className="min-h-11 flex-1 rounded border border-[var(--border-hover)] bg-black px-3 font-mono text-sm text-white outline-none transition focus:border-[var(--accent)]"
                aria-invalid={failed}
              />

              <button
                type="submit"
                className="btn-glow inline-flex min-h-11 items-center justify-center rounded px-5 font-mono text-sm font-medium"
              >
                unlock
              </button>
            </div>

            {failed && (
              <p className="mt-3 font-mono text-xs text-red-300">
                access denied
              </p>
            )}

            <p className="mt-5 font-mono text-xs leading-6 text-[var(--text-faint)]">
              hint: the terminal archive keeps the directive in plain sight.
              start with ls -a, then cat .breadcrumbs.txt.
            </p>
          </form>
        </section>
      ) : (
        <section className="border-t border-[var(--border)] pt-12">
          <div className="mb-8 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="glow-text mb-2 font-mono text-xs uppercase tracking-widest text-[var(--accent)]">
                {'// access granted'}
              </p>
              <h2 className="text-2xl font-medium tracking-tight text-white">
                Lab games
              </h2>
            </div>
            <p className="font-mono text-xs text-[var(--text-faint)]">
              {liveGames.length} live entries unlocked
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {games.map((game) => (
              <article
                key={game.id}
                className="card-glow flex min-h-56 flex-col rounded-md border border-[var(--border)] bg-[var(--bg-card)] p-5"
              >
                <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
                  <span className="font-mono text-[10px] uppercase tracking-widest text-[var(--accent)]">
                    {game.tags.slice(0, 3).join(' / ')}
                  </span>
                  <span className="rounded border border-[color-mix(in_srgb,var(--accent)_30%,transparent)] px-2 py-1 font-mono text-[10px] uppercase tracking-widest text-[var(--accent)]">
                    {game.status}
                  </span>
                </div>

                <h3 className="mb-2 text-lg font-medium text-white">
                  {game.title}
                </h3>

                <p className="mb-5 text-sm leading-6 text-[var(--text-dim)]">
                  {game.description}
                </p>

                <div className="mt-auto flex flex-wrap items-center justify-between gap-3">
                  <code className="font-mono text-[11px] text-[var(--text-faint)]">
                    {game.unlockCommand}
                  </code>

                  {game.status === 'live' ? (
                    <Link
                      href={game.route}
                      className="btn-glow inline-flex items-center gap-2 rounded px-4 py-2 font-mono text-xs"
                    >
                      play <span aria-hidden>→</span>
                    </Link>
                  ) : (
                    <button
                      type="button"
                      disabled
                      className="inline-flex cursor-not-allowed items-center rounded border border-[var(--border-hover)] px-4 py-2 font-mono text-xs text-[var(--text-faint)]"
                    >
                      queued
                    </button>
                  )}
                </div>
              </article>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}

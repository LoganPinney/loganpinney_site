'use client'

import { useEffect, useState } from 'react'

type Line =
  | { type: 'cmd'; text: string }
  | { type: 'out'; text: string }


const lines: Line[] = [
  { type: 'cmd', text: 'whoami' },
  { type: 'out', text: 'data-systems-architect' },
  { type: 'cmd', text: 'cat focus.txt' },
  { type: 'out', text: 'workflow automation · integrations · governance' },
  { type: 'cmd', text: 'echo $status' },
  { type: 'out', text: 'open to select contract work' },
]

export default function Terminal() {
  const [visibleCount, setVisibleCount] = useState(0)

  useEffect(() => {
    if (visibleCount >= lines.length) return
    const t = setTimeout(() => setVisibleCount(visibleCount + 1), 350)
    return () => clearTimeout(t)
  }, [visibleCount])

  return (
    <div className="mt-10 bg-neutral-950 border border-neutral-800 rounded-md overflow-hidden max-w-xl font-mono text-sm">
      <div className="flex items-center gap-1.5 px-4 py-2.5 border-b border-neutral-900 bg-neutral-900/30">
        <span className="w-2.5 h-2.5 rounded-full bg-neutral-700" />
        <span className="w-2.5 h-2.5 rounded-full bg-neutral-700" />
        <span className="w-2.5 h-2.5 rounded-full bg-neutral-700" />
        <span className="ml-3 text-[11px] text-neutral-600">~/loganpinney</span>
      </div>
      <div className="p-4 space-y-1">
        {lines.slice(0, visibleCount).map((line, i) =>
          line.type === 'cmd' ? (
            <div key={i} className="text-neutral-400">
              <span className="text-[var(--color-accent)]">$ </span>
              {line.text}
            </div>
          ) : (
            <div key={i} className="text-[var(--color-success)]">
              {line.text}
            </div>
          )
        )}
        {visibleCount >= lines.length && (
          <div className="text-neutral-400">
            <span className="text-[var(--color-accent)]">$ </span>
            <span className="cursor-blink text-[var(--color-accent)]">▌</span>
          </div>
        )}
      </div>
    </div>
  )
}

'use client'

import { useEffect, useState } from 'react'
import { siteConfig } from '@/config/site.config'

type Line =
  | { type: 'cmd'; text: string }
  | { type: 'out'; text: string }

export default function Terminal() {
  const glow = siteConfig.effects.glowText
  const script: Line[] = siteConfig.terminal.flatMap((t) => [
    { type: 'cmd' as const, text: t.cmd },
    { type: 'out' as const, text: t.out },
  ])

  const [visible, setVisible] = useState<Line[]>([])
  const [current, setCurrent] = useState('')
  const [idx, setIdx] = useState(0)
  const [charIdx, setCharIdx] = useState(0)

  useEffect(() => {
    if (idx >= script.length) return

    const line = script[idx]

    if (charIdx < line.text.length) {
      const delay = line.type === 'cmd' ? 45 : 18
      const t = setTimeout(() => {
        setCurrent(line.text.slice(0, charIdx + 1))
        setCharIdx((c) => c + 1)
      }, delay)
      return () => clearTimeout(t)
    } else {
      const t = setTimeout(() => {
        setVisible((v) => [...v, line])
        setCurrent('')
        setCharIdx(0)
        setIdx((i) => i + 1)
      }, line.type === 'cmd' ? 250 : 400)
      return () => clearTimeout(t)
    }
  }, [idx, charIdx, script])

  const done = idx >= script.length
  const currentLine = !done ? script[idx] : null

  return (
    <div
      className="mt-12 max-w-xl rounded-md overflow-hidden"
      style={{
        background: 'var(--bg-card)',
        border: '1px solid var(--border)',
      }}
    >
      {/* title bar */}
      <div
        className="flex items-center gap-1.5 px-3 py-2"
        style={{
          borderBottom: '1px solid var(--border)',
          background: 'color-mix(in srgb, var(--accent) 2%, transparent)',
        }}
      >
        <span
          className="h-2.5 w-2.5 rounded-full"
          style={{ background: '#2a2a2a' }}
        />
        <span
          className="h-2.5 w-2.5 rounded-full"
          style={{ background: '#2a2a2a' }}
        />
        <span
          className="h-2.5 w-2.5 rounded-full"
          style={{ background: '#2a2a2a' }}
        />
        <span
          className="ml-2 font-mono text-[10px]"
          style={{ color: 'var(--text-faint)' }}
        >
          ~/loganpinney
        </span>
      </div>

      {/* body */}
      <div className="px-4 py-3 font-mono text-xs leading-[1.9]">
        {visible.map((line, i) => (
          <TerminalLine key={i} line={line} glow={glow} />
        ))}
        {currentLine && (
          <TerminalLine line={{ ...currentLine, text: current }} glow={glow} />
        )}
        {done && (
          <div>
            <span
              style={{
                color: 'var(--accent)',
                textShadow: glow ? '0 0 6px var(--accent-glow)' : undefined,
              }}
            >
              ${' '}
            </span>
            <span
              className="inline-block h-3 w-2 align-middle cursor-blink"
              style={{
                background: 'var(--accent)',
                boxShadow: glow ? '0 0 6px var(--accent-glow)' : undefined,
              }}
            />
          </div>
        )}
      </div>
    </div>
  )
}

function TerminalLine({ line, glow }: { line: Line; glow: boolean }) {
  if (line.type === 'cmd') {
    return (
      <div>
        <span
          style={{
            color: 'var(--accent)',
            textShadow: glow ? '0 0 6px var(--accent-glow)' : undefined,
          }}
        >
          ${' '}
        </span>
        <span style={{ color: '#999' }}>{line.text}</span>
      </div>
    )
  }
  return (
    <div
      style={{
        color: 'var(--accent)',
        textShadow: glow ? '0 0 4px var(--accent-glow)' : undefined,
      }}
    >
      {line.text}
    </div>
  )
}

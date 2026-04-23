import Link from 'next/link'
import Terminal from '@/components/Terminal'
import { siteConfig } from '@/config/site.config'

const glowText = siteConfig.effects.glowText ? 'glow-text' : ''
const blinkCursor = siteConfig.effects.blinkingCursor

export default function HomePage() {
  return (
    <div className="max-w-5xl mx-auto px-6 sm:px-8">
      {/* HERO */}
      <section className="pt-20 pb-24">
        <div className="flex items-center gap-2 mb-6">
          <span className="relative flex h-2 w-2">
            <span
              className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-60"
              style={{ background: 'var(--accent)' }}
            />
            <span
              className="relative inline-flex rounded-full h-2 w-2"
              style={{
                background: 'var(--accent)',
                boxShadow: '0 0 6px var(--accent-glow), 0 0 12px var(--accent-glow)',
              }}
            />
          </span>
          <span
            className={`font-mono text-[11px] uppercase tracking-widest ${glowText}`}
            style={{ color: 'var(--accent)' }}
          >
            {siteConfig.status.label}
          </span>
        </div>

        <h1 className="text-5xl sm:text-6xl font-medium tracking-tight leading-[1.05] mb-4 text-white">
          {siteConfig.identity.name}
          {blinkCursor && (
            <span
              className={`cursor-blink ${glowText}`}
              style={{ color: 'var(--accent)' }}
            >
              _
            </span>
          )}
        </h1>

        <p
          className={`font-mono text-base mb-3 ${glowText}`}
          style={{ color: 'var(--accent)' }}
        >
          {siteConfig.identity.title}
        </p>

        <p className="font-mono text-xs mb-8" style={{ color: 'var(--text-faint)' }}>
          {siteConfig.identity.currentLine}
        </p>

        <p
          className="text-lg leading-relaxed max-w-2xl mb-10 whitespace-pre-line"
          style={{ color: '#ccc' }}
        >
          {siteConfig.identity.tagline}
        </p>

        <div className="flex flex-wrap gap-3">
          <Link
            href="/contact"
            className="btn-glow inline-flex items-center gap-2 font-mono text-sm font-medium px-5 py-2.5 rounded"
          >
            fix your system <span aria-hidden>→</span>
          </Link>
          <Link
            href="/work"
            className="btn-ghost inline-flex items-center gap-2 font-mono text-sm px-5 py-2.5 rounded"
          >
            view work
          </Link>
        </div>

        <Terminal />
      </section>

      {/* SELECTED WORK */}
      <section className="py-16" style={{ borderTop: '1px solid var(--border)' }}>
        <div className="flex items-baseline justify-between mb-8">
          <h2
            className={`font-mono text-xs uppercase tracking-widest ${glowText}`}
            style={{ color: 'var(--accent)' }}
          >
            {'// selected work'}
          </h2>
          <Link
            href="/work"
            className="font-mono text-xs transition"
            style={{ color: 'var(--text-dim)' }}
          >
            see all →
          </Link>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          {siteConfig.selectedWork.map((w) => (
            <WorkCard key={w.title} {...w} />
          ))}
        </div>
      </section>

      {/* STACK */}
      <section className="py-16" style={{ borderTop: '1px solid var(--border)' }}>
        <h2
          className={`font-mono text-xs uppercase tracking-widest mb-8 ${glowText}`}
          style={{ color: 'var(--accent)' }}
        >
          {'// stack'}
        </h2>

        <div className="space-y-6">
          <StackRow label="platforms" items={siteConfig.stack.platforms} />
          <StackRow label="languages" items={siteConfig.stack.languages} />
          <StackRow label="integrations" items={siteConfig.stack.integrations} />
          <StackRow label="focus" items={siteConfig.stack.focus} accent />
        </div>
      </section>

      {/* CTA */}
      <section className="py-20" style={{ borderTop: '1px solid var(--border)' }}>
        <div className="max-w-2xl">
          <h2 className="text-3xl sm:text-4xl font-medium text-white mb-4 tracking-tight">
            If your operations rely on spreadsheets, manual workarounds, or fragile automations, the system is already failing. 
            I fix the structure underneath it.
          </h2>
          <p className="mb-8 leading-relaxed" style={{ color: 'var(--text-dim)' }}>
           I take on a limited number of contracts where the problems are real and the system matters.
          </p>
          <Link
            href="/contact"
            className="btn-glow inline-flex items-center gap-2 font-mono text-sm font-medium px-5 py-2.5 rounded"
          >
            start a conversation <span aria-hidden>→</span>
          </Link>
        </div>
      </section>
    </div>
  )
}

/* ---------- helpers ---------- */

function WorkCard({
  tag,
  title,
  body,
  period,
}: {
  tag: string
  title: string
  body: string
  period: string
}) {
  const useHover = siteConfig.effects.cardHoverGlow
  return (
    <article
      className={`${useHover ? 'card-glow' : ''} rounded-md p-5`}
      style={{
        background: 'var(--bg-card)',
        border: '1px solid var(--border)',
      }}
    >
      <div className="flex items-center justify-between mb-3">
        <span
          className="font-mono text-[10px] uppercase tracking-widest"
          style={{ color: 'var(--accent)' }}
        >
          {tag}
        </span>
        <span className="font-mono text-[10px]" style={{ color: 'var(--text-faint)' }}>
          {period}
        </span>
      </div>
      <h3 className="text-white font-medium mb-2">{title}</h3>
      <p className="text-sm leading-relaxed" style={{ color: 'var(--text-dim)' }}>
        {body}
      </p>
    </article>
  )
}

function StackRow({
  label,
  items,
  accent = false,
}: {
  label: string
  items: readonly string[]
  accent?: boolean
}) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center gap-3">
      <div
        className="font-mono text-[11px] uppercase tracking-widest sm:w-32 shrink-0"
        style={{ color: 'var(--text-dim)' }}
      >
        {label}
      </div>
      <div className="flex flex-wrap gap-2">
        {items.map((item) => (
          <span
            key={item}
            className={`font-mono text-xs px-2.5 py-1 rounded border ${accent ? 'tag-accent' : ''}`}
            style={
              accent
                ? undefined
                : {
                    background: 'var(--bg-card)',
                    borderColor: 'var(--border-hover)',
                    color: '#ccc',
                  }
            }
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  )
}

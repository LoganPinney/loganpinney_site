import Link from 'next/link'
import { siteConfig } from '@/config/site.config'

const glow = siteConfig.effects.glowText ? 'glow-text' : ''

export default function NotFound() {
  return (
    <div className="max-w-2xl mx-auto px-6 sm:px-8 py-32">
      <div
        className="rounded-md p-8 font-mono text-sm leading-relaxed"
        style={{
          background: 'var(--bg-card)',
          border: '1px solid var(--border)',
        }}
      >
        <div>
          <span
            className={glow}
            style={{ color: 'var(--accent)' }}
          >
            $
          </span>{' '}
          <span style={{ color: '#999' }}>cat /requested/page</span>
        </div>
        <div className={`mt-1 ${glow}`} style={{ color: 'var(--accent)' }}>
          error: 404 — file not found
        </div>

        <div className="mt-5">
          <span
            className={glow}
            style={{ color: 'var(--accent)' }}
          >
            $
          </span>{' '}
          <span style={{ color: '#999' }}>suggest --alternative</span>
        </div>
        <div className={`mt-1 ${glow}`} style={{ color: 'var(--accent)' }}>
          try: /work · /about · /contact · /
        </div>

        <div className="mt-8">
          <Link
            href="/"
            className="btn-glow inline-flex items-center gap-2 text-xs font-medium px-4 py-2 rounded"
          >
            cd ~ <span aria-hidden>→</span>
          </Link>
        </div>
      </div>
    </div>
  )
}

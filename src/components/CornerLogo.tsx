import Link from 'next/link'
import { siteConfig } from '@/config/site.config'

export default function CornerLogo() {
  const [first, ...rest] = siteConfig.identity.name.split(' ')
  const last = rest.join(' ')

  return (
    <Link
      href="/"
      aria-label={`${siteConfig.identity.name} — home`}
      className="fixed top-5 left-6 z-50 font-mono text-[13px] font-medium tracking-tight hover:opacity-90 transition"
      style={{ color: 'var(--text)' }}
    >
      <span>{first?.toLowerCase()}</span>
      <span
        style={{
          color: 'var(--accent)',
          textShadow: siteConfig.effects.glowText
            ? '0 0 8px var(--accent-glow)'
            : undefined,
        }}
      >
        .
      </span>
      <span>{last?.toLowerCase()}</span>
    </Link>
  )
}

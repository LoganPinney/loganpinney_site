import type { Metadata } from 'next'
import Link from 'next/link'
import SpriteWidgetClient from './SpriteWidgetClient'

export const metadata: Metadata = {
  title: 'Sprites',
  description: 'Unlisted sprite animator preview page.',
  robots: {
    index: false,
    follow: false,
  },
}

export default function SpritesPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-14">
      <Link
        href="/"
        className="mb-6 inline-block font-mono text-xs transition hover:text-[var(--accent)]"
        style={{ color: 'var(--text-dim)' }}
      >
        &lt;- back to main system
      </Link>

      <SpriteWidgetClient />
    </div>
  )
}

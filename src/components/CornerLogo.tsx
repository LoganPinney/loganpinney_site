import Link from 'next/link'

export default function CornerLogo() {
  return (
    <Link
      href="/"
      aria-label="Logan Pinney — home"
      className="fixed top-5 left-5 sm:top-6 sm:left-8 z-50 group"
    >
      <span className="font-mono text-sm font-medium text-white group-hover:text-neutral-300 transition">
        logan<span className="text-[var(--color-accent)]">.</span>pinney
      </span>
    </Link>
  )
}

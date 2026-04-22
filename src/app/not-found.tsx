import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="max-w-2xl mx-auto px-6 sm:px-8 py-24 text-center">
      <div className="font-mono text-xs uppercase tracking-widest text-[var(--color-accent)] mb-6">
        {'// error 404'}
      </div>
      <h1 className="text-6xl sm:text-7xl font-medium tracking-tight text-white mb-4">
        page not found
      </h1>
      <p className="text-neutral-400 font-mono text-sm mb-10">
        $ cat /path/you/requested
        <br />
        <span className="text-red-400">cat: no such file or directory</span>
      </p>
      <Link
        href="/"
        className="inline-flex items-center gap-2 bg-[var(--color-accent)] text-neutral-950 font-mono text-sm font-medium px-5 py-2.5 rounded hover:bg-[var(--color-accent-dim)] hover:text-white transition"
      >
        cd ~ <span aria-hidden>→</span>
      </Link>
    </div>
  )
}

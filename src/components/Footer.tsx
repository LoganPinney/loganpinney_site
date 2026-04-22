import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="border-t border-neutral-900 mt-24">
      <div className="max-w-5xl mx-auto px-6 sm:px-8 py-10 flex flex-col gap-6">
        {/* primary nav row */}
        <nav className="flex flex-wrap gap-6 font-mono text-xs uppercase tracking-wider">
          <Link href="/" className="text-neutral-400 hover:text-white transition">
            home
          </Link>
          <Link href="/work" className="text-neutral-400 hover:text-white transition">
            work
          </Link>
          <Link href="/about" className="text-neutral-400 hover:text-white transition">
            about
          </Link>
          <Link href="/contact" className="text-neutral-400 hover:text-white transition">
            contact
          </Link>
        </nav>

        {/* legal + contact row */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 text-xs font-mono text-neutral-600 pt-6 border-t border-neutral-900">
          <div>© {new Date().getFullYear()} Logan Pinney</div>
          <div className="flex flex-wrap gap-6">
            <Link href="/legal/terms" className="hover:text-neutral-300 transition">
              terms
            </Link>
            <Link href="/legal/privacy" className="hover:text-neutral-300 transition">
              privacy
            </Link>
            <a
              href="mailto:info@loganpinney.com"
              className="hover:text-neutral-300 transition"
            >
              info@loganpinney.com
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}

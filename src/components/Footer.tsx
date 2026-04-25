import Link from 'next/link'
import Terminal from '@/components/Terminal'
import { siteConfig } from '@/config/site.config'

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer
      className="mt-24 py-10 px-6 sm:px-8"
      style={{ borderTop: '1px solid var(--border)' }}
    >
      <div className="max-w-5xl mx-auto flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
        {/* left: nav */}
        <nav className="flex flex-wrap gap-5 font-mono text-xs">
          {siteConfig.nav.map((item) => (
            <FooterLink key={item.href} href={item.href}>
              {item.label}
            </FooterLink>
          ))}
          <FooterLink href={siteConfig.identity.linkedin} external>
            linkedin ↗
          </FooterLink>
          <FooterLink href={`mailto:${siteConfig.identity.email}`}>
            email
          </FooterLink>
        </nav>

        {/* right: copy + legal */}
        <div className="flex flex-col sm:items-end gap-2">
          <div className="font-mono text-[10px]" style={{ color: 'var(--text-faint)' }}>
            © {year} {siteConfig.identity.name}. all rights reserved.
          </div>
          <div className="flex gap-4 font-mono text-[10px]">
            <FooterLink href="/legal/terms" small>
              terms
            </FooterLink>
            <FooterLink href="/legal/privacy" small>
              privacy
            </FooterLink>
          </div>
        </div>
      </div>

      <div className="mx-auto mt-10 max-w-5xl">
        <div className="max-w-4xl opacity-70 transition-opacity duration-200 hover:opacity-100">
          <Terminal />
        </div>
      </div>
    </footer>
  )
}

function FooterLink({
  href,
  children,
  external = false,
  small = false,
}: {
  href: string
  children: React.ReactNode
  external?: boolean
  small?: boolean
}) {
  const size = small ? 'text-[10px]' : 'text-xs'
  const common = `font-mono ${size} transition hover:text-[color:var(--accent)]`

  if (external) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={common}
        style={{ color: 'var(--text-dim)' }}
      >
        {children}
      </a>
    )
  }

  return (
    <Link href={href} className={common} style={{ color: 'var(--text-dim)' }}>
      {children}
    </Link>
  )
}

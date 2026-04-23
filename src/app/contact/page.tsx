import type { Metadata } from 'next'
import { siteConfig } from '@/config/site.config'

export const metadata: Metadata = {
  title: 'Contact',
  description:
    'Get in touch with Logan Pinney about data systems, automation, or contract work.',
}

const glow = siteConfig.effects.glowText ? 'glow-text' : ''

// TODO: Replace with your actual Formspree form ID
const FORMSPREE_ID = 'xpzgkdqb'

export default function ContactPage() {
  const inputStyle: React.CSSProperties = {
    background: 'var(--bg-card)',
    border: '1px solid var(--border-hover)',
    color: 'var(--text)',
  }

  return (
    <div className="max-w-2xl mx-auto px-6 sm:px-8 py-20">
      <header className="mb-12">
        <p
          className={`font-mono text-xs uppercase tracking-widest mb-4 ${glow}`}
          style={{ color: 'var(--accent)' }}
        >
          {'// contact'}
        </p>
        <h1 className="text-4xl sm:text-5xl font-medium tracking-tight text-white mb-6">
          Let&apos;s talk.
        </h1>
        <p className="leading-relaxed" style={{ color: 'var(--text-dim)' }}>
          Short or long — doesn&apos;t matter. I&apos;ll read it and get back to you.
          If email is easier, reach out directly at{' '}
          <a
            href={`mailto:${siteConfig.identity.email}`}
            className="underline hover:no-underline"
            style={{ color: 'var(--accent)' }}
          >
            {siteConfig.identity.email}
          </a>
          .
        </p>
      </header>

      <form
        action={`https://formspree.io/f/${FORMSPREE_ID}`}
        method="POST"
        className="space-y-5"
      >
        <div>
          <label
            htmlFor="name"
            className="block font-mono text-xs uppercase tracking-wider mb-2"
            style={{ color: 'var(--text-dim)' }}
          >
            name
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            autoComplete="name"
            style={inputStyle}
            className="w-full px-4 py-3 rounded outline-none font-sans text-sm"
          />
        </div>

        <div>
          <label
            htmlFor="email"
            className="block font-mono text-xs uppercase tracking-wider mb-2"
            style={{ color: 'var(--text-dim)' }}
          >
            email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            autoComplete="email"
            style={inputStyle}
            className="w-full px-4 py-3 rounded outline-none font-sans text-sm"
          />
        </div>

        <div>
          <label
            htmlFor="subject"
            className="block font-mono text-xs uppercase tracking-wider mb-2"
            style={{ color: 'var(--text-dim)' }}
          >
            subject
          </label>
          <input
            id="subject"
            name="subject"
            type="text"
            style={inputStyle}
            className="w-full px-4 py-3 rounded outline-none font-sans text-sm"
          />
        </div>

        <div>
          <label
            htmlFor="message"
            className="block font-mono text-xs uppercase tracking-wider mb-2"
            style={{ color: 'var(--text-dim)' }}
          >
            message
          </label>
          <textarea
            id="message"
            name="message"
            required
            rows={6}
            style={inputStyle}
            className="w-full px-4 py-3 rounded outline-none font-sans text-sm resize-y"
          />
        </div>

        {/* honeypot */}
        <input type="text" name="_gotcha" style={{ display: 'none' }} tabIndex={-1} />

        <button
          type="submit"
          className="btn-glow inline-flex items-center gap-2 font-mono text-sm font-medium px-5 py-2.5 rounded"
        >
          send message <span aria-hidden>→</span>
        </button>
      </form>

      <p
        className="mt-10 font-mono text-[11px]"
        style={{ color: 'var(--text-faint)' }}
      >
        {'// form powered by formspree. no tracking, no newsletter, no spam.'}
      </p>
    </div>
  )
}

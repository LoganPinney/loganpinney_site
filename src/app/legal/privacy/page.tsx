import type { Metadata } from 'next'
import { siteConfig } from '@/config/site.config'

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'Privacy policy for loganpinney.com.',
}

const glow = siteConfig.effects.glowText ? 'glow-text' : ''

export default function PrivacyPage() {
  return (
    <div className="max-w-3xl mx-auto px-6 sm:px-8 py-20">
      <header className="mb-12">
        <p
          className={`font-mono text-xs uppercase tracking-widest mb-4 ${glow}`}
          style={{ color: 'var(--accent)' }}
        >
          {'// legal'}
        </p>
        <h1 className="text-4xl font-medium tracking-tight text-white mb-3">
          Privacy Policy
        </h1>
        <p className="font-mono text-xs" style={{ color: 'var(--text-faint)' }}>
          Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
        </p>
      </header>

      <div className="space-y-6 leading-relaxed" style={{ color: '#ccc' }}>
        <section>
          <h2 className="text-xl font-medium text-white mb-2">Overview</h2>
          <p>
            This privacy policy describes how loganpinney.com (the &quot;Site&quot;)
            handles information about visitors. The Site is intentionally minimal —
            there is no analytics tracking, no advertising, and no newsletter.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-medium text-white mb-2">Information Collected</h2>
          <p>
            If you submit the contact form, the name, email address, and message you
            provide are sent via Formspree to my email inbox. This information is used
            solely to respond to your message.
          </p>
          <p className="mt-3">
            Standard server logs (maintained by the hosting provider) may include IP
            addresses and request metadata for security and operational purposes.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-medium text-white mb-2">Third-Party Services</h2>
          <p>The Site uses the following third-party services:</p>
          <ul className="mt-3 space-y-1.5 text-sm" style={{ color: 'var(--text-dim)' }}>
            <li className="flex gap-2">
              <span style={{ color: 'var(--accent)' }} aria-hidden>›</span>
              <span><strong>Vercel</strong> — hosting and edge delivery</span>
            </li>
            <li className="flex gap-2">
              <span style={{ color: 'var(--accent)' }} aria-hidden>›</span>
              <span><strong>Formspree</strong> — contact form handling</span>
            </li>
            <li className="flex gap-2">
              <span style={{ color: 'var(--accent)' }} aria-hidden>›</span>
              <span><strong>Google Fonts</strong> — font delivery (self-hosted via Next.js)</span>
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-medium text-white mb-2">Cookies</h2>
          <p>
            The Site does not set any tracking cookies. Your browser may receive
            technical cookies from Vercel or Formspree as part of their standard
            operation.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-medium text-white mb-2">Your Rights</h2>
          <p>
            You can request deletion of any personal information you&apos;ve sent via
            the contact form by emailing{' '}
            <a
              href={`mailto:${siteConfig.identity.email}`}
              className="underline hover:no-underline"
              style={{ color: 'var(--accent)' }}
            >
              {siteConfig.identity.email}
            </a>
            .
          </p>
        </section>

        <section>
          <h2 className="text-xl font-medium text-white mb-2">Changes</h2>
          <p>
            This policy may be updated from time to time. The &quot;Last updated&quot;
            date at the top reflects the most recent revision.
          </p>
        </section>
      </div>
    </div>
  )
}

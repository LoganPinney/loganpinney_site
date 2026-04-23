import type { Metadata } from 'next'
import { siteConfig } from '@/config/site.config'

export const metadata: Metadata = {
  title: 'Terms of Use',
  description: 'Terms of use for loganpinney.com.',
}

const glow = siteConfig.effects.glowText ? 'glow-text' : ''

export default function TermsPage() {
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
          Terms of Use
        </h1>
        <p className="font-mono text-xs" style={{ color: 'var(--text-faint)' }}>
          Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
        </p>
      </header>

      <div className="space-y-6 leading-relaxed" style={{ color: '#ccc' }}>
        <section>
          <h2 className="text-xl font-medium text-white mb-2">Acceptance of Terms</h2>
          <p>
            By accessing or using loganpinney.com (the &quot;Site&quot;), you agree to
            be bound by these Terms of Use. If you do not agree, please discontinue use
            of the Site.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-medium text-white mb-2">Use of the Site</h2>
          <p>
            The Site is provided for informational purposes and as a portfolio of
            professional work. Content may be updated, modified, or removed at any time
            without notice.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-medium text-white mb-2">Intellectual Property</h2>
          <p>
            All content on this Site — including text, graphics, code samples, and
            design — is the intellectual property of {siteConfig.identity.name} unless
            otherwise indicated. Reproduction, redistribution, or commercial use
            without prior written consent is prohibited.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-medium text-white mb-2">No Warranty</h2>
          <p>
            The Site is provided &quot;as is&quot; without warranties of any kind. No
            guarantee is made regarding the accuracy, completeness, or availability
            of content.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-medium text-white mb-2">Third-Party Links</h2>
          <p>
            The Site may contain links to third-party websites. These links are
            provided for convenience only. I am not responsible for the content or
            practices of any third-party sites.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-medium text-white mb-2">Contact</h2>
          <p>
            For questions about these terms, contact{' '}
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
      </div>
    </div>
  )
}

import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Terms of Service',
  description: 'Terms of service for loganpinney.com',
}

export default function TermsPage() {
  return (
    <div className="max-w-3xl mx-auto px-6 sm:px-8 py-16">
      <div className="font-mono text-xs uppercase tracking-widest text-[var(--color-accent)] mb-4">
        {'// legal'}
      </div>
      <h1 className="text-4xl font-medium tracking-tight text-white mb-2">
        Terms of Service
      </h1>
      <p className="font-mono text-xs text-neutral-500 mb-10">
        Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
      </p>

      <div className="space-y-8 text-neutral-300 leading-relaxed">
        <section>
          <h2 className="text-xl font-medium text-white mb-3">1. Overview</h2>
          <p>
            loganpinney.com is the personal website of Logan Pinney. By accessing
            or using this site, you agree to the terms described below.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-medium text-white mb-3">2. Content</h2>
          <p>
            All written content, code snippets, and visual material on this site
            are the property of Logan Pinney unless otherwise noted. You may read,
            share, and reference this content with attribution, but may not
            republish it in full without permission.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-medium text-white mb-3">3. No professional advice</h2>
          <p>
            Content on this site is provided for informational purposes only.
            Nothing here constitutes legal, financial, or formal technical advice.
            For specific guidance on your situation, reach out directly.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-medium text-white mb-3">4. Third-party links</h2>
          <p>
            This site may link to third-party websites. I&apos;m not responsible for
            the content or practices of those sites.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-medium text-white mb-3">5. Changes</h2>
          <p>
            These terms may be updated at any time. Continued use of the site
            after changes constitutes acceptance of the updated terms.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-medium text-white mb-3">6. Contact</h2>
          <p>
            Questions about these terms? Email{' '}
            <a
              href="mailto:info@loganpinney.com"
              className="text-[var(--color-accent)] hover:underline"
            >
              info@loganpinney.com
            </a>
            .
          </p>
        </section>
      </div>
    </div>
  )
}

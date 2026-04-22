import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'Privacy policy for loganpinney.com',
}

export default function PrivacyPage() {
  return (
    <div className="max-w-3xl mx-auto px-6 sm:px-8 py-16">
      <div className="font-mono text-xs uppercase tracking-widest text-[var(--color-accent)] mb-4">
        {'// legal'}
      </div>
      <h1 className="text-4xl font-medium tracking-tight text-white mb-2">
        Privacy Policy
      </h1>
      <p className="font-mono text-xs text-neutral-500 mb-10">
        Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
      </p>

      <div className="space-y-8 text-neutral-300 leading-relaxed">
        <section>
          <h2 className="text-xl font-medium text-white mb-3">The short version</h2>
          <p>
            I don&apos;t sell your data. I don&apos;t run invasive tracking. If you email
            me, I read it and only use that information to reply.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-medium text-white mb-3">What I collect</h2>
          <ul className="space-y-3">
            <li className="flex gap-3">
              <span className="text-[var(--color-accent)] font-mono shrink-0 mt-1">▸</span>
              <span>
                <span className="text-white font-medium">Contact form submissions:</span>{' '}
                Your name, email, and message — used only to reply to you.
              </span>
            </li>
            <li className="flex gap-3">
              <span className="text-[var(--color-accent)] font-mono shrink-0 mt-1">▸</span>
              <span>
                <span className="text-white font-medium">Analytics:</span>{' '}
                Basic, privacy-respecting analytics to understand traffic patterns.
                No personal profiles, no cross-site tracking.
              </span>
            </li>
            <li className="flex gap-3">
              <span className="text-[var(--color-accent)] font-mono shrink-0 mt-1">▸</span>
              <span>
                <span className="text-white font-medium">Server logs:</span>{' '}
                Standard request logs retained briefly for security and debugging.
              </span>
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-medium text-white mb-3">Third-party services</h2>
          <p>
            This site uses a small number of trusted services — hosting (Vercel),
            form delivery (Formspree), and font hosting (Google Fonts). Each has
            its own privacy policy.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-medium text-white mb-3">Your rights</h2>
          <p>
            You can request that I delete any information you&apos;ve sent me at any
            time. Email{' '}
            <a
              href="mailto:info@loganpinney.com"
              className="text-[var(--color-accent)] hover:underline"
            >
              info@loganpinney.com
            </a>{' '}
            and I&apos;ll handle it promptly.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-medium text-white mb-3">Changes</h2>
          <p>
            If this policy changes materially, I&apos;ll update the &ldquo;last updated&rdquo;
            date at the top.
          </p>
        </section>
      </div>
    </div>
  )
}

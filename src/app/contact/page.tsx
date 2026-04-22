import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Contact',
  description:
    'Get in touch with Logan Pinney for data systems architecture, workflow automation, and integration consulting.',
}

export default function ContactPage() {
  return (
    <div className="max-w-2xl mx-auto px-6 sm:px-8 py-16">
      <div className="font-mono text-xs uppercase tracking-widest text-[var(--color-accent)] mb-4">
        {'// contact'}
      </div>
      <h1 className="text-4xl sm:text-5xl font-medium tracking-tight text-white mb-6">
        Let&apos;s talk
      </h1>
      <p className="text-lg text-neutral-400 leading-relaxed mb-12">
        The fastest way to reach me is email. I read everything and reply to
        anything that looks like a real conversation.
      </p>

      {/* Primary contact card */}
      <div className="bg-neutral-950 border border-neutral-800 rounded-md p-6 mb-8">
        <div className="space-y-4 font-mono text-sm">
          <ContactRow
            label="email"
            value="info@loganpinney.com"
            href="mailto:info@loganpinney.com"
          />
          <ContactRow
            label="linkedin"
            value="linkedin.com/in/logan-pinney"
            href="https://www.linkedin.com/in/logan-pinney-6954a4195/"
          />
          <ContactRow
            label="location"
            value="Calgary, Alberta · remote-first"
          />
          <ContactRow
            label="status"
            value="open to select contracts"
            success
          />
        </div>
      </div>

      {/* What makes a good fit */}
      <div className="mb-12">
        <h2 className="font-mono text-xs uppercase tracking-widest text-[var(--color-accent)] mb-4">
          {'// good fits'}
        </h2>
        <ul className="space-y-2 text-neutral-400 text-sm leading-relaxed">
          <li className="flex gap-3">
            <span className="text-[var(--color-success)] font-mono shrink-0">✓</span>
            <span>
              Teams drowning in spreadsheets that need to become real systems
            </span>
          </li>
          <li className="flex gap-3">
            <span className="text-[var(--color-success)] font-mono shrink-0">✓</span>
            <span>
              Workflow automation across Airtable, Workato, Google Workspace, and APIs
            </span>
          </li>
          <li className="flex gap-3">
            <span className="text-[var(--color-success)] font-mono shrink-0">✓</span>
            <span>
              Architecture reviews and data governance for operational systems
            </span>
          </li>
          <li className="flex gap-3">
            <span className="text-[var(--color-success)] font-mono shrink-0">✓</span>
            <span>
              Integration design and API orchestration between tools
            </span>
          </li>
        </ul>
      </div>

      {/* Simple form */}
      <div>
        <h2 className="font-mono text-xs uppercase tracking-widest text-[var(--color-accent)] mb-6">
          {'// or send a message'}
        </h2>
        <form
          action="https://formspree.io/f/xlgaodlk"
          method="POST"
          className="space-y-5"
        >
          <div>
            <label
              htmlFor="name"
              className="block font-mono text-xs uppercase tracking-widest text-neutral-500 mb-2"
            >
              name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              required
              className="w-full bg-neutral-950 border border-neutral-800 rounded-md px-3 py-2.5 text-neutral-200 font-mono text-sm focus:border-[var(--color-accent)] focus:outline-none transition"
            />
          </div>
          <div>
            <label
              htmlFor="email"
              className="block font-mono text-xs uppercase tracking-widest text-neutral-500 mb-2"
            >
              email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              className="w-full bg-neutral-950 border border-neutral-800 rounded-md px-3 py-2.5 text-neutral-200 font-mono text-sm focus:border-[var(--color-accent)] focus:outline-none transition"
            />
          </div>
          <div>
            <label
              htmlFor="message"
              className="block font-mono text-xs uppercase tracking-widest text-neutral-500 mb-2"
            >
              message
            </label>
            <textarea
              id="message"
              name="message"
              required
              rows={5}
              className="w-full bg-neutral-950 border border-neutral-800 rounded-md px-3 py-2.5 text-neutral-200 font-mono text-sm focus:border-[var(--color-accent)] focus:outline-none transition resize-none"
            />
          </div>
          <button
            type="submit"
            className="inline-flex items-center gap-2 bg-[var(--color-accent)] text-neutral-950 font-mono text-sm font-medium px-5 py-2.5 rounded hover:bg-[var(--color-accent-dim)] hover:text-white transition"
          >
            send message <span aria-hidden>→</span>
          </button>
        </form>
        <p className="mt-4 font-mono text-[11px] text-neutral-600">
          No list. No spam. I just reply.
        </p>
      </div>
    </div>
  )
}

function ContactRow({
  label,
  value,
  href,
  success = false,
}: {
  label: string
  value: string
  href?: string
  success?: boolean
}) {
  const valueClass = success
    ? 'text-[var(--color-success)]'
    : 'text-[var(--color-accent)]'

  return (
    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-1 sm:gap-4 py-2 border-b border-neutral-900 last:border-b-0">
      <span className="text-neutral-500 uppercase text-[11px] tracking-widest">
        {label}
      </span>
      {href ? (
        <a
          href={href}
          target={href.startsWith('http') ? '_blank' : undefined}
          rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
          className={`${valueClass} hover:underline`}
        >
          {value}
        </a>
      ) : (
        <span className={valueClass}>{value}</span>
      )}
    </div>
  )
}

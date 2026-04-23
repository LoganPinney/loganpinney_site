import type { Metadata } from 'next'
import Link from 'next/link'
import { siteConfig } from '@/config/site.config'

export const metadata: Metadata = {
  title: 'About',
  description:
    'Logan Pinney — data systems architect. Background, credentials, and how I approach building reliable operational systems.',
}

const glow = siteConfig.effects.glowText ? 'glow-text' : ''

const principles = [
  {
    t: 'Systems over scripts',
    d: 'A one-off script fixes a problem once. A system makes the problem stop existing. I design for the second one.',
  },
  {
    t: 'Boring when it should be',
    d: 'Operational infrastructure should be predictable. Interesting architecture almost always means fragile architecture.',
  },
  {
    t: 'Governance is a feature',
    d: 'Data without access controls, audit logs, and ownership decays fast. I build those in from day one.',
  },
  {
    t: 'Useful beats clever',
    d: 'The goal is always the operator who has to run the thing at 2am, not my ego about the implementation.',
  },
]

const credentials = [
  {
    period: '2024 — present',
    role: 'Data Systems Architect · Independent',
    detail:
      'Building automation and integration systems for events, talent ops, and compliance workflows. Part-time contract with Riot Games.',
  },
  {
    period: '2022 — 2024',
    role: 'Unreal Authorized Instructor · Epic Games',
    detail:
      "Built Epic Games' flagship Coursera course on Unreal Engine fundamentals.",
  },
  {
    period: '2021 — 2024',
    role: 'Lead Instructor · CG Spectrum',
    detail:
      'Mentored thousands of students through Unreal Engine training programs.',
  },
  {
    period: '2022 — 2024',
    role: 'Ambassador & QA · KitBash3D',
    detail:
      'QA on 40+ production-ready asset kits for games, film, and virtual production.',
  },
  {
    period: '—',
    role: 'B.Sc. Computer Science · Queen\'s University',
    detail: '',
  },
]

export default function AboutPage() {
  return (
    <div className="max-w-5xl mx-auto px-6 sm:px-8 py-20">
      <header className="mb-16">
        <p
          className={`font-mono text-xs uppercase tracking-widest mb-4 ${glow}`}
          style={{ color: 'var(--accent)' }}
        >
          {'// about'}
        </p>
        <h1 className="text-4xl sm:text-5xl font-medium tracking-tight text-white mb-6">
          About
        </h1>
      </header>

      {/* Bio */}
      <section className="mb-20 max-w-3xl space-y-5 text-lg leading-relaxed" style={{ color: '#ccc' }}>
        <p>
          I&apos;m Logan — a data systems architect based in Calgary. I design, build,
          and rebuild the operational systems that teams and companies depend on every
          day. Automation pipelines, integration architectures, the governance layers
          that keep data clean, auditable, and reliable at scale.
        </p>
        <p>
          My background is unusual for the work I do now. I spent years as an Unreal
          Authorized Instructor with Epic Games, built their flagship Coursera course
          on real-time 3D, and mentored thousands of students through CG Spectrum.
          That work taught me how complex systems actually fail — and how to design
          curriculum, tooling, and pipelines that are genuinely useful under pressure.
        </p>
        <p>
          These days, I&apos;m applying that same systems thinking to operational data
          infrastructure. I&apos;m currently doing a part-time contract with Riot Games,
          continuing work I&apos;ve been doing independently across events, compliance,
          talent ops, and automation.
        </p>
      </section>

      {/* Credentials */}
      <section className="mb-20">
        <h2
          className={`font-mono text-xs uppercase tracking-widest mb-8 ${glow}`}
          style={{ color: 'var(--accent)' }}
        >
          {'// credentials'}
        </h2>
        <div className="space-y-5">
          {credentials.map((c) => (
            <div
              key={c.role}
              className="flex flex-col sm:flex-row sm:gap-8"
              style={{ borderBottom: '1px solid var(--border)' }}
            >
              <div
                className="font-mono text-xs sm:w-40 sm:shrink-0 mb-1 sm:mb-0 pt-1"
                style={{ color: 'var(--text-faint)' }}
              >
                {c.period}
              </div>
              <div className="pb-5">
                <div className="text-white font-medium mb-1">{c.role}</div>
                {c.detail && (
                  <div className="text-sm leading-relaxed" style={{ color: 'var(--text-dim)' }}>
                    {c.detail}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Principles */}
      <section className="mb-20">
        <h2
          className={`font-mono text-xs uppercase tracking-widest mb-8 ${glow}`}
          style={{ color: 'var(--accent)' }}
        >
          {'// principles'}
        </h2>
        <div className="grid gap-4 sm:grid-cols-2">
          {principles.map((p) => (
            <div
              key={p.t}
              className="rounded-md p-6"
              style={{
                background: 'var(--bg-card)',
                border: '1px solid var(--border)',
              }}
            >
              <h3 className="text-white font-medium mb-2">{p.t}</h3>
              <p className="text-sm leading-relaxed" style={{ color: 'var(--text-dim)' }}>
                {p.d}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="pt-10" style={{ borderTop: '1px solid var(--border)' }}>
        <Link
          href="/contact"
          className="btn-glow inline-flex items-center gap-2 font-mono text-sm font-medium px-5 py-2.5 rounded"
        >
          get in touch <span aria-hidden>→</span>
        </Link>
      </section>
    </div>
  )
}

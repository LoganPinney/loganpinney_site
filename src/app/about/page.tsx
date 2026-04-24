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
    d: 'If it needs to be fixed twice, it was not designed properly.',
  },
  {
    t: 'Boring wins',
    d: 'Reliable systems beat clever ones. Every time.',
  },
  {
    t: 'Governance is not optional',
    d: 'Without ownership, access, and audit, systems decay.',
  },
  {
    t: 'Built for operators',
    d: 'If it fails at 2am, it is a bad system.',
  },
]

const credentials = [
  {
    role: 'Data Systems Architect',
    detail:
      'Operational automation, integrations, and governance systems. Current contract with Riot Games.',
  },
  {
    role: 'Unreal Authorized Instructor, Epic Games',
    detail:
      "Authour of Epic Games' flagship Unreal Engine Coursera certifcate program.",
  },
  {
    role: 'Instructor & Content Creation, CG Spectrum',
    detail: 'Mentored thousands of developers across production workflows.',
  },
  {
    role: 'Ambassador and QA, KitBash3D',
    detail: 'QA on 50 plus 3D model production asset kits used for games and film.',
  },
  {
    role: "B.Sc. Computer Science, Queen's University",
    detail: 'Specialty: Biomedical Computing',
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
      <section
        className="mb-20 max-w-3xl space-y-5 text-lg leading-relaxed"
        style={{ color: '#ccc' }}
      >
        <p>I rebuild operational systems that break under real world pressure.</p>

        <p>
          Most teams do not have a tooling problem. They have a structure problem.
          Bad schemas, unclear ownership, and fragile automations turn workflows
          into liabilities.
        </p>

        <p>
          I fix that at the foundation. Data models, orchestration, validation,
          permissions, and failure handling. Systems that run reliably at scale.
        </p>

        <p>
          Before this, I designed and taught complex technical systems.
          I built part of Epic Games’ flagship Unreal Engine Game Design Certificate course and mentored thousands
          of developers on Unreal Engine fundamentals. That work was never about games. It was about understanding
          how systems fail when real people use them and how to teach them to others in a simple way.
        </p>

        <p>
          Today I apply that same thinking to operations. Events, compliance,
          staffing, and data infrastructure. Rebuilding automation pipelines and operational workflows to reduce man hours and friction.
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
              className="pb-5"
              style={{ borderBottom: '1px solid var(--border)' }}
            >
              <div className="text-white font-medium mb-1">{c.role}</div>
              {c.detail && (
                <div
                  className="text-sm leading-relaxed"
                  style={{ color: 'var(--text-dim)' }}
                >
                  {c.detail}
                </div>
              )}
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
              <p
                className="text-sm leading-relaxed"
                style={{ color: 'var(--text-dim)' }}
              >
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
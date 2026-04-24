import type { Metadata } from 'next'
import Link from 'next/link'
import { siteConfig } from '@/config/site.config'

export const metadata: Metadata = {
  title: 'Work',
  description:
    'Selected projects in data systems architecture, automation, and real-time 3D education.',
}

const glow = siteConfig.effects.glowText ? 'glow-text' : ''

const projects = [
  {
    href: 'https://www.riotgames.com/en',
    tag: 'contract · riot games',
    period: 'ongoing',
    title: 'Data Systems & Automation',
    context:
      'Designing and building the operational backbone for events, talent operations, and multi-team coordination.',
    work: [
      'Immigration & compliance tracking across contractors and talent',
      'RFP pipelines and vendor coordination workflows',
      'Staffing / player data collection & automation with fillable forms and validation',
      'Budget tracking, room blocks, ticketing flows',
    ],
    stack: ['Airtable', 'Workato', 'Google Apps Script', 'Google Workspace', 'Webhooks'],
    note:
      'Currently extending this practice into a part-time contract with Riot Games.',
    cta: 'company site',
  },
  {
    href: 'https://www.coursera.org/learn/unreal-engine-fundamentals?specialization=epic-games-game-design-professional-certificate',
    tag: 'epic games · coursera',
    period: 'shipped',
    title: 'Unreal Engine Mentor & Educator',
    context:
      'Before moving deeper into systems architecture, I spent years building technical education infrastructure in real-time 3D.',
    work: [
      'Designed full course curriculum and learning outcomes for Coursera’s Unreal Engine Fundamentals course',
      'Built hands-on project-based modules for beginners',
      'Produced video lectures, demos, and assessments viewed by 15,000+ students',
      'Created production-facing training that had to be clear, repeatable, and usable',
    ],
    stack: ['Unreal Engine', 'Blueprints', 'World-Building', 'Course Design'],
    cta: 'course',
  },
  {
    href: 'https://www.cgspectrum.com/',
    tag: 'cg spectrum',
    period: 'delivered',
    title: 'Unreal Engine Authorized Instructor, Gold Tier',
    context:
      'Mentored thousands of students through industry-ready Unreal Engine training programs.',
    work: [
      'Delivered live cohort-based instruction and dozens of hours in asynchronous learning content',
      'Built and iterated on curriculum: Introduction to Unreal Engine, Animation, World Building',
      'Provided 1:1 and small-group mentorship',
      'Gold-level Authorized Instructor for 3+ years',
    ],
    stack: ['Unreal Engine', 'Real-Time 3D', 'Curriculum Design', 'Mentorship'],
    cta: 'school site',
  },
  {
    href: 'https://kitbash3d.com/',
    tag: 'kitbash3d',
    period: 'ongoing',
    title: 'Brand Ambassador & QA',
    context:
      'Quality assurance and community presence for production-ready asset kits used in games, film, and virtual production.',
    work: [
      'QA on real-time optimized asset kits',
      'Community demos and technical walkthroughs',
      'Feedback loop with production team on kit improvements',
      '50+ production-ready asset kits reviewed',
    ],
    stack: ['Unreal Engine', 'Real-Time 3D', 'Asset QA'],
    cta: 'company site',
  },
]

export default function WorkPage() {
  return (
    <div className="max-w-5xl mx-auto px-6 sm:px-8 py-20">
      <header className="mb-16">
        <p
          className={`font-mono text-xs uppercase tracking-widest mb-4 ${glow}`}
          style={{ color: 'var(--accent)' }}
        >
          {'// work'}
        </p>

        <h1 className="text-4xl sm:text-5xl font-medium tracking-tight text-white mb-4">
          Selected work
        </h1>

        <p className="max-w-2xl leading-relaxed" style={{ color: 'var(--text-dim)' }}>
          A focused look at the projects and contracts where I&apos;ve built or rebuilt
          operational systems — from data automation to real-time 3D education.
        </p>
      </header>

      <div className="space-y-10">
        {projects.map((p) => (
          <Link
            key={p.title}
            href={p.href}
            target="_blank"
            rel="noopener noreferrer"
            className="group block rounded-md focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]"
          >
            <article
              className="relative rounded-md p-7 overflow-hidden transition-all duration-200 group-hover:-translate-y-1"
              style={{
                background: 'var(--bg-card)',
                border: '1px solid var(--border)',
              }}
            >
              <div
                className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-200 group-hover:opacity-100"
                style={{
                  background:
                    'linear-gradient(135deg, rgba(255,255,255,0.035), transparent 45%)',
                }}
              />

              <div className="relative">
                <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
                  <span
                    className={`font-mono text-[10px] uppercase tracking-widest ${glow}`}
                    style={{ color: 'var(--accent)' }}
                  >
                    {p.tag}
                  </span>

                  <span
                    className="font-mono text-[10px]"
                    style={{ color: 'var(--text-faint)' }}
                  >
                    {p.period}
                  </span>
                </div>

                <h2 className="text-2xl font-medium text-white mb-3 tracking-tight transition-colors duration-200 group-hover:text-[var(--accent)]">
                  {p.title}
                </h2>

                <p className="leading-relaxed mb-5" style={{ color: '#ccc' }}>
                  {p.context}
                </p>

                <ul className="space-y-1.5 mb-5 text-sm" style={{ color: 'var(--text-dim)' }}>
                  {p.work.map((w) => (
                    <li key={w} className="flex gap-2">
                      <span style={{ color: 'var(--accent)' }} aria-hidden>
                        ›
                      </span>
                      <span>{w}</span>
                    </li>
                  ))}
                </ul>

                <div className="flex flex-wrap gap-2">
                  {p.stack.map((s) => (
                    <span
                      key={s}
                      className="font-mono text-[11px] px-2.5 py-1 rounded border transition-colors duration-200"
                      style={{
                        background: 'var(--bg)',
                        borderColor: 'var(--border-hover)',
                        color: '#bbb',
                      }}
                    >
                      {s}
                    </span>
                  ))}
                </div>

                {p.note && (
                  <p
                    className={`mt-5 font-mono text-xs ${glow}`}
                    style={{ color: 'var(--accent)' }}
                  >
                    {'// ' + p.note}
                  </p>
                )}

                <div className="mt-6 flex items-center justify-between">
                  <span
                    className="font-mono text-xs transition-colors duration-200"
                    style={{ color: 'var(--text-faint)' }}
                  >
                    {p.cta}
                  </span>

                  <span
                    className="font-mono text-sm transition-transform duration-200 group-hover:translate-x-1"
                    style={{ color: 'var(--accent)' }}
                    aria-hidden
                  >
                    →
                  </span>
                </div>
              </div>
            </article>
          </Link>
        ))}
      </div>

      <div className="mt-16 pt-10" style={{ borderTop: '1px solid var(--border)' }}>
        <Link
          href="/contact"
          className="btn-glow inline-flex items-center gap-2 font-mono text-sm font-medium px-5 py-2.5 rounded"
        >
          discuss a project <span aria-hidden>→</span>
        </Link>
      </div>
    </div>
  )
}
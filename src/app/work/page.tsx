import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Work',
  description:
    'Selected data systems and automation work by Logan Pinney — event operations, Epic Games, Coursera, and more.',
}

export default function WorkPage() {
  return (
    <div className="max-w-5xl mx-auto px-6 sm:px-8 py-16">
      <header className="mb-16">
        <div className="font-mono text-xs uppercase tracking-widest text-[var(--color-accent)] mb-4">
          {'// work'}
        </div>
        <h1 className="text-4xl sm:text-5xl font-medium tracking-tight text-white mb-6">
          Systems I&apos;ve built
        </h1>
        <p className="text-lg text-neutral-400 max-w-2xl leading-relaxed">
          I work across the seams — where messy operational realities meet clean
          data architecture. Here&apos;s a snapshot of what that looks like in practice.
        </p>
      </header>

      <div className="space-y-16">
        <Project
          tag="contract · data systems"
          period="2024 — present"
          title="Data Systems & Automation Architecture"
          summary="Architecting the automation and data infrastructure for global event operations — immigration compliance, logistics, finance, and staffing. Currently extending this practice into a part-time contract with Riot Games."
          responsibilities={[
            'Workflow architecture: end-to-end ops flows across Airtable, Google Sheets, and Workato',
            'Systems integration: APIs, webhooks, transformation logic, retry & alerting frameworks',
            'Operational domains: immigration tracking, hotel block management, RFP pipelines, staffing data, ticketing, URL generation, form collection, budget tracking',
            'Data governance: schemas, relational structures, permissions, validation frameworks',
            'Reliability: monitoring, SLAs, automated QA checks to prevent regressions',
          ]}
          highlights={[
            { label: 'Airtable', kind: 'tech' },
            { label: 'Workato', kind: 'tech' },
            { label: 'Google Apps Script', kind: 'tech' },
            { label: 'Python', kind: 'tech' },
            { label: 'REST / Webhooks', kind: 'tech' },
          ]}
        />

        <Project
          tag="epic games · coursera"
          period="2022 — 2024"
          title="Unreal Engine Fundamentals"
          summary="Flagship Coursera course on real-time 3D development, part of the Epic Games Game Design Professional Certificate."
          responsibilities={[
            'Designed curriculum from scratch for beginner real-time 3D learners',
            'Delivered on-camera instruction and production',
            'High learner ratings; continues to run as a foundational course in the program',
          ]}
        />

        <Project
          tag="cg spectrum"
          period="2021 — 2024"
          title="Unreal Engine Authorized Instructor"
          summary="Mentored thousands of students through industry-ready Unreal Engine training programs spanning virtual production, game dev, and real-time pipelines."
          responsibilities={[
            'Live cohort instruction for beginner through advanced Unreal Engine courses',
            'Curriculum contribution and review',
            'One-on-one mentorship and portfolio review',
          ]}
        />

        <Project
          tag="kitbash3d"
          period="2022 — 2024"
          title="Ambassador & QA"
          summary="Quality assurance on production-ready asset kits used for world-building in games, film, and virtual production."
          responsibilities={[
            'QA reviewed 40+ commercial asset kits',
            'Validated shader, material, and pipeline behavior across Unreal Engine versions',
            'Represented the KitBash3D community as an ambassador',
          ]}
        />
      </div>

      <div className="mt-24 pt-12 border-t border-neutral-900">
        <h2 className="text-2xl font-medium text-white mb-4">
          Interested in working together?
        </h2>
        <p className="text-neutral-400 mb-6 max-w-xl">
          I take on a small number of contracts where the problem is a good fit.
          If you&apos;ve got a messy system that needs rethinking, let&apos;s talk.
        </p>
        <Link
          href="/contact"
          className="inline-flex items-center gap-2 bg-[var(--color-accent)] text-neutral-950 font-mono text-sm font-medium px-5 py-2.5 rounded hover:bg-[var(--color-accent-dim)] hover:text-white transition"
        >
          start a conversation <span aria-hidden>→</span>
        </Link>
      </div>
    </div>
  )
}

function Project({
  tag,
  period,
  title,
  summary,
  responsibilities,
  highlights,
}: {
  tag: string
  period: string
  title: string
  summary: string
  responsibilities: string[]
  highlights?: { label: string; kind: 'tech' }[]
}) {
  return (
    <article className="bg-neutral-950 border border-neutral-800 rounded-md p-6 sm:p-8">
      <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
        <span className="font-mono text-[10px] uppercase tracking-widest text-[var(--color-accent)]">
          {tag}
        </span>
        <span className="font-mono text-[10px] text-neutral-600">{period}</span>
      </div>
      <h2 className="text-2xl sm:text-3xl font-medium text-white mb-3">
        {title}
      </h2>
      <p className="text-neutral-300 leading-relaxed mb-6">{summary}</p>

      <ul className="space-y-2 mb-6">
        {responsibilities.map((r, i) => (
          <li key={i} className="flex gap-3 text-sm text-neutral-400 leading-relaxed">
            <span className="text-[var(--color-accent)] font-mono shrink-0 mt-0.5">
              ▸
            </span>
            <span>{r}</span>
          </li>
        ))}
      </ul>

      {highlights && highlights.length > 0 && (
        <div className="flex flex-wrap gap-2 pt-4 border-t border-neutral-900">
          {highlights.map((h) => (
            <span
              key={h.label}
              className="font-mono text-xs px-2.5 py-1 rounded border border-neutral-800 text-neutral-300 bg-neutral-950"
            >
              {h.label}
            </span>
          ))}
        </div>
      )}
    </article>
  )
}

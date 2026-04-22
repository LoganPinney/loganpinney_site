import Link from 'next/link'
import Terminal from '@/components/Terminal'

export default function HomePage() {
  return (
    <div className="max-w-5xl mx-auto px-6 sm:px-8">
      {/* HERO */}
      <section className="pt-20 pb-24">
        <div className="flex items-center gap-2 mb-6">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--color-success)] opacity-60" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-[var(--color-success)]" />
          </span>
          <span className="font-mono text-[11px] uppercase tracking-widest text-[var(--color-success)]">
            available for select contracts
          </span>
        </div>

        <h1 className="text-5xl sm:text-6xl font-medium tracking-tight text-white leading-[1.05] mb-4">
          Logan Pinney
        </h1>

        <p className="font-mono text-base text-neutral-400 mb-8">
          Data Systems Architect{' '}
          <span className="text-neutral-600">·</span>{' '}
          <span className="text-[var(--color-accent)]">Riot Games</span>
        </p>

        <p className="text-lg text-neutral-300 leading-relaxed max-w-2xl mb-10">
          I design the systems that make complex operations actually work —
          automation pipelines, integration architectures, and the governance
          layers that keep them reliable at scale. Part engineer, part
          strategist, full-stack problem solver.
        </p>

        <div className="flex flex-wrap gap-3">
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 bg-[var(--color-accent)] text-neutral-950 font-mono text-sm font-medium px-5 py-2.5 rounded hover:bg-[var(--color-accent-dim)] hover:text-white transition"
          >
            get in touch
            <span aria-hidden>→</span>
          </Link>
          <Link
            href="/work"
            className="inline-flex items-center gap-2 border border-neutral-700 text-neutral-200 font-mono text-sm px-5 py-2.5 rounded hover:border-neutral-500 hover:bg-neutral-900 transition"
          >
            view my work
          </Link>
        </div>

        <Terminal />
      </section>

      {/* SELECTED WORK */}
      <section className="py-16 border-t border-neutral-900">
        <div className="flex items-baseline justify-between mb-8">
          <h2 className="font-mono text-xs uppercase tracking-widest text-[var(--color-accent)]">
            {'// selected work'}
          </h2>
          <Link
            href="/work"
            className="font-mono text-xs text-neutral-500 hover:text-neutral-200 transition"
          >
            see all →
          </Link>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <WorkCard
            tag="riot games"
            title="Data Platform Architecture"
            body="Designing orchestration and tooling for operational data infrastructure at one of gaming's largest platforms."
            period="2025 — present"
          />
          <WorkCard
            tag="contract"
            title="Event Ops Data Systems"
            body="Architected automation for immigration compliance, RFP pipelines, staffing workflows, and budget coordination across global event operations."
            period="2024 — 2025"
          />
          <WorkCard
            tag="epic games · coursera"
            title="Unreal Engine Fundamentals"
            body="Designed and built the flagship Coursera course on real-time 3D development — part of Epic Games' certification program."
            period="2022 — 2024"
          />
          <WorkCard
            tag="cg spectrum"
            title="Authorized Instructor"
            body="Mentored thousands of students through industry-ready Unreal Engine training programs. Built curriculum, delivered live cohorts."
            period="2021 — 2024"
          />
        </div>
      </section>

      {/* STACK */}
      <section className="py-16 border-t border-neutral-900">
        <h2 className="font-mono text-xs uppercase tracking-widest text-[var(--color-accent)] mb-8">
          {'// stack'}
        </h2>

        <div className="space-y-6">
          <StackRow
            label="platforms"
            items={['Airtable', 'Workato', 'Google Workspace', 'BigQuery']}
          />
          <StackRow
            label="languages"
            items={['Python', 'JavaScript / TypeScript', 'SQL', 'Google Apps Script']}
          />
          <StackRow
            label="integrations"
            items={['REST APIs', 'Webhooks', 'OAuth flows', 'ETL orchestration']}
          />
          <StackRow
            label="focus areas"
            items={[
              'workflow automation',
              'systems integration',
              'data governance',
              'reliability & observability',
            ]}
            accent
          />
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 border-t border-neutral-900">
        <div className="max-w-2xl">
          <h2 className="text-3xl sm:text-4xl font-medium text-white mb-4 tracking-tight">
            Got a messy system that needs architecting?
          </h2>
          <p className="text-neutral-400 mb-8 leading-relaxed">
            I take on a limited number of contracts where I can help design, rebuild,
            or audit operational data systems. If that&apos;s what you need, let&apos;s talk.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 bg-[var(--color-accent)] text-neutral-950 font-mono text-sm font-medium px-5 py-2.5 rounded hover:bg-[var(--color-accent-dim)] hover:text-white transition"
          >
            start a conversation
            <span aria-hidden>→</span>
          </Link>
        </div>
      </section>
    </div>
  )
}

/* ---------- helpers ---------- */

function WorkCard({
  tag,
  title,
  body,
  period,
}: {
  tag: string
  title: string
  body: string
  period: string
}) {
  return (
    <article className="group bg-neutral-950 border border-neutral-800 rounded-md p-5 hover:border-neutral-700 transition">
      <div className="flex items-center justify-between mb-3">
        <span className="font-mono text-[10px] uppercase tracking-widest text-[var(--color-accent)]">
          {tag}
        </span>
        <span className="font-mono text-[10px] text-neutral-600">{period}</span>
      </div>
      <h3 className="text-white font-medium mb-2">{title}</h3>
      <p className="text-sm text-neutral-400 leading-relaxed">{body}</p>
    </article>
  )
}

function StackRow({
  label,
  items,
  accent = false,
}: {
  label: string
  items: string[]
  accent?: boolean
}) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center gap-3">
      <div className="font-mono text-[11px] uppercase tracking-widest text-neutral-500 sm:w-32 shrink-0">
        {label}
      </div>
      <div className="flex flex-wrap gap-2">
        {items.map((item) => (
          <span
            key={item}
            className={`font-mono text-xs px-2.5 py-1 rounded border ${
              accent
                ? 'text-[var(--color-accent)] border-[var(--color-accent)]/30 bg-[var(--color-accent)]/5'
                : 'text-neutral-300 border-neutral-800 bg-neutral-950'
            }`}
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  )
}

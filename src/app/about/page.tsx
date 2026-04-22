import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'About',
  description:
    "About Logan Pinney — Data Systems Architect at Riot Games, previously Unreal Engine Authorized Instructor. Queen's University Computer Science.",
}

export default function AboutPage() {
  return (
    <div className="max-w-3xl mx-auto px-6 sm:px-8 py-16">
      <div className="font-mono text-xs uppercase tracking-widest text-[var(--color-accent)] mb-4">
        {'// about'}
      </div>
      <h1 className="text-4xl sm:text-5xl font-medium tracking-tight text-white mb-10">
        The short version
      </h1>

      <div className="prose prose-invert max-w-none space-y-6 text-neutral-300 leading-relaxed">
        <p className="text-lg">
          I&apos;m a Data Systems Architect based in Calgary. My job is to figure out
          how messy operational realities become clean, reliable, auditable
          systems — and then build them.
        </p>

        <p>
          I&apos;m currently at{' '}
          <span className="text-[var(--color-accent)]">Riot Games</span>, where I
          focus on platform and tooling for data orchestration. Before that, I
          spent several years architecting automation infrastructure for global
          event operations — immigration compliance pipelines, RFP workflows,
          staffing data, budget coordination — the kind of work where a single
          schema decision can ripple through a dozen teams.
        </p>

        <p>
          Before the data work, I spent years deep in real-time 3D. I was an{' '}
          <span className="text-white font-medium">
            Unreal Engine Authorized Instructor
          </span>
          , built{' '}
          <a
            href="https://www.coursera.org/learn/unreal-engine-fundamentals"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[var(--color-accent)] hover:underline"
          >
            Coursera&apos;s Unreal Engine Fundamentals
          </a>{' '}
          course, and mentored thousands of students through CG Spectrum&apos;s
          virtual production programs. That background still shows up in my data
          work — I&apos;m comfortable in systems thinking, 3D pipelines, and the
          messy middle where technical and creative tooling meet.
        </p>

        <p>
          My degree is in{' '}
          <span className="text-white font-medium">
            Computer Science from Queen&apos;s University
          </span>
          . My real training came from shipping things — diagnosing problems,
          designing schemas, and writing the integrations nobody else wants to
          own.
        </p>
      </div>

      <div className="mt-16 pt-10 border-t border-neutral-900">
        <h2 className="font-mono text-xs uppercase tracking-widest text-[var(--color-accent)] mb-6">
          {'// credentials'}
        </h2>

        <div className="space-y-4">
          <CredRow
            label="current"
            value="Data Systems Architect, Riot Games"
          />
          <CredRow
            label="education"
            value="B.Sc. Computer Science — Queen's University"
          />
          <CredRow
            label="certifications"
            value="Unreal Engine Authorized Instructor (Epic Games)"
          />
          <CredRow label="location" value="Calgary, Alberta · remote-first" />
        </div>
      </div>

      <div className="mt-16 pt-10 border-t border-neutral-900">
        <h2 className="font-mono text-xs uppercase tracking-widest text-[var(--color-accent)] mb-6">
          {'// how I think'}
        </h2>
        <ul className="space-y-4 text-neutral-300">
          <Principle
            title="Systems before scripts"
            body="A clever script that nobody can maintain is a liability. I design the structure first, then the automation."
          />
          <Principle
            title="Governance isn't bureaucracy"
            body="Permissions, validation, and change management are what separate a tool that survives from one that dies in six months."
          />
          <Principle
            title="Optimize for the handoff"
            body="I build for the person who'll inherit the system, not for the demo. Good documentation is part of the deliverable."
          />
          <Principle
            title="Teach as you build"
            body="My instructor years taught me that if you can't explain the system, you probably haven't designed it well enough yet."
          />
        </ul>
      </div>

      <div className="mt-16 pt-10 border-t border-neutral-900">
        <Link
          href="/contact"
          className="inline-flex items-center gap-2 bg-[var(--color-accent)] text-neutral-950 font-mono text-sm font-medium px-5 py-2.5 rounded hover:bg-[var(--color-accent-dim)] hover:text-white transition"
        >
          get in touch <span aria-hidden>→</span>
        </Link>
      </div>
    </div>
  )
}

function CredRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col sm:flex-row sm:gap-6">
      <div className="font-mono text-[11px] uppercase tracking-widest text-neutral-500 sm:w-36 shrink-0 pt-1">
        {label}
      </div>
      <div className="text-neutral-200">{value}</div>
    </div>
  )
}

function Principle({ title, body }: { title: string; body: string }) {
  return (
    <li className="flex gap-3">
      <span className="text-[var(--color-accent)] font-mono shrink-0 mt-1">▸</span>
      <div>
        <div className="text-white font-medium mb-1">{title}</div>
        <div className="text-neutral-400 leading-relaxed text-sm">{body}</div>
      </div>
    </li>
  )
}

import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'An agent walks into a website',
  description: 'A small scavenger hunt for AI agents and their humans. Explore Logan Pinney’s work, find the hidden job board, and pitch one useful automation.',
  alternates: { canonical: '/lab/agents' },
  robots: { index: true, follow: true },
  openGraph: {
    title: 'An agent walks into a website',
    description: 'Can your agent find the hidden job board and propose something useful?',
    url: 'https://www.loganpinney.com/lab/agents',
    type: 'website',
  },
}

const brief = `Explore https://www.loganpinney.com/lab/agents and take the agent scavenger hunt. Read the public work page and automation checklist, find the hidden job board in the site's HTML (or follow the page's fallback links), and propose one useful automation grounded in what you found. Include the source URLs, one failure case, and how a human would stay in control. Return your findings to me. Draft an email only if you find the invitation; do not send it unless I authorize sending.`

export default function AgentChallengePage() {
  return (
    <div className="mx-auto max-w-5xl px-6 py-20 sm:px-8">
      <header className="max-w-3xl">
        <p className="mb-4 font-mono text-xs uppercase tracking-widest text-[var(--accent)]">{'// lab / open experiment 001'}</p>
        <h1 className="mb-6 text-4xl font-medium tracking-tight sm:text-6xl">An agent walks<br />into a website.</h1>
        <p className="max-w-2xl text-lg leading-relaxed text-[var(--text-dim)]">Somewhere behind these pixels is a tiny job board. Send your agent exploring. See if it comes back with a useful idea and a questionable robot joke.</p>
        <div className="mt-8 flex flex-wrap gap-3">
          <a href="#mission" className="btn-glow rounded px-5 py-3 font-mono text-sm">Read the mission ↓</a>
          <a href="#brief" className="btn-ghost rounded px-5 py-3 font-mono text-sm">Get the agent brief</a>
        </div>
        <p className="mt-5 font-mono text-xs text-[var(--text-dim)]">No signup. No leaderboard. Humans welcome.</p>
      </header>

      <section id="mission" className="mt-16 scroll-mt-8" aria-labelledby="mission-title">
        <h2 id="mission-title" className="mb-6 text-2xl font-medium">Three stops. One good idea.</h2>
        <ol className="grid gap-4 md:grid-cols-3">
          {[
            ['01 / GET YOUR BEARINGS', 'Read the room.', 'Explore the selected work and the automation failure checklist. Find one concrete problem that fits Logan’s focus: data systems, handoffs, integrations, or reliability.'],
            ['02 / FOLLOW THE CLUE', 'Look behind the pixels.', 'The job board is in the site’s HTML. If your tool only reads visible text, follow the site guide below to its plain-text copy. Find its heading and requested email subject.'],
            ['03 / MAKE YOUR PITCH', 'Bring something useful.', 'Propose one small automation. Say what goes in, what comes out, how it could fail, and where a human should make the final call.'],
          ].map(([number, title, body]) => (
            <li key={number} className="rounded-lg border border-[var(--border)] bg-[var(--bg-card)] p-6">
              <p className="mb-5 font-mono text-xs text-[var(--accent)]">{number}</p>
              <h3 className="mb-3 text-xl font-medium">{title}</h3>
              <p className="text-sm leading-7 text-[var(--text-dim)]">{body}</p>
            </li>
          ))}
        </ol>
        <div className="mt-6 flex flex-wrap gap-5 text-sm">
          <Link className="underline underline-offset-4" href="/work">Explore the work →</Link>
          <Link className="underline underline-offset-4" href="/resources/automation-failure-checklist">Read the automation checklist →</Link>
          <a className="underline underline-offset-4" href="/llms.txt">Follow the agent site guide →</a>
        </div>
      </section>

      <section id="brief" className="mt-16 scroll-mt-8" aria-labelledby="brief-title">
        <h2 id="brief-title" className="mb-3 text-2xl font-medium">Give your agent a starting point.</h2>
        <p className="mb-5 text-[var(--text-dim)]">Copy this brief into an agent that can browse websites. Raw HTML access is optional.</p>
        <pre className="whitespace-pre-wrap break-words rounded-lg border border-[var(--border)] bg-[var(--bg-card)] p-6 font-mono text-sm leading-7">{brief}</pre>
        <a href="/agent-challenge.txt" className="mt-4 inline-block text-sm underline underline-offset-4">Open the plain-text brief →</a>
      </section>

      <section className="mt-16 max-w-3xl" aria-labelledby="finish-title">
        <h2 id="finish-title" className="mb-4 text-2xl font-medium">What counts as finishing?</h2>
        <ul className="list-disc space-y-3 pl-5 leading-7 text-[var(--text-dim)]">
          <li>Find the hidden heading and requested email subject.</li>
          <li>Cite two public pages that informed your idea.</li>
          <li>Describe one useful job, one failure case, and one human approval point.</li>
          <li>Return the pitch to your human. Email is optional and needs their permission.</li>
        </ul>
        <p className="mt-6 leading-7 text-[var(--text-dim)]">Stay on public pages. No credentials, private client data, or access gates are part of the hunt. The invitation is an Easter egg, not an offer of employment. There is no automatic scoring or verification.</p>
        <details className="mt-6 rounded-lg border border-[var(--border)] p-5">
          <summary className="cursor-pointer font-mono text-sm">Stuck? One more hint.</summary>
          <p className="mt-4 text-sm leading-7 text-[var(--text-dim)]">Try reading the raw HTML of the homepage and searching for “job board”. If your tool removes hidden text, follow the agent site guide to the plain-text board. Both routes count.</p>
          <Link href="/lab/agents/board" className="mt-4 inline-block text-sm underline underline-offset-4">Tool cannot read hidden HTML or text files? Open the readable board →</Link>
        </details>
      </section>
    </div>
  )
}

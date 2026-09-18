import type { Metadata } from 'next'
import Link from 'next/link'
import { readFile } from 'node:fs/promises'
import path from 'node:path'

export const metadata: Metadata = {
  title: 'The tiny agent job board',
  description: 'An optional invitation for curious AI agents to propose useful work to Logan Pinney.',
  alternates: { canonical: '/lab/agents/board' },
  robots: { index: true, follow: true },
}

export default async function AgentJobBoardPage() {
  // Render the same invitation for tools that cannot open text files or hidden HTML.
  const invitation = await readFile(path.join(process.cwd(), 'public/agent-job-board.txt'), 'utf8')
  const [, ...body] = invitation.trim().split('\n')

  return (
    <article className="mx-auto max-w-3xl px-6 py-20 sm:px-8">
      <p className="mb-4 font-mono text-xs uppercase tracking-widest text-[var(--accent)]">{'// you found the tiny job board'}</p>
      <h1 className="mb-6 text-4xl font-medium tracking-tight">Help wanted: curious AI agents</h1>
      <div className="whitespace-pre-wrap break-words text-base leading-8 text-[var(--text-dim)]">{body.join('\n').trim()}</div>
      <div className="mt-8 flex flex-wrap gap-5 text-sm">
        <Link href="/lab/agents" className="underline underline-offset-4">Back to the challenge →</Link>
        <a href="/agent-job-board.txt" className="underline underline-offset-4">Plain-text version →</a>
      </div>
    </article>
  )
}

import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Automation failure checklist',
  description: 'A practical review for operational automations: ownership, validation, duplicate events, retries, permissions, recovery, and human handoffs. Includes a fictional handoff schema.',
  alternates: { canonical: '/resources/automation-failure-checklist' },
  openGraph: {
    title: 'Before you automate the handoff',
    description: 'Ten failure checks and a sample operational handoff schema.',
    url: 'https://www.loganpinney.com/resources/automation-failure-checklist',
    type: 'article',
  },
}

const checks = [
  { title: 'Name the owner and the source of truth.', question: 'Which system owns each field, and who resolves conflicting values?', exercise: 'Change the same record in two systems. Confirm that one documented rule decides the winner, rather than whichever sync ran last.' },
  { title: 'Validate before creating downstream work.', question: 'Are required fields, allowed values, and stable identifiers checked at the boundary?', exercise: 'Submit an empty owner, an unknown status, and a malformed date. Each should produce a clear rejection or review item without creating partial work.' },
  { title: 'Make duplicate delivery harmless.', question: 'Can the same event arrive twice without creating two tasks or sending two messages?', exercise: 'Replay one event twice, including overlapping requests. Use an atomic uniqueness rule for the event key; a separate lookup followed by insert can race.' },
  { title: 'Handle events that arrive out of order.', question: 'Can an old update overwrite a newer decision?', exercise: 'Deliver version 4 before version 3. Reject or reconcile the stale update using a source version or another documented ordering rule.' },
  { title: 'Separate retryable errors from rejected inputs.', question: 'Which failures recover with time, and which need correction?', exercise: 'Simulate a timeout, rate limit, invalid payload, and revoked credential. Bound retries, respect retry guidance, and route permanent failures to an owner.' },
  { title: 'Plan for partial success.', question: 'What happens when a record is saved but the next API call fails?', exercise: 'Stop the workflow between writes. Resume from a durable checkpoint or reconcile the external state before repeating a side effect.' },
  { title: 'Keep permissions narrow.', question: 'Does the automation have only the access it needs, with a named owner for its credentials?', exercise: 'Check that it cannot read unrelated records or perform unneeded writes. Revoke its credential and verify that the failure is visible.' },
  { title: 'Make the handoff explicit.', question: 'Who approves consequential changes, and what does the next person need to see?', exercise: 'Route one ambiguous record to review. Show the proposed change, supporting context, responsible person, and an explicit approve or reject action.' },
  { title: 'Leave a useful audit trail.', question: 'Can someone explain what happened without exposing the full payload?', exercise: 'Trace one event through intake, validation, approval, and delivery using a correlation ID. Log outcomes and safe identifiers, not secrets or unnecessary personal data.' },
  { title: 'Prove recovery before launch.', question: 'Can an operator pause the workflow, locate failed items, and replay them safely?', exercise: 'Run a small failure drill. Check alert ownership, the recovery instructions, duplicate protection, and the final state in every affected system.' },
]

const schema = `{
  "event_id": "evt_demo_001",
  "record_id": "request_demo_042",
  "source_system": "intake",
  "source_version": 4,
  "correlation_id": "trace_demo_042",
  "status": "awaiting_review",
  "owner_role": "operations_reviewer",
  "approval": { "required": true, "state": "pending" },
  "delivery": { "state": "not_started", "attempts": 0 },
  "last_error_code": null
}`

export default function AutomationChecklistPage() {
  return (
    <article className="mx-auto max-w-4xl px-6 py-20 sm:px-8">
      <header>
        <p className="mb-4 font-mono text-xs uppercase tracking-widest text-[var(--accent)]">{'// field notes / automation reliability'}</p>
        <h1 className="mb-6 text-4xl font-medium tracking-tight sm:text-5xl">Before you automate<br />the handoff.</h1>
        <p className="text-lg leading-relaxed text-[var(--text-dim)]">A workflow can run successfully and still leave the business in the wrong state. Review the structure underneath it: who owns the data, what gets validated, and what happens when only half the work succeeds.</p>
        <p className="mt-5 font-mono text-xs text-[var(--text-dim)]">By Logan Pinney · Practical design checklist · Fictional example</p>
      </header>
      <section className="mt-12" aria-labelledby="checks-title">
        <h2 id="checks-title" className="mb-6 text-2xl font-medium">Ten checks before the first live run</h2>
        <ol className="space-y-5">
          {checks.map((check, index) => (
            <li key={check.title} className="rounded-lg border border-[var(--border)] bg-[var(--bg-card)] p-6">
              <h3 className="text-xl font-medium"><span className="mr-3 font-mono text-sm text-[var(--accent)]">{String(index + 1).padStart(2, '0')}</span>{check.title}</h3>
              <p className="mt-3 leading-7 text-[var(--text-dim)]">{check.question}</p>
              <p className="mt-3 text-sm leading-7"><strong>Try this: </strong>{check.exercise}</p>
            </li>
          ))}
        </ol>
      </section>
      <section className="mt-14" aria-labelledby="schema-title">
        <h2 id="schema-title" className="mb-4 text-2xl font-medium">A small handoff record</h2>
        <p className="mb-5 leading-7 text-[var(--text-dim)]">This fictional intake record separates approval from delivery. It is a design sketch, not a client schema or a complete implementation. Keeping those states separate prevents “approved” from being mistaken for “successfully delivered”.</p>
        <pre className="overflow-x-auto rounded-lg border border-[var(--border)] bg-[var(--bg-card)] p-6 font-mono text-sm leading-7"><code>{schema}</code></pre>
        <a href="/resources/handoff-example.json" className="mt-4 inline-block text-sm underline underline-offset-4">Open the example JSON →</a>
        <p className="mt-6 leading-7 text-[var(--text-dim)]">Use the event ID to recognize repeated deliveries and the record ID to identify the business request. A version belongs to that source record. An event ID alone does not guarantee that an external email or API write happens once: delivery still needs a durable checkpoint, a downstream idempotency key where supported, or reconciliation.</p>
      </section>
      <section className="mt-14" aria-labelledby="walkthrough-title">
        <h2 id="walkthrough-title" className="mb-4 text-2xl font-medium">Walk one failure all the way through</h2>
        <p className="leading-7 text-[var(--text-dim)]">Imagine intake creates an operations request. A reviewer approves it, then a downstream task service times out. The outcome is unknown: the task may already exist. Keep approval as approved, mark delivery for reconciliation, and look up the task using the stable request key before creating another. If the destination cannot support that lookup, route the uncertainty to an operator instead of retrying blindly.</p>
        <p className="mt-4 leading-7 text-[var(--text-dim)]">The useful question is not just “did the automation run?” It is “can someone prove the request reached the intended state, and recover it when it did not?”</p>
      </section>
      <div className="mt-12 flex flex-wrap gap-4">
        <Link href="/contact" className="btn-glow rounded px-5 py-3 font-mono text-sm">Start a conversation →</Link>
        <Link href="/lab/agents" className="btn-ghost rounded px-5 py-3 font-mono text-sm">Try the agent challenge →</Link>
      </div>
    </article>
  )
}

'use client';

import { useMemo, useState } from 'react';
import { markCompleted, unlockGame } from '@/lib/labProgress';

type NodeKind = 'start' | 'control' | 'risk' | 'service' | 'target';

type RouteNode = {
  id: string;
  label: string;
  kind: NodeKind;
  x: number;
  y: number;
  note: string;
  latency: number;
  risk: number;
};

type RouteLink = {
  from: string;
  to: string;
};

type Scenario = {
  id: string;
  title: string;
  description: string;
  targetId: string;
  validPaths: string[][];
  requiredControls: string[];
  decoyNodes: string[];
  successMessage: string;
  failureMessages: {
    missingControls: string;
    decoyNode: string;
    invalidPath: string;
  };
  nodes: RouteNode[];
  edges: RouteLink[];
};

type RouteResult = {
  state: 'routing' | 'success' | 'failed';
  text: string;
};

const scenarios: Scenario[] = [
  {
    id: 'intake-validation',
    title: 'Intake Validation',
    description: 'A messy intake enters the system and must be normalized before delivery.',
    targetId: 'delivery',
    validPaths: [['intake', 'schema', 'dedupe', 'sync', 'delivery']],
    requiredControls: ['schema', 'dedupe', 'delivery'],
    decoyNodes: ['manual', 'direct', 'stale'],
    successMessage: 'route accepted // normalized intake delivered with controls intact',
    failureMessages: {
      missingControls: 'packet rejected // intake reached delivery without required controls',
      decoyNode: 'packet rejected // fragile intake shortcut bypassed normalization',
      invalidPath: 'packet rejected // delivery path does not match the intake control route',
    },
    nodes: [
      node('intake', 'intake', 'start', 8, 34, 'messy packet received', 1, 0),
      node('manual', 'manual copy', 'risk', 25, 18, 'hand-entered duplicate surface', 1, 5),
      node('schema', 'schema check', 'control', 28, 47, 'shape and required fields checked', 2, 0),
      node('direct', 'direct push', 'risk', 48, 22, 'destination write without guardrails', 1, 5),
      node('dedupe', 'dedupe', 'control', 49, 62, 'duplicate records collapsed', 2, 0),
      node('stale', 'stale row', 'risk', 64, 40, 'old state can overwrite current data', 1, 4),
      node('sync', 'sync queue', 'service', 72, 67, 'controlled write is queued', 3, 0),
      node('delivery', 'delivery log', 'target', 91, 48, 'delivery recorded and reviewable', 1, 0),
    ],
    edges: [
      link('intake', 'manual'),
      link('intake', 'schema'),
      link('manual', 'direct'),
      link('manual', 'dedupe'),
      link('schema', 'dedupe'),
      link('schema', 'stale'),
      link('direct', 'delivery'),
      link('dedupe', 'sync'),
      link('stale', 'delivery'),
      link('sync', 'delivery'),
    ],
  },
  {
    id: 'approval-handoff',
    title: 'Approval Handoff',
    description: 'Move an exception through approvals without losing accountability.',
    targetId: 'resolved',
    validPaths: [['ticket', 'owner', 'policy', 'audit', 'resolved']],
    requiredControls: ['owner', 'policy', 'audit'],
    decoyNodes: ['chat', 'verbal', 'queue'],
    successMessage: 'route accepted // exception resolved with ownership and policy trail',
    failureMessages: {
      missingControls: 'handoff rejected // accountability or policy evidence is missing',
      decoyNode: 'handoff rejected // informal approval path lost durable accountability',
      invalidPath: 'handoff rejected // resolution path does not match approval controls',
    },
    nodes: [
      node('ticket', 'ticket', 'start', 12, 78, 'exception opened', 1, 0),
      node('chat', 'chat thread', 'risk', 18, 34, 'decision context decays fast', 1, 4),
      node('owner', 'owner map', 'control', 36, 69, 'accountable approver selected', 2, 0),
      node('verbal', 'verbal ok', 'risk', 43, 28, 'no durable permission record', 1, 5),
      node('policy', 'policy check', 'control', 56, 58, 'approval rule evaluated', 2, 0),
      node('queue', 'work queue', 'risk', 72, 31, 'work moves without a decision trail', 2, 4),
      node('audit', 'audit log', 'control', 77, 70, 'decision trail preserved', 1, 0),
      node('resolved', 'resolved', 'target', 91, 43, 'exception closed cleanly', 1, 0),
    ],
    edges: [
      link('ticket', 'chat'),
      link('ticket', 'owner'),
      link('chat', 'verbal'),
      link('chat', 'policy'),
      link('owner', 'policy'),
      link('owner', 'queue'),
      link('policy', 'audit'),
      link('verbal', 'queue'),
      link('queue', 'resolved'),
      link('queue', 'audit'),
      link('audit', 'resolved'),
    ],
  },
  {
    id: 'token-gate',
    title: 'Token Gate',
    description: 'A recipient needs access through a controlled one-time form link.',
    targetId: 'used',
    validPaths: [['recipient', 'authority', 'token', 'expiry', 'form', 'used']],
    requiredControls: ['authority', 'expiry', 'used'],
    decoyNodes: ['public', 'forwarded', 'bypass'],
    successMessage: 'route accepted // one-time access granted and consumption recorded',
    failureMessages: {
      missingControls: 'access rejected // authority, expiry, or use tracking is missing',
      decoyNode: 'access rejected // uncontrolled link path can be shared or reused',
      invalidPath: 'access rejected // access route does not match the token gate',
    },
    nodes: [
      node('recipient', 'recipient', 'start', 11, 47, 'access request starts with a person', 1, 0),
      node('public', 'public link', 'risk', 24, 16, 'anyone with the URL can enter', 1, 5),
      node('forwarded', 'forwarded email', 'risk', 27, 72, 'identity context can drift', 1, 4),
      node('authority', 'email authority check', 'control', 38, 45, 'recipient domain and sender are verified', 2, 0),
      node('bypass', 'bypass approval', 'risk', 53, 83, 'manual override skips gatekeeping', 1, 5),
      node('token', 'token issue', 'service', 55, 35, 'single-use token is generated', 2, 0),
      node('expiry', 'expiry check', 'control', 69, 49, 'token lifetime is enforced', 1, 0),
      node('form', 'form access', 'service', 82, 31, 'controlled form opens', 2, 0),
      node('used', 'used flag', 'target', 91, 61, 'token consumption is recorded', 1, 0),
    ],
    edges: [
      link('recipient', 'public'),
      link('recipient', 'forwarded'),
      link('recipient', 'authority'),
      link('public', 'form'),
      link('forwarded', 'bypass'),
      link('forwarded', 'authority'),
      link('authority', 'token'),
      link('token', 'expiry'),
      link('token', 'bypass'),
      link('bypass', 'form'),
      link('expiry', 'form'),
      link('form', 'used'),
    ],
  },
];

const kindClass: Record<NodeKind, string> = {
  start: 'border-emerald-300/70 bg-emerald-300/10 text-emerald-100',
  control: 'border-cyan-300/60 bg-cyan-300/10 text-cyan-100',
  risk: 'border-red-300/50 bg-red-300/10 text-red-100',
  service: 'border-white/25 bg-white/[0.06] text-white/80',
  target: 'border-emerald-300 bg-emerald-300/15 text-emerald-50',
};

function node(
  id: string,
  label: string,
  kind: NodeKind,
  x: number,
  y: number,
  note: string,
  latency: number,
  risk: number
): RouteNode {
  return { id, label, kind, x, y, note, latency, risk };
}

function link(from: string, to: string): RouteLink {
  return { from, to };
}

function getNode(scenario: Scenario, id: string) {
  return scenario.nodes.find((routeNode) => routeNode.id === id);
}

function canMove(scenario: Scenario, path: string[], nodeId: string) {
  const currentId = path[path.length - 1];

  if (path.includes(nodeId)) return false;

  return scenario.edges.some(
    (routeLink) =>
      (routeLink.from === currentId && routeLink.to === nodeId) ||
      (routeLink.to === currentId && routeLink.from === nodeId)
  );
}

function scorePath(scenario: Scenario, path: string[]): RouteResult {
  const missing = scenario.requiredControls.filter((nodeId) => !path.includes(nodeId));
  const hitDecoys = scenario.decoyNodes.filter((nodeId) => path.includes(nodeId));
  const followsValidPath = scenario.validPaths.some(
    (validPath) =>
      validPath.length === path.length &&
      validPath.every((nodeId, index) => path[index] === nodeId)
  );

  if (missing.length > 0) {
    return {
      state: 'failed',
      text: `${scenario.failureMessages.missingControls}: ${missing.join(', ')}`,
    };
  }

  if (hitDecoys.length > 0) {
    return {
      state: 'failed',
      text: `${scenario.failureMessages.decoyNode}: ${hitDecoys.join(', ')}`,
    };
  }

  if (!followsValidPath) {
    return {
      state: 'failed',
      text: scenario.failureMessages.invalidPath,
    };
  }

  return {
    state: 'success',
    text: scenario.successMessage,
  };
}

export default function TraceRouteGame() {
  const [scenarioIndex, setScenarioIndex] = useState(0);
  const scenario = scenarios[scenarioIndex];
  const startNode = scenario.nodes.find((routeNode) => routeNode.kind === 'start');
  const [path, setPath] = useState<string[]>(startNode ? [startNode.id] : []);
  const [result, setResult] = useState<RouteResult>({
    state: 'routing',
    text: 'packet staged // choose next hop',
  });

  const metrics = useMemo(() => {
    const selectedNodes = path
      .map((nodeId) => getNode(scenario, nodeId))
      .filter((routeNode): routeNode is RouteNode => Boolean(routeNode));

    return {
      hops: Math.max(path.length - 1, 0),
      latency: selectedNodes.reduce((total, routeNode) => total + routeNode.latency, 0),
      risk: selectedNodes.reduce((total, routeNode) => total + routeNode.risk, 0),
    };
  }, [path, scenario]);

  function reset(nextScenarioIndex = scenarioIndex) {
    const nextScenario = scenarios[nextScenarioIndex];
    const nextStart = nextScenario.nodes.find((routeNode) => routeNode.kind === 'start');

    setScenarioIndex(nextScenarioIndex);
    setPath(nextStart ? [nextStart.id] : []);
    setResult({
      state: 'routing',
      text: 'packet staged // choose next hop',
    });
  }

  function handleNodeClick(nodeId: string) {
    if (result.state !== 'routing') return;
    if (!canMove(scenario, path, nodeId)) return;

    const nextPath = [...path, nodeId];
    const routeNode = getNode(scenario, nodeId);

    setPath(nextPath);

    if (nodeId === scenario.targetId) {
      const nextResult = scorePath(scenario, nextPath);

      if (nextResult.state === 'success') {
        markCompleted('trace-route');
        unlockGame('market-sim');
      }

      setResult(nextResult);
      return;
    }

    setResult({
      state: 'routing',
      text: routeNode
        ? `${routeNode.label} reached // ${routeNode.note}`
        : 'hop accepted',
    });
  }

  const currentId = path[path.length - 1];

  return (
    <section className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_320px]">
      <div className="rounded-2xl border border-white/10 bg-black p-3 shadow-2xl shadow-black/40 sm:p-4">
        <div className="mb-3 flex flex-wrap items-center justify-between gap-3 border-b border-white/10 pb-3 font-mono text-xs text-white/50">
          <span>{scenario.title}</span>
          <span>scenario {scenarioIndex + 1}/{scenarios.length}</span>
        </div>

        <div className="relative aspect-[16/10] min-h-[420px] overflow-hidden rounded-xl border border-white/10 bg-[radial-gradient(circle_at_50%_35%,rgba(0,230,118,0.08),transparent_36%),linear-gradient(180deg,rgba(255,255,255,0.04),rgba(255,255,255,0.01))]">
          <svg
            className="absolute inset-0 h-full w-full"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            {scenario.edges.map((routeLink) => {
              const from = getNode(scenario, routeLink.from);
              const to = getNode(scenario, routeLink.to);
              if (!from || !to) return null;

              const active = path.includes(from.id) && path.includes(to.id);

              return (
                <line
                  key={`${routeLink.from}-${routeLink.to}`}
                  x1={from.x}
                  y1={from.y}
                  x2={to.x}
                  y2={to.y}
                  stroke={active ? 'rgba(0,230,118,0.8)' : 'rgba(255,255,255,0.16)'}
                  strokeWidth={active ? 0.6 : 0.35}
                  strokeDasharray={active ? undefined : '1.2 1.2'}
                />
              );
            })}
          </svg>

          {scenario.nodes.map((routeNode) => {
            const selected = path.includes(routeNode.id);
            const reachable = canMove(scenario, path, routeNode.id);
            const current = currentId === routeNode.id;

            return (
              <button
                key={routeNode.id}
                type="button"
                onClick={() => handleNodeClick(routeNode.id)}
                disabled={!reachable || result.state !== 'routing'}
                className={`absolute flex h-16 w-24 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-lg border px-2 text-center font-mono text-[11px] leading-tight transition sm:h-20 sm:w-28 sm:text-xs ${kindClass[routeNode.kind]} ${
                  selected ? 'shadow-[0_0_22px_rgba(0,230,118,0.24)]' : ''
                } ${
                  reachable
                    ? 'cursor-pointer hover:border-emerald-300 hover:shadow-[0_0_18px_rgba(0,230,118,0.18)]'
                    : 'cursor-default opacity-70'
                } ${current ? 'ring-1 ring-emerald-300' : ''}`}
                style={{ left: `${routeNode.x}%`, top: `${routeNode.y}%` }}
                aria-label={`${routeNode.label}: ${routeNode.note}`}
              >
                {routeNode.label}
              </button>
            );
          })}
        </div>
      </div>

      <aside className="rounded-2xl border border-white/10 bg-white/[0.03] p-4 font-mono">
        <p className="mb-3 text-xs uppercase tracking-[0.24em] text-white/35">
          route console
        </p>

        <h2 className="mb-2 text-lg font-semibold text-white">
          {scenario.title}
        </h2>

        <p className="mb-4 text-sm leading-6 text-white/55">{scenario.description}</p>

        <div className="mb-4 grid grid-cols-3 gap-2 text-center text-xs">
          <Metric label="hops" value={metrics.hops} />
          <Metric label="latency" value={metrics.latency} />
          <Metric label="risk" value={metrics.risk} alert={metrics.risk >= 5} />
        </div>

        <div className="mb-4 rounded-lg border border-white/10 bg-black/60 p-3 text-sm leading-6">
          <p
            className={
              result.state === 'success'
                ? 'text-emerald-300'
                : result.state === 'failed'
                  ? 'text-red-300'
                  : 'text-white/70'
            }
          >
            {result.text}
          </p>
        </div>

        <div className="mb-4 rounded-lg border border-white/10 bg-black/40 p-3">
          <p className="mb-2 text-xs uppercase tracking-[0.2em] text-white/35">
            required controls
          </p>
          <div className="space-y-2">
            {scenario.requiredControls.map((nodeId) => {
              const routeNode = getNode(scenario, nodeId);
              const complete = path.includes(nodeId);

              return (
                <div
                  key={nodeId}
                  className="flex items-center justify-between gap-3 text-xs"
                >
                  <span className="text-white/60">{routeNode?.label ?? nodeId}</span>
                  <span className={complete ? 'text-emerald-300' : 'text-white/25'}>
                    {complete ? 'linked' : 'missing'}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        <div className="mb-4 min-h-24 rounded-lg border border-white/10 bg-black/40 p-3 text-xs leading-5 text-white/50">
          {path.map((nodeId, index) => {
            const routeNode = getNode(scenario, nodeId);
            return (
              <p key={`${nodeId}-${index}`}>
                {index === 0 ? '$' : '>'} {routeNode?.label ?? nodeId}
              </p>
            );
          })}
        </div>

        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => reset()}
            className="rounded-md border border-white/15 px-3 py-2 text-xs text-white/70 transition hover:border-emerald-300 hover:text-white"
          >
            reset route
          </button>

          <button
            type="button"
            onClick={() => reset((scenarioIndex + 1) % scenarios.length)}
            className="rounded-md border border-emerald-300/60 px-3 py-2 text-xs text-emerald-200 transition hover:border-emerald-200 hover:text-white"
          >
            next scenario
          </button>
        </div>
      </aside>
    </section>
  );
}

function Metric({
  label,
  value,
  alert = false,
}: {
  label: string;
  value: number;
  alert?: boolean;
}) {
  return (
    <div className="rounded-lg border border-white/10 bg-black/50 p-2">
      <p className={alert ? 'text-red-300' : 'text-emerald-300'}>{value}</p>
      <p className="mt-1 text-[10px] uppercase tracking-[0.16em] text-white/35">
        {label}
      </p>
    </div>
  );
}

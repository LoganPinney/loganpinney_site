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
  title: string;
  brief: string;
  targetId: string;
  requiredIds: string[];
  nodes: RouteNode[];
  links: RouteLink[];
};

type RouteResult = {
  state: 'routing' | 'success' | 'failed';
  text: string;
};

const scenarios: Scenario[] = [
  {
    title: 'Event Intake',
    brief: 'Get participant changes from intake to the roster source of truth.',
    targetId: 'roster',
    requiredIds: ['schema', 'validate', 'audit'],
    nodes: [
      node('intake', 'intake', 'start', 7, 49, 'packet received', 1, 0),
      node('sheet', 'shared sheet', 'risk', 25, 24, 'unowned manual edit zone', 1, 4),
      node('schema', 'schema gate', 'control', 28, 62, 'shape and required fields checked', 2, 0),
      node('dm', 'direct message', 'risk', 48, 15, 'private side channel', 1, 5),
      node('validate', 'validator', 'control', 52, 52, 'duplicates and missing values rejected', 2, 0),
      node('sync', 'sync worker', 'service', 71, 37, 'controlled write to destination', 3, 1),
      node('audit', 'audit log', 'control', 72, 68, 'change trail recorded', 1, 0),
      node('roster', 'roster db', 'target', 92, 52, 'source of truth updated', 1, 0),
    ],
    links: [
      link('intake', 'sheet'),
      link('intake', 'schema'),
      link('sheet', 'dm'),
      link('sheet', 'validate'),
      link('schema', 'validate'),
      link('dm', 'sync'),
      link('validate', 'sync'),
      link('validate', 'audit'),
      link('audit', 'roster'),
      link('sync', 'roster'),
      link('sync', 'audit'),
    ],
  },
  {
    title: 'Approval Handoff',
    brief: 'Move an exception through approvals without losing accountability.',
    targetId: 'resolved',
    requiredIds: ['owner', 'policy', 'audit'],
    nodes: [
      node('ticket', 'ticket', 'start', 7, 50, 'exception opened', 1, 0),
      node('chat', 'chat thread', 'risk', 27, 22, 'decision context decays fast', 1, 4),
      node('owner', 'owner map', 'control', 27, 67, 'accountable approver selected', 2, 0),
      node('policy', 'policy check', 'control', 49, 48, 'approval rule evaluated', 2, 0),
      node('shortcut', 'verbal ok', 'risk', 51, 18, 'no durable permission record', 1, 5),
      node('queue', 'work queue', 'service', 70, 35, 'approved work is sequenced', 3, 1),
      node('audit', 'audit log', 'control', 72, 69, 'decision trail preserved', 1, 0),
      node('resolved', 'resolved', 'target', 92, 51, 'exception closed cleanly', 1, 0),
    ],
    links: [
      link('ticket', 'chat'),
      link('ticket', 'owner'),
      link('chat', 'shortcut'),
      link('chat', 'policy'),
      link('owner', 'policy'),
      link('policy', 'queue'),
      link('policy', 'audit'),
      link('shortcut', 'queue'),
      link('queue', 'resolved'),
      link('queue', 'audit'),
      link('audit', 'resolved'),
    ],
  },
  {
    title: 'Data Repair',
    brief: 'Patch a bad record while keeping the system reproducible.',
    targetId: 'warehouse',
    requiredIds: ['snapshot', 'transform', 'audit'],
    nodes: [
      node('alert', 'alert', 'start', 7, 52, 'drift detected', 1, 0),
      node('hotfix', 'hotfix', 'risk', 26, 25, 'silent one-off change', 1, 5),
      node('snapshot', 'snapshot', 'control', 27, 66, 'before state captured', 2, 0),
      node('manual', 'manual edit', 'risk', 49, 19, 'cannot be replayed safely', 1, 5),
      node('transform', 'transform job', 'control', 51, 52, 'repair can be rerun', 3, 0),
      node('review', 'review queue', 'service', 70, 35, 'human check before publish', 2, 1),
      node('audit', 'audit log', 'control', 71, 70, 'repair reason recorded', 1, 0),
      node('warehouse', 'warehouse', 'target', 92, 52, 'clean record published', 1, 0),
    ],
    links: [
      link('alert', 'hotfix'),
      link('alert', 'snapshot'),
      link('hotfix', 'manual'),
      link('hotfix', 'transform'),
      link('snapshot', 'transform'),
      link('manual', 'review'),
      link('transform', 'review'),
      link('transform', 'audit'),
      link('review', 'warehouse'),
      link('review', 'audit'),
      link('audit', 'warehouse'),
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

  return scenario.links.some(
    (routeLink) =>
      (routeLink.from === currentId && routeLink.to === nodeId) ||
      (routeLink.to === currentId && routeLink.from === nodeId)
  );
}

function scorePath(scenario: Scenario, path: string[]): RouteResult {
  const missing = scenario.requiredIds.filter((nodeId) => !path.includes(nodeId));
  const nodes = path
    .map((nodeId) => getNode(scenario, nodeId))
    .filter((routeNode): routeNode is RouteNode => Boolean(routeNode));
  const risk = nodes.reduce((total, routeNode) => total + routeNode.risk, 0);

  if (missing.length > 0) {
    return {
      state: 'failed',
      text: `packet rejected // missing ${missing.join(', ')}`,
    };
  }

  if (risk >= 5) {
    return {
      state: 'failed',
      text: 'packet rejected // fragile shortcut left too much operational risk',
    };
  }

  return {
    state: 'success',
    text: 'route accepted // validation and audit trail intact',
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
            {scenario.links.map((routeLink) => {
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

        <p className="mb-4 text-sm leading-6 text-white/55">{scenario.brief}</p>

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
            {scenario.requiredIds.map((nodeId) => {
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

'use client';

import {
  useEffect,
  useMemo,
  useRef,
  useState,
  type PointerEvent as ReactPointerEvent,
} from 'react';
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

type Pos = { x: number; y: number; vx: number; vy: number };

type PacketState =
  | { phase: 'idle' }
  | {
      phase: 'flying';
      pathIds: string[];
      segIndex: number;
      segT: number;
    }
  | {
      phase: 'exploded';
      at: { x: number; y: number };
      ttl: number;
    }
  | {
      phase: 'arrived';
      at: { x: number; y: number };
      ttl: number;
    };

type DragState = {
  id: string;
  pointerId: number;
  pixelStart: { x: number; y: number };
  moved: boolean;
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

// --- physics tuning -------------------------------------------------------
const SPRING_K = 4.0;          // pull strength toward anchor
const REPEL_STRENGTH = 80;     // node-vs-node push
const REPEL_RANGE = 18;        // % units, distance under which repulsion applies
const DAMP_PER_SEC = 6;        // higher = more friction
const JITTER_INTERVAL = 4.0;   // seconds between idle micro-impulses
const JITTER_FORCE = 6;        // small wobble strength
const PACKET_SECONDS_PER_HOP = 0.45;
const DRAG_THRESHOLD_PX = 4;

// --- helpers --------------------------------------------------------------
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
  return { state: 'success', text: scenario.successMessage };
}

function clamp(v: number, lo: number, hi: number) {
  return Math.max(lo, Math.min(hi, v));
}

// --- component ------------------------------------------------------------
export default function TraceRouteGame() {
  const [scenarioIndex, setScenarioIndex] = useState(0);
  const scenario = scenarios[scenarioIndex];
  const startNode = scenario.nodes.find((routeNode) => routeNode.kind === 'start');
  const [path, setPath] = useState<string[]>(startNode ? [startNode.id] : []);
  const [result, setResult] = useState<RouteResult>({
    state: 'routing',
    text: 'packet staged // choose next hop',
  });

  // Refs for high-frequency data (mutated each frame; render driven by frame counter)
  const positionsRef = useRef<Record<string, Pos>>({});
  const anchorsRef = useRef<Record<string, { x: number; y: number }>>({});
  const dragRef = useRef<DragState | null>(null);
  const packetRef = useRef<PacketState>({ phase: 'idle' });
  const scenarioRef = useRef(scenario);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const jitterTimerRef = useRef(0);
  const [, setFrame] = useState(0);
  const forceRender = () => setFrame((f) => (f + 1) & 0xffff);

  // Keep scenarioRef synced for the rAF loop closures
  useEffect(() => {
    scenarioRef.current = scenario;
  }, [scenario]);

  // (Re)initialize positions whenever the scenario changes
  useEffect(() => {
    const positions: Record<string, Pos> = {};
    const anchors: Record<string, { x: number; y: number }> = {};
    for (const n of scenario.nodes) {
      anchors[n.id] = { x: n.x, y: n.y };
      positions[n.id] = { x: n.x, y: n.y, vx: 0, vy: 0 };
    }
    positionsRef.current = positions;
    anchorsRef.current = anchors;
    packetRef.current = { phase: 'idle' };
    dragRef.current = null;
    forceRender();
  }, [scenarioIndex, scenario.nodes]);

  // Single rAF loop drives physics + packet animation
  useEffect(() => {
    let rafId = 0;
    let lastTime = performance.now();
    const loop = (now: number) => {
      const dt = Math.min(0.05, (now - lastTime) / 1000);
      lastTime = now;
      stepPhysics(dt);
      stepPacket(dt);
      forceRender();
      rafId = requestAnimationFrame(loop);
    };
    rafId = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(rafId);
  }, []);

  function stepPhysics(dt: number) {
    const positions = positionsRef.current;
    const anchors = anchorsRef.current;
    const ids = Object.keys(positions);
    if (ids.length === 0) return;

    // Idle micro-jitter so the graph "breathes"
    jitterTimerRef.current += dt;
    let jitterThisFrame = false;
    if (jitterTimerRef.current >= JITTER_INTERVAL) {
      jitterTimerRef.current = 0;
      jitterThisFrame = true;
    }

    const damp = Math.exp(-DAMP_PER_SEC * dt);

    for (const id of ids) {
      if (dragRef.current?.id === id) continue;
      const p = positions[id];
      const a = anchors[id];
      // Hooke spring back to anchor
      let fx = (a.x - p.x) * SPRING_K;
      let fy = (a.y - p.y) * SPRING_K;
      // Repulsion from other nodes
      for (const otherId of ids) {
        if (otherId === id) continue;
        const o = positions[otherId];
        const dx = p.x - o.x;
        const dy = p.y - o.y;
        const d = Math.sqrt(dx * dx + dy * dy);
        if (d > 0.0001 && d < REPEL_RANGE) {
          const force = (REPEL_STRENGTH * (REPEL_RANGE - d)) / (d * REPEL_RANGE);
          fx += (dx / d) * force;
          fy += (dy / d) * force;
        }
      }
      if (jitterThisFrame) {
        fx += (Math.random() - 0.5) * JITTER_FORCE;
        fy += (Math.random() - 0.5) * JITTER_FORCE;
      }
      p.vx = (p.vx + fx * dt) * damp;
      p.vy = (p.vy + fy * dt) * damp;
      p.x = clamp(p.x + p.vx * dt, 5, 95);
      p.y = clamp(p.y + p.vy * dt, 6, 94);
    }
  }

  function stepPacket(dt: number) {
    const pk = packetRef.current;
    if (pk.phase === 'flying') {
      const sc = scenarioRef.current;
      pk.segT += dt / PACKET_SECONDS_PER_HOP;
      while (pk.segT >= 1 && pk.phase === 'flying') {
        pk.segT -= 1;
        pk.segIndex += 1;
        const arrivedId = pk.pathIds[pk.segIndex];
        if (!arrivedId) break;

        const isLast = pk.segIndex >= pk.pathIds.length - 1;
        const isDecoy = sc.decoyNodes.includes(arrivedId);
        const pos = positionsRef.current[arrivedId];

        if (isDecoy && pos) {
          packetRef.current = {
            phase: 'exploded',
            at: { x: pos.x, y: pos.y },
            ttl: 1.6,
          };
          setResult({
            state: 'failed',
            text: `${sc.failureMessages.decoyNode}: ${arrivedId}`,
          });
          return;
        }
        if (isLast && pos) {
          const final = scorePath(sc, pk.pathIds);
          if (final.state === 'success') {
            packetRef.current = {
              phase: 'arrived',
              at: { x: pos.x, y: pos.y },
              ttl: 2.0,
            };
            markCompleted('trace-route');
            unlockGame('stock-wars');
          } else {
            packetRef.current = {
              phase: 'exploded',
              at: { x: pos.x, y: pos.y },
              ttl: 1.6,
            };
          }
          setResult(final);
          return;
        }
      }
    } else if (pk.phase === 'exploded' || pk.phase === 'arrived') {
      pk.ttl -= dt;
      if (pk.ttl <= 0) packetRef.current = { phase: 'idle' };
    }
  }

  // --- input handlers ----------------------------------------------------
  function handleNodeClick(nodeId: string) {
    if (result.state !== 'routing') return;
    if (packetRef.current.phase !== 'idle') return;
    if (!canMove(scenario, path, nodeId)) return;

    const nextPath = [...path, nodeId];
    setPath(nextPath);

    if (nodeId === scenario.targetId) {
      packetRef.current = {
        phase: 'flying',
        pathIds: nextPath,
        segIndex: 0,
        segT: 0,
      };
      setResult({ state: 'routing', text: 'packet en route // tracing path...' });
      return;
    }

    const routeNode = getNode(scenario, nodeId);
    setResult({
      state: 'routing',
      text: routeNode
        ? `${routeNode.label} reached // ${routeNode.note}`
        : 'hop accepted',
    });
  }

  function onNodePointerDown(
    nodeId: string,
    event: ReactPointerEvent<HTMLButtonElement>
  ) {
    if (packetRef.current.phase !== 'idle') return;
    event.preventDefault();
    try {
      event.currentTarget.setPointerCapture(event.pointerId);
    } catch {
      // some browsers reject capture mid-gesture; degrade gracefully
    }
    dragRef.current = {
      id: nodeId,
      pointerId: event.pointerId,
      pixelStart: { x: event.clientX, y: event.clientY },
      moved: false,
    };
  }

  function onNodePointerMove(event: ReactPointerEvent<HTMLButtonElement>) {
    const drag = dragRef.current;
    if (!drag || drag.pointerId !== event.pointerId) return;
    const dx = event.clientX - drag.pixelStart.x;
    const dy = event.clientY - drag.pixelStart.y;
    if (!drag.moved && Math.hypot(dx, dy) >= DRAG_THRESHOLD_PX) drag.moved = true;
    if (!drag.moved) return;
    const container = containerRef.current;
    if (!container) return;
    const rect = container.getBoundingClientRect();
    const px = ((event.clientX - rect.left) / rect.width) * 100;
    const py = ((event.clientY - rect.top) / rect.height) * 100;
    const p = positionsRef.current[drag.id];
    if (!p) return;
    p.x = clamp(px, 5, 95);
    p.y = clamp(py, 6, 94);
    p.vx = 0;
    p.vy = 0;
  }

  function onNodePointerUp(
    nodeId: string,
    event: ReactPointerEvent<HTMLButtonElement>
  ) {
    const drag = dragRef.current;
    if (!drag || drag.pointerId !== event.pointerId) return;
    try {
      event.currentTarget.releasePointerCapture(event.pointerId);
    } catch {
      // ignore
    }
    const wasDrag = drag.moved;
    dragRef.current = null;
    if (!wasDrag) handleNodeClick(nodeId);
  }

  function onNodePointerCancel(event: ReactPointerEvent<HTMLButtonElement>) {
    const drag = dragRef.current;
    if (!drag || drag.pointerId !== event.pointerId) return;
    dragRef.current = null;
  }

  function reset(nextScenarioIndex = scenarioIndex) {
    const nextScenario = scenarios[nextScenarioIndex];
    const nextStart = nextScenario.nodes.find((routeNode) => routeNode.kind === 'start');
    setScenarioIndex(nextScenarioIndex);
    setPath(nextStart ? [nextStart.id] : []);
    setResult({ state: 'routing', text: 'packet staged // choose next hop' });
    packetRef.current = { phase: 'idle' };
  }

  function relaxLayout() {
    // Snap nodes back to their anchors and let physics settle from there.
    const positions = positionsRef.current;
    const anchors = anchorsRef.current;
    for (const id of Object.keys(positions)) {
      const a = anchors[id];
      const p = positions[id];
      if (!a || !p) continue;
      p.x = a.x;
      p.y = a.y;
      p.vx = 0;
      p.vy = 0;
    }
  }

  // --- derived render values --------------------------------------------
  const metrics = useMemo(() => {
    const selectedNodes = path
      .map((nodeId) => getNode(scenario, nodeId))
      .filter((routeNode): routeNode is RouteNode => Boolean(routeNode));
    return {
      hops: Math.max(path.length - 1, 0),
      latency: selectedNodes.reduce((total, n) => total + n.latency, 0),
      risk: selectedNodes.reduce((total, n) => total + n.risk, 0),
    };
  }, [path, scenario]);

  const currentId = path[path.length - 1];
  const positions = positionsRef.current;
  const packet = packetRef.current;

  // Compute live packet position (interpolated along its current segment).
  let packetX: number | null = null;
  let packetY: number | null = null;
  if (packet.phase === 'flying') {
    const fromId = packet.pathIds[packet.segIndex];
    const toId = packet.pathIds[packet.segIndex + 1];
    const a = fromId ? positions[fromId] : undefined;
    const b = toId ? positions[toId] : undefined;
    if (a && b) {
      packetX = a.x + (b.x - a.x) * packet.segT;
      packetY = a.y + (b.y - a.y) * packet.segT;
    }
  }

  return (
    <section className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_320px]">
      <div className="rounded-2xl border border-white/10 bg-black p-3 shadow-2xl shadow-black/40 sm:p-4">
        <div className="mb-3 flex flex-wrap items-center justify-between gap-3 border-b border-white/10 pb-3 font-mono text-xs text-white/50">
          <span>{`// ${scenario.title}`}</span>
          <span>scenario {scenarioIndex + 1}/{scenarios.length}</span>
        </div>

        <div
          ref={containerRef}
          className="relative aspect-[16/10] min-h-[420px] touch-none select-none overflow-hidden rounded-xl border border-white/10 bg-[radial-gradient(circle_at_50%_35%,rgba(0,230,118,0.08),transparent_36%),linear-gradient(180deg,rgba(255,255,255,0.04),rgba(255,255,255,0.01))]"
        >
          <svg
            className="absolute inset-0 h-full w-full"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            {scenario.edges.map((routeLink) => {
              const from = positions[routeLink.from];
              const to = positions[routeLink.to];
              if (!from || !to) return null;
              const active =
                path.includes(routeLink.from) && path.includes(routeLink.to);
              return (
                <line
                  key={`${routeLink.from}-${routeLink.to}`}
                  x1={from.x}
                  y1={from.y}
                  x2={to.x}
                  y2={to.y}
                  stroke={active ? 'rgba(0,230,118,0.85)' : 'rgba(255,255,255,0.16)'}
                  strokeWidth={active ? 0.55 : 0.32}
                  strokeDasharray={active ? undefined : '1.2 1.2'}
                  strokeLinecap="round"
                />
              );
            })}
          </svg>

          {/* Packet glow */}
          {packetX !== null && packetY !== null && (
            <span
              className="pointer-events-none absolute z-20 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-emerald-300 shadow-[0_0_22px_6px_rgba(0,230,118,0.55)]"
              style={{ left: `${packetX}%`, top: `${packetY}%` }}
            />
          )}

          {/* Explosion / arrival marker */}
          {(packet.phase === 'exploded' || packet.phase === 'arrived') && (
            <div
              className="pointer-events-none absolute z-30 -translate-x-1/2 -translate-y-1/2"
              style={{ left: `${packet.at.x}%`, top: `${packet.at.y}%` }}
            >
              <span
                className={`absolute left-1/2 top-1/2 h-12 w-12 -translate-x-1/2 -translate-y-1/2 rounded-full ${
                  packet.phase === 'exploded'
                    ? 'animate-ping bg-red-400/40'
                    : 'animate-ping bg-emerald-300/40'
                }`}
              />
              <span
                className={`relative whitespace-nowrap rounded border px-2 py-1 font-mono text-[11px] tracking-[0.2em] ${
                  packet.phase === 'exploded'
                    ? 'border-red-300/60 bg-red-300/10 text-red-200'
                    : 'border-emerald-300/60 bg-emerald-300/10 text-emerald-100'
                }`}
              >
                {packet.phase === 'exploded' ? 'PACKET LOST' : 'DELIVERED'}
              </span>
            </div>
          )}

          {scenario.nodes.map((routeNode) => {
            const pos = positions[routeNode.id] ?? { x: routeNode.x, y: routeNode.y };
            const selected = path.includes(routeNode.id);
            const reachable = canMove(scenario, path, routeNode.id);
            const current = currentId === routeNode.id;
            const interactive = packet.phase === 'idle' && result.state === 'routing';
            return (
              <button
                key={routeNode.id}
                type="button"
                onPointerDown={(e) => onNodePointerDown(routeNode.id, e)}
                onPointerMove={onNodePointerMove}
                onPointerUp={(e) => onNodePointerUp(routeNode.id, e)}
                onPointerCancel={onNodePointerCancel}
                disabled={!interactive || (!reachable && !selected)}
                className={`absolute flex h-16 w-24 -translate-x-1/2 -translate-y-1/2 touch-none items-center justify-center rounded-lg border px-2 text-center font-mono text-[11px] leading-tight transition-shadow sm:h-20 sm:w-28 sm:text-xs ${kindClass[routeNode.kind]} ${
                  selected ? 'shadow-[0_0_22px_rgba(0,230,118,0.24)]' : ''
                } ${
                  interactive && reachable
                    ? 'cursor-grab hover:border-emerald-300 hover:shadow-[0_0_18px_rgba(0,230,118,0.18)] active:cursor-grabbing'
                    : interactive
                      ? 'cursor-grab opacity-80 active:cursor-grabbing'
                      : 'cursor-default opacity-70'
                } ${current ? 'ring-1 ring-emerald-300' : ''}`}
                style={{ left: `${pos.x}%`, top: `${pos.y}%` }}
                aria-label={`${routeNode.label}: ${routeNode.note}`}
              >
                {routeNode.label}
              </button>
            );
          })}

          <div className="pointer-events-none absolute bottom-2 left-2 z-10 font-mono text-[10px] uppercase tracking-[0.2em] text-white/30">
            drag nodes to reshape · tap to hop
          </div>
        </div>
      </div>

      <aside className="rounded-2xl border border-white/10 bg-white/[0.03] p-4 font-mono">
        <p className="mb-3 text-xs uppercase tracking-[0.24em] text-white/35">
          {'// route console'}
        </p>

        <h2 className="mb-2 text-lg font-semibold text-white">{scenario.title}</h2>

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
            onClick={() => relaxLayout()}
            className="rounded-md border border-white/15 px-3 py-2 text-xs text-white/70 transition hover:border-emerald-300 hover:text-white"
          >
            relax layout
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

'use client';

import { FormEvent, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSiteEffects } from '@/components/SiteEffectsProvider';
import {
  findLabGameByCommand,
  findLabGameByRoute,
  findLabGameBySlug,
  labGames,
  type LabGame,
} from '@/config/lab.config';
import { hasCompleted, isUnlocked, unlockGame } from '@/lib/labProgress';

type TerminalLine = {
  type: 'command' | 'output' | 'error' | 'system';
  text: string;
};

type Riddle = {
  question: string;
  answers: string[];
  route: string;
  success: string;
};

type PublicTerminalFile = {
  name: string;
  path: string;
  hidden?: boolean;
  route?: string;
};

const initialLines: TerminalLine[] = [];
const labAdminAccessFlag = 'lab.admin.unlocked';

const RIDDLES: Riddle[] = [
  {
    question:
      'I am small, chaotic, and usually underestimated. Put enough of me together and a war begins. What am I?',
    answers: ['beans', 'bean'],
    route: '/lab/bean-wars',
    success: 'Correct. Bean conflict protocol unlocked.',
  },
  {
    question:
      'I am not production. I am not portfolio. I am where strange prototypes crawl out of the wall. What am I?',
    answers: ['lab', 'the lab'],
    route: '/lab',
    success: 'Correct. Lab access unlocked.',
  },
];

function getUnavailableMessage(game: LabGame) {
  if (isUnlocked(game.id)) {
    return `${game.slug} unlocked // access layer pending`;
  }

  if (game.status === 'locked') {
    return `${game.slug} locked // access key not issued`;
  }

  return `${game.slug} unavailable // access layer not deployed`;
}

function getLabListLines(games: LabGame[]) {
  return games.map((game) => ({
    type:
      game.status === 'live' || isUnlocked(game.id) || hasCompleted(game.id)
        ? 'system'
        : 'output',
    text: `${game.slug} [${
      hasCompleted(game.id)
        ? 'complete'
        : game.status !== 'live' && isUnlocked(game.id)
          ? 'unlocked'
          : game.status
    }] // ${game.unlockCommand}`,
  })) satisfies TerminalLine[];
}

function unlockLabAdminAccess() {
  try {
    window.localStorage.setItem(labAdminAccessFlag, 'true');
  } catch {
    // Hidden lab state is best-effort and still works for this session.
  }

  labGames
    .filter((game) => game.status === 'live')
    .forEach((game) => unlockGame(game.id));
}

export default function Terminal() {
  const router = useRouter();
  const { activeEffect, stopEffect, triggerEffect } = useSiteEffects();

  const [publicFiles, setPublicFiles] = useState<PublicTerminalFile[]>([]);
  const [manifestLoaded, setManifestLoaded] = useState(false);

  const [lines, setLines] = useState<TerminalLine[]>(initialLines);
  const [input, setInput] = useState('');
  const [activeRiddle, setActiveRiddle] = useState<Riddle | null>(null);

  const inputRef = useRef<HTMLInputElement | null>(null);

  function addLines(newLines: TerminalLine[]) {
    setLines((current) => [...current, ...newLines]);
  }
  function addTemporaryLine(line: TerminalLine, clearAfterMs = 900) {
  setLines((current) => [...current, line]);

  window.setTimeout(() => {
    setLines((current) => {
      const next = [...current];

      for (let i = next.length - 1; i >= 0; i--) {
        if (next[i].type === line.type && next[i].text === line.text) {
          next.splice(i, 1);
          break;
        }
      }

      return next;
    });
  }, clearAfterMs);
}
  function launchRoute(route: string) {
    addLines([
      { type: 'system', text: `launching ${route} ...` },
    ]);

    setTimeout(() => {
      router.push(route);
    }, 450);
  }

  function handleLabGame(game: LabGame) {
    if (game.status === 'live') {
      addLines([
        { type: 'system', text: 'access granted.' },
      ]);

      launchRoute(game.route);
      return;
    }

    addLines([
      { type: 'system', text: getUnavailableMessage(game) },
      { type: 'output', text: game.description },
      { type: 'output', text: `status: ${game.status}` },
    ]);
  }

  function startRandomRiddle() {
    const riddle = RIDDLES[Math.floor(Math.random() * RIDDLES.length)];

    setActiveRiddle(riddle);

    addLines([
      { type: 'system', text: 'riddle loaded.' },
      { type: 'output', text: riddle.question },
    ]);
  }
  async function loadPublicFiles() {
  if (manifestLoaded) return publicFiles;

  try {
    const response = await fetch('/terminal/manifest.json', {
      cache: 'no-store',
    });

    if (!response.ok) {
      throw new Error('manifest not found');
    }

    const files = (await response.json()) as PublicTerminalFile[];

    setPublicFiles(files);
    setManifestLoaded(true);

    return files;
  } catch {
    setManifestLoaded(true);

    addLines([
      {
        type: 'error',
        text: 'filesystem manifest unavailable',
      },
    ]);

    return [];
  }
}

function findPublicFile(files: PublicTerminalFile[], fileName: string) {
  return files.find(
    (file) => file.name.toLowerCase() === fileName.toLowerCase()
  );
}

async function listPublicFiles(showHidden: boolean) {
  const files = await loadPublicFiles();

  const visibleFiles = files.filter((file) => showHidden || !file.hidden);

  if (visibleFiles.length === 0) {
    addLines([
      {
        type: 'output',
        text: 'no files found',
      },
    ]);

    return;
  }

  addLines(
    visibleFiles.map((file) => ({
      type: file.hidden ? 'system' : 'output',
      text: file.name,
    }))
  );
}

async function readPublicFile(fileName: string) {
  const files = await loadPublicFiles();
  const file = findPublicFile(files, fileName);

  if (!file) {
    addLines([
      {
        type: 'error',
        text: `cat: ${fileName}: no such file`,
      },
    ]);

    return;
  }

  try {
    const response = await fetch(file.path, {
      cache: 'no-store',
    });

    if (!response.ok) {
      throw new Error('file not found');
    }

    const text = await response.text();
    const fileLines = text.split('\n').filter((line) => line.trim() !== '');

    addLines(
      fileLines.map((line) => ({
        type: file.hidden ? 'system' : 'output',
        text: line,
      }))
    );
  } catch {
    addLines([
      {
        type: 'error',
        text: `cat: ${fileName}: unable to read file`,
      },
    ]);
  }
}

async function openPublicFileRoute(fileName: string) {
  const files = await loadPublicFiles();
  const file = findPublicFile(files, fileName);

  if (!file) {
    addLines([
      {
        type: 'error',
        text: `open: ${fileName}: no such file`,
      },
    ]);

    return;
  }

  if (!file.route) {
    addLines([
      {
        type: 'error',
        text: `open: ${fileName}: no route attached`,
      },
    ]);

    return;
  }

  launchRoute(file.route);
}

  async function runCommand(rawCommand: string) {
    const command = rawCommand.trim().toLowerCase();

    if (!command) return;

    addLines([{ type: 'command', text: rawCommand }]);

    if (command.startsWith('cat ')) {
  const fileName = rawCommand.slice(4).trim();
  await readPublicFile(fileName);
  return;
}

if (command.startsWith('open ')) {
  const target = rawCommand.slice(5).trim();

  if (target.startsWith('/lab/')) {
    const game = findLabGameByRoute(target);

    if (game) {
      handleLabGame(game);
      return;
    }

    addLines([
      {
        type: 'error',
        text: `open: ${target}: lab route unavailable`,
      },
    ]);
    return;
  }

  const game = findLabGameBySlug(target);

  if (game) {
    handleLabGame(game);
    return;
  }

  await openPublicFileRoute(target);
  return;
}

    if (activeRiddle && activeRiddle.answers.includes(command)) {
      addLines([
        { type: 'system', text: activeRiddle.success },
        { type: 'system', text: 'access granted.' },
      ]);

      const route = activeRiddle.route;
      setActiveRiddle(null);
      launchRoute(route);

      return;
    }

    const labGame = findLabGameByCommand(command);

    if (labGame) {
      handleLabGame(labGame);
      return;
    }

    switch (command) {
      case 'matrix':
        triggerEffect('matrix', { durationMs: 8000 });
        addLines([
          { type: 'system', text: 'visual layer breach detected.' },
          { type: 'system', text: 'matrix rain active // auto-reset in 8s' },
        ]);
        break;

      case 'matrix off':
      case 'exit matrix':
        if (activeEffect === 'matrix') {
          stopEffect('matrix');
          addLines([{ type: 'system', text: 'matrix rain terminated.' }]);
        } else {
          addLines([{ type: 'output', text: 'matrix layer inactive.' }]);
        }
        break;

      case 'h':
  addLines([
    { type: 'output', text: 'additional commands:' },
    { type: 'output', text: '\u00A0' },
    { type: 'output', text: '-  whoami' },
    { type: 'output', text: '-  focus' },
    { type: 'output', text: '-  status' },
    { type: 'output', text: '-  who broke it' },
    { type: 'output', text: '-  scan' },
    { type: 'output', text: '\u00A0' },
    { type: 'output', text: '-  ls' },
    { type: 'output', text: '-  ls -a' },
    { type: 'output', text: '-  ls /lab' },
    { type: 'output', text: '-  ls /lab/simulations' },
    { type: 'output', text: '-  cat <file>' },
    { type: 'output', text: '-  open <file>' },
    { type: 'output', text: '-  run <protocol>' },
    { type: 'output', text: '-  cat .breadcrumbs.txt' },
    { type: 'output', text: '-  run matrix-escape' },
    { type: 'output', text: '-  run terminal-maintenance' },
    { type: 'output', text: '-  maint --sector /machine-layer' },
    { type: 'output', text: '-  riddle' },
    { type: 'output', text: '-  sudo fix' },
    
    
    { type: 'output', text: '-  cl' },
  ]);
  break;
  
  case 'help':
  addLines([
    { type: 'output', text: 'available commands:' },
    { type: 'output', text: '\u00A0' },
    { type: 'output', text: 'about      — who I am' },
    { type: 'output', text: 'work       — selected systems work' },
    { type: 'output', text: 'case       — operational automation case study' },
    { type: 'output', text: 'contact    — email and links' },
    { type: 'output', text: 'clear      — reset terminal' },
    { type: 'output', text: '\u00A0' },
    { type: 'output', text: 'lab        — restricted experiments' },
    { type: 'output', text: 'ls -a      — hidden terminal archive' },
    { type: 'output', text: 'run matrix-escape — first-person maze' },
    { type: 'output', text: 'run terminal-maintenance — machine layer cleanup' },
  ]);
  break;


  case 'about':
  addLines([
    { type: 'output', text: 'Logan Pinney — data systems architect.' },
    {
      type: 'output',
      text: 'I rebuild operational workflows, automation pipelines, and data systems that break under real-world pressure.',
    },
  ]);
  break;

case 'work':
  addLines([
    { type: 'output', text: 'Selected work: operational automation, integration architecture, validation systems, and workflow governance.' },
  ]);
  break;

case 'case':
  addLines([
    {
      type: 'output',
      text: 'Operational automation case study: intake, approval gating, validation, sync states, exception handling, and audit-ready logs.',
    },
  ]);
  break;

case 'contact':
  addLines([
    { type: 'output', text: 'info@loganpinney.com' },
    { type: 'output', text: 'linkedin available from main navigation' },
  ]);
  break;

case 'lab':
  addTemporaryLine(
    {
      type: 'error',
      text: 'restricted; type h, then read the breadcrumbs',
    },
    900
  );
  break;

      case 'order66':
        unlockLabAdminAccess();
        addLines([
          { type: 'system', text: 'directive accepted.' },
          { type: 'system', text: 'lab.admin.unlocked = true' },
          { type: 'system', text: 'access granted.' },
        ]);
        launchRoute('/lab');
        break;


      case 'ls /lab':
        addLines([
          { type: 'system', text: '/lab registry' },
          ...getLabListLines(labGames),
        ]);
        break;

      case 'ls /lab/simulations':
        addLines([
          { type: 'system', text: '/lab/simulations' },
          ...getLabListLines(
            labGames.filter((game) => game.tags.includes('simulation'))
          ),
        ]);
        break;

      case 'ls':
      case 'dir':
        await listPublicFiles(false);
        break;
      case 'ls -a':
      case 'dir -a':
      case 'dir /a':
          await listPublicFiles(true);
          break;
        
      case 'whoami':
        addLines([
          { type: 'output', text: 'operator rebuilding broken systems' },
        ]);
        break;

      case 'focus':
      case 'cat focus.txt':
        addLines([
          {
            type: 'output',
            text: 'workflow automation · integrations · governance',
          },
        ]);
        break;

      case 'status':
      case 'echo $status':
        addLines([
          {
            type: 'output',
            text: 'select contracts · high-impact only',
          },
        ]);
        break;

      case 'sudo fix':
        addLines([
          { type: 'output', text: 'permission denied.' },
          { type: 'output', text: '' },
          { type: 'output', text: 'root cause:' },
          { type: 'output', text: 'unclear ownership' },
          { type: 'output', text: '' },
          { type: 'output', text: 'failed assumption:' },
          { type: 'output', text: 'admin access can repair a broken workflow' },
          { type: 'output', text: '' },
          { type: 'output', text: 'recommended action:' },
          { type: 'output', text: 'redesign the system underneath' },
        ]);
        break;

      case 'scan':
        addLines([
          { type: 'output', text: 'running operational scan...' },
          { type: 'output', text: '' },
          { type: 'output', text: '[warn] schema drift detected' },
          { type: 'output', text: '[warn] manual workaround detected' },
          { type: 'output', text: '[warn] hidden dependency detected' },
          { type: 'output', text: '[warn] approval bottleneck detected' },
          { type: 'output', text: '[fail] failure handling missing' },
          { type: 'output', text: '' },
          { type: 'output', text: 'system status:' },
          { type: 'output', text: 'functional, but fragile' },
          { type: 'output', text: '' },
          { type: 'output', text: 'recommended action:' },
          { type: 'output', text: 'rebuild the foundation' },
        ]);
        break;

      case 'who broke it':
        addLines([
          { type: 'output', text: 'not a person.' },
          { type: 'output', text: '' },
          { type: 'output', text: 'a process with:' },
          { type: 'output', text: 'no owner' },
          { type: 'output', text: 'no validation' },
          { type: 'output', text: 'no failure path' },
          { type: 'output', text: 'no source of truth' },
        ]);
        break;

      case 'riddle':
      case 'unlock':
      case 'challenge':
        startRandomRiddle();
        break;

      case 'hint':
        if (!activeRiddle) {
          addLines([
            {
              type: 'output',
              text: 'no active riddle. type riddle to begin.',
            },
          ]);
        } else {
          addLines([
            {
              type: 'output',
              text: `answer length: ${activeRiddle.answers[0].length}`,
            },
          ]);
        }
        break;

      case 'give up':
      case 'cancel':
        setActiveRiddle(null);
        addLines([
          { type: 'system', text: 'riddle cleared.' },
        ]);
        break;

        case 'cl':
        setLines([]);
        break;

      case 'clear':
        setLines([]);
        break;

      default:
        addLines([
          {
            type: 'error',
            text: `command not found: ${rawCommand}`,
          },
        ]);
        break;
    }
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const command = input;
    setInput('');
    
    void runCommand(command);
  }

  return (
    <section
      className="group rounded-2xl border border-white/10 bg-black/80 p-4 font-mono text-sm text-white shadow-2xl shadow-black/30"
      onClick={() => inputRef.current?.focus()}
      aria-label="Interactive terminal"
    >
      <div className="mb-4 flex items-center gap-2 border-b border-white/10 pb-3">
        <span className="h-3 w-3 rounded-full bg-red-500/80" />
        <span className="h-3 w-3 rounded-full bg-yellow-500/80" />
        <span className="h-3 w-3 rounded-full bg-green-500/80" />
        <span className="ml-3 text-xs text-white/40">~/loganpinney</span>
      </div>

      <div className="space-y-2">
        {lines.map((line, index) => {
          if (line.type === 'command') {
            return (
              <p key={`${line.text}-${index}`} className="text-white/80">
                <span className="text-white/35">$ </span>
                {line.text}
              </p>
            );
          }

          if (line.type === 'error') {
            return (
              <p key={`${line.text}-${index}`} className="text-red-300/80">
                {line.text}
              </p>
            );
          }

          if (line.type === 'system') {
            return (
              <p key={`${line.text}-${index}`} className="text-emerald-300/80">
                {line.text}
              </p>
            );
          }

          return (
            <p key={`${line.text}-${index}`} className="text-white/55">
              {line.text}
            </p>
          );
        })}

        <form onSubmit={handleSubmit} className="flex items-center gap-2">
          <span className="text-white/35">$</span>

          <input
            ref={inputRef}
            value={input}
            onChange={(event) => setInput(event.target.value)}
            className="min-w-0 flex-1 bg-transparent text-white outline-none placeholder:text-white/20"
            placeholder="type help"
            spellCheck={false}
            autoComplete="off"
            aria-label="Terminal command input"
          />

          <span className="h-4 w-2 animate-pulse bg-white/70" />
        </form>
      </div>
    </section>
  );
}

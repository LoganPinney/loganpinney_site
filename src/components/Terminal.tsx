'use client';

import { FormEvent, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';

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

const initialLines: TerminalLine[] = [
  { type: 'command', text: 'whoami' },
  { type: 'output', text: 'operator rebuilding broken systems' },
  { type: 'command', text: 'cat focus.txt' },
  { type: 'output', text: 'workflow automation · integrations · governance' },
  { type: 'command', text: 'echo $status' },
  { type: 'output', text: 'select contracts · high-impact only' },
];

const LAB_COMMANDS: Record<string, string> = {
  beanwars: '/lab/bean-wars',
  beans: '/lab/bean-wars',
  'bean-wars': '/lab/bean-wars',
  'play bean-wars': '/lab/bean-wars',
};

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

export default function Terminal() {
  const router = useRouter();

  const [lines, setLines] = useState<TerminalLine[]>(initialLines);
  const [input, setInput] = useState('');
  const [activeRiddle, setActiveRiddle] = useState<Riddle | null>(null);

  const inputRef = useRef<HTMLInputElement | null>(null);

  function addLines(newLines: TerminalLine[]) {
    setLines((current) => [...current, ...newLines]);
  }

  function launchRoute(route: string) {
    addLines([
      { type: 'system', text: `launching ${route} ...` },
    ]);

    setTimeout(() => {
      router.push(route);
    }, 450);
  }

  function startRandomRiddle() {
    const riddle = RIDDLES[Math.floor(Math.random() * RIDDLES.length)];

    setActiveRiddle(riddle);

    addLines([
      { type: 'system', text: 'riddle loaded.' },
      { type: 'output', text: riddle.question },
    ]);
  }

  function runCommand(rawCommand: string) {
    const command = rawCommand.trim().toLowerCase();

    if (!command) return;

    addLines([{ type: 'command', text: rawCommand }]);

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

    if (LAB_COMMANDS[command]) {
      addLines([
        { type: 'system', text: 'access granted.' },
      ]);

      launchRoute(LAB_COMMANDS[command]);

      return;
    }

    switch (command) {
      case 'help':
        addLines([
          { type: 'output', text: 'available commands:' },
          { type: 'output', text: 'whoami' },
          { type: 'output', text: 'focus' },
          { type: 'output', text: 'status' },
          { type: 'output', text: 'riddle' },
          { type: 'output', text: 'clear' },
        ]);
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
    runCommand(command);
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
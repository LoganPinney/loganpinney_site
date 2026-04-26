export type LabGameStatus = 'live' | 'locked' | 'planned';

export type LabGame = {
  id: string;
  title: string;
  slug: string;
  route: string;
  description: string;
  status: LabGameStatus;
  unlockCommand: string;
  commands?: string[];
  tags: string[];
};

export const labGames: LabGame[] = [
  {
    id: 'bean-wars',
    title: 'Bean Wars',
    slug: 'bean-wars',
    route: '/lab/bean-wars',
    description: 'Small tactical chaos protocol. Live inside the lab.',
    status: 'live',
    unlockCommand: 'play bean-wars',
    tags: ['game', 'arcade', 'lab'],
  },
  {
    id: 'error-404',
    title: '404 Shooter',
    slug: '404-shooter',
    route: '/games/error-404/',
    description: 'Fallback-page target practice for missing routes.',
    status: 'live',
    unlockCommand: 'run 404',
    tags: ['game', 'arcade', 'system'],
  },
  {
    id: 'trace-route',
    title: 'Trace Route',
    slug: 'trace-route',
    route: '/lab/trace-route',
    description: 'A routing and dependency-mapping simulation.',
    status: 'live',
    unlockCommand: 'run trace',
    tags: ['simulation', 'systems', 'network'],
  },
  {
    id: 'stock-wars',
    title: 'Stock Wars',
    slug: 'stock-wars',
    route: '/lab/stock-wars',
    description: 'A 10-day fake-market trading desk with a live order book.',
    status: 'live',
    unlockCommand: 'play stock-wars',
    tags: ['simulation', 'markets', 'systems', 'arcade'],
  },
  {
    id: 'terminal-maintenance',
    title: 'Terminal Maintenance',
    slug: 'terminal-maintenance',
    route: '/lab/terminal-maintenance',
    description:
      'A retrofuture maintenance crawl through corrupted automation residue.',
    status: 'live',
    unlockCommand: 'run terminal-maintenance',
    commands: ['maint --sector /machine-layer', 'run maintenance'],
    tags: ['simulation', 'operations', 'systems', 'game'],
  },
  {
    id: 'ops-governor',
    title: 'Ops Governor',
    slug: 'ops-governor',
    route: '/lab/ops-governor',
    description: 'A governance simulation for approvals, owners, and failure paths.',
    status: 'planned',
    unlockCommand: 'open ops-governor',
    tags: ['simulation', 'operations', 'governance'],
  },
  {
    id: '404-maze',
    title: '404 Maze',
    slug: '404-maze',
    route: '/lab/404-maze',
    description: 'A navigation puzzle for broken links and false exits.',
    status: 'planned',
    unlockCommand: 'run 404_maze',
    tags: ['game', 'maze', 'system'],
  },
  {
    id: 'legacy-system',
    title: 'Legacy System',
    slug: 'legacy-system',
    route: '/lab/legacy-system',
    description: 'A maintenance puzzle about brittle workflows and hidden dependencies.',
    status: 'planned',
    unlockCommand: 'run legacy_system',
    tags: ['game', 'operations', 'systems'],
  },
];

export function normalizeLabCommand(value: string) {
  return value.trim().toLowerCase().replace(/_/g, '-');
}

function compactLabCommand(value: string) {
  return normalizeLabCommand(value).replace(/[^a-z0-9]/g, '');
}

export function findLabGameByCommand(command: string) {
  const normalizedCommand = normalizeLabCommand(command);
  const compactCommand = compactLabCommand(command);

  return labGames.find(
    (game) =>
      normalizeLabCommand(game.unlockCommand) === normalizedCommand ||
      game.commands?.some(
        (alias) => normalizeLabCommand(alias) === normalizedCommand
      ) ||
      normalizeLabCommand(game.id) === normalizedCommand ||
      normalizeLabCommand(game.slug) === normalizedCommand ||
      compactLabCommand(game.id) === compactCommand ||
      compactLabCommand(game.slug) === compactCommand
  );
}

export function findLabGameByRoute(route: string) {
  const normalizedRoute = route.trim().toLowerCase().replace(/\/$/, '');

  return labGames.find(
    (game) => game.route.toLowerCase().replace(/\/$/, '') === normalizedRoute
  );
}

export function findLabGameBySlug(slug: string) {
  const normalizedSlug = normalizeLabCommand(slug);
  const compactSlug = compactLabCommand(slug);

  return labGames.find(
    (game) =>
      normalizeLabCommand(game.slug) === normalizedSlug ||
      normalizeLabCommand(game.id) === normalizedSlug ||
      normalizeLabCommand(game.title) === normalizedSlug ||
      compactLabCommand(game.slug) === compactSlug ||
      compactLabCommand(game.id) === compactSlug ||
      compactLabCommand(game.title) === compactSlug
  );
}

export const labProgressGameIds = [
  'beanwars',
  'trace-route',
  'market-sim',
  'ops-governor',
  'legacy-system',
] as const;

export type LabProgressGameId = (typeof labProgressGameIds)[number];

function getBrowserStorage() {
  if (typeof window === 'undefined') return null;

  try {
    return window.localStorage;
  } catch {
    return null;
  }
}

const gameIdAliases: Record<string, LabProgressGameId> = {
  beanwars: 'beanwars',
  'bean-wars': 'beanwars',
  'trace-route': 'trace-route',
  'market-sim': 'market-sim',
  'ops-governor': 'ops-governor',
  'legacy-system': 'legacy-system',
};

const defaultUnlockedGameIds = new Set<LabProgressGameId>([
  'beanwars',
  'trace-route',
]);

function normalizeGameId(gameId: string): LabProgressGameId | string {
  return gameIdAliases[gameId] ?? gameId;
}

function getFlagKey(key: string) {
  return key.startsWith('lab.') ? key : `lab.${key}`;
}

function getGameFlagKey(gameId: string, flag: 'complete' | 'unlocked') {
  return `lab.${normalizeGameId(gameId)}.${flag}`;
}

export function getLabFlag(key: string) {
  const storage = getBrowserStorage();

  if (!storage) return false;

  try {
    return storage.getItem(getFlagKey(key)) === 'true';
  } catch {
    return false;
  }
}

export function setLabFlag(key: string, value: boolean) {
  const storage = getBrowserStorage();

  if (!storage) return;

  try {
    storage.setItem(getFlagKey(key), String(value));
  } catch {
    // Progress is intentionally best-effort for hidden lab content.
  }
}

export function hasCompleted(gameId: string) {
  return getLabFlag(getGameFlagKey(gameId, 'complete'));
}

export function markCompleted(gameId: string) {
  setLabFlag(getGameFlagKey(gameId, 'complete'), true);
}

export function isUnlocked(gameId: string) {
  const normalizedGameId = normalizeGameId(gameId);

  if (
    labProgressGameIds.includes(normalizedGameId as LabProgressGameId) &&
    defaultUnlockedGameIds.has(normalizedGameId as LabProgressGameId)
  ) {
    return true;
  }

  if (getLabFlag(getGameFlagKey(gameId, 'unlocked'))) {
    return true;
  }

  if (normalizedGameId === 'market-sim') {
    return hasCompleted('trace-route');
  }

  return false;
}

export function unlockGame(gameId: string) {
  setLabFlag(getGameFlagKey(gameId, 'unlocked'), true);
}

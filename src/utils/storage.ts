/**
 * Narrow, typed wrapper around `localStorage` that gracefully degrades to
 * an in-memory Map when storage is disabled (Safari private mode etc).
 */

const memory = new Map<string, string>();

function safeGet(key: string): string | null {
  try {
    return window.localStorage.getItem(key);
  } catch {
    return memory.get(key) ?? null;
  }
}

function safeSet(key: string, value: string): void {
  try {
    window.localStorage.setItem(key, value);
  } catch {
    memory.set(key, value);
  }
}

function safeRemove(key: string): void {
  try {
    window.localStorage.removeItem(key);
  } catch {
    memory.delete(key);
  }
}

export const storage = {
  get<T>(key: string, fallback: T): T {
    const raw = safeGet(key);
    if (raw === null) return fallback;
    try {
      return JSON.parse(raw) as T;
    } catch {
      return fallback;
    }
  },
  set(key: string, value: unknown): void {
    safeSet(key, JSON.stringify(value));
  },
  remove(key: string): void {
    safeRemove(key);
  },
};

/** Typed storage key definitions to avoid string duplication. */
export const StorageKey = {
  Language: 'rijal:lang',
  Muted: 'rijal:muted',
  VisitedBefore: 'rijal:visited',
  LastTrack: 'rijal:last-track',
} as const;

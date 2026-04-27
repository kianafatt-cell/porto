import type { Unsubscribe } from '@/types';

/** Typed addEventListener that returns an unsubscribe fn. */
export function on<K extends keyof WindowEventMap>(
  target: Window,
  type: K,
  handler: (ev: WindowEventMap[K]) => void,
  options?: AddEventListenerOptions | boolean,
): Unsubscribe;
export function on<K extends keyof DocumentEventMap>(
  target: Document,
  type: K,
  handler: (ev: DocumentEventMap[K]) => void,
  options?: AddEventListenerOptions | boolean,
): Unsubscribe;
export function on<K extends keyof HTMLElementEventMap>(
  target: HTMLElement,
  type: K,
  handler: (ev: HTMLElementEventMap[K]) => void,
  options?: AddEventListenerOptions | boolean,
): Unsubscribe;
export function on(
  target: EventTarget,
  type: string,
  handler: EventListenerOrEventListenerObject,
  options?: AddEventListenerOptions | boolean,
): Unsubscribe {
  target.addEventListener(type, handler, options);
  return () => target.removeEventListener(type, handler, options);
}

/** Debounce: fires after `wait` ms of silence. */
export function debounce<Args extends unknown[]>(
  fn: (...args: Args) => void,
  wait: number,
): (...args: Args) => void {
  let timer: number | null = null;
  return (...args: Args) => {
    if (timer !== null) window.clearTimeout(timer);
    timer = window.setTimeout(() => {
      timer = null;
      fn(...args);
    }, wait);
  };
}

/** Throttle: enforces at most 1 call per `wait` ms. */
export function throttle<Args extends unknown[]>(
  fn: (...args: Args) => void,
  wait: number,
): (...args: Args) => void {
  let last = 0;
  let timer: number | null = null;
  let pending: Args | null = null;
  const call = (args: Args) => {
    last = performance.now();
    fn(...args);
  };
  return (...args: Args) => {
    const now = performance.now();
    const remaining = wait - (now - last);
    if (remaining <= 0) {
      if (timer !== null) {
        window.clearTimeout(timer);
        timer = null;
      }
      call(args);
    } else {
      pending = args;
      if (timer === null) {
        timer = window.setTimeout(() => {
          timer = null;
          if (pending) call(pending);
          pending = null;
        }, remaining);
      }
    }
  };
}

/** A tiny pub/sub channel used for cross-module communication. */
export class Emitter<Events extends Record<string, unknown>> {
  private handlers = new Map<keyof Events, Set<(payload: unknown) => void>>();

  public on<K extends keyof Events>(
    type: K,
    handler: (payload: Events[K]) => void,
  ): Unsubscribe {
    let set = this.handlers.get(type);
    if (!set) {
      set = new Set();
      this.handlers.set(type, set);
    }
    set.add(handler as (payload: unknown) => void);
    return () => set!.delete(handler as (payload: unknown) => void);
  }

  public emit<K extends keyof Events>(type: K, payload: Events[K]): void {
    const set = this.handlers.get(type);
    if (!set) return;
    for (const handler of set) {
      try {
        handler(payload);
      } catch (err) {
        console.error('[emitter] handler failed', err);
      }
    }
  }

  public clear(): void {
    this.handlers.clear();
  }
}

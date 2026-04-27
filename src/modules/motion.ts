import type { MotionPreference } from '@/types';

/**
 * Detect user motion preferences and pointer capabilities so other modules
 * can tone down animations or swap cursor modes on touch devices.
 */

export function detectMotionPreference(): MotionPreference {
  if (typeof window === 'undefined') return 'full';
  const mql = window.matchMedia('(prefers-reduced-motion: reduce)');
  return mql.matches ? 'reduced' : 'full';
}

export function watchMotionPreference(
  onChange: (pref: MotionPreference) => void,
): () => void {
  const mql = window.matchMedia('(prefers-reduced-motion: reduce)');
  const handler = () => onChange(mql.matches ? 'reduced' : 'full');
  mql.addEventListener('change', handler);
  return () => mql.removeEventListener('change', handler);
}

export function isTouchDevice(): boolean {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(pointer: coarse)').matches || 'ontouchstart' in window;
}

export function isPointerCoarse(): boolean {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(pointer: coarse)').matches;
}

export function isNarrowViewport(): boolean {
  return window.matchMedia('(max-width: 760px)').matches;
}

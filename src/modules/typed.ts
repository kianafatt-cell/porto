import type { LifecycleModule } from '@/types';
import { i18n } from '@/modules/i18n';
import { qs } from '@/utils/dom';

/**
 * A self-contained typed effect — no external deps. Cycles through the
 * language-specific list of hero lines, typing each character in sequence
 * then erasing after a short pause. Reacts to language switches by
 * restarting from a neutral state.
 */
export function createTypedModule(): LifecycleModule {
  let timer: number | null = null;
  let cancelled = false;
  let unsubscribeLang: (() => void) | null = null;

  function loop(target: HTMLElement): void {
    const phrases = i18n.bundle.hero_typed;
    let phraseIndex = 0;
    let charIndex = 0;
    let deleting = false;
    const typeSpeed = 55;
    const deleteSpeed = 30;
    const holdAfterType = 1400;
    const holdAfterDelete = 320;

    const step = (): void => {
      if (cancelled) return;
      const phrase = phrases[phraseIndex] ?? '';
      if (!deleting) {
        charIndex++;
        target.textContent = phrase.slice(0, charIndex);
        if (charIndex >= phrase.length) {
          deleting = true;
          timer = window.setTimeout(step, holdAfterType);
          return;
        }
        timer = window.setTimeout(step, typeSpeed);
        return;
      }
      charIndex--;
      target.textContent = phrase.slice(0, charIndex);
      if (charIndex <= 0) {
        deleting = false;
        phraseIndex = (phraseIndex + 1) % phrases.length;
        timer = window.setTimeout(step, holdAfterDelete);
        return;
      }
      timer = window.setTimeout(step, deleteSpeed);
    };
    step();
  }

  return {
    id: 'typed',
    init() {
      const target = qs<HTMLElement>('[data-typed-target]');
      if (!target) return;
      cancelled = false;
      loop(target);
      unsubscribeLang = i18n.onChange(() => {
        cancelled = true;
        if (timer !== null) window.clearTimeout(timer);
        cancelled = false;
        target.textContent = '';
        loop(target);
      });
    },
    destroy() {
      cancelled = true;
      if (timer !== null) window.clearTimeout(timer);
      unsubscribeLang?.();
    },
  };
}

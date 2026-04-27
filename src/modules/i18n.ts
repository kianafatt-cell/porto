import type { Language, TranslationBundle } from '@/types';
import { TRANSLATIONS } from '@/data/translations';
import { qsa } from '@/utils/dom';
import { Emitter } from '@/utils/events';
import { storage, StorageKey } from '@/utils/storage';

type I18nEvents = {
  change: Language;
};

/**
 * i18n facade. Reads the initial language from `localStorage`, falls back to
 * the browser preference, then the default `id`. Modules subscribe via
 * `onChange` to re-render when the language flips. All DOM nodes with a
 * `data-i18n` attribute are updated automatically.
 */
class I18nController {
  private readonly emitter = new Emitter<I18nEvents>();
  private current: Language;

  constructor() {
    this.current = this.resolveInitial();
  }

  public get language(): Language {
    return this.current;
  }

  public get bundle(): TranslationBundle {
    return TRANSLATIONS[this.current];
  }

  public t<K extends keyof TranslationBundle>(key: K): TranslationBundle[K] {
    return TRANSLATIONS[this.current][key];
  }

  public set(language: Language, persist = true): void {
    if (language === this.current) return;
    this.current = language;
    if (persist) storage.set(StorageKey.Language, language);
    document.documentElement.setAttribute('lang', language);
    this.applyToDom();
    this.emitter.emit('change', language);
  }

  public onChange(handler: (lang: Language) => void): () => void {
    return this.emitter.on('change', handler);
  }

  public applyToDom(scope: ParentNode = document): void {
    const bundle = this.bundle as unknown as Record<string, unknown>;
    for (const node of qsa<HTMLElement>('[data-i18n]', scope)) {
      const key = node.dataset['i18n'];
      if (!key) continue;
      const value = bundle[key];
      if (typeof value === 'string') {
        node.innerHTML = value;
      }
    }
    for (const node of qsa<HTMLElement>('[data-i18n-attr]', scope)) {
      const spec = node.dataset['i18nAttr'];
      if (!spec) continue;
      for (const pair of spec.split(',')) {
        const [attr, key] = pair.split(':').map((p) => p.trim());
        if (!attr || !key) continue;
        const value = bundle[key];
        if (typeof value === 'string') node.setAttribute(attr, value);
      }
    }
  }

  private resolveInitial(): Language {
    const saved = storage.get<Language | null>(StorageKey.Language, null);
    if (saved === 'id' || saved === 'en') return saved;
    const nav = (typeof navigator !== 'undefined' ? navigator.language : 'id').toLowerCase();
    if (nav.startsWith('en')) return 'en';
    return 'id';
  }
}

export const i18n = new I18nController();

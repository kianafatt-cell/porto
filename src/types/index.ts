/**
 * Global type declarations used across the app. Keeping all public shapes in
 * a single file makes it easy to skim the domain model. Nothing here is
 * framework-specific — these are plain data contracts.
 */

/** Supported UI languages. */
export type Language = 'id' | 'en';

/** Theme variants. Kept as a union so we can add new skins later (e.g. `iris`). */
export type Theme = 'dark' | 'light';

/**
 * A single translated string bundle. The shape is shared between languages —
 * TypeScript enforces parity so no key can be missing from a translation.
 */
export interface TranslationBundle {
  nav_logo: string;
  nav_home: string;
  nav_about: string;
  nav_music: string;
  nav_projects: string;
  nav_contact: string;

  hero_badge: string;
  hero_greeting: string;
  hero_name: string;
  hero_role: string;
  hero_subtitle: string;
  hero_typed: readonly string[];
  hero_cta_primary: string;
  hero_cta_secondary: string;
  hero_scroll_hint: string;

  about_label: string;
  about_title: string;
  about_accent: string;
  about_location_prefix: string;
  about_location_city: string;
  about_p1: string;
  about_p2: string;
  about_age_label: string;
  info_name_label: string;
  info_class_label: string;
  info_location_label: string;
  info_hobby_label: string;
  info_hobby_value: string;
  about_cta: string;

  music_label: string;
  music_title: string;
  music_accent: string;
  music_now_playing: string;
  music_nothing_playing: string;
  music_play: string;
  music_pause: string;
  music_muted: string;

  projects_label: string;
  projects_title: string;
  projects_accent: string;
  projects_migrated: string;
  project_visit_new: string;
  project_domain_old: string;
  project_domain_new: string;

  contact_label: string;
  contact_title: string;
  contact_accent: string;
  contact_connect_heading: string;
  contact_connect_accent: string;
  contact_desc: string;
  contact_wa_label: string;
  contact_ig_label: string;
  contact_loc_label: string;
  contact_copy_wa: string;
  contact_copy_ok: string;

  footer_tagline: string;
  footer_rights: string;

  lang_switch_label: string;
  mute_label: string;
  unmute_label: string;
  skip_to_content: string;
  back_to_top: string;
}

/** Top-level translations map. */
export type Translations = Record<Language, TranslationBundle>;

/** A track shown on the music section. */
export interface Track {
  readonly id: string;
  readonly title: string;
  readonly artist: string;
  readonly cover: string;
  readonly audio: string;
  /** Optional Spotify / Apple / YouTube link for the "open in" button. */
  readonly externalUrl?: string;
}

/**
 * Project card shape. `migrated` marks the old → new domain redirect
 * that Rijal rolled out at the end of 2025.
 */
export interface Project {
  readonly id: string;
  readonly title: string;
  readonly categoryKey: 'web_tool' | 'experiment' | 'service';
  readonly description: { id: string; en: string };
  readonly image: string;
  readonly url: string;
  readonly migrated?: {
    readonly from: string;
    readonly to: string;
  };
  readonly tags: readonly string[];
}

/** Contact / social link entry. */
export interface SocialLink {
  readonly id: string;
  readonly label: string;
  readonly icon: string;
  readonly url: string;
  readonly handle: string;
  readonly display: string;
}

/** A module registered on the app lifecycle. */
export interface LifecycleModule {
  readonly id: string;
  init(): void | Promise<void>;
  destroy?(): void;
}

/** Shape of an intersection-observer based "reveal" animation target. */
export interface RevealOptions {
  readonly threshold?: number;
  readonly rootMargin?: string;
  readonly once?: boolean;
  readonly delayStep?: number;
}

/** Result of parsing the user's motion preference. */
export type MotionPreference = 'full' | 'reduced';

/** Shape of the app-wide runtime context passed into modules. */
export interface AppContext {
  readonly root: HTMLElement;
  readonly body: HTMLElement;
  readonly html: HTMLHtmlElement;
  readonly motion: MotionPreference;
  readonly pointerCoarse: boolean;
  readonly isTouch: boolean;
  readonly language: Language;
  setLanguage(next: Language): void;
  onLanguageChange(handler: (lang: Language) => void): () => void;
}

/** A registered event-unsubscribe function. */
export type Unsubscribe = () => void;

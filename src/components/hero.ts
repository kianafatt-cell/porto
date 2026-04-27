import { html } from '@/utils/dom';
import { iconHtml } from '@/utils/icons';

/**
 * Hero section — the first thing a visitor sees. Large editorial title,
 * tagline, typed line, then the two CTAs. A subtle parallax glow sits behind
 * the headline; the scroll hint points down to the about section.
 */
export function renderHero(): string {
  return html`
    <section class="hero" id="home" data-parallax-host>
      <div class="hero__orbit" aria-hidden="true">
        <span class="hero__orbit-ring hero__orbit-ring--1"></span>
        <span class="hero__orbit-ring hero__orbit-ring--2"></span>
        <span class="hero__orbit-ring hero__orbit-ring--3"></span>
      </div>
      <div class="hero__glow" aria-hidden="true" data-parallax="0.1"></div>
      <div class="hero__inner" data-reveal data-reveal-stagger="90">
        <span class="hero__badge" data-reveal-child>
          <span class="hero__badge-dot" aria-hidden="true"></span>
          <span data-i18n="hero_badge">Student Portfolio · 2026</span>
        </span>
        <h1 class="hero__title" data-reveal-child>
          <span class="hero__title-line hero__title-line--greeting" data-i18n="hero_greeting">Hi, I&rsquo;m</span>
          <span class="hero__title-name" data-i18n="hero_name">Rijal</span>
          <span class="hero__title-line hero__title-line--role" data-i18n="hero_role">Student · Class 12</span>
        </h1>
        <p class="hero__subtitle" data-reveal-child data-i18n="hero_subtitle">
          Growth mindset, exploration, and consistent learning — from Bogor.
        </p>
        <div class="hero__typed" data-reveal-child aria-live="polite">
          <span class="hero__typed-cursor" aria-hidden="true">›</span>
          <span class="hero__typed-text" data-typed-target></span>
          <span class="hero__typed-blink" aria-hidden="true">|</span>
        </div>
        <div class="hero__ctas" data-reveal-child>
          <a
            class="btn btn--primary"
            href="#projects"
            data-magnetic
            data-cursor="hover"
          >
            <span data-i18n="hero_cta_primary">View projects</span>
            ${iconHtml('arrow-right', 'icon btn__icon')}
          </a>
          <a
            class="btn btn--ghost"
            href="#contact"
            data-magnetic
            data-cursor="hover"
          >
            <span data-i18n="hero_cta_secondary">Get in touch</span>
          </a>
        </div>
        <div class="hero__meta" data-reveal-child>
          <div class="hero__meta-item">
            ${iconHtml('pin', 'icon')}
            <span>Bogor, ID</span>
          </div>
          <div class="hero__meta-item">
            ${iconHtml('cap', 'icon')}
            <span data-i18n="hero_role">Student · Class 12</span>
          </div>
        </div>
      </div>

      <a
        class="hero__scroll-hint"
        href="#about"
        aria-label="Scroll to about"
      >
        <span data-i18n="hero_scroll_hint">Scroll down</span>
        ${iconHtml('arrow-down', 'icon')}
      </a>
    </section>
  `;
}

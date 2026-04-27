import { html, qs, qsRequired } from '@/utils/dom';

import { renderSplash } from '@/components/splash';
import { renderScrollProgress } from '@/components/scrollProgress';
import { renderNavbar } from '@/components/navbar';
import { renderMobileMenu } from '@/components/mobileMenu';
import { renderHero } from '@/components/hero';
import { renderAbout } from '@/components/about';
import { renderMusic } from '@/components/music';
import { renderProjects } from '@/components/projects';
import { renderContact } from '@/components/contact';
import { renderFooter } from '@/components/footer';
import { renderDock } from '@/components/dock';

import { i18n } from '@/modules/i18n';
import { detectMotionPreference } from '@/modules/motion';
import { Lifecycle } from '@/modules/lifecycle';
import { createIntroModule } from '@/modules/intro';
import { createRevealModule } from '@/modules/reveal';
import { createScrollModule } from '@/modules/scroll';
import { createCursorModule } from '@/modules/cursor';
import { createParticlesModule } from '@/modules/particles';
import { createTypedModule } from '@/modules/typed';
import { createMenuModule } from '@/modules/menu';
import { createLangSwitcherModule } from '@/modules/langSwitcher';
import { createMagneticModule } from '@/modules/magnetic';
import { createTiltModule } from '@/modules/tilt';
import { createParallaxModule } from '@/modules/parallax';
import { createAmbientModule } from '@/modules/ambient';
import { createAudioModule } from '@/modules/audio';
import { createSmoothScrollModule } from '@/modules/smoothScroll';
import { createBackToTopModule } from '@/modules/backToTop';
import { createLazyImageModule } from '@/modules/lazyImage';
import { createCopyModule } from '@/modules/copy';
import { createProjectI18nModule } from '@/modules/projectI18n';

/**
 * Main application entry point. Responsibilities:
 *
 * 1. Inject the entire markup skeleton into `#app` via template strings.
 * 2. Apply the chosen language to every `data-i18n` node.
 * 3. Register and start the lifecycle modules (reveal, scroll, audio, ...).
 *
 * Every concern is pushed into a module. This file is the conductor, not
 * the orchestra.
 */
export class App {
  private readonly lifecycle = new Lifecycle();

  public async start(): Promise<void> {
    this.render();
    this.applyRuntimeMeta();

    // Apply i18n first so the initial layout doesn't flicker.
    document.documentElement.setAttribute('lang', i18n.language);
    i18n.applyToDom();

    // Register modules. Ordering matters for a couple of cases:
    // - `particles` paints beneath everything, add it early.
    // - `intro` must run last in the list of renderers — it fades the
    //   splash out only after the rest of the DOM is ready.
    this.lifecycle
      .add(createAmbientModule())
      .add(createParticlesModule())
      .add(createCursorModule())
      .add(createLangSwitcherModule())
      .add(createMenuModule())
      .add(createSmoothScrollModule())
      .add(createScrollModule())
      .add(createRevealModule())
      .add(createMagneticModule())
      .add(createTiltModule())
      .add(createParallaxModule())
      .add(createTypedModule())
      .add(createAudioModule())
      .add(createProjectI18nModule())
      .add(createLazyImageModule())
      .add(createBackToTopModule())
      .add(createCopyModule())
      .add(createIntroModule());

    await this.lifecycle.start();
  }

  private render(): void {
    const root = qsRequired<HTMLDivElement>('#app');
    root.innerHTML = html`
      <a class="skip-link" href="#home" data-i18n="skip_to_content">Skip to content</a>
      ${renderScrollProgress()}
      ${renderNavbar()}
      ${renderMobileMenu()}
      <main id="top" class="main">
        ${renderHero()}
        ${renderAbout()}
        ${renderMusic()}
        ${renderProjects()}
        ${renderContact()}
      </main>
      ${renderFooter()}
      ${renderDock()}
      ${renderSplash()}
    `;
  }

  private applyRuntimeMeta(): void {
    const body = document.body;
    const motion = detectMotionPreference();
    body.setAttribute('data-motion', motion);
    body.classList.add('app-ready');
    // Drop the inline boot shell as soon as the real DOM lands.
    const bootShell = qs<HTMLElement>('.boot-shell');
    bootShell?.remove();
  }
}

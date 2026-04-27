import { html } from '@/utils/dom';

/**
 * Top navigation bar. The desktop layout shows inline links and the language
 * switcher; on mobile the links collapse into a hamburger that toggles the
 * off-canvas menu sheet.
 */
export function renderNavbar(): string {
  return html`
    <header class="navbar" data-navbar role="banner">
      <a class="navbar__logo" href="#top" data-nav-link data-magnetic>
        <span class="navbar__logo-mark" aria-hidden="true"></span>
        <span class="navbar__logo-text" data-i18n="nav_logo">Rijal</span>
      </a>

      <nav class="navbar__nav" aria-label="Primary">
        <ul class="navbar__list">
          <li>
            <a class="navbar__link" href="#home" data-nav-link data-i18n="nav_home">Home</a>
          </li>
          <li>
            <a class="navbar__link" href="#about" data-nav-link data-i18n="nav_about">About</a>
          </li>
          <li>
            <a class="navbar__link" href="#music" data-nav-link data-i18n="nav_music">Music</a>
          </li>
          <li>
            <a class="navbar__link" href="#projects" data-nav-link data-i18n="nav_projects">Projects</a>
          </li>
          <li>
            <a class="navbar__link" href="#contact" data-nav-link data-i18n="nav_contact">Contact</a>
          </li>
        </ul>
      </nav>

      <div class="navbar__actions">
        <div class="lang-switch" role="radiogroup" aria-label="Language">
          <button
            type="button"
            class="lang-switch__option"
            data-lang-option="id"
            role="radio"
            aria-checked="false"
          >ID</button>
          <button
            type="button"
            class="lang-switch__option"
            data-lang-option="en"
            role="radio"
            aria-checked="false"
          >EN</button>
          <span class="lang-switch__thumb" aria-hidden="true"></span>
        </div>
        <button
          type="button"
          class="navbar__burger"
          data-menu-toggle
          aria-expanded="false"
          aria-controls="mobile-menu"
          aria-label="Open menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>
    </header>
  `;
}

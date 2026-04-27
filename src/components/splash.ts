import { html } from '@/utils/dom';

/**
 * Splash cover. Sits over the entire page until `app.start()` hides it.
 * Removed from the DOM once its exit transition completes.
 */
export function renderSplash(): string {
  return html`
    <div class="splash" data-intro aria-hidden="true">
      <div class="splash__logo">
        <span class="splash__logo-ring"></span>
        <span class="splash__logo-mark">R</span>
      </div>
      <span class="splash__caption">rijal &middot; portfolio</span>
    </div>
  `;
}

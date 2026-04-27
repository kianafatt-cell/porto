import { html } from '@/utils/dom';
import { iconHtml } from '@/utils/icons';

/**
 * Floating mini audio dock. Appears only after the user interacts with
 * a track. Provides prev/play/next/mute and a scrubbable progress bar.
 * Pinned to the bottom-center on mobile and to the bottom-left on desktop
 * so it never blocks important CTAs.
 */
export function renderDock(): string {
  return html`
    <div class="dock" data-dock aria-label="Mini audio player" role="region">
      <div class="dock__cover">
        <img data-dock-cover alt="" loading="eager" decoding="async" />
      </div>
      <div class="dock__body">
        <div class="dock__meta">
          <p class="dock__title" data-dock-title>—</p>
          <p class="dock__artist" data-dock-artist>—</p>
        </div>
        <div class="dock__scrubber" data-dock-scrubber>
          <span class="dock__scrubber-fill" data-dock-progress></span>
          <span class="dock__scrubber-handle" aria-hidden="true"></span>
        </div>
        <p class="dock__time" data-dock-time>0:00 / 0:00</p>
      </div>
      <div class="dock__controls">
        <button type="button" class="dock__btn dock__btn--prev" data-dock-prev aria-label="Previous track">
          ${iconHtml('prev', 'icon')}
        </button>
        <button type="button" class="dock__btn dock__btn--play" data-dock-play aria-label="Play">
          <span class="dock__btn-icon dock__btn-icon--play">${iconHtml('play', 'icon')}</span>
          <span class="dock__btn-icon dock__btn-icon--pause">${iconHtml('pause', 'icon')}</span>
        </button>
        <button type="button" class="dock__btn dock__btn--next" data-dock-next aria-label="Next track">
          ${iconHtml('next', 'icon')}
        </button>
        <button type="button" class="dock__btn dock__btn--mute" data-dock-mute aria-label="Mute">
          <span class="dock__btn-icon dock__btn-icon--vol">${iconHtml('volume', 'icon')}</span>
          <span class="dock__btn-icon dock__btn-icon--mute">${iconHtml('mute', 'icon')}</span>
        </button>
      </div>
    </div>
  `;
}

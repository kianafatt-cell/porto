import { TRACKS } from '@/data/tracks';
import { html, escapeHtml } from '@/utils/dom';
import { iconHtml } from '@/utils/icons';

/**
 * Music section. Renders a card per track. Each card has its own cover,
 * title, artist, play/pause button, timestamp, and progress bar. The
 * currently-playing card gets a neon outline via the `is-playing` modifier.
 */
export function renderMusic(): string {
  const cards = TRACKS.map(
    (track, index) => html`
      <article
        class="music-card"
        data-audio-card="${escapeHtml(track.id)}"
        data-reveal-child
        data-tilt
        data-tilt-max="4"
        style="--card-delay:${index * 90}ms"
      >
        <div class="music-card__cover">
          <img
            src="${escapeHtml(track.cover)}"
            alt="${escapeHtml(track.title)} cover"
            loading="lazy"
            decoding="async"
            data-fade
            onerror="this.onerror=null;this.src='https://via.placeholder.com/240/1a1530/a855f7?text=%E2%99%AA';"
          />
          <span class="music-card__wave" aria-hidden="true">
            <i></i><i></i><i></i><i></i><i></i>
          </span>
        </div>
        <div class="music-card__body">
          <header class="music-card__meta">
            <h3 class="music-card__title">${escapeHtml(track.title)}</h3>
            <p class="music-card__artist">${escapeHtml(track.artist)}</p>
          </header>
          <div class="music-card__progress" aria-hidden="true">
            <span class="music-card__progress-fill" data-audio-progress></span>
          </div>
          <div class="music-card__controls">
            <button
              type="button"
              class="music-card__play"
              data-audio-toggle
              data-magnetic
              data-cursor="hover"
              aria-label="Play ${escapeHtml(track.title)}"
            >
              <span class="music-card__play-icon music-card__play-icon--play">${iconHtml('play', 'icon')}</span>
              <span class="music-card__play-icon music-card__play-icon--pause">${iconHtml('pause', 'icon')}</span>
            </button>
            <span class="music-card__time" data-audio-time>0:00 / 0:00</span>
          </div>
        </div>
        <span class="music-card__glow" aria-hidden="true"></span>
      </article>
    `,
  ).join('');

  return html`
    <section class="music" id="music">
      <header class="section-header" data-reveal>
        <span class="section-header__label" data-i18n="music_label">What I listen to</span>
        <h2 class="section-header__title">
          <span data-i18n="music_title">Top three</span>
          <span class="section-header__accent" data-i18n="music_accent"> favorites</span>
        </h2>
        <span class="section-header__rule" aria-hidden="true"></span>
      </header>

      <p class="music__now-playing" data-reveal>
        <span class="music__now-playing-dot" aria-hidden="true"></span>
        <span class="music__now-playing-label" data-i18n="music_now_playing">Now playing</span>
        <span class="music__now-playing-track" data-now-playing data-i18n="music_nothing_playing">nothing</span>
      </p>

      <div class="music__grid" data-reveal data-reveal-stagger="80">
        ${cards}
      </div>
    </section>
  `;
}

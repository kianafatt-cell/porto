import type { LifecycleModule, Track } from '@/types';
import { TRACKS } from '@/data/tracks';
import { qs, qsa } from '@/utils/dom';
import { on } from '@/utils/events';
import { formatTime } from '@/utils/format';
import { i18n } from '@/modules/i18n';
import { storage, StorageKey } from '@/utils/storage';

/**
 * Audio controller. Owns a single `<audio>` element, cycles through tracks
 * in `TRACKS`, and drives the UI in three places:
 *
 * 1. The music section cards — each card has a play button + progress bar.
 * 2. The floating dock at the bottom of the screen — global play/pause,
 *    prev/next, mute, and a fine progress bar.
 * 3. The now-playing ticker at the top of the music section.
 *
 * The audio element is created lazily on first interaction, so we never
 * autoplay on load (mobile browsers block that anyway) and we keep the
 * first paint cheap.
 */
export function createAudioModule(): LifecycleModule {
  let audio: HTMLAudioElement | null = null;
  let unsubs: Array<() => void> = [];
  let currentIndex = -1;
  let muted = storage.get<boolean>(StorageKey.Muted, false);

  function ensureAudio(): HTMLAudioElement {
    if (audio) return audio;
    audio = new Audio();
    audio.preload = 'metadata';
    audio.crossOrigin = 'anonymous';
    audio.muted = muted;

    const handleTime = () => updateProgress();
    const handleEnd = () => next();
    const handlePlay = () => syncUi();
    const handlePause = () => syncUi();
    const handleMeta = () => updateProgress();

    audio.addEventListener('timeupdate', handleTime);
    audio.addEventListener('ended', handleEnd);
    audio.addEventListener('play', handlePlay);
    audio.addEventListener('pause', handlePause);
    audio.addEventListener('loadedmetadata', handleMeta);

    unsubs.push(() => {
      audio?.removeEventListener('timeupdate', handleTime);
      audio?.removeEventListener('ended', handleEnd);
      audio?.removeEventListener('play', handlePlay);
      audio?.removeEventListener('pause', handlePause);
      audio?.removeEventListener('loadedmetadata', handleMeta);
    });
    return audio;
  }

  function loadTrack(index: number, playAfterLoad = true): void {
    const track = TRACKS[index];
    if (!track) return;
    const el = ensureAudio();
    if (currentIndex !== index) {
      el.src = track.audio;
      currentIndex = index;
      storage.set(StorageKey.LastTrack, track.id);
    }
    if (playAfterLoad) {
      void el.play().catch(() => {
        // Autoplay might fail silently on strict browsers — that's fine.
      });
    }
    syncUi();
  }

  function toggle(index: number): void {
    const el = ensureAudio();
    if (currentIndex === index) {
      if (el.paused) {
        void el.play().catch(() => void 0);
      } else {
        el.pause();
      }
      syncUi();
      return;
    }
    loadTrack(index, true);
  }

  function pauseAll(): void {
    if (audio && !audio.paused) audio.pause();
    syncUi();
  }

  function next(): void {
    if (TRACKS.length === 0) return;
    const nextIndex = ((currentIndex < 0 ? 0 : currentIndex) + 1) % TRACKS.length;
    loadTrack(nextIndex, true);
  }

  function prev(): void {
    if (TRACKS.length === 0) return;
    const base = currentIndex < 0 ? 0 : currentIndex;
    const prevIndex = (base - 1 + TRACKS.length) % TRACKS.length;
    loadTrack(prevIndex, true);
  }

  function toggleMute(): void {
    muted = !muted;
    const el = ensureAudio();
    el.muted = muted;
    storage.set(StorageKey.Muted, muted);
    syncUi();
  }

  function updateProgress(): void {
    if (!audio) return;
    const duration = Number.isFinite(audio.duration) ? audio.duration : 0;
    const progress = duration > 0 ? audio.currentTime / duration : 0;
    // Per-card progress
    const currentTrack: Track | undefined = TRACKS[currentIndex];
    for (const card of qsa<HTMLElement>('[data-audio-card]')) {
      const id = card.dataset['audioCard'];
      const isCurrent = currentTrack && id === currentTrack.id;
      const fill = qs<HTMLElement>('[data-audio-progress]', card);
      const time = qs<HTMLElement>('[data-audio-time]', card);
      if (isCurrent) {
        if (fill) fill.style.setProperty('--progress', progress.toFixed(4));
        if (time) {
          time.textContent = `${formatTime(audio.currentTime)} / ${formatTime(duration)}`;
        }
      } else if (id !== currentTrack?.id) {
        if (fill) fill.style.setProperty('--progress', '0');
      }
    }
    // Dock
    const dockProgress = qs<HTMLElement>('[data-dock-progress]');
    if (dockProgress) dockProgress.style.setProperty('--progress', progress.toFixed(4));
    const dockTime = qs<HTMLElement>('[data-dock-time]');
    if (dockTime) {
      dockTime.textContent = `${formatTime(audio.currentTime)} / ${formatTime(duration)}`;
    }
  }

  function syncUi(): void {
    const bundle = i18n.bundle;
    const currentTrack: Track | undefined = TRACKS[currentIndex];
    const playing = !!audio && !audio.paused && currentIndex >= 0;
    // Card buttons
    for (const card of qsa<HTMLElement>('[data-audio-card]')) {
      const id = card.dataset['audioCard'];
      const isCurrent = id === currentTrack?.id;
      card.classList.toggle('is-playing', isCurrent && playing);
      card.classList.toggle('is-selected', isCurrent);
      const btn = qs<HTMLButtonElement>('[data-audio-toggle]', card);
      if (btn) {
        btn.setAttribute('aria-pressed', String(isCurrent && playing));
        btn.setAttribute(
          'aria-label',
          isCurrent && playing ? bundle.music_pause : bundle.music_play,
        );
      }
    }
    // Dock
    const dock = qs<HTMLElement>('[data-dock]');
    if (dock) {
      dock.classList.toggle('is-active', currentIndex >= 0);
      dock.classList.toggle('is-playing', playing);
      const title = qs<HTMLElement>('[data-dock-title]', dock);
      const artist = qs<HTMLElement>('[data-dock-artist]', dock);
      const cover = qs<HTMLImageElement>('[data-dock-cover]', dock);
      if (currentTrack) {
        if (title) title.textContent = currentTrack.title;
        if (artist) artist.textContent = currentTrack.artist;
        if (cover) {
          cover.src = currentTrack.cover;
          cover.alt = currentTrack.title;
        }
      }
      const muteBtn = qs<HTMLButtonElement>('[data-dock-mute]', dock);
      if (muteBtn) {
        muteBtn.classList.toggle('is-muted', muted);
        muteBtn.setAttribute('aria-pressed', String(muted));
        muteBtn.setAttribute('aria-label', muted ? bundle.unmute_label : bundle.mute_label);
      }
      const playBtn = qs<HTMLButtonElement>('[data-dock-play]', dock);
      if (playBtn) {
        playBtn.setAttribute('aria-pressed', String(playing));
        playBtn.setAttribute(
          'aria-label',
          playing ? bundle.music_pause : bundle.music_play,
        );
        playBtn.classList.toggle('is-playing', playing);
      }
    }
    // Now-playing ticker
    const ticker = qs<HTMLElement>('[data-now-playing]');
    if (ticker) {
      if (currentTrack) {
        ticker.textContent = `${currentTrack.title} — ${currentTrack.artist}`;
        ticker.classList.add('is-active');
      } else {
        ticker.textContent = bundle.music_nothing_playing;
        ticker.classList.remove('is-active');
      }
    }
  }

  function bind(): void {
    for (const button of qsa<HTMLButtonElement>('[data-audio-toggle]')) {
      const card = button.closest<HTMLElement>('[data-audio-card]');
      if (!card) continue;
      const id = card.dataset['audioCard'];
      const index = TRACKS.findIndex((t) => t.id === id);
      if (index < 0) continue;
      unsubs.push(on(button, 'click', () => toggle(index)));
    }
    const dockPlay = qs<HTMLButtonElement>('[data-dock-play]');
    if (dockPlay) {
      unsubs.push(
        on(dockPlay, 'click', () => {
          if (currentIndex < 0) {
            loadTrack(0, true);
          } else {
            toggle(currentIndex);
          }
        }),
      );
    }
    const dockNext = qs<HTMLButtonElement>('[data-dock-next]');
    if (dockNext) unsubs.push(on(dockNext, 'click', next));
    const dockPrev = qs<HTMLButtonElement>('[data-dock-prev]');
    if (dockPrev) unsubs.push(on(dockPrev, 'click', prev));
    const dockMute = qs<HTMLButtonElement>('[data-dock-mute]');
    if (dockMute) unsubs.push(on(dockMute, 'click', toggleMute));

    const dockScrubber = qs<HTMLElement>('[data-dock-scrubber]');
    if (dockScrubber) {
      const seek = (event: PointerEvent): void => {
        if (!audio) return;
        const rect = dockScrubber.getBoundingClientRect();
        const ratio = Math.min(Math.max((event.clientX - rect.left) / rect.width, 0), 1);
        const duration = Number.isFinite(audio.duration) ? audio.duration : 0;
        if (duration > 0) audio.currentTime = ratio * duration;
      };
      unsubs.push(
        on(dockScrubber, 'pointerdown', (event) => {
          (event.target as Element).setPointerCapture?.(event.pointerId);
          seek(event);
          const onMove = (ev: PointerEvent) => seek(ev);
          const onUp = () => {
            window.removeEventListener('pointermove', onMove);
            window.removeEventListener('pointerup', onUp);
          };
          window.addEventListener('pointermove', onMove);
          window.addEventListener('pointerup', onUp);
        }),
      );
    }
  }

  return {
    id: 'audio',
    init() {
      bind();
      unsubs.push(i18n.onChange(() => syncUi()));
      syncUi();
      // Optional: respond to global keyboard space shortcut.
      unsubs.push(
        on(document, 'keydown', (event) => {
          if (event.target instanceof HTMLElement) {
            const tag = event.target.tagName;
            if (tag === 'INPUT' || tag === 'TEXTAREA' || event.target.isContentEditable) return;
          }
          if (event.code === 'Space' && currentIndex >= 0) {
            event.preventDefault();
            toggle(currentIndex);
          }
        }),
      );
      // Pause audio when the tab is hidden to save bandwidth / battery.
      unsubs.push(
        on(document, 'visibilitychange', () => {
          if (document.visibilityState === 'hidden') pauseAll();
        }),
      );
    },
    destroy() {
      unsubs.forEach((u) => u());
      unsubs = [];
      if (audio) {
        audio.pause();
        audio.src = '';
        audio = null;
      }
    },
  };
}

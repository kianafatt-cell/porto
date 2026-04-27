import type { Track } from '@/types';

/**
 * Rijal's top three tracks — the ones he vibes to while working on projects.
 * Audio is streamed directly from catbox.moe (same hosting as the original
 * site). All three files are `audio/mpeg`.
 */
export const TRACKS: readonly Track[] = [
  {
    id: 'voce-na-mira',
    title: 'Voce Na Mira',
    artist: 'Sxilwix, Hwungii & DJ VGK1',
    cover: 'https://files.catbox.moe/ez86dx.png',
    audio: 'https://files.catbox.moe/ywfovc.mp3',
  },
  {
    id: 'animals',
    title: 'Animals',
    artist: 'Maroon 5',
    cover: 'https://files.catbox.moe/vnykz7.jpeg',
    audio: 'https://files.catbox.moe/a6x0fp.mp3',
  },
  {
    id: 'tourner-dans-le-vide',
    title: 'Tourner Dans Le Vide',
    artist: 'Indila',
    cover: 'https://files.catbox.moe/9i3h8a.jpg',
    audio: 'https://files.catbox.moe/2h9ncr.mp3',
  },
] as const;

import type { SocialLink } from '@/types';

/**
 * Public-facing contact channels. The `display` field is what shows on the
 * card, `handle` is the copy-to-clipboard payload used by the contact
 * section's quick-copy buttons.
 */
export const SOCIALS: readonly SocialLink[] = [
  {
    id: 'whatsapp',
    label: 'WhatsApp',
    icon: 'whatsapp',
    url: 'https://wa.me/6283834683978',
    handle: '+6283834683978',
    display: '+62 838 3468 3978',
  },
  {
    id: 'instagram',
    label: 'Instagram',
    icon: 'instagram',
    url: 'https://www.instagram.com/lestnsgr',
    handle: '@lestnsgr',
    display: '@lestnsgr',
  },
  {
    id: 'location',
    label: 'Location',
    icon: 'pin',
    url: 'https://maps.google.com/?q=Bogor%2C+Indonesia',
    handle: 'Bogor, Indonesia',
    display: 'Bogor, Indonesia',
  },
] as const;

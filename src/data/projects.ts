import type { Project } from '@/types';

/**
 * Projects surfaced on the landing page. Both projects shipped in 2026 and
 * were migrated from their old subdomains to the new `ijal.eu.cc` hierarchy.
 */
export const PROJECTS: readonly Project[] = [
  {
    id: 'voiduploader',
    title: 'VOIDUPLOADER',
    categoryKey: 'web_tool',
    description: {
      id: 'Alat sederhana yang memungkinkan pengguna mengunggah gambar, video, atau audio dan langsung mengubahnya menjadi tautan yang dapat dibagikan. Dirancang untuk berbagi file yang cepat dan ringan.',
      en: 'A simple tool that allows users to upload images, videos, or audio and instantly convert them into a shareable link. Designed for quick and lightweight file sharing.',
    },
    image: 'https://up.ijal.eu.cc/f/voidd',
    url: 'https://up.ijal.eu.cc',
    migrated: {
      from: 'uploader.ijal.eu.cc',
      to: 'up.ijal.eu.cc',
    },
    tags: ['upload', 'cdn', 'share', 'media'],
  },
  {
    id: 'ytdown',
    title: 'YTDown',
    categoryKey: 'web_tool',
    description: {
      id: 'Alat web ringan yang memungkinkan pengguna mengunduh video YouTube hanya dengan menempelkan tautan video dan memilih kualitas yang diinginkan. Cepat, sederhana, dan mudah digunakan.',
      en: 'A lightweight web tool that lets users download YouTube videos by simply pasting a link and selecting the desired quality. Fast, simple, and easy to use.',
    },
    image: 'https://up.ijal.eu.cc/f/ytdownn',
    url: 'https://down.ijal.eu.cc',
    migrated: {
      from: 'goldstream.idgf.web.id',
      to: 'down.ijal.eu.cc',
    },
    tags: ['video', 'download', 'converter'],
  },
] as const;

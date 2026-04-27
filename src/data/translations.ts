import type { Translations } from '@/types';

/**
 * Language bundles. Keys must stay in sync with `TranslationBundle` in
 * `src/types`. TypeScript will scream if a key is missing from either side.
 *
 * Typed hero lines include tiny inline SVG-less emoji-style icons so they
 * render consistently across platforms without pulling in Font Awesome.
 */
export const TRANSLATIONS: Translations = {
  id: {
    nav_logo: 'Rijal',
    nav_home: 'Beranda',
    nav_about: 'Tentang',
    nav_music: 'Musik',
    nav_projects: 'Proyek',
    nav_contact: 'Kontak',

    hero_badge: 'Portofolio Siswa · 2026',
    hero_greeting: 'Halo, saya',
    hero_name: 'Rijal',
    hero_role: 'Siswa · Kelas 12',
    hero_subtitle:
      'Pola pikir berkembang, eksplorasi, dan belajar yang konsisten — dari Bogor.',
    hero_typed: [
      'Pola pikir berkembang.',
      'Eksplorasi tanpa henti.',
      'Belajar konsisten.',
      'Siswa kelas 12.',
      'Dari Bogor, Indonesia.',
    ],
    hero_cta_primary: 'Lihat proyek',
    hero_cta_secondary: 'Hubungi saya',
    hero_scroll_hint: 'Geser ke bawah',

    about_label: 'Kenali saya',
    about_title: 'Tentang',
    about_accent: 'saya',
    about_location_prefix: 'Siswa berbasis di',
    about_location_city: 'Bogor',
    about_p1:
      'Seorang siswa Kelas 12 berusia 18 tahun dari Bogor, didorong oleh rasa penasaran. Saya suka menyelami pengalaman baru dan menantang batas diri — bukan sekadar hasil, melainkan proses konsisten untuk belajar, berkembang, dan membangun versi diri yang lebih baik.',
    about_p2:
      'Saya percaya pertumbuhan datang dari melangkah keluar dari zona nyaman. Setiap proyek yang saya buat, setiap lagu yang saya dengarkan, dan setiap koneksi yang saya jalin adalah bagian dari perjalanan itu.',
    about_age_label: 'Tahun',
    info_name_label: 'Nama',
    info_class_label: 'Kelas',
    info_location_label: 'Lokasi',
    info_hobby_label: 'Hobi',
    info_hobby_value: 'Eksplorasi',
    about_cta: 'Mari terhubung',

    music_label: 'Yang saya dengarkan',
    music_title: 'Tiga lagu',
    music_accent: 'favorit',
    music_now_playing: 'Sedang diputar',
    music_nothing_playing: 'tidak ada',
    music_play: 'Putar',
    music_pause: 'Jeda',
    music_muted: 'Bisu',

    projects_label: 'Yang saya bangun',
    projects_title: 'Proyek',
    projects_accent: 'saya',
    projects_migrated: 'Domain dipindah',
    project_visit_new: 'Kunjungi domain baru',
    project_domain_old: 'Lama',
    project_domain_new: 'Baru',

    contact_label: 'Hubungi saya',
    contact_title: 'Kontak',
    contact_accent: 'saya',
    contact_connect_heading: 'Mari',
    contact_connect_accent: 'terhubung',
    contact_desc:
      'Merangkul perjalanan, satu langkah demi satu langkah. Kontak saya lewat WhatsApp atau Instagram — saya senang berbagi ide tentang pertumbuhan, pembelajaran, dan pengalaman baru.',
    contact_wa_label: 'WhatsApp',
    contact_ig_label: 'Instagram',
    contact_loc_label: 'Lokasi',
    contact_copy_wa: 'Salin nomor WA',
    contact_copy_ok: 'Disalin',

    footer_tagline: 'Dibangun pelan-pelan di Bogor.',
    footer_rights: 'Semua hak dilindungi.',

    lang_switch_label: 'Ganti bahasa',
    mute_label: 'Bisukan audio',
    unmute_label: 'Aktifkan audio',
    skip_to_content: 'Lewati ke konten',
    back_to_top: 'Kembali ke atas',
  },
  en: {
    nav_logo: 'Rijal',
    nav_home: 'Home',
    nav_about: 'About',
    nav_music: 'Music',
    nav_projects: 'Projects',
    nav_contact: 'Contact',

    hero_badge: 'Student Portfolio · 2026',
    hero_greeting: "Hi, I'm",
    hero_name: 'Rijal',
    hero_role: 'Student · Class 12',
    hero_subtitle:
      'Growth mindset, exploration, and consistent learning — from Bogor.',
    hero_typed: [
      'Growth mindset.',
      'Relentless exploration.',
      'Consistent learning.',
      'Class 12 student.',
      'From Bogor, Indonesia.',
    ],
    hero_cta_primary: 'View projects',
    hero_cta_secondary: 'Get in touch',
    hero_scroll_hint: 'Scroll down',

    about_label: 'Get to know',
    about_title: 'About',
    about_accent: 'me',
    about_location_prefix: 'Student based in',
    about_location_city: 'Bogor',
    about_p1:
      "A Class 12 student, 18 years young, fuelled by a passion for the unknown. I love diving into new experiences and challenging my own limits — it isn't the destination, it's the consistent grind to learn, evolve, and build a better version of myself.",
    about_p2:
      'I believe that growth comes from stepping outside your comfort zone. Every project I build, every song I listen to, and every connection I make is part of that journey.',
    about_age_label: 'Years old',
    info_name_label: 'Name',
    info_class_label: 'Class',
    info_location_label: 'Location',
    info_hobby_label: 'Hobby',
    info_hobby_value: 'Exploration',
    about_cta: "Let's connect",

    music_label: 'What I listen to',
    music_title: 'Top three',
    music_accent: 'favorites',
    music_now_playing: 'Now playing',
    music_nothing_playing: 'nothing',
    music_play: 'Play',
    music_pause: 'Pause',
    music_muted: 'Muted',

    projects_label: 'Things I built',
    projects_title: 'My',
    projects_accent: 'projects',
    projects_migrated: 'Domain migrated',
    project_visit_new: 'Visit new domain',
    project_domain_old: 'Old',
    project_domain_new: 'New',

    contact_label: 'Get in touch',
    contact_title: 'Contact',
    contact_accent: 'me',
    contact_connect_heading: "Let's",
    contact_connect_accent: 'connect',
    contact_desc:
      "Embracing the journey, one step at a time. Reach out on WhatsApp or Instagram — I'd love to connect and share ideas about growth, learning, and new experiences.",
    contact_wa_label: 'WhatsApp',
    contact_ig_label: 'Instagram',
    contact_loc_label: 'Location',
    contact_copy_wa: 'Copy WA number',
    contact_copy_ok: 'Copied',

    footer_tagline: 'Built slowly in Bogor.',
    footer_rights: 'All rights reserved.',

    lang_switch_label: 'Switch language',
    mute_label: 'Mute audio',
    unmute_label: 'Unmute audio',
    skip_to_content: 'Skip to content',
    back_to_top: 'Back to top',
  },
};

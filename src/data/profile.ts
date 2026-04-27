/**
 * The single source of truth for anything "about Rijal". If a field needs to
 * change (name, age, class, bio photo), it changes here — never in templates.
 */
export const PROFILE = {
  name: 'Rijal',
  fullName: 'Rijal',
  age: 18,
  role: {
    id: 'Siswa · Kelas 12',
    en: 'Student · Class 12',
  },
  city: 'Bogor',
  country: {
    id: 'Indonesia',
    en: 'Indonesia',
  },
  domain: 'ijal.eu.cc',
  avatar: 'https://files.catbox.moe/82997e.png',
  avatarFallback:
    'https://via.placeholder.com/520x520/1a1530/a855f7?text=Rijal',
  tagline: {
    id: 'Tumbuh pelan, tapi konsisten.',
    en: 'Growing slowly, but consistently.',
  },
  bio: {
    id: [
      'Seorang siswa Kelas 12 berusia 18 tahun dari Bogor, didorong oleh rasa penasaran. Saya suka menyelami pengalaman baru dan menantang batas diri — bukan sekadar hasil, melainkan proses konsisten untuk belajar, berkembang, dan membangun versi diri yang lebih baik.',
      'Saya percaya pertumbuhan datang dari melangkah keluar dari zona nyaman. Setiap proyek yang saya buat, setiap lagu yang saya dengarkan, dan setiap koneksi yang saya jalin adalah bagian dari perjalanan itu.',
    ],
    en: [
      'A Class 12 student, 18 years young, from Bogor — fuelled by a passion for the unknown. I love diving into new experiences and challenging my own limits: it isn\'t the destination, it\'s the consistent grind to learn, evolve, and build a better version of myself.',
      'Growth comes from stepping outside your comfort zone. Every project I build, every song I listen to, and every connection I make is part of that journey.',
    ],
  },
} as const;

export type ProfileShape = typeof PROFILE;

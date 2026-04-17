import type { Ayah, Surah } from '@/types/quran';

const surahsData: Surah[] = [
  {
    number: 1,
    nameArabic: 'الفاتحة',
    nameEnglish: 'The Opener',
    revelationType: 'Meccan',
    versesCount: 7,
  },
];

const ayahsData: Ayah[] = [
  {
    id: '1:1',
    surahNumber: 1,
    surahNameArabic: 'الفاتحة',
    surahNameEnglish: 'The Opener',
    revelationType: 'Meccan',
    ayahNumber: 1,
    arabic: 'بِسۡمِ ٱللَّهِ ٱلرَّحۡمَٰنِ ٱلرَّحِيمِ',
    translation: 'In the name of Allah, the Entirely Merciful, the Especially Merciful',
    transliteration: 'Bismillahir Rahmanir Rahim',
    translationBn: 'শুরু করছি আল্লাহর নামে যিনি পরম করুণাময়, অতি দয়ালু।',
  },
];

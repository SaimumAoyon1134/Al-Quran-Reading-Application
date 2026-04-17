export type Surah = {
  number: number;
  nameArabic: string;
  nameEnglish: string;
  revelationType: "Meccan" | "Medinan";
  versesCount: number;
};

export type Ayah = {
  id: string;
  surahNumber: number;
  surahNameArabic: string;
  surahNameEnglish: string;
  revelationType: "Meccan" | "Medinan";
  ayahNumber: number;
  arabic: string;
  transliteration?: string;
  translation: string;
  // optional Bangla translation (from quran_bn.json)
  translationBn?: string;
};

export type ReaderSettings = {
  arabicFont: "amiri" | "notoNaskh";
  arabicFontSize: number;
  translationFontSize: number;
  // translation language to show under each ayah. 'bn' = Bangla, 'en' = English
  translationLanguage: "bn" | "en";
  // when true, enable reading mode where the focused ayah is emphasized
  readingMode: boolean; // default should be false
};

import type { Ayah, Surah } from '@/types/quran';

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL?.replace(/\/$/, '') || 'https://al-quran-backend-opal.vercel.app';

async function fetchJson<T>(path: string): Promise<T> {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    cache: 'no-store',
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch ${path}: ${response.status} ${response.statusText}`);
  }

  return response.json() as Promise<T>;
}

export async function getAllSurahs(): Promise<Surah[]> {
  return fetchJson<Surah[]>('/surahs');
}

export async function getSurahByNumber(surahNumber: number): Promise<Surah | undefined> {
  try {
    return await fetchJson<Surah>(`/surahs/${surahNumber}`);
  } catch {
    return undefined;
  }
}

export async function getAyahsBySurahNumber(surahNumber: number): Promise<Ayah[]> {
  try {
    return await fetchJson<Ayah[]>(`/ayahs?surah=${surahNumber}`);
  } catch {
    return [];
  }
}

export async function getAllSurahParams() {
  const surahs = await getAllSurahs();

  return surahs.map((surah) => ({
    id: surah.number.toString(),
  }));
}

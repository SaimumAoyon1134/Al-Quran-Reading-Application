import { notFound } from 'next/navigation';
import { Container } from '@/components/Container';
import { SurahReader } from '@/components/SurahReader';
import { getAllSurahParams, getAyahsBySurahNumber, getSurahByNumber } from '@/lib/quran';

export async function generateStaticParams() {
  return await getAllSurahParams();
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const surah = await getSurahByNumber(Number(id));

  return {
    title: surah ? `${surah.nameEnglish} | Quran Reader` : 'Surah | Quran Reader',
  };
}

export default async function SurahPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const surahNumber = Number(id);
  const surah = await getSurahByNumber(surahNumber);

  if (!surah) {
    notFound();
  }

  const ayahs = await getAyahsBySurahNumber(surahNumber);

  return (
    <Container>
      <SurahReader surah={surah} ayahs={ayahs} />
    </Container>
  );
}

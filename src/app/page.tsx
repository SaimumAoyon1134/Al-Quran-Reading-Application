import Link from 'next/link';
import { Container } from '@/components/Container';
import { getAllSurahs } from '@/lib/quran';

export default async function HomePage() {
  const surahs = await getAllSurahs();

  return (
    <Container>
      <section className="rounded-[2rem] bg-gradient-to-br from-emerald-100 via-white to-stone-100 p-8 shadow-sm sm:p-12">
        <div className="max-w-3xl">
          <p className="mb-3 inline-flex rounded-full bg-white px-4 py-2 text-sm font-semibold text-emerald-700 shadow-sm">
            Al Quran 
          </p>
          <h1 className="text-4xl font-bold tracking-tight text-stone-900 sm:text-5xl">
            Read, search, and customize a modern Quran reader experience.
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-stone-600">
            This starter ships with a responsive surah list, ayah reader page, translation search, and a persistent settings panel.
            Replace the sample data with the full 114-surah dataset using the included preparation script.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/surahs"
              className="rounded-full bg-emerald-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-emerald-700"
            >
              Browse Surahs
            </Link>
            <Link
              href="/search"
              className="rounded-full border border-stone-300 bg-white px-5 py-3 text-sm font-semibold text-stone-700 transition hover:border-emerald-300 hover:text-emerald-700"
            >
              Search Ayahs
            </Link>
          </div>
        </div>
      </section>

      <section className="mt-10 grid gap-4 sm:grid-cols-3">
        <div className="rounded-3xl border border-stone-200 bg-white p-6 shadow-sm">
          <p className="text-sm font-semibold text-emerald-700">Surahs</p>
          <p className="mt-2 text-3xl font-bold text-stone-900">114</p>
          <p className="mt-2 text-sm text-stone-500">The UI is ready for a full static Quran dataset.</p>
        </div>
        <div className="rounded-3xl border border-stone-200 bg-white p-6 shadow-sm">
          <p className="text-sm font-semibold text-emerald-700">Included Demo Data</p>
          <p className="mt-2 text-3xl font-bold text-stone-900">{surahs.length}</p>
          <p className="mt-2 text-sm text-stone-500">Sample surahs are included so the project runs immediately.</p>
        </div>
        <div className="rounded-3xl border border-stone-200 bg-white p-6 shadow-sm">
          <p className="text-sm font-semibold text-emerald-700">Persistent Settings</p>
          <p className="mt-2 text-3xl font-bold text-stone-900">localStorage</p>
          <p className="mt-2 text-sm text-stone-500">Arabic font, Arabic size, and translation size are saved locally.</p>
        </div>
      </section>
    </Container>
  );
}

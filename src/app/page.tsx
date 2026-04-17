import Link from 'next/link';
import { Container } from '@/components/Container';
import { getAllSurahs } from '@/lib/quran';

export default async function HomePage() {
  const surahs = await getAllSurahs();

  return (
    <Container>
      <section className="space-y-10">
        {/* Hero Section */}
        <div className="rounded-[2rem] bg-gradient-to-br from-emerald-100 via-white to-stone-100 p-8 shadow-sm sm:p-12">
          <div className="max-w-3xl">
            <p className="mb-3 inline-flex rounded-full bg-white px-4 py-2 text-sm font-semibold text-emerald-700 shadow-sm">
              Al Quran Digital Experience
            </p>
            <h1 className="text-4xl font-bold tracking-tight text-stone-900 sm:text-5xl">
              A Modern Quran Reader for Deep Reflection
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-stone-600">
              Explore the Quran with a clean, responsive interface designed for readability, search, and personalization. Built for both learning and daily recitation.
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
        </div>

        {/* Features Section */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <div className="reader-shell p-6">
            <h3 className="text-lg font-semibold text-stone-900">📖 Smart Reading</h3>
            <p className="mt-2 text-sm text-stone-600">
              Read ayahs with beautiful Arabic typography, transliteration, and translations.
            </p>
          </div>

          <div className="reader-shell p-6">
            <h3 className="text-lg font-semibold text-stone-900">🔍 Powerful Search</h3>
            <p className="mt-2 text-sm text-stone-600">
              Instantly search Quranic verses in Bangla and English with highlighted results.
            </p>
          </div>

          <div className="reader-shell p-6">
            <h3 className="text-lg font-semibold text-stone-900">⚙️ Custom Settings</h3>
            <p className="mt-2 text-sm text-stone-600">
              Adjust font size, language, and reading mode for a personalized experience.
            </p>
          </div>

          <div className="reader-shell p-6">
            <h3 className="text-lg font-semibold text-stone-900">🌙 Focus Mode</h3>
            <p className="mt-2 text-sm text-stone-600">
              Minimize distractions and focus deeply on one ayah at a time.
            </p>
          </div>

          <div className="reader-shell p-6">
            <h3 className="text-lg font-semibold text-stone-900">⚡ Fast Performance</h3>
            <p className="mt-2 text-sm text-stone-600">
              Optimized with Next.js for lightning-fast loading and smooth navigation.
            </p>
          </div>

          <div className="reader-shell p-6">
            <h3 className="text-lg font-semibold text-stone-900">📱 Responsive Design</h3>
            <p className="mt-2 text-sm text-stone-600">
              Seamless experience across mobile, tablet, and desktop devices.
            </p>
          </div>
        </div>
      </section>
    </Container>
  );
}

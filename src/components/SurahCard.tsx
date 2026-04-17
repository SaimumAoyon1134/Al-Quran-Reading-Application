import Link from "next/link";
import type { Surah } from "@/types/quran";

export function SurahCard({ surah }: { surah: Surah }) {
  return (
    <Link href={`/surah/${surah.number}`} className="glass-card group">
      <div className="mb-4 flex items-start justify-between gap-4">
        <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-emerald-50 text-sm font-semibold text-emerald-700">
          {surah.number}
        </span>
        <p className="text-right font-arabicAmiri text-2xl text-stone-900">
          {surah.nameArabic}
        </p>
      </div>

      <h3 className="text-lg font-semibold text-stone-900 group-hover:text-emerald-700">
        {surah.nameEnglish}
      </h3>
      <p className="mt-1 text-sm text-stone-500">
        {surah.revelationType} • {surah.versesCount} ayahs
      </p>
    </Link>
  );
}

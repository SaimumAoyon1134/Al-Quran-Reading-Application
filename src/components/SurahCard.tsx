"use client";

import Link from "next/link";
import { useState } from "react";
import type { Surah } from "@/types/quran";

export function SurahCard({ surah }: { surah: Surah }) {
  const [loading, setLoading] = useState(false);
  return (
    <Link
      href={`/surah/${surah.number}`}
      onClick={() => setLoading(true)}
      className="glass-card group relative overflow-hidden"
    >
      {loading ? (
        <div className="absolute inset-0 z-10 flex items-center justify-center bg-white/80 backdrop-blur-sm">
          <div className="flex flex-col items-center gap-3">
            <div className="h-10 w-10 animate-spin rounded-full border-4 border-emerald-100 border-t-emerald-600" />
            <p className="text-sm font-semibold text-emerald-700">
              Opening Surah...
            </p>
          </div>
        </div>
      ) : null}
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

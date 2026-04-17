"use client";

import { useEffect, useState } from "react";
import { SurahReader } from "@/components/SurahReader";
import LoadingSkeleton from "@/components/LoadingSkeleton";
import type { Ayah, Surah } from "@/types/quran";

export function SurahClient({ surahNumber }: { surahNumber: number }) {
  const [surah, setSurah] = useState<Surah | null>(null);
  const [ayahs, setAyahs] = useState<Ayah[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;
    setLoading(true);
    setError(null);

    async function load() {
      try {
        const [sRes, aRes] = await Promise.all([
          fetch(
            `https://al-quran-backend-opal.vercel.app/surahs/${surahNumber}`,
          ),
          fetch(
            `https://al-quran-backend-opal.vercel.app/ayahs?surah=${surahNumber}`,
          ),
        ]);

        if (!sRes.ok) throw new Error(`surah HTTP ${sRes.status}`);
        if (!aRes.ok) throw new Error(`ayahs HTTP ${aRes.status}`);

        const sData = await sRes.json();
        const aData = await aRes.json();

        if (mounted) {
          setSurah(sData || null);
          // dedupe ayahs by id in case the backend returns duplicates
          const unique: Record<string, any> = {};
          const deduped = (aData || []).filter((a: any) => {
            if (!a || !a.id) return false;
            if (unique[a.id]) return false;
            unique[a.id] = true;
            return true;
          });
          setAyahs(deduped);
        }
      } catch (err: any) {
        console.error("Failed to load surah/ayahs", err);
        if (mounted) setError(String(err?.message ?? err));
      } finally {
        if (mounted) setLoading(false);
      }
    }

    load();

    return () => {
      mounted = false;
    };
  }, [surahNumber]);

  if (loading) return <LoadingSkeleton variant="surah" />;
  if (error)
    return <div className="reader-shell p-8 text-red-600">{error}</div>;
  if (!surah) return <div className="reader-shell p-8">Surah not found</div>;

  return <SurahReader surah={surah} ayahs={ayahs} />;
}

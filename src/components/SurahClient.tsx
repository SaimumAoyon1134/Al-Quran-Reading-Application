"use client";

import { useEffect, useState } from "react";
import { SurahReader } from "@/components/SurahReader";
import LoadingSkeleton from "@/components/LoadingSkeleton";
import type { Ayah, Surah } from "@/types/quran";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL?.replace(/\/$/, "") ||
  "https://al-quran-backend-opal.vercel.app";

export function SurahClient({ surahNumber }: { surahNumber: number }) {
  const [surah, setSurah] = useState<Surah | null>(null);
  const [ayahs, setAyahs] = useState<Ayah[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showLoadingUI, setShowLoadingUI] = useState(false);

  useEffect(() => {
    let mounted = true;
    setLoading(true);
    setError(null);
    setShowLoadingUI(false);
    setSurah(null);
    setAyahs([]);
    const loadingTimer = window.setTimeout(() => {
      if (mounted) setShowLoadingUI(true);
    }, 150);

    async function load() {
      try {
        const [sRes, aRes] = await Promise.all([
          fetch(
            `${API_BASE_URL}/surahs/${surahNumber}`,
          ),
          fetch(
            `${API_BASE_URL}/ayahs?surah=${surahNumber}`,
          ),
        ]);

        if (!sRes.ok) throw new Error(`surah HTTP ${sRes.status}`);
        if (!aRes.ok) throw new Error(`ayahs HTTP ${aRes.status}`);

        const sData = await sRes.json();
        const aData = await aRes.json();

        if (mounted) {
          setSurah(sData || null);
          // dedupe ayahs by id in case the backend returns duplicates
          const unique: Record<string, boolean> = {};
          const deduped = (Array.isArray(aData) ? aData : []).filter(
            (a: Ayah | null | undefined) => {
              if (!a || !a.id) return false;
              if (unique[a.id]) return false;
              unique[a.id] = true;
              return true;
            },
          );
          setAyahs(deduped);
        }
      } catch (err: unknown) {
        console.error("Failed to load surah/ayahs", err);
        if (mounted) setError(err instanceof Error ? err.message : String(err));
      } finally {
        if (mounted) setLoading(false);
      }
    }

    load();

    return () => {
      window.clearTimeout(loadingTimer);
      mounted = false;
    };
  }, [surahNumber]);

  if (loading) {
    return showLoadingUI ? (<LoadingSkeleton />
    ) : null;
  }

  if (error) {
    return <div className="reader-shell p-8 text-red-600">{error}</div>;
  }

  if (!surah) {
    return <div className="reader-shell p-8">Surah not found</div>;
  }

  return <SurahReader surah={surah} ayahs={ayahs} />;
}

"use client";

import { useEffect, useState } from "react";
import { Container } from "@/components/Container";
import { SurahCard } from "@/components/SurahCard";
import LoadingSkeleton from "@/components/LoadingSkeleton";
import type { Surah } from "@/types/quran";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL?.replace(/\/$/, "") ||
  "https://al-quran-backend-opal.vercel.app";

export function SurahsClient() {
  const [surahs, setSurahs] = useState<Surah[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;
    setLoading(true);
    fetch(`${API_BASE_URL}/surahs`, { cache: "no-store" })
      .then((res) => {
        if (!res.ok) {
          throw new Error(
            `Failed to fetch ${API_BASE_URL}/surahs (${res.status} ${res.statusText})`,
          );
        }
        return res.json();
      })
      .then((data) => {
        if (mounted) setSurahs(data || []);
      })
      .catch((err) => {
        console.error("Failed to fetch /surahs", err);
        if (mounted) setError(String(err));
      })
      .finally(() => {
        if (mounted) setLoading(false);
      });

    return () => {
      mounted = false;
    };
  }, []);

  return (
    <Container>
      <section className="reader-shell mashq-pattern mb-8 p-6 sm:p-8">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-emerald-700">
          114 chapters
        </p>
        <h1 className="mt-3 text-3xl font-bold tracking-tight text-stone-900 sm:text-4xl">
          Browse every surah
        </h1>
        <p className="mt-3 max-w-3xl leading-7 text-stone-600">
          Explore all surahs..
        </p>
      </section>

      {loading ? (
        <LoadingSkeleton variant="list" count={6} />
      ) : error ? (
        <div className="reader-shell p-8 text-center text-red-600">
          Failed to load surahs: {error}
        </div>
      ) : (
        <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {surahs.map((surah) => (
            <SurahCard key={surah.number} surah={surah} />
          ))}
        </section>
      )}
    </Container>
  );
}

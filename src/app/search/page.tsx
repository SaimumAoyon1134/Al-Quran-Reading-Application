"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL?.replace(/\/$/, "") ||
  "https://al-quran-backend-opal.vercel.app";

type SearchResult = {
  id: string;
  translation: string;
  translationBn?: string;
  englishTranslation?: string;
  surahNumber: number;
  surahNameEnglish: string;
  ayahNumber: number;
};

function escapeRegExp(value: string) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function normalizeWords(query: string) {
  return query
    .trim()
    .split(/\s+/)
    .map((word) => word.trim())
    .filter(Boolean);
}

function highlightText(text: string, query: string) {
  const words = normalizeWords(query);
  if (!words.length) return text;

  const pattern = words.map(escapeRegExp).join("|");
  const parts = text.split(new RegExp(`(${pattern})`, "gi"));

  return parts.map((part, index) => {
    const matched = words.some(
      (word) => part.toLowerCase() === word.toLowerCase(),
    );
    return matched ? (
      <mark
        key={index}
        className="rounded-md bg-emerald-200 px-1.5 py-0.5 text-stone-900"
      >
        {part}
      </mark>
    ) : (
      part
    );
  });
}

function useDebouncedValue<T>(value: T, delay = 250) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timer = window.setTimeout(() => setDebouncedValue(value), delay);
    return () => window.clearTimeout(timer);
  }, [value, delay]);

  return debouncedValue;
}

const quickSuggestions = [
  "guidance",
  "mercy",
  "patience",
  "charity",
  "জান্নাত",
  "রহমত",
];

function getEnglishTranslation(result: SearchResult) {
  return typeof result.englishTranslation === "string"
    ? result.englishTranslation.trim()
    : "";
}

export default function SearchClient() {
  const [query, setQuery] = useState("guidance");
  const debouncedQuery = useDebouncedValue(query, 250);
  const trimmedQuery = debouncedQuery.trim();
  const queryWords = useMemo(
    () => normalizeWords(trimmedQuery),
    [trimmedQuery],
  );

  const [results, setResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    const controller = new AbortController();

    async function doSearch() {
      const q = trimmedQuery;

      if (!q) {
        setResults([]);
        setLoading(false);
        setError(null);
        return;
      }

      setLoading(true);
      setError(null);

      try {
        const res = await fetch(
          `${API_BASE_URL}/search?q=${encodeURIComponent(q)}`,
          {
            signal: controller.signal,
            cache: "no-store",
          },
        );

        if (!res.ok) {
          if (!cancelled) {
            setResults([]);
            setError(`Backend search failed with status ${res.status}`);
          }
          return;
        }

        const data = await res.json();
        const items = Array.isArray(data)
          ? data
          : Array.isArray(data?.results)
            ? data.results
            : [];

        if (!cancelled) {
          setResults(items.slice(0, 50));
        }
      } catch (err: any) {
        if (err?.name === "AbortError") return;
        if (!cancelled) {
          setResults([]);
          setError(String(err?.message ?? err));
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    void doSearch();

    return () => {
      cancelled = true;
      controller.abort();
    };
  }, [trimmedQuery]);

  const hasQuery = query.trim().length > 0;

  return (
    <div className="space-y-6  max-w-3xl mx-auto ">
      <div className="reader-shell p-5 shadow-sm sm:p-6">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div className="flex-1">
            <div className="mb-2 flex items-center justify-between gap-3">
              <label
                htmlFor="ayah-search"
                className="block text-sm font-semibold text-stone-700"
              >
                Search Bangla or English translations
              </label>
              {hasQuery ? (
                <button
                  type="button"
                  onClick={() => setQuery("")}
                  className="text-xs font-medium text-stone-500 transition hover:text-emerald-700"
                >
                  Clear search
                </button>
              ) : null}
            </div>

            <div className="relative">
              <input
                id="ayah-search"
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Try: mercy, guidance, patience, জান্নাত..."
                className="w-full rounded-2xl border border-stone-300 bg-white px-4 py-3 pr-12 text-stone-900 outline-none transition focus:border-emerald-400 focus:ring-4 focus:ring-emerald-100"
              />
              <span className="pointer-events-none absolute inset-y-0 right-4 flex items-center text-stone-400">
                ⌕
              </span>
            </div>

            <p className="mt-3 text-sm text-stone-500">
              Search across Bangla and English translated ayahs with ranked
              results, keyword highlighting, and quick shortcuts.
            </p>
          </div>

          <div className="min-w-[220px] rounded-2xl bg-stone-50 p-4 text-sm text-stone-600">
            <p className="font-semibold text-stone-900">Search status</p>
            <p className="mt-2">
              {trimmedQuery
                ? `${results.length} ranked result${results.length === 1 ? "" : "s"} shown`
                : "Start typing to explore verses."}
            </p>
            <p className="mt-1 text-xs text-stone-500">
              Top 50 matches are displayed for speed and clarity.
            </p>
          </div>
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          {quickSuggestions.map((suggestion) => {
            const active =
              query.trim().toLowerCase() === suggestion.toLowerCase();

            return (
              <button
                key={suggestion}
                type="button"
                onClick={() => setQuery(suggestion)}
                className={
                  active
                    ? "rounded-full border border-emerald-300 bg-emerald-50 px-3 py-1.5 text-sm font-semibold text-emerald-700"
                    : "rounded-full border border-stone-200 bg-white px-3 py-1.5 text-sm font-medium text-stone-600 transition hover:border-emerald-300 hover:text-emerald-700"
                }
              >
                {suggestion}
              </button>
            );
          })}
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <div className="reader-shell p-4">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-emerald-700">
            Fast lookup
          </p>
          <p className="mt-2 text-sm leading-6 text-stone-600">
            Debounced input keeps searching responsive while you type.
          </p>
        </div>
        <div className="reader-shell p-4">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-emerald-700">
            Dual language
          </p>
          <p className="mt-2 text-sm leading-6 text-stone-600">
            Results can match Bangla translation text as well as English
            translation text.
          </p>
        </div>
        <div className="reader-shell p-4">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-emerald-700">
            Direct reading
          </p>
          <p className="mt-2 text-sm leading-6 text-stone-600">
            Each result links straight to the exact ayah inside the surah page.
          </p>
        </div>
      </div>

      {trimmedQuery ? (
        <div className="reader-shell p-4 sm:p-5">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm font-semibold text-stone-900">
                Current query
              </p>
              <p className="mt-1 text-sm text-stone-600">
                {queryWords.length > 0 ? queryWords.join(" • ") : trimmedQuery}
              </p>
            </div>
            <div className="rounded-2xl bg-stone-50 px-4 py-3 text-sm text-stone-600">
              <span className="font-semibold text-stone-900">Mode:</span> Bangla
              + English ranked search
            </div>
          </div>
        </div>
      ) : null}

      {error ? (
        <div className="reader-shell border border-amber-200 bg-amber-50 p-4 text-sm text-amber-800">
          Backend search is unavailable right now. Details: {error}
        </div>
      ) : null}

      <div className="space-y-4">
        {!trimmedQuery ? (
          <div className="reader-shell border-dashed p-8 text-center text-stone-500">
            Start with a word like{" "}
            <span className="font-semibold text-stone-700">guidance</span>,{" "}
            <span className="font-semibold text-stone-700">mercy</span>,{" "}
            <span className="font-semibold text-stone-700">রহমত</span>, or{" "}
            <span className="font-semibold text-stone-700">জান্নাত</span>.
          </div>
        ) : null}

        {trimmedQuery && results.length === 0 && !loading ? (
          <div className="reader-shell border-dashed p-8 text-center text-stone-500">
            No ayahs matched your search. Try fewer words or a broader Bangla or
            English keyword.
          </div>
        ) : null}

        {loading ? (
          <div className="reader-shell p-6 text-sm text-stone-500">
            Searching...
          </div>
        ) : null}

        {results.map((result, index) => (
          <Link
            key={result.id}
            href={`/surah/${result.surahNumber}#ayah-${result.ayahNumber}`}
            className="reader-shell block p-5 transition hover:border-emerald-300 hover:shadow-md"
          >
            <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <p className="text-sm font-semibold text-emerald-700">
                  #{index + 1} • {result.surahNameEnglish} • Ayah{" "}
                  {result.ayahNumber}
                </p>
                <p className="mt-1 text-xs uppercase tracking-[0.16em] text-stone-400">
                  Surah {result.surahNumber}
                </p>
              </div>
              <span className="rounded-full bg-stone-100 px-3 py-1 text-xs font-medium text-stone-600">
                Open reader
              </span>
            </div>

            <div className="mt-4 space-y-3">
              <div>
                <p className="leading-8 text-stone-700">
                  {highlightText(
                    result.translationBn || result.translation,
                    trimmedQuery,
                  )}
                </p>
              </div>

              {getEnglishTranslation(result) ? (
                <div>
                  <p className="mb-1 text-xs font-semibold uppercase tracking-[0.16em] text-stone-400">
                    English
                  </p>
                  <p className="rounded-2xl bg-stone-50 px-4 py-3 text-sm leading-7 text-stone-600">
                    {highlightText(getEnglishTranslation(result), trimmedQuery)}
                  </p>
                </div>
              ) : null}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

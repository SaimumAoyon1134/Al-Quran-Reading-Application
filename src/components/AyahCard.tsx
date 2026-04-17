import type { Ayah, ReaderSettings } from "@/types/quran";
import clsx from "clsx";

export function AyahCard({
  ayah,
  settings,
}: {
  ayah: Ayah;
  settings: ReaderSettings;
}) {
  // helper to split a text into words and wrap non-space tokens in spans so
  // individual words can be hovered. We keep whitespace tokens as-is so
  // spacing/punctuation remains intact.
  const renderTokenized = (text?: string, tokenClass?: string) => {
    if (!text) return null;
    // split, keeping the separators
    const tokens = text.split(/(\s+)/);
    return tokens.map((t, i) => {
      if (/^\s+$/.test(t)) return t;
      return (
        <span key={i} className={tokenClass ?? "inline"}>
          {t}
        </span>
      );
    });
  };

  return (
    <article className="reader-shell p-5 sm:p-6">
      <div className="mb-4 flex items-center justify-between gap-3">
        <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">
          {ayah.surahNumber}:{ayah.ayahNumber}
        </span>
        <span className="text-xs font-medium uppercase tracking-[0.18em] text-stone-400">
          Ayah
        </span>
      </div>

      <p
        className={clsx("mb-4 text-right leading-[2.2] text-stone-900", {
          "font-arabicAmiri": settings.arabicFont === "amiri",
          "font-arabicNaskh": settings.arabicFont === "notoNaskh",
        })}
        style={{ fontSize: `${settings.arabicFontSize}px` }}
        dir="rtl"
      >
        {ayah.arabic}
      </p>

      {ayah.transliteration ? (
        <p className="mb-4 rounded-2xl bg-stone-50 px-4 py-3 text-sm italic leading-7 text-stone-600">
          {ayah.transliteration}
        </p>
      ) : null}

      <p
        className="leading-8 text-stone-700"
        style={{ fontSize: `${settings.translationFontSize}px` }}
      >
        {settings.translationLanguage === "bn"
          ? (ayah.translationBn ?? ayah.translation)
          : ayah.translation}
      </p>
    </article>
  );
}

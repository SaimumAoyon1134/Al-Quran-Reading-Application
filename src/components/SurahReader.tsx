"use client";

import { useState, useEffect } from "react";
import { AyahCard } from "@/components/AyahCard";
import { SettingsSidebar } from "@/components/SettingsSidebar";
import { defaultSettings } from "@/lib/settings";
import type { Ayah, ReaderSettings, Surah } from "@/types/quran";

export function SurahReader({ surah, ayahs }: { surah: Surah; ayahs: Ayah[] }) {
  const [settings, setSettings] = useState<ReaderSettings>(defaultSettings);
  const [focusedId, setFocusedId] = useState<string | null>(null);

  // listen for settings changes dispatched from other UI (like Navbar)
  useEffect(() => {
    const handler = (e: Event) => {
      // expect CustomEvent with detail = next settings
      const ce = e as CustomEvent<ReaderSettings>;
      if (ce?.detail) setSettings(ce.detail);
    };
    window.addEventListener("settings:change", handler as EventListener);
    return () =>
      window.removeEventListener("settings:change", handler as EventListener);
  }, []);

  // when readingMode is enabled, focus the first ayah if none focused
  useEffect(() => {
    if (settings?.readingMode && !focusedId && ayahs.length > 0) {
      setFocusedId(ayahs[0].id);
    }
  }, [settings, focusedId, ayahs]);

  // scroll the focused ayah into view and focus it (for accessibility)
  useEffect(() => {
    if (!focusedId) return;
    try {
      const el = document.getElementById(
        `ayah-${focusedId}`,
      ) as HTMLElement | null;
      if (!el) return;
      // smooth center the focused ayah
      el.scrollIntoView({
        behavior: "smooth",
        block: "center",
        inline: "nearest",
      });
      // programmatically focus (div has tabIndex=-1)
      el.focus?.();
    } catch {
      // ignore
    }
  }, [focusedId]);

  return (
    <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_320px] lg:items-start">
      <div className="space-y-6">
        <section className="reader-shell mashq-pattern p-6 sm:p-8">
          <div className="mb-4 flex flex-wrap items-center gap-3 text-sm font-semibold text-emerald-700">
            <span>Surah {surah.number}</span>
            <span>•</span>
            <span>{surah.revelationType}</span>
            <span>•</span>
            <span>{surah.versesCount} ayahs</span>
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-stone-900 sm:text-4xl">
            {surah.nameEnglish}
          </h1>
          <p
            className="mt-3 text-right font-arabicAmiri text-4xl text-stone-900 sm:text-5xl"
            dir="rtl"
          >
            {surah.nameArabic}
          </p>
          <p className="mt-4 max-w-2xl leading-7 text-stone-600">
            Read each ayah with elegant Arabic typography, optional
            transliteration, and adjustable translation sizing.
          </p>
        </section>

        <div className="space-y-4">
          {ayahs.map((ayah) => (
            <div key={ayah.id} id={`ayah-${ayah.id}`} tabIndex={-1}>
              <AyahCard
                ayah={ayah}
                settings={settings}
                focused={focusedId ? focusedId === ayah.id : false}
                onFocus={() => setFocusedId(ayah.id)}
              />
            </div>
          ))}
        </div>
      </div>

      <div className="lg:sticky lg:top-24">
        <div className="reader-shell p-5">
          <div className="mb-4 flex items-center justify-between gap-3">
            <div>
              <h2 className="font-semibold text-stone-900">Customize Reader</h2>
              <p className="text-sm text-stone-500">
                Arabic font and text sizes are saved locally on this device.
              </p>
            </div>
            <SettingsSidebar onChange={setSettings} />
          </div>

          <div className="space-y-2 text-sm text-stone-600">
            <p>
              <span className="font-semibold text-stone-900">Arabic font:</span>{" "}
              {settings.arabicFont === "amiri" ? "Amiri" : "Noto Naskh Arabic"}
            </p>
            <p>
              <span className="font-semibold text-stone-900">Arabic size:</span>{" "}
              {settings.arabicFontSize}px
            </p>
            <p>
              <span className="font-semibold text-stone-900">
                Translation size:
              </span>{" "}
              {settings.translationFontSize}px
            </p>
            <p>
              <span className="font-semibold text-stone-900">
                Translation language:
              </span>{" "}
              {settings.translationLanguage === "bn"
                ? "Bangla (বাংলা)"
                : "English"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { SlidersHorizontal } from "lucide-react";
import { Container } from "@/components/Container";
import { loadSettings, saveSettings } from "@/lib/settings";
import type { ReaderSettings } from "@/types/quran";

export function Navbar() {
  const [settings, setSettings] = useState<ReaderSettings | null>(null);

  useEffect(() => {
    const s = loadSettings();
    setSettings(s);
  }, []);

  const toggleReadingMode = () => {
    const next: ReaderSettings = {
      ...(settings || ({} as ReaderSettings)),
      readingMode: !settings?.readingMode,
    };
    setSettings(next);
    saveSettings(next);
    window.dispatchEvent(new CustomEvent("settings:change", { detail: next }));
  };

  return (
    <header className="glass-navbar">
      <Container>
        <div className="flex h-16 items-center justify-between">
          <Link
            href="/"
            className="text-lg font-bold tracking-tight text-stone-900"
          >
            Quran Reader
          </Link>

          <nav className="flex items-center gap-4 text-sm font-medium text-stone-700">
            <Link href="/surahs" className="transition hover:text-emerald-700">
              Surahs
            </Link>
            <Link href="/search" className="transition hover:text-emerald-700">
              Search
            </Link>
            {/* Compact settings icon for mobile */}
            <button
              type="button"
              aria-label="Open settings"
              onClick={() => window.dispatchEvent(new Event("settings:open"))}
              className="inline-flex items-center justify-center rounded-full p-2 md:hidden bg-white/70 hover:bg-white/80"
            >
              <SlidersHorizontal size={16} />
            </button>
            <button
              type="button"
              onClick={toggleReadingMode}
              className={`rounded-full px-3 py-1 text-sm font-semibold transition ${
                settings?.readingMode
                  ? "bg-emerald-600 text-white"
                  : "bg-white/70 text-stone-800"
              }`}
            >
              {settings?.readingMode ? "Reading: ON" : "Reading: OFF"}
            </button>
          </nav>
        </div>
      </Container>
    </header>
  );
}

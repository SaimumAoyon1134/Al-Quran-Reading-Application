"use client";

import { SlidersHorizontal, X } from "lucide-react";
import { useEffect, useState } from "react";
import { defaultSettings, loadSettings, saveSettings } from "@/lib/settings";
import type { ReaderSettings } from "@/types/quran";

type Props = {
  onChange?: (settings: ReaderSettings) => void;
  hideTrigger?: boolean;
};

export function SettingsSidebar({ onChange, hideTrigger }: Props) {
  const [open, setOpen] = useState(false);
  const [settings, setSettings] = useState<ReaderSettings>(defaultSettings);

  useEffect(() => {
    // Run once on mount to load persisted settings. Do not include `onChange`
    // in deps because callers may pass an inline callback which would cause
    // this effect to re-run and can create update loops.
    const stored = loadSettings();
    setSettings(stored);
    if (onChange) onChange(stored);
  }, []);

  // Listen for a global "settings:open" event so other UI (like Navbar)
  // can open the sidebar without coupling.
  useEffect(() => {
    const openHandler = () => setOpen(true);
    window.addEventListener("settings:open", openHandler);
    return () => window.removeEventListener("settings:open", openHandler);
  }, []);

  const updateSettings = (next: ReaderSettings) => {
    setSettings(next);
    saveSettings(next);
    if (onChange) onChange(next);
    // broadcast the change globally so other parts of the app can react
    try {
      window.dispatchEvent(
        new CustomEvent("settings:change", { detail: next }),
      );
    } catch (err) {
      /* ignore on server or if dispatch fails */
    }
  };

  return (
    <>
      {!hideTrigger && (
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="inline-flex items-center gap-2 rounded-full border border-stone-300 bg-white px-4 py-2 text-sm font-semibold text-stone-700 shadow-sm transition hover:border-emerald-300 hover:text-emerald-700"
        >
          <SlidersHorizontal size={16} />
          Settings
        </button>
      )}

      {open && (
        <div className="fixed inset-0 z-50 flex">
          <button
            className="flex-1 bg-black/40"
            onClick={() => setOpen(false)}
            aria-label="Close settings"
          />
          <aside className="w-full max-w-sm overflow-y-auto bg-white p-6 shadow-2xl">
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-lg font-bold text-stone-900">
                Reader Settings
              </h2>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="rounded-full p-2 text-stone-500 hover:bg-stone-100 hover:text-stone-700"
              >
                <X size={18} />
              </button>
            </div>

            <div className="space-y-6">
              <label className="block space-y-2">
                <span className="text-sm font-semibold text-stone-700">
                  Translation Language
                </span>
                <select
                  value={settings.translationLanguage}
                  onChange={(e) =>
                    updateSettings({
                      ...settings,
                      translationLanguage: e.target.value as any,
                    })
                  }
                  className="w-full rounded-xl border border-stone-300 px-3 py-2 text-sm outline-none ring-0 transition focus:border-emerald-400"
                >
                  <option value="bn">Bangla (বাংলা)</option>
                  <option value="en">English</option>
                </select>
              </label>
              <label className="block space-y-2">
                <span className="text-sm font-semibold text-stone-700">
                  Arabic Font
                </span>
                <select
                  value={settings.arabicFont}
                  onChange={(e) =>
                    updateSettings({
                      ...settings,
                      arabicFont: e.target
                        .value as ReaderSettings["arabicFont"],
                    })
                  }
                  className="w-full rounded-xl border border-stone-300 px-3 py-2 text-sm outline-none ring-0 transition focus:border-emerald-400"
                >
                  <option value="amiri">Amiri</option>
                  <option value="notoNaskh">Noto Naskh Arabic</option>
                </select>
              </label>

              <label className="block space-y-2">
                <span className="text-sm font-semibold text-stone-700">
                  Arabic Font Size: {settings.arabicFontSize}px
                </span>
                <input
                  type="range"
                  min="24"
                  max="56"
                  value={settings.arabicFontSize}
                  onChange={(e) =>
                    updateSettings({
                      ...settings,
                      arabicFontSize: Number(e.target.value),
                    })
                  }
                  className="w-full"
                />
              </label>

              <label className="block space-y-2">
                <span className="text-sm font-semibold text-stone-700">
                  Translation Font Size: {settings.translationFontSize}px
                </span>
                <input
                  type="range"
                  min="14"
                  max="28"
                  value={settings.translationFontSize}
                  onChange={(e) =>
                    updateSettings({
                      ...settings,
                      translationFontSize: Number(e.target.value),
                    })
                  }
                  className="w-full"
                />
              </label>
            </div>
          </aside>
        </div>
      )}
    </>
  );
}

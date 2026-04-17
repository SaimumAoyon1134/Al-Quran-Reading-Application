import type { ReaderSettings } from "@/types/quran";

export const SETTINGS_STORAGE_KEY = "quran-reader-settings";

export const defaultSettings: ReaderSettings = {
  arabicFont: "amiri",
  arabicFontSize: 38,
  translationFontSize: 18,
  translationLanguage: "bn",
  readingMode: false,
};

export function loadSettings(): ReaderSettings {
  if (typeof window === "undefined") {
    return defaultSettings;
  }

  const raw = window.localStorage.getItem(SETTINGS_STORAGE_KEY);

  if (!raw) {
    return defaultSettings;
  }

  try {
    return {
      ...defaultSettings,
      ...JSON.parse(raw),
    } as ReaderSettings;
  } catch {
    return defaultSettings;
  }
}

export function saveSettings(settings: ReaderSettings) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(SETTINGS_STORAGE_KEY, JSON.stringify(settings));
}

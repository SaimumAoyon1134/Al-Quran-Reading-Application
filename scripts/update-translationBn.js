(async () => {
  try {
    const BN_URL =
      "https://cdn.jsdelivr.net/npm/quran-json@3.1.2/dist/quran_bn.json";
    const fs = require("node:fs/promises");
    const path = require("node:path");

    console.log("Fetching BN payload...");
    const res = await fetch(BN_URL);
    if (!res.ok)
      throw new Error(`Failed to fetch BN: ${res.status} ${res.statusText}`);
    const bnPayload = await res.json();
    const bnSurahs = Array.isArray(bnPayload)
      ? bnPayload
      : bnPayload.surahs || bnPayload.data || bnPayload.ayahs || [];
    console.log("bn surahs", bnSurahs.length);

    const map = new Map();
    for (const s of bnSurahs) {
      const sNum = Number(s.id ?? s.number ?? s.surahNumber);
      const verses = s.verses || s.ayahs || s.ayah || [];
      for (const v of verses) {
        const vId = Number(v.id ?? v.ayahNumber ?? v.number ?? v.index ?? 0);
        if (!sNum || !vId) continue;
        const key = `${sNum}:${vId}`;
        const txt =
          v.translation ?? v.text ?? v.translation_bn ?? v.text_bn ?? "";
        map.set(key, String(txt));
      }
    }

    const filePath = path.join(process.cwd(), "src", "data", "ayahs.json");
    const dataStr = await fs.readFile(filePath, "utf8");
    const arr = JSON.parse(dataStr);
    let updated = 0;
    for (const ayah of arr) {
      const key = `${ayah.surahNumber}:${ayah.ayahNumber}`;
      if (map.has(key)) {
        const newBn = map.get(key);
        if (ayah.translationBn !== newBn) {
          ayah.translationBn = newBn;
          updated++;
        }
      } else {
        if (ayah.translationBn === undefined) {
          ayah.translationBn = "";
          updated++;
        }
      }
    }

    await fs.writeFile(filePath, JSON.stringify(arr, null, 2), "utf8");
    console.log("Updated", updated, "ayahs. Wrote", filePath);

    // Also regenerate the lightweight search index so translationBn stays in sync
    try {
      const searchIndex = arr.map((ayah) => ({
        id: ayah.id,
        translation: ayah.translation || "",
        translationBn: ayah.translationBn || "",
        arabic: ayah.arabic || "",
        surahNumber: ayah.surahNumber,
        surahNameEnglish: ayah.surahNameEnglish || "",
        ayahNumber: ayah.ayahNumber,
      }));
      const searchPath = path.join(
        process.cwd(),
        "src",
        "data",
        "search-index.json",
      );
      await fs.writeFile(
        searchPath,
        JSON.stringify(searchIndex, null, 2),
        "utf8",
      );
      console.log("Wrote", searchPath, "with", searchIndex.length, "items");
    } catch (e) {
      console.error("Failed to write search-index.json", e);
    }
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
})();

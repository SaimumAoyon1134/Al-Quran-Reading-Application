(async () => {
  try {
    const fs = require("node:fs/promises");
    const path = require("node:path");

    const ayahPath = path.join(process.cwd(), "src", "data", "ayahs.json");
    const outPath = path.join(
      process.cwd(),
      "src",
      "data",
      "search-index.json",
    );

    console.log("Reading", ayahPath);
    const dataStr = await fs.readFile(ayahPath, "utf8");
    const ayahs = JSON.parse(dataStr);

    const searchIndex = ayahs.map((ayah) => ({
      id: ayah.id,
      translation: ayah.translation || "",
      translationBn: ayah.translationBn || "",
      arabic: ayah.arabic || "",
      surahNumber: ayah.surahNumber,
      surahNameEnglish: ayah.surahNameEnglish || "",
      ayahNumber: ayah.ayahNumber,
    }));

    await fs.writeFile(outPath, JSON.stringify(searchIndex, null, 2), "utf8");
    console.log("Wrote", outPath, "with", searchIndex.length, "items");
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
})();

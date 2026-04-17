# Quran Reader App

A responsive Quran reading app built with **Next.js**, **Tailwind CSS**, and static JSON data.

## Features

- Responsive UI
- Surah List Page
- Ayat Page with Arabic text and English translation
- Translation search using Fuse.js
- Reader settings panel
  - Arabic font selection (Amiri / Noto Naskh Arabic)
  - Arabic font size adjustment
  - Translation font size adjustment
  - Persisted in `localStorage`
- Static generation friendly structure

## Tech Stack

- **Frontend:** Next.js (App Router)
- **Styling:** Tailwind CSS
- **Data:** Local JSON files inside `src/data`
- **Optional Data Prep Script:** TypeScript script to normalize an external Quran dataset

## Project Structure

```txt
src/
├─ app/
│  ├─ page.tsx
│  ├─ surahs/page.tsx
│  ├─ surah/[id]/page.tsx
│  ├─ search/page.tsx
│  ├─ layout.tsx
│  └─ globals.css
├─ components/
├─ data/
├─ lib/
└─ types/
scripts/
└─ build-quran-data.ts
```

## Getting Started

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Important

This starter includes **sample Quran data only** so the app works immediately.
Before submission, replace the sample files with a **complete 114-surah dataset**.

Files to replace:

- `src/data/surahs.json`
- `src/data/ayahs.json`
- `src/data/search-index.json`

## Preparing Full Quran Data

You can use a public Quran JSON source and normalize it with the included script.

Example:

```bash
QURAN_SOURCE_URL="https://raw.githubusercontent.com/malekverse/quran-dataset/main/quran_dataset.json" npm run prepare:data
```

If your chosen dataset shape differs, adjust `scripts/build-quran-data.ts`.

## Deployment

Deploy to **Vercel** or **Netlify**.

## Submission Checklist

- GitHub repo is public
- Live demo is public
- Verify demo in incognito mode
- Replace sample data with all 114 surahs
- Add proper dataset attribution in README

## Suggested Attribution

If you use a public Quran dataset, mention the dataset repository and license clearly in the README.

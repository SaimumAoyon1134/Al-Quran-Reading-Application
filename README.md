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
- **Backend** `https://al-quran-backend-opal.vercel.app`


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




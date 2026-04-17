import { SurahsClient } from "@/components/SurahsClient";

export const metadata = {
  title: "Surah List | Quran Reader",
};

export default function SurahListPage() {
  // Render a client component that fetches surahs from the backend API.
  return <SurahsClient />;
}

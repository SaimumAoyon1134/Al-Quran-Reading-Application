import type { Metadata } from "next";
import { Amiri, Inter, Noto_Naskh_Arabic } from "next/font/google";
import { Navbar } from "@/components/Navbar";
import { SettingsSidebar } from "@/components/SettingsSidebar";

import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const amiri = Amiri({
  subsets: ["arabic"],
  weight: ["400", "700"],
  variable: "--font-amiri",
});

const notoNaskh = Noto_Naskh_Arabic({
  subsets: ["arabic"],
  weight: ["400", "500", "700"],
  variable: "--font-noto-naskh",
});

export const metadata: Metadata = {
  title: "Quran Reader",
  description:
    "A responsive Quran reading app with surah listing, ayah pages, search, and persistent reader settings.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${amiri.variable} ${notoNaskh.variable} min-h-screen font-sans`}
      >
        <Navbar />
        {/* Mount a single SettingsSidebar globally so mobile compact button can open it */}
        <SettingsSidebar hideTrigger />
        <main className="py-8">{children}</main>
      </body>
    </html>
  );
}

import type { Metadata } from "next";
import { Inter, Tiro_Devanagari_Hindi } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const tiroDevanagari = Tiro_Devanagari_Hindi({
  variable: "--font-hindi",
  weight: "400",
  subsets: ["devanagari"],
});

export const metadata: Metadata = {
  title: "Drishty AI — Detect AI Cheating in Interviews",
  description:
    "Drishty AI identifies candidates using AI copilots, ChatGPT, and interview assistants in real-time — so you hire real talent, not AI-generated answers.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${tiroDevanagari.variable} antialiased`}>{children}</body>
    </html>
  );
}

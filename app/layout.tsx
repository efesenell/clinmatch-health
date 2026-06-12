import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title:
    "ClinMatch Health | Medical Tourism, Hair Transplant & Dental Treatments in Turkey",
  description:
    "ClinMatch Health is a premium medical tourism coordination platform helping international patients explore treatment opportunities in Turkey including hair transplant, dental treatments, plastic surgery, bariatric surgery, IVF and eye treatments.",
  keywords: [
    "ClinMatch Health",
    "medical tourism Turkey",
    "health tourism Turkey",
    "treatment in Turkey",
    "international patient Turkey",
    "hair transplant Turkey",
    "dental treatment Turkey",
    "dental implants Turkey",
    "Hollywood smile Turkey",
    "plastic surgery Turkey",
    "rhinoplasty Turkey",
    "nose job Turkey",
    "bariatric surgery Turkey",
    "gastric sleeve Turkey",
    "IVF Turkey",
    "eye surgery Turkey",
    "medical travel Turkey",
    "healthcare Turkey",
  ],
  openGraph: {
    title:
      "ClinMatch Health | Premium Medical Tourism Coordination in Turkey",
    description:
      "Explore treatment opportunities in Turkey with ClinMatch Health. Hair transplant, dental treatments, plastic surgery, bariatric surgery, IVF and more.",
    url: "https://clinmatchealth.com",
    siteName: "ClinMatch Health",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="tr"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}

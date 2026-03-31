import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import BottomNav from "@/components/layout/BottomNav";
import Loader from "@/components/ui/Loader";
import StickyCTA from "@/components/ui/StickyCTA";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Meddys 24 Cafe | Ahmedabad's Most Aesthetic Cafe",
  description: "Experience the premium nightlife, food, and BOX CRICKET at Meddys 24 Cafe, Ahmedabad. The ultimate Gen-Z hangout hotspot.",
  keywords: ["cafe ahmedabad", "box cricket ahmedabad", "meddys 24", "aesthetic cafe", "nightlife ahmedabad"],
};

export const viewport: Viewport = {
  themeColor: "#050505",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased scroll-smooth`}
    >
      <body className="bg-background text-foreground min-h-full flex flex-col">
        <Loader />
        <StickyCTA />
        <main className="flex-1 pb-24">
          {children}
        </main>
        <BottomNav />
      </body>
    </html>
  );
}

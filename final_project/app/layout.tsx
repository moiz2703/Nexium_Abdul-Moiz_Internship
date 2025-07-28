import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Image from "next/image";
import backgroundimage from "@/public/background.png";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Mind Wave",
  description: "An AI Powered Mental Wellness App",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body className="relative bg-black text-white min-h-screen overflow-x-hidden">
        <div className="fixed inset-0 -z-10">
          <Image
            src={backgroundimage}
            alt="background"
            fill
            priority
            quality={100}
            className="object-cover object-center"
          />
        </div>
        <div className="absolute inset-0 bg-black opacity-50" />

        <main className="relative z-10 min-h-screen flex flex-col">
          {children}
        </main>
      </body>
    </html>
  );
}

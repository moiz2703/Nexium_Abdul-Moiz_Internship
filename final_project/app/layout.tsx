import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Image from "next/image";
import backgroundimage from "@/public/background.png";
import NavbarWrapper from "@/components/ui/navbarwrapper";

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
        <div className="fixed inset-0 bg-black opacity-50 -z-10" />

        <div className="flex flex-col min-h-screen relative z-10">
          <NavbarWrapper />
          <main className="flex-grow w-full">
            {children}
          </main>
          <footer
            id="about"
            className="bg-black text-gray-300 py-12 px-6"
          >
            <div className="text-md max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 text-center md:text-left">
              <div>
                <h3 className="text-white text-xl font-semibold mb-4">About MindWave</h3>
                <p>
                  MindWave is your mental wellness companion—designed to help you reflect, journal, and boost emotional clarity. We believe that a healthy mind is the key to a fulfilling life.
                </p>
              </div>

              <div className="md:ml-10">
                <h3 className="text-white text-xl font-semibold mb-4 text-start">Core Features</h3>
                <ul className="space-y-2">
                  <li>🧠 AI-Based Reflections</li>
                  <li>📓 Mood & Journal Logs</li>
                  <li>📊 Personalized Insights</li>
                  <li>🎯 Growth-Focused Suggestions</li>
                </ul>
              </div>

              <div>
                <h3 className="text-white text-xl font-semibold mb-4">Join Us</h3>
                <p>Start your journey towards emotional strength and clarity today. Sign up and be part of the MindWave community.</p>
              </div>
            </div>

            <div className="mt-10 text-center text-sm text-blue-600 border-t border-gray-700 pt-6">
              © {new Date().getFullYear()} MindWave. All rights reserved.
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
}

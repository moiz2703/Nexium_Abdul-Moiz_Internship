import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "AI Blog Summarizer",
  description: "A simple AI powered blog summarizer",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="{`${poppins.variable} ${roboto.variable}`}">
      <body
      >
        <main>
          {children}
        </main>
      </body>
    </html>
  );
}

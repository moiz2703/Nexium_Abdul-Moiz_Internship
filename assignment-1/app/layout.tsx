import type { Metadata } from "next";
import "./globals.css";


export const metadata: Metadata = {
  title: "Quote Generator",
  description: "Get Motivational Quotes based on your topic input",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
       <div>
         {children}
           <footer className="bg-gray-50 py-4 text-center text-sm text-black border-t font-bold">
            Made by Abdul Moiz
            </footer>
       </div>
      </body>
    </html>
  );
}

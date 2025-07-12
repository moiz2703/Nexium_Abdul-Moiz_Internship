"use client";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Poppins, Roboto } from "next/font/google";
const [summary, setSummary] = useState("");
const [loading, setLoading] = useState(false);

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  variable: "--font-poppins",
});

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-roboto",
});




export default function BlogSummarizer() {
  const [url, setUrl] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setLoading(true);
  try {
    const response = await fetch("http://localhost:5678/webhook/blog-summariser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ url }),
    });

  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <Card className="w-full max-w-lg h-auto shadow-2xl border-none bg-white/90 dark:bg-zinc-900/90 backdrop-blur">
        <CardContent className="p-8 space-y-6">
          <h1 className={`${poppins.className} text-3xl font-bold text-center`}>
            📝 Blog Summarizer
          </h1>

          <p className={`${roboto.className} text-center text-muted-foreground`}>
            Paste a blog URL below and get a quick summary powered by AI.
          </p>

          <form className={`${roboto.className} flex flex-col sm:flex-row gap-4`}>
            <Input
              type="url"
              placeholder="Enter blog URL..."
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              className="flex-1"
            />
            <Button className={`${roboto.className} w-full sm:w-auto`} onClick={handleSubmit}>
              Get Summary
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

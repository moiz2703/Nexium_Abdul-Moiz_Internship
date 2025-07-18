"use client";


import { Copy,Zap,Globe2,Filter} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Poppins, Roboto } from "next/font/google";
import { urdudict } from "./data/urdudictionary";
import React from "react";

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
  const [summary, setSummary] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [isUrdu, setToUrdu] = useState(false);
  

  async function saveSummaryToSupabase(url: string, summary: string) {
    try {
      const response = await fetch('/api/save_summary', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ url, summary })
      })

      if (!response.ok) {
        throw new Error('failed to fetch summary')
      }

      const data = await response.json()
      console.log('Summary saved:', data)
    } catch (error) {
      console.error('Error saving summary:', error)
    }
  }

  async function saveFullContentToMongo(url: string, fullContent: string) {
    try {
      const response = await fetch('/api/save_fullContent', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ url, fullContent }),
      })

      if (!response.ok) {
        throw new Error('Failed to save full content to MongoDB')
      }

      const data = await response.json()
      console.log('Full content saved to MongoDB:', data)
    } catch (error) {
      console.error('Error saving full content:', error)
    }
  }

  const copyToClipboard = (text: string) => {
  navigator.clipboard.writeText(text)
    .then(() => alert("Summary copied to clipboard!"))
    .catch((err) => console.error("Failed to copy text: ", err));
  };

   const translateToUrdu = (text: string) => {
    return text
      .split(" ")
      .map(word => urdudict[word.toLowerCase()] || word)
      .join(" ");
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setSummary("");
    setError("");

    try {
      const response = await fetch("https://abdul2781.app.n8n.cloud/webhook/blog_summarize", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ url }),
      });

      if (!response.ok) {
        throw new Error("Please try another URL, The website is protected by antibots or cloudflare.");
      }

      const data = await response.json();
      const fetchedSummary = data.summary || "No summary received.";
      const fullContent = data.fullText || "";
      setSummary(fetchedSummary);

      saveSummaryToSupabase(url, fetchedSummary)
      .catch(err => console.error('Failed to save to Supabase in background:', err)); // saving to supabase

      saveFullContentToMongo(url, fullContent)
      .catch(err => console.error('Failed to save full content to MongoDB:', err));

    } catch (err) {
      console.error(err);
      setError("An error occurred while fetching summary.");
    } finally {
      setLoading(false);
    }
  };
  
    return (
    <div className="relative min-h-screen bg-black overflow-hidden">
      <div className="absolute -top-40 -right-40 w-80 h-80 bg-emerald-800 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
      <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-cyan-800 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-1000"></div>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-sky-700 rounded-full mix-blend-multiply filter blur-xl opacity-15 animate-pulse delay-2000"></div>

      <div className="relative z-10 flex flex-col items-center justify-center px-6 pt-24 pb-12 text-white text-opacity-90">
        <h1 className="text-6xl md:text-7xl font-bold bg-gradient-to-r from-white via-emerald-300 to-teal-200 bg-clip-text text-transparent text-center">
          AI Blog Summarizer
        </h1>
        <p className="mt-4 text-lg text-center max-w-xl">
          Turn any article into a smart, short summary — in seconds.
        </p>
        <a href="#summarize" className="mt-6">
          <Button
            className="bg-emerald-600 hover:bg-emerald-700 py-3 px-6 rounded-xl text-white font-semibold shadow hover:shadow-lg hover:scale-105 transition"
            onClick={(e) => {
              e.preventDefault();
              const target = document.getElementById("summarize");
              if (target) target.scrollIntoView({ behavior: "smooth" });
            }}
          >
            Get Started
          </Button>
        </a>

        <div className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="bg-white/5 border border-white/10 rounded-2xl p-6 text-center hover:scale-105 transition hover:shadow-xl backdrop-blur-md">
            <Zap className="mx-auto text-emerald-400 w-8 h-8 mb-2" />
            <h3 className="text-lg font-semibold">Summarize</h3>
            <p className="text-sm text-white/70">Get quick summaries from long blogs.</p>
          </div>
          <div className="bg-white/5 border border-white/10 rounded-2xl p-6 text-center hover:scale-105 transition hover:shadow-xl backdrop-blur-md">
            <Globe2 className="mx-auto text-teal-400 w-8 h-8 mb-2" />
            <h3 className="text-lg font-semibold">Translate</h3>
            <p className="text-sm text-white/70">Instant Urdu translation of summaries.</p>
          </div>
          <div className="bg-white/5 border border-white/10 rounded-2xl p-6 text-center hover:scale-105 transition hover:shadow-xl backdrop-blur-md">
            <Filter className="mx-auto text-cyan-400 w-8 h-8 mb-2" />
            <h3 className="text-lg font-semibold">Clean Extract</h3>
            <p className="text-sm text-white/70">Noise-free content for better reading.</p>
          </div>
        </div>

        <div id="summarize" className="w-full max-w-2xl mt-16 bg-white/5 border border-white/10 p-8 rounded-xl backdrop-blur-md">
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4">
            <Input
              type="url"
              placeholder="Paste your blog URL here..."
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              className="flex-1 bg-white/10 border border-white/20 text-white placeholder-white/60 px-4 py-3 rounded-xl"
            />
            <Button type="submit" className="bg-emerald-600 hover:bg-emerald-700 px-6 py-3 rounded-xl text-white font-semibold transition hover:scale-105">
              {loading ? "Summarizing..." : "Get Summary"}
            </Button>
          </form>

          {summary && (
            <div className={`${roboto.className} ${isUrdu ? "text-right" : "text-left"} mt-6 p-4 bg-white/10 border border-white/20 rounded-xl relative`}>
              <h2 className="text-xl font-semibold mb-2">
                {isUrdu ? ": اردو خلاصہ" : "Summary:"}
              </h2>
              <p className="whitespace-pre-wrap text-white/90">
                {isUrdu ? translateToUrdu(summary) : summary}
              </p>
              <Copy
                className={`cursor-pointer text-white/70 hover:text-white absolute top-4 ${isUrdu ? "left-4" : "right-4"}`}
                size={18}
                onClick={() => copyToClipboard(summary)}
              />
            </div>
          )}

          {summary && (
            <Button
              className="mt-4 bg-white/10 border border-white/20 text-white hover:bg-white/20"
              onClick={() => setToUrdu(!isUrdu)}
            >
              {isUrdu ? "Show in English" : "Translate to Urdu"}
            </Button>
          )}

          {error && <p className="text-red-400 mt-4 text-center">{error}</p>}
        </div>
      </div>
    </div>
  );
}

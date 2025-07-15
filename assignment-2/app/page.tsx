"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Poppins, Roboto } from "next/font/google";
import { Copy } from "lucide-react";
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
        throw new Error('Failed to save summary')
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
      const response = await fetch("http://localhost:5678/webhook/blog-summariser", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ url }),
      });

      if (!response.ok) {
        throw new Error("Failed to fetch summary.");
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
        <div
          className="min-h-screen w-full bg-cover bg-center bg-no-repeat flex items-center justify-center p-6"
          style={{ backgroundImage: "url('/Blog_bg.png')" }}
        >
          <div className=" bg-white/10 border border-white/30 rounded-xl shadow-xl max-w-2xl w-full p-10 text-white space-y-6">
        
            <h1 className={`${poppins.className} text-4xl font-bold text-center`}>
              AI Blog Summarizer
            </h1>

            <p className={`${roboto.className} text-center text-lg opacity-80`}>
              Summarize long blogs in seconds. Save time, read smarter.
            </p>

            <form
              onSubmit={handleSubmit}
              className="flex flex-col sm:flex-row gap-4"
            >
              <Input
                type="url"
                placeholder="Enter blog URL..."
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                className="flex-1 bg-white/20 border border-white/40 text-white placeholder-white/70"
              />
              <Button
                type="submit"
                className=" hover:bg-white/30 text-white font-semibold"
              >
                {loading ? "Summarizing..." : "Get Summary"}
              </Button>
            </form>

        {summary && (
          <div className={`${roboto.className} ${isUrdu ? "text-right" : "text-left"} mt-4 p-4 bg-white/10 border border-white/30 rounded`}>
            <h2 className="text-xl font-semibold mb-2">
              {isUrdu ? ": اردو خلاصہ" : "Summary:"}
            </h2>
            <p className="whitespace-pre-wrap">{isUrdu ? translateToUrdu(summary) : summary}</p>
            <Copy
              className="cursor-pointer mt-2 text-white/80 hover:text-white"
              size={17}
              onClick={() => copyToClipboard(summary)}
            />
          </div>
        )}
        {summary && !isUrdu && (
          <Button 
            className= {`hover:bg-white/30 ${roboto.className} mt-2`}
            onClick={() => setToUrdu(true)}
          >
            Translate to Urdu
          </Button>
        )}

        {summary && isUrdu && (
          <Button 
            className = {`hover:bg-white/30 ${roboto.className} mt-2`}
            onClick={() => setToUrdu(false)}
            >
              Show in English
            </Button>
        )}

        {error && <p className="text-red-300">{error}</p>}
      </div>
    </div>
  );
}

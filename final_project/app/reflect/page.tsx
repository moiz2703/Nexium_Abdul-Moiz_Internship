"use client"

import React, { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "@/components/ui/select"
import { ReactFormState } from "react-dom/client"
import { Value } from "@radix-ui/react-select"


export default function Reflect() {
  const [journal, setjournal] = useState("");
  const [error, seterror] = useState("");
  const [loading,setloading] = useState(false);
  const [mood, setmood]=useState("");
  const [aisuggestions, setaisuggestions] = useState<string[]>([]);
  const[aisummary, setaisummary]=useState("");
  
  
const saveToSupabase = async (
  stress: number,
  depression: number,
  anxiety: number,
  journal: string,
  summary: string,
  suggestions: string,
  mood: string
) => {
  try {
    const res = await fetch("/api/save_data", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        stress,
        depression,
        anxiety,
        journal,
        summary,
        suggestions,
        mood,
      }),
    })

    if (!res.ok) {
    const errText = await res.text();
    console.error("Supabase save failed:", errText);
    throw new Error("Failed to save to Supabase");
  }

    const saved = await res.json()
    console.log("Saved:", saved)
  } catch (error) {
    console.error("Error saving to Supabase:", error)
  }
}


const handlesubmit = async (e:React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();
  setloading(true);

  try {
    const response = await fetch("https://abdul2781.app.n8n.cloud/webhook/mind_wave", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ journal }),
    });

    if (!response.ok) {
      throw new Error("N8N Failure");
    }
    const data = await response.json();
    console.log("N8N response:", data); // 👈 Add this
    const stress = data.stress_level;
    const depression = data.depression_level;
    const anxiety = data.anxiety_level;
    const summary = data.agent_summary;
    const suggestions = data.suggestions 
    setaisummary(summary || "No summary generated.");
    setaisuggestions(Array.isArray(suggestions) ? suggestions : []);

    await saveToSupabase(stress, depression, anxiety, journal, summary, suggestions, mood)


  } catch (err) {
    console.error(err);
    seterror("An error occurred while fetchings results.");
  } finally {
    setloading(false);
  }
};


  return (
    <div className="flex flex-col items-center py-14 min-h-screen space-y-6">
      <h1 className="text-3xl md:text-5xl font-semibold text-center bg-gradient-to-r from-yellow-400 via-cyan-500 to-yellow-300 bg-clip-text text-transparent">
        Your Daily Reflection
      </h1>
      <p className="text-center text-md md:text-lg text-gray-300 max-w-2xl">
        Take a moment to reflect on how you're feeling today — and receive instant suggestions to help you feel calmer and more centered.
      </p>

      <div className="w-full max-w-md mt-5 p-6 rounded-xl bg-white/5 border border-white/10 backdrop-blur-md shadow-lg space-y-6">
        <div className="space-y-2">
          <h2 className="text-lg font-semibold text-white">How are you feeling today?</h2>
          <Select onValueChange = {(value) => setmood(value)}>
            <SelectTrigger className="w-full bg-white/10 border border-white/20 text-white placeholder:text-gray-300 rounded-md px-4 py-2 hover:bg-white/20 transition">
              <SelectValue placeholder="Select your mood" />
            </SelectTrigger>
            <SelectContent className="bg-gray-800 text-white border border-white/10 rounded-md">
              <SelectItem value="happy">😊 Happy</SelectItem>
              <SelectItem value="sad">😔 Sad</SelectItem>
              <SelectItem value="anxious">😟 Anxious</SelectItem>
              <SelectItem value="angry">😡 Angry</SelectItem>
              <SelectItem value="tired">😴 Tired</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <h2 className="text-lg font-semibold text-white">Write a short journal</h2>
            <form onSubmit={handlesubmit} className="space-y-4">
              <Input
              type="journal"
              value={journal}
              placeholder="Write your journal entry..."
              onChange={(e)=> setjournal(e.target.value)}
              className="w-full h-15 resize-none rounded-md bg-white/10 text-white placeholder:text-gray-400 border border-white/20 px-4 py-3 focus-visible:ring-1 focus-visible:ring-white/30 transition"
              />
              <Button className="w-full bg-blue-800 hover:bg-blue-600 hover:scale-105 transition active:scale-95 active:bg-blue-800">
                {loading? "Getting Your Solution": "Get suggestions"}
              </Button>
            </form>

            {aisummary && (
            <div className="mt-8 space-y-6">
              <div className="bg-white/10 border border-white/20 rounded-xl p-4 shadow">
                <h3 className="text-xl font-semibold text-white mb-2">🧠 Your Mental State Summary</h3>
                <p className="text-gray-200 whitespace-pre-line">{aisummary}</p>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-white mb-4">✨ Suggestions for You</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {aisuggestions.length > 0 ? (
                    aisuggestions.map((suggestion, index) => (
                      <div
                        key={index}
                        className="bg-white/10 border border-white/20 rounded-xl p-4 text-white shadow"
                      >
                        <h4 className="font-bold mb-2">Suggestion {index + 1}</h4>
                        <p className="text-gray-300">{suggestion.trim()}</p>
                      </div>
                    ))
                  ) : (
                    <p className="text-gray-400">No suggestions generated.</p>
                  )}
                </div>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  )
}

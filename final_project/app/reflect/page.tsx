"use client"

import React, { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "@/components/ui/select"
import { Loader } from "lucide-react"

export default function Reflect() {
  const [journal, setjournal] = useState("");
  const [error, seterror] = useState("");
  const [loading,setloading] = useState(false);
  const [mood, setmood]=useState("");
  const [aisuggestions, setaisuggestions] = useState<string[]>([]);
  const[aisummary, setaisummary]=useState("");
  const[sugg,setsugg]=useState(false)
  
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
    const response = await fetch("http://localhost:5678/webhook/mind_wave", {
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
    console.log("N8N response:", data); 
    const stress = data.stress_level;
    const depression = data.depression_level;
    const anxiety = data.anxiety_level;
    const summary = data.agent_summary;
    const suggestions = data.suggestions 
    setaisummary(summary || "No summary generated.");
    setaisuggestions(Array.isArray(suggestions) ? suggestions : []);
    setloading(false);
    setsugg(true);
    await saveToSupabase(stress, depression, anxiety, journal, summary, suggestions, mood)


  } catch (err) {
    console.error(err);
    seterror("An error occurred while fetchings results.");
  }
};


  return (
    <div className="flex flex-col items-center py-14 min-h-screen space-y-6">
      <h1 className="text-3xl md:text-5xl font-semibold text-center bg-gradient-to-r from-[#c1e8ff] via-[#7da0ca] to-amber-200 bg-clip-text text-transparent">
        Your Daily Reflection
      </h1>
      <p className="text-center text-md md:text-lg text-gray-300 max-w-2xl">
        Take a moment to reflect on how you're feeling today — and receive instant suggestions to help you feel calmer and more centered.
      </p>

      <div className="flex flex-col md:flex-row gap-10 transition-all duration-500">
        <div className={`transition-all duration-500 w-full ${sugg ? "max-w-md" : "w-[500px] md:w-[600px]"} mt-5 p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md shadow-lg space-y-6`}>
          <div className="space-y-2">
            <h2 className="text-md md:text-lg font-semibold text-white">How are you feeling today?</h2>
            <Select onValueChange = {(value) => setmood(value)}>
              <SelectTrigger className="w-full bg-[#021024] border border-white/20 text-white placeholder:text-gray-300 rounded-md px-4 py-2 hover:bg-white/20 transition">
                <SelectValue placeholder="Select your mood" />
              </SelectTrigger>
              <SelectContent className="bg-[#021024] text-white border border-white/10 rounded-md">
                <SelectItem value="happy">😊 Happy</SelectItem>
                <SelectItem value="sad">😔 Sad</SelectItem>
                <SelectItem value="anxious">😟 Anxious</SelectItem>
                <SelectItem value="angry">😡 Angry</SelectItem>
                <SelectItem value="tired">😴 Tired</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <h2 className="text-md md:text-lg font-semibold text-white">Write a short journal</h2>
              <form onSubmit={handlesubmit} className="space-y-4">
                <Input
                type="journal"
                value={journal}
                placeholder="Write your journal entry..."
                onChange={(e)=> setjournal(e.target.value)}
                className="w-full h-12 resize-none rounded-md bg-[#021024] text-white placeholder:text-gray-400 border border-white/20 px-4 py-0 focus-visible:ring-1 focus-visible:ring-white/30 transition"
                />
                {loading ? (
                  <Button
                    disabled
                    className="active:bg-blue-700 flex items-center gap-2 bg-blue-800 text-white px-4 py-2 rounded-lg shadow w-full"
                  >
                    <Loader className="animate-spin h-4 w-4" />
                    Analyzing...
                  </Button>
                ) : (
                  <Button
                    className="bg-blue-800 text-white px-4 py-2 rounded-lg shadow w-full hover:bg-blue-700"
                  >
                    Get Suggestions
                  </Button>
                )}

              </form>

          {aisummary && (
            <div className="mt-8 space-y-6]">
              <div className="bg-[#021024] border border-white/20 rounded-xl p-4 shadow">
                <h3 className="text-xl font-semibold text-white mb-2">🧠 Your Mental State Summary</h3>
                <p className="text-gray-200 whitespace-pre-line">{aisummary}</p>
              </div>
            </div>
            )}
           </div>
         </div>

        {sugg && (
          <div className="bg-white/5 border border-white/10 rounded-2xl mt-5 p-6 max-w-md">
          {aisuggestions.length > 0 && (
            <div className="-mt-0.5 w-full max-w-4xl">
              <h3 className="text-xl font-semibold text-white mb-4">✨ Suggestions for You</h3>
              <div className="grid gap-4 max-w-100">
                {aisuggestions.map((suggestion, index) => (
                  <div
                    key={index}
                    className="bg-gradient-to-br bg-[#021024] border-white/10 rounded-xl p-4 shadow text-white"
                  >
                    <h4 className="font-bold mb-2">Suggestion {index + 1}</h4>
                    <p className="text-gray-200">{suggestion.trim()}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
          </div>
        )}
      </div>
    </div>
  )
}

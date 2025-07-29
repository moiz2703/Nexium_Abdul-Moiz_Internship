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
  const [mood, setmood]=useState("")


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
        throw new Error("Failed to save to Supabase")
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
    const stress = data.stress_level;
    const depression = data.depression_level;
    const anxiety = data.anxiety_level;
    const summary = data.agent_summary;
    const suggestions = data.suggestions 
    setjournal(suggestions);
    await saveToSupabase(stress, depression, anxiety, journal, summary, suggestions, mood)


  } catch (err) {
    console.error(err);
    seterror("An error occurred while fetchings results.");
  } finally {
    setloading(false);
  }
};

  return (
    <div className="flex flex-col items-center py-24 min-h-screen space-y-6">
      <h1 className="text-3xl md:text-5xl font-semibold text-center bg-gradient-to-r from-yellow-400 via-cyan-500 to-yellow-300 bg-clip-text text-transparent">
        Your Daily Reflection
      </h1>
      <p className="text-center text-lg md:text-xl text-gray-300 max-w-2xl">
        Take a moment to reflect on how you're feeling today — and receive instant suggestions to help you feel calmer and more centered.
      </p>

      <div className="w-full max-w-md mt-10 p-6 rounded-xl bg-white/5 border border-white/10 backdrop-blur-md shadow-lg space-y-6">
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
          <Button className="w-full bg-blue-800 hover:bg-blue-600 transition">
            Submit Mood
          </Button>
        </div>

        <div className="space-y-2">
          <h2 className="text-lg font-semibold text-white">Write a short journal</h2>
            <form onSubmit={handlesubmit}>
              <Input
              type="journal"
              value={journal}
              placeholder="Write your journal entry..."
              onChange={(e)=> setjournal(e.target.value)}
              className="w-full h-15 resize-none rounded-md bg-white/10 text-white placeholder:text-gray-400 border border-white/20 px-4 py-3 focus-visible:ring-1 focus-visible:ring-white/30 transition"
              />
              <Button className="w-full bg-green-800 hover:bg-green-600 transition">
                Get Suggestions
              </Button>
            </form>
        </div>
      </div>
    </div>
  )
}

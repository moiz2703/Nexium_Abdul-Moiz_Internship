"use client"

import React from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "@/components/ui/select"

export default function Reflect() {
  return (
    <div className="flex flex-col items-center py-24 min-h-screen space-y-6">
      <h1 className="text-3xl md:text-5xl font-semibold text-white text-center">
        Your Daily Reflection
      </h1>
      <p className="text-center text-lg md:text-xl text-gray-300 max-w-2xl">
        Take a moment to reflect on how you're feeling today — and receive instant suggestions to help you feel calmer and more centered.
      </p>

      <div className="w-full max-w-md mt-10 p-6 rounded-xl bg-white/5 border border-white/10 backdrop-blur-md shadow-lg space-y-6">
        <div className="space-y-2">
          <h2 className="text-lg font-semibold text-white">How are you feeling today?</h2>
          <Select>
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

        {/* Journal Entry */}
        <div className="space-y-2">
          <h2 className="text-lg font-semibold text-white">Write a short journal</h2>
          <Input
            placeholder="Write your journal entry..."
            className="w-full h-15 resize-none rounded-md bg-white/10 text-white placeholder:text-gray-400 border border-white/20 px-4 py-3 focus-visible:ring-1 focus-visible:ring-white/30 transition"
          />
          <Button className="w-full bg-green-800 hover:bg-green-600 transition">
            Get Suggestions
          </Button>
        </div>
      </div>
    </div>
  )
}

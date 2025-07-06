"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { quotes } from "@/data/myquotes"

export default function Home() {
  const [topic, setTopic] = useState("")

  const [results, setResults] = useState<string[]>([])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault() 
    const filtered = quotes
      .filter((quote) => quote.topic.toLowerCase() === topic.toLowerCase()) 
      .slice(0, 3)
      .map((q) => q.text)

    setResults(filtered)
  }

  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-4">
      <h1 className="text-4xl font-bold mb-6 text-center">Quote Generator</h1>

      <form onSubmit={handleSubmit} className="flex gap-2 max-w-md w-full">
        <Input
          placeholder="Enter topic (e.g. life, success, smartwork)"
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
        />
        <Button type="submit">Get Quotes</Button>
      </form>

      <div className="mt-6 space-y-3 w-full max-w-md">
        {results.length > 0 ? (
          results.map((quote, index) => (
            <p key={index} className="p-4 bg-gray-100 rounded shadow">
              “{quote}”
            </p>
          ))
        ) : (
          <p className="text-gray-500 mt-6 text-center">
            No quotes found or enter a topic.
          </p>
        )}
      </div>
    </main>
  )
}

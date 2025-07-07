"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { quotes } from "@/data/myquotes"
import Image from "next/image"
import { Poppins } from "next/font/google"

const myFont = Poppins({
  subsets: ["latin"],
  weight: ["400", "600"],
})



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
    <main className={`${myFont.className} flex justify-center items-center min-h-screen p-4 gap-14 bg-gradient-to-br from-white to-gray-100`}>
      <div className="flex flex-col items-start max-w-md w-full space-y-6 -translate-y-4">
        <h1 className="text-4xl font-bold w-full text-center">Quote Generator</h1>
        
        <form onSubmit={handleSubmit} className="flex gap-2 max-w-md w-full">
          <Input
            placeholder="Enter a topic like,(focus, life, etc..)"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
          />
          <Button type="submit">Get Quotes</Button>
        </form>
        <div className="mt-2 text-sm text-black">
          <p className="mb-2 font-medium">Sample Topics:</p>
          <div className="flex flex-wrap gap-2">
            {["discipline", "confidence", "life", "success", "smartwork", "focus", "patience"].map((t) => (
              <button
                key={t}
                className="px-4 py-2 rounded-full bg-gray-950 hover:bg-gray-800 text-white text-sm transition"
                onClick={() => setTopic(t)}
                type="button"
              >
                {t}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-6 space-y-3 w-full max-w-md">
          {results.length > 0 ? (
            results.map((quote, index) => (
              <p key={index}  className="p-4 bg-gray-900 text-white hover:bg-gray-800 transition rounded-xl shadow text-center italic">
                “{quote}”
              </p>
            ))
          ) : (
            <p className="text-gray-950 mt-6 text-center mr-5">
              Enter a topic to get quotes
            </p>
          )}
        </div>
      </div>
      <div className="hidden md:flex justify-center">
      <Image
      src={"/fit.jpg"}
      alt="Quotes"
      width={400}
      height={500}
      quality={100}
      className="rounded-xl shadow-lg object-cover"/>
      </div>
    </main>
  )
}

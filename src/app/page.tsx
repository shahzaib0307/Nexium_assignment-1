"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import QuoteCard from "@/components/QuoteCard";
import quotesData from "@/data/quotes.json";

type Quote = {
  topic: string;
  quote: string;
};

export default function Home() {
  const [topic, setTopic] = useState("");
  const [quotes, setQuotes] = useState<Quote[]>([]);

  const handleGenerate = () => {
    const filtered = quotesData.filter(
      (q: Quote) => q.topic.toLowerCase() === topic.toLowerCase()
    );
    setQuotes(filtered.slice(0, 3));
  };

  return (
    <main className="flex flex-col items-center justify-center min-h-screen px-4 py-10">
      <h1 className="text-3xl font-bold mb-6">Motivational Quote Generator</h1>
      <div className="flex gap-2 w-full max-w-md">
        <Input
          placeholder="Enter topic (life, success, motivation)"
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
        />
        <Button onClick={handleGenerate}>Generate</Button>
      </div>

      <div className="mt-6 w-full max-w-md">
        {quotes.map((q, idx) => (
          <QuoteCard key={idx} quote={q.quote} />
        ))}
      </div>
    </main>
  );
}

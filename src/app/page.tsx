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
  const [error, setError] = useState("");

  const allowedTopics = ["life", "success", "motivation"];

  const handleGenerate = () => {
    const normalized = topic.trim().toLowerCase();

    if (!allowedTopics.includes(normalized)) {
      setQuotes([]);
      setError(" Please enter from 'life', 'success', or 'motivation' .");
      return;
    }

    const filtered = quotesData.filter(
      (q: Quote) => q.topic.toLowerCase() === normalized
    );

    setQuotes(filtered.slice(0, 3));
    setError(""); // clear error if input is valid
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-muted via-background to-card px-4 py-10">
      <div className="bg-card border border-border rounded-2xl shadow-xl w-full max-w-xl p-8 space-y-6 animate-in fade-in slide-in-from-bottom-8 duration-700">
        <h1 className="text-4xl font-bold text-center text-pink-600">
  ✨ Motivational Quote Generator
</h1>

        <div className="flex flex-col sm:flex-row gap-3">
          <Input
  placeholder="Try topics like life, success, or motivation"
  value={topic}
  onChange={(e) => setTopic(e.target.value)}
  onKeyDown={(e) => {
    if (e.key === "Enter") handleGenerate();
  }}
  className="flex-1"
/>

          <Button
  onClick={handleGenerate}
  className="w-full sm:w-auto whitespace-nowrap cursor-pointer"
>
  Generate!
</Button>

        </div>

        {error && (
          <p className="text-red-500 text-sm font-medium text-center">
            {error}
          </p>
        )}

        {quotes.length > 0 && (
          <div className="space-y-4 pt-4 border-t border-border">
            {quotes.map((q, idx) => (
              <QuoteCard key={idx} quote={q.quote} />
            ))}
          </div>
        )}
      </div>
    </main>
  );
}

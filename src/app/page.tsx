"use client";

import { useState } from "react";

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
const [animationKey, setAnimationKey] = useState(0);

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
    setError(""); 
    setAnimationKey(prev => prev + 1);
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-muted via-background to-card px-4 py-10">
      <div className="bg-card border border-border rounded-2xl shadow-xl w-full max-w-3xl p-10 space-y-8">

        <h1 className="text-4xl font-bold text-center text-black">
   Quote Generator
</h1>
<h2 className="text-lg font-medium text-center text-muted-foreground">
  GET HANDPICKED QUOTES BY TOPIC
</h2>
        <div className="flex flex-col sm:flex-row gap-3">
          <select
  value={topic}
  onChange={(e) => setTopic(e.target.value)}
  className="flex-1 px-4 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-ring text-sm bg-white dark:bg-background dark:text-foreground"
>
  <option value="">Select a topic</option>
  <option value="life">Life</option>
  <option value="success">Success</option>
  <option value="motivation">Motivation</option>
</select>


     <Button
  onClick={handleGenerate}
  variant="default"
  className="w-full sm:w-auto whitespace-nowrap bg-black text-white hover:bg-black hover:text-white hover:opacity-100 cursor-pointer"
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
      <div
      key={`${animationKey}-${idx}`}

        style={{
          opacity: 0,
          animation: "fadeIn 0.6s ease-out forwards",
          animationDelay: `${idx * 0.3}s`,
        }}
      >
        <QuoteCard quote={q.quote} />
      </div>
    ))}
  </div>
)}


      </div>
    </main>
  );
}

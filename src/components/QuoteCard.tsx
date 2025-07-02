import { Card, CardContent } from "@/components/ui/card";

interface QuoteCardProps {
  quote: string;
}

export default function QuoteCard({ quote }: QuoteCardProps) {
  return (
    <Card className="my-4">
      <CardContent className="p-4 text-lg">
        {quote}
      </CardContent>
    </Card>
  );
}

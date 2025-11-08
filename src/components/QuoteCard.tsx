import { Card } from "@/components/ui/card";
import { Quote } from "lucide-react";

interface QuoteCardProps {
  quote: string;
  author: string;
}

const QuoteCard = ({ quote, author }: QuoteCardProps) => {
  return (
    <Card className="bg-info/10 border-info/20 p-6">
      <div className="flex gap-4">
        <Quote className="w-8 h-8 text-info flex-shrink-0" />
        <div>
          <p className="text-lg text-info-foreground leading-relaxed mb-2">
            "{quote}"
          </p>
          <p className="text-sm text-info font-medium">{author}</p>
        </div>
      </div>
    </Card>
  );
};

export default QuoteCard;

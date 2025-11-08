import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface AnnouncementCardProps {
  title: string;
  date: string;
  index: number;
}

const AnnouncementCard = ({ title, date, index }: AnnouncementCardProps) => {
  return (
    <div className="flex gap-4 py-4 border-b border-border last:border-0">
      <div className="flex-shrink-0 w-8 text-lg font-semibold text-muted-foreground">
        {index}
      </div>
      <div className="flex-1 space-y-2">
        <h3 className="text-base font-medium text-foreground leading-snug">{title}</h3>
        <div className="flex items-center gap-2">
          <Badge variant="default" className="bg-accent text-accent-foreground text-xs">
            {date}
          </Badge>
          <Button variant="ghost" size="sm" className="text-xs text-primary hover:text-primary/80 p-0 h-auto">
            baca lebih lanjut...
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AnnouncementCard;

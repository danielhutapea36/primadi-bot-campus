import { Card } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";

interface MenuCardProps {
  title: string;
  icon: LucideIcon;
  onClick?: () => void;
}

const MenuCard = ({ title, icon: Icon, onClick }: MenuCardProps) => {
  return (
    <Card 
      className="p-6 hover:shadow-lg transition-shadow cursor-pointer hover:border-primary"
      onClick={onClick}
    >
      <div className="flex flex-col items-center text-center space-y-3">
        <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
          <Icon className="w-8 h-8 text-primary" />
        </div>
        <h3 className="font-semibold text-foreground">{title}</h3>
      </div>
    </Card>
  );
};

export default MenuCard;

import { Button } from "@/components/ui/button";
import { LogOut, User } from "lucide-react";

interface HeaderProps {
  studentId: string;
  studentName: string;
}

const Header = ({ studentId, studentName }: HeaderProps) => {
  return (
    <header className="bg-card border-b border-border px-6 py-4 flex items-center justify-between">
      <div>
        <h1 className="text-2xl font-bold text-primary">SIAM UNPRI</h1>
      </div>
      
      <div className="flex items-center gap-4">
        <div className="text-right">
          <p className="text-sm font-medium text-foreground">{studentId} - {studentName}</p>
          <Button 
            variant="link" 
            size="sm" 
            className="text-xs text-primary hover:text-primary/80 p-0 h-auto"
          >
            logout
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;

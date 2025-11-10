import { Button } from "@/components/ui/button";
import { LogOut, User, Menu } from "lucide-react";
import logoUnpri from "@/assets/logo-unpri.png";

interface HeaderProps {
  studentId: string;
  studentName: string;
  onToggleSidebar: () => void;
}

const Header = ({ studentId, studentName, onToggleSidebar }: HeaderProps) => {
  return (
    <header className="h-16 bg-primary text-primary-foreground flex items-center justify-between px-6 border-b border-border shadow-sm">
      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          size="icon"
          onClick={onToggleSidebar}
          className="text-primary-foreground hover:bg-primary-foreground/10"
        >
          <Menu className="w-5 h-5" />
        </Button>
        <div className="flex items-center gap-3">
          <img src={logoUnpri} alt="Logo UNPRI" className="h-10 w-auto" />
          <h1 className="text-xl font-bold">SIAM UNPRI</h1>
        </div>
      </div>
      
      <div className="flex items-center gap-4">
        <div className="text-right">
          <p className="text-sm font-medium">{studentId} - {studentName}</p>
          <Button 
            variant="link" 
            size="sm" 
            className="text-xs text-primary-foreground hover:text-primary-foreground/80 p-0 h-auto"
          >
            logout
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;

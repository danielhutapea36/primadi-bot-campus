import { Card } from "@/components/ui/card";
import { User } from "lucide-react";

interface StudentProfileProps {
  name: string;
  studentId: string;
  major: string;
  academicYear: string;
  photoUrl?: string;
}

const StudentProfile = ({ name, studentId, major, academicYear, photoUrl }: StudentProfileProps) => {
  return (
    <Card className="p-6">
      <div className="flex flex-col items-center text-center space-y-4">
        {photoUrl ? (
          <img 
            src={photoUrl} 
            alt={name}
            className="w-32 h-40 object-cover rounded-md border-4 border-primary"
          />
        ) : (
          <div className="w-32 h-40 bg-muted rounded-md border-4 border-primary flex items-center justify-center">
            <User className="w-16 h-16 text-muted-foreground" />
          </div>
        )}
        
        <div className="space-y-1">
          <h2 className="text-lg font-bold text-foreground uppercase">{name}</h2>
          <p className="text-sm text-muted-foreground">{studentId}</p>
          <p className="text-sm text-muted-foreground uppercase">{major}</p>
          <p className="text-sm text-muted-foreground">T.A. AKTIF {academicYear}</p>
        </div>
      </div>
    </Card>
  );
};

export default StudentProfile;

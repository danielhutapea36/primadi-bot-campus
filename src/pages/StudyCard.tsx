import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

const StudyCard = () => {
  const { id } = useParams();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [studyCard, setStudyCard] = useState<any>(null);
  const [courses, setCourses] = useState<any[]>([]);
  const [student, setStudent] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchStudyCard();
  }, [id]);

  const fetchStudyCard = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        toast.error("Anda harus login terlebih dahulu");
        return;
      }

      const { data: studentData } = await supabase
        .from('students')
        .select('*')
        .eq('user_id', user.id)
        .single();

      if (studentData) {
        setStudent(studentData);

        const { data: cardData } = await supabase
          .from('study_cards')
          .select('*')
          .eq('id', id)
          .eq('student_id', studentData.id)
          .single();

        if (cardData) {
          setStudyCard(cardData);

          const { data: coursesData } = await supabase
            .from('study_card_courses')
            .select(`
              *,
              courses:course_id (*)
            `)
            .eq('study_card_id', cardData.id);

          if (coursesData) {
            setCourses(coursesData);
          }
        }
      }
    } catch (error) {
      console.error("Error fetching study card:", error);
      toast.error("Gagal memuat data kartu studi");
    } finally {
      setIsLoading(false);
    }
  };

  const getStatusBadge = (status: string) => {
    const variants: Record<string, "default" | "destructive" | "outline" | "secondary"> = {
      'approved': 'default',
      'draft': 'secondary',
      'rejected': 'destructive',
    };
    return variants[status] || 'secondary';
  };

  if (isLoading) {
    return (
      <div className="flex min-h-screen bg-background">
        <Sidebar isOpen={isSidebarOpen} />
        <div className={cn("flex-1 flex items-center justify-center", isSidebarOpen && "ml-64")}>
          <p>Memuat data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar isOpen={isSidebarOpen} />
      
      <div className={cn("flex-1 flex flex-col transition-all duration-300", isSidebarOpen ? "ml-64" : "ml-0")}>
        <Header 
          studentId={student?.nim || ""} 
          studentName={student?.name || ""}
          onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
        />
        
        <main className="flex-1 overflow-y-auto p-6">
          <div className="max-w-7xl mx-auto space-y-6">
            <div className="flex items-center justify-between">
              <h1 className="text-3xl font-bold">
                KARTU STUDI SEMESTER {studyCard?.semester}
              </h1>
              <Badge variant={getStatusBadge(studyCard?.status)}>
                {studyCard?.status === 'approved' ? 'Disetujui' : studyCard?.status === 'draft' ? 'Draft' : 'Ditolak'}
              </Badge>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Informasi Kartu Studi</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Status</p>
                    <p className="font-medium">{studyCard?.status === 'approved' ? 'Disetujui' : 'Draft'}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Perubahan terakhir</p>
                    <p className="font-medium">{new Date(studyCard?.last_modified).toLocaleString('id-ID')}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Nomor Kartu Studi</p>
                    <p className="font-medium">{studyCard?.card_number || '-'}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Tahun Ajaran</p>
                    <p className="font-medium">{studyCard?.academic_year}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Jumlah Kredit</p>
                    <p className="font-medium">{studyCard?.total_credits} SKS</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Jumlah Mata Kuliah</p>
                    <p className="font-medium">{studyCard?.total_courses} Mata Kuliah</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Indeks Prestasi Semester (IPS)</p>
                    <p className="font-medium">{studyCard?.gpa || '-'}</p>
                  </div>
                </div>
                <div className="mt-6 flex gap-2">
                  <Button>Download Kartu Rencana Studi (KRS)</Button>
                  <Button variant="outline">Download Kartu Hasil Studi (KHS)</Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>MATA KULIAH YANG DIAMBIL</CardTitle>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="sederhana">
                  <TabsList>
                    <TabsTrigger value="sederhana">Sederhana</TabsTrigger>
                    <TabsTrigger value="lengkap">Lengkap</TabsTrigger>
                    <TabsTrigger value="presensi">Presensi</TabsTrigger>
                  </TabsList>
                  <TabsContent value="sederhana">
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead className="bg-muted">
                          <tr>
                            <th className="p-3 text-left">No</th>
                            <th className="p-3 text-left">Mata Kuliah</th>
                            <th className="p-3 text-center">(30%) UTS</th>
                            <th className="p-3 text-center">(10%) Presensi</th>
                            <th className="p-3 text-center">(20%) Tugas</th>
                            <th className="p-3 text-center">(40%) UAS</th>
                            <th className="p-3 text-center">N</th>
                            <th className="p-3 text-center">NH</th>
                            <th className="p-3 text-center">R</th>
                          </tr>
                        </thead>
                        <tbody>
                          {courses.map((course, index) => (
                            <tr key={course.id} className="border-b">
                              <td className="p-3">{index + 1}</td>
                              <td className="p-3">{course.courses?.name || '-'}</td>
                              <td className="p-3 text-center">{course.uts_score || '-'}</td>
                              <td className="p-3 text-center">{course.attendance_score || '-'}</td>
                              <td className="p-3 text-center">{course.assignment_score || '-'}</td>
                              <td className="p-3 text-center">{course.uas_score || '-'}</td>
                              <td className="p-3 text-center">{course.final_score || '-'}</td>
                              <td className="p-3 text-center">-</td>
                              <td className="p-3 text-center">{course.grade || '-'}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </TabsContent>
                  <TabsContent value="lengkap">
                    <p className="text-muted-foreground">Tampilan lengkap akan segera tersedia</p>
                  </TabsContent>
                  <TabsContent value="presensi">
                    <p className="text-muted-foreground">Data presensi akan segera tersedia</p>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
};

export default StudyCard;

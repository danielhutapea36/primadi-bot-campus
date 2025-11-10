import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import StudentProfile from "@/components/StudentProfile";
import QuoteCard from "@/components/QuoteCard";
import AnnouncementCard from "@/components/AnnouncementCard";
import MenuCard from "@/components/MenuCard";
import Chatbot from "@/components/Chatbot";
import { QrCode, Calendar, User, FileText, BookOpen, GraduationCap, ClipboardList, Info } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

const Index = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  
  const studentData = {
    name: "Daniel Ari Hutapea",
    studentId: "223303030636",
    major: "Sarjana Teknik Informatika",
    academicYear: "2025/1",
  };

  const universityAnnouncements = [
    {
      title: "Kegiatan Donor Darah dan Penyuluhan Kesehatan [TZUCHING UNPRI]",
      date: "Senin, 20 Oktober 2025 10:31:25",
    },
    {
      title: "LOWONGAN PEKERJAAN [LAO DI FANG]",
      date: "Jum'at, 19 September 2025 14:11:42",
    },
    {
      title: "LOWONGAN PERKERJAAN [KENCANA GROUP] - DESIGNER GRAFIS dan ADMIN KANTOR",
      date: "Jum'at, 19 September 2025 13:31:07",
    },
    {
      title: "Lowongan Kerja Staff Internal Audit",
      date: "Kamis, 31 Juli 2025 19:38:24",
    },
    {
      title: "Lowongan Kerja IT Programmer",
      date: "Rabu, 16 Juli 2025 14:31:58",
    },
    {
      title: "Program Kompetensi Baru: Guest Leadership Development!",
      date: "Senin, 30 Juni 2025 12:22:20",
    },
  ];

  const programAnnouncements = [
    {
      title: "PENGUMUMAN PEMBAYARAN UANG KULIAH",
      date: "Jum'at, 17 Oktober 2025 11:17:57",
    },
    {
      title: "Undangan Sosialisasi Pemilihan Kelas pada Pengisian KRS Mata Kuliah Universitas",
      date: "Kamis, 09 Oktober 2025 14:45:55",
    },
    {
      title: "Pengumuman Pelaksanaan Pekuliahan Khusus Semester 2 keatas",
      date: "Rabu, 17 September 2025 11:54:47",
    },
    {
      title: "Surat Edaran Pelaksanaan Yudisium FAST",
      date: "Rabu, 17 September 2025 08:53:58",
    },
  ];

  const quickMenuItems = [
    { title: "QR Code", icon: QrCode },
    { title: "Presensi Harian", icon: Calendar },
    { title: "Profil Mahasiswa", icon: User },
    { title: "Pengumuman", icon: FileText },
    { title: "Permohonan", icon: ClipboardList },
    { title: "Dokumen Akademik", icon: BookOpen },
    { title: "Informasi Fakultas Sains dan Teknologi", icon: Info },
    { title: "Informasi Akreditasi", icon: GraduationCap },
  ];

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar isOpen={isSidebarOpen} />
      
      <div className={cn("flex-1 flex flex-col overflow-hidden transition-all duration-300", isSidebarOpen ? "ml-64" : "ml-0")}>
        <Header 
          studentId={studentData.studentId} 
          studentName={studentData.name}
          onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
        />
        
        <main className="flex-1 overflow-y-auto">
          <div className="max-w-7xl mx-auto p-6">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
              {/* Left Column - Student Profile */}
              <div className="lg:col-span-1">
                <StudentProfile
                  name={studentData.name}
                  studentId={studentData.studentId}
                  major={studentData.major}
                  academicYear={studentData.academicYear}
                />

                {/* Quick Menu */}
                <div className="mt-6">
                  <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">
                    Umum
                  </h3>
                  <div className="space-y-2">
                    <button className="w-full text-left px-4 py-2 text-sm text-primary hover:bg-sidebar-hover rounded-md transition-colors">
                      QR Code
                    </button>
                    <button className="w-full text-left px-4 py-2 text-sm text-sidebar-text hover:bg-sidebar-hover rounded-md transition-colors">
                      Presensi Harian
                    </button>
                    <button className="w-full text-left px-4 py-2 text-sm text-sidebar-text hover:bg-sidebar-hover rounded-md transition-colors">
                      Profil Mahasiswa
                    </button>
                    <button className="w-full text-left px-4 py-2 text-sm text-sidebar-text hover:bg-sidebar-hover rounded-md transition-colors">
                      Pengumuman
                    </button>
                    <button className="w-full text-left px-4 py-2 text-sm text-sidebar-text hover:bg-sidebar-hover rounded-md transition-colors">
                      Permohonan
                    </button>
                    <button className="w-full text-left px-4 py-2 text-sm text-sidebar-text hover:bg-sidebar-hover rounded-md transition-colors">
                      Dokumen Akademik
                    </button>
                    <button className="w-full text-left px-4 py-2 text-sm text-sidebar-text hover:bg-sidebar-hover rounded-md transition-colors">
                      Informasi Fakultas Sains dan Teknologi
                    </button>
                    <button className="w-full text-left px-4 py-2 text-sm text-sidebar-text hover:bg-sidebar-hover rounded-md transition-colors">
                      Informasi Akreditasi
                    </button>
                    <button className="w-full text-left px-4 py-2 text-sm text-sidebar-text hover:bg-sidebar-hover rounded-md transition-colors">
                      Sistem Pelayanan Mahasiswa
                    </button>
                    <button className="w-full text-left px-4 py-2 text-sm text-sidebar-text hover:bg-sidebar-hover rounded-md transition-colors">
                      Kegiatan Mahasiswa
                    </button>
                    <button className="w-full text-left px-4 py-2 text-sm text-sidebar-text hover:bg-sidebar-hover rounded-md transition-colors">
                      Platform Altissia
                    </button>
                    <button className="w-full text-left px-4 py-2 text-sm text-sidebar-text hover:bg-sidebar-hover rounded-md transition-colors">
                      Transkrip Akademik Sementara
                    </button>
                    <button className="w-full text-left px-4 py-2 text-sm text-sidebar-text hover:bg-sidebar-hover rounded-md transition-colors">
                      Bantuan
                    </button>
                  </div>
                </div>
              </div>

              {/* Right Column - Main Content */}
              <div className="lg:col-span-3 space-y-6">
                {/* Quote Card */}
                <QuoteCard
                  quote="Pemimpin yang baik bukan yang bertubuh besar, berkumis tebal ataupun bermuka seram, tapi pemimpin yang dapat memberikan kedamaian kepada bawahannya"
                  author="Tommy Leonard"
                />

                {/* University Announcements */}
                <div className="bg-card rounded-lg border border-border p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl font-bold text-foreground">PENGUMUMAN UNIVERSITAS</h2>
                    <button className="text-sm text-primary hover:underline">
                      harap dibaca
                    </button>
                  </div>
                  <div>
                    {universityAnnouncements.map((announcement, index) => (
                      <AnnouncementCard
                        key={index}
                        title={announcement.title}
                        date={announcement.date}
                        index={index + 1}
                      />
                    ))}
                  </div>
                </div>

                {/* Program Study Announcements */}
                <div className="bg-card rounded-lg border border-border p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl font-bold text-foreground">PENGUMUMAN PROGRAM STUDI</h2>
                    <button className="text-sm text-primary hover:underline">
                      harap dibaca
                    </button>
                  </div>
                  <div>
                    {programAnnouncements.map((announcement, index) => (
                      <AnnouncementCard
                        key={index}
                        title={announcement.title}
                        date={announcement.date}
                        index={index + 1}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>

      <Chatbot />
    </div>
  );
};

export default Index;

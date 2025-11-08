import { CheckCircle2, BookOpen, FileText, ClipboardList, Calendar, Users, Library, MapPin, Settings, Home } from "lucide-react";
import { cn } from "@/lib/utils";
import { useState } from "react";

interface SidebarProps {
  activeSection?: string;
}

const Sidebar = ({ activeSection = "home" }: SidebarProps) => {
  const [activeSemester, setActiveSemester] = useState("2025/1");

  const semesters = [
    "2022/1", "2022/2", "2023/1", "2023/2", 
    "2024/1", "2024/2", "2025/1"
  ];

  const menuItems = [
    { id: "home", label: "Beranda", icon: Home },
    { id: "krs", label: "2025/1 Revisi KRS", icon: BookOpen },
  ];

  const researchItems = [
    { id: "proposal", label: "Proposal Penelitian" },
    { id: "laporan", label: "Laporan Penelitian" },
    { id: "publikasi", label: "Publikasi Penelitian" },
    { id: "diseminasi", label: "Diseminasi Penelitian" },
    { id: "persyaratan", label: "Persyaratan Diseminasi" },
    { id: "jadwal", label: "Jadwal Diseminasi" },
    { id: "sirima", label: "SIRIMA" },
  ];

  const libraryItems = [
    { id: "cari-buku", label: "Cari Buku" },
    { id: "keranjang", label: "Keranjang" },
    { id: "reservasi", label: "Daftar Reservasi" },
    { id: "kunjungan", label: "Riwayat Kunjungan" },
  ];

  const fieldItems = [
    { id: "kegiatan", label: "Daftar Kegiatan" },
  ];

  return (
    <aside className="w-64 h-screen bg-sidebar border-r border-sidebar-border overflow-y-auto flex-shrink-0">
      <div className="p-6">
        <h1 className="text-xl font-bold text-primary mb-1">SIAM UNPRI</h1>
        <p className="text-xs text-muted-foreground">Sistem Informasi Akademik</p>
      </div>

      {/* Kartu Studi Section */}
      <div className="px-4 mb-6">
        <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">
          Kartu Studi
        </h3>
        <div className="space-y-1">
          {semesters.map((semester) => (
            <button
              key={semester}
              onClick={() => setActiveSemester(semester)}
              className={cn(
                "w-full flex items-center gap-2 px-3 py-2 rounded-md text-sm transition-colors",
                activeSemester === semester
                  ? "bg-success text-success-foreground"
                  : "text-sidebar-text hover:bg-sidebar-hover"
              )}
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>{semester} Semester {semester.split("/")[1]}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Kartu Studi Baru Section */}
      <div className="px-4 mb-6">
        <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">
          Kartu Studi Baru
        </h3>
        <button className="w-full px-3 py-2 text-sm text-left text-sidebar-text hover:bg-sidebar-hover rounded-md transition-colors">
          2025/1 Revisi KRS
        </button>
      </div>

      {/* Main Menu */}
      <div className="px-4 mb-6">
        <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">
          Umum
        </h3>
        <div className="space-y-1">
          {menuItems.map((item) => (
            <button
              key={item.id}
              className={cn(
                "w-full flex items-center gap-2 px-3 py-2 rounded-md text-sm transition-colors",
                activeSection === item.id
                  ? "bg-sidebar-active text-primary"
                  : "text-sidebar-text hover:bg-sidebar-hover"
              )}
            >
              <item.icon className="w-4 h-4" />
              <span>{item.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Penelitian Section */}
      <div className="px-4 mb-6">
        <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">
          Penelitian
        </h3>
        <div className="space-y-1">
          {researchItems.map((item) => (
            <button
              key={item.id}
              className="w-full px-3 py-2 text-sm text-left text-sidebar-text hover:bg-sidebar-hover rounded-md transition-colors"
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>

      {/* Perpustakaan Section */}
      <div className="px-4 mb-6">
        <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">
          Perpustakaan
        </h3>
        <div className="space-y-1">
          {libraryItems.map((item) => (
            <button
              key={item.id}
              className="w-full px-3 py-2 text-sm text-left text-sidebar-text hover:bg-sidebar-hover rounded-md transition-colors"
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>

      {/* Kegiatan Lapangan Section */}
      <div className="px-4 mb-6">
        <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">
          Kegiatan Lapangan
        </h3>
        <div className="space-y-1">
          {fieldItems.map((item) => (
            <button
              key={item.id}
              className="w-full px-3 py-2 text-sm text-left text-sidebar-text hover:bg-sidebar-hover rounded-md transition-colors"
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>

      {/* Konfigurasi Section */}
      <div className="px-4 mb-6">
        <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">
          Konfigurasi
        </h3>
        <button className="w-full flex items-center gap-2 px-3 py-2 text-sm text-left text-sidebar-text hover:bg-sidebar-hover rounded-md transition-colors">
          <Settings className="w-4 h-4" />
          <span>Ubah Kata Kunci</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;

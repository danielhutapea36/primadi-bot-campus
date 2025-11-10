import { CheckCircle2, BookOpen, FileText, ClipboardList, Library, Settings, Home, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { useState, useEffect } from "react";
import { NavLink } from "@/components/NavLink";
import { supabase } from "@/integrations/supabase/client";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";

interface SidebarProps {
  isOpen: boolean;
}

const Sidebar = ({ isOpen }: SidebarProps) => {
  const [studyCards, setStudyCards] = useState<any[]>([]);
  const [isKartuStudiOpen, setIsKartuStudiOpen] = useState(true);
  const [isResearchOpen, setIsResearchOpen] = useState(false);
  const [isLibraryOpen, setIsLibraryOpen] = useState(false);
  
  useEffect(() => {
    fetchStudyCards();
  }, []);

  const fetchStudyCards = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    const { data: student } = await supabase
      .from('students')
      .select('id')
      .eq('user_id', user.id)
      .maybeSingle();

    if (student) {
      const { data } = await supabase
        .from('study_cards')
        .select('*')
        .eq('student_id', student.id)
        .order('academic_year', { ascending: false });

      if (data) setStudyCards(data);
    }
  };

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
    <aside
      className={cn(
        "fixed left-0 top-0 h-screen bg-sidebar border-r border-sidebar-border overflow-y-auto transition-all duration-300 z-40",
        isOpen ? "w-64" : "w-0"
      )}
    >
      <div className="p-6">
        <h1 className="text-xl font-bold text-primary mb-1">SIAM UNPRI</h1>
        <p className="text-xs text-muted-foreground">Sistem Informasi Akademik</p>
      </div>

      {/* Main Menu */}
      <div className="px-4 mb-6">
        <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">
          Umum
        </h3>
        <div className="space-y-1">
          <NavLink
            to="/"
            className="w-full flex items-center gap-2 px-3 py-2 rounded-md text-sm transition-colors text-sidebar-text hover:bg-sidebar-hover"
            activeClassName="bg-sidebar-active text-primary"
          >
            <Home className="w-4 h-4" />
            <span>Beranda</span>
          </NavLink>
        </div>
      </div>

      {/* Kartu Studi Section - Collapsible */}
      <div className="px-4 mb-6">
        <Collapsible open={isKartuStudiOpen} onOpenChange={setIsKartuStudiOpen}>
          <CollapsibleTrigger className="w-full flex items-center justify-between text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3 hover:text-foreground transition-colors">
            <span>Kartu Studi</span>
            <ChevronDown className={cn("w-4 h-4 transition-transform", isKartuStudiOpen && "rotate-180")} />
          </CollapsibleTrigger>
          <CollapsibleContent>
            <div className="space-y-1">
              {studyCards.map((card) => (
                <NavLink
                  key={card.id}
                  to={`/study-card/${card.id}`}
                  className="w-full flex items-center gap-2 px-3 py-2 rounded-md text-sm transition-colors text-sidebar-text hover:bg-sidebar-hover"
                  activeClassName="bg-success text-success-foreground"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>{card.semester} - {card.academic_year}</span>
                </NavLink>
              ))}
              <NavLink
                to="/revisi-krs"
                className="w-full flex items-center gap-2 px-3 py-2 rounded-md text-sm transition-colors text-sidebar-text hover:bg-sidebar-hover"
                activeClassName="bg-sidebar-active text-primary"
              >
                <BookOpen className="w-4 h-4" />
                <span>2025/1 Revisi KRS</span>
              </NavLink>
            </div>
          </CollapsibleContent>
        </Collapsible>
      </div>

      {/* Penelitian Section - Collapsible */}
      <div className="px-4 mb-6">
        <Collapsible open={isResearchOpen} onOpenChange={setIsResearchOpen}>
          <CollapsibleTrigger className="w-full flex items-center justify-between text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3 hover:text-foreground transition-colors">
            <span>Penelitian</span>
            <ChevronDown className={cn("w-4 h-4 transition-transform", isResearchOpen && "rotate-180")} />
          </CollapsibleTrigger>
          <CollapsibleContent>
            <div className="space-y-1">
              <NavLink to="/penelitian/proposal" className="w-full px-3 py-2 text-sm text-left text-sidebar-text hover:bg-sidebar-hover rounded-md transition-colors" activeClassName="bg-sidebar-active text-primary">
                Proposal Penelitian
              </NavLink>
              <NavLink to="/penelitian/laporan" className="w-full px-3 py-2 text-sm text-left text-sidebar-text hover:bg-sidebar-hover rounded-md transition-colors" activeClassName="bg-sidebar-active text-primary">
                Laporan Penelitian
              </NavLink>
              <NavLink to="/penelitian/publikasi" className="w-full px-3 py-2 text-sm text-left text-sidebar-text hover:bg-sidebar-hover rounded-md transition-colors" activeClassName="bg-sidebar-active text-primary">
                Publikasi Penelitian
              </NavLink>
              <NavLink to="/penelitian/diseminasi" className="w-full px-3 py-2 text-sm text-left text-sidebar-text hover:bg-sidebar-hover rounded-md transition-colors" activeClassName="bg-sidebar-active text-primary">
                Diseminasi Penelitian
              </NavLink>
            </div>
          </CollapsibleContent>
        </Collapsible>
      </div>

      {/* Perpustakaan Section - Collapsible */}
      <div className="px-4 mb-6">
        <Collapsible open={isLibraryOpen} onOpenChange={setIsLibraryOpen}>
          <CollapsibleTrigger className="w-full flex items-center justify-between text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3 hover:text-foreground transition-colors">
            <span>Perpustakaan</span>
            <ChevronDown className={cn("w-4 h-4 transition-transform", isLibraryOpen && "rotate-180")} />
          </CollapsibleTrigger>
          <CollapsibleContent>
            <div className="space-y-1">
              <NavLink to="/perpustakaan/cari-buku" className="w-full px-3 py-2 text-sm text-left text-sidebar-text hover:bg-sidebar-hover rounded-md transition-colors" activeClassName="bg-sidebar-active text-primary">
                Cari Buku
              </NavLink>
              <NavLink to="/perpustakaan/reservasi" className="w-full px-3 py-2 text-sm text-left text-sidebar-text hover:bg-sidebar-hover rounded-md transition-colors" activeClassName="bg-sidebar-active text-primary">
                Daftar Reservasi
              </NavLink>
            </div>
          </CollapsibleContent>
        </Collapsible>
      </div>

      {/* Konfigurasi Section */}
      <div className="px-4 mb-6">
        <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">
          Konfigurasi
        </h3>
        <NavLink to="/settings" className="w-full flex items-center gap-2 px-3 py-2 text-sm text-left text-sidebar-text hover:bg-sidebar-hover rounded-md transition-colors" activeClassName="bg-sidebar-active text-primary">
          <Settings className="w-4 h-4" />
          <span>Pengaturan</span>
        </NavLink>
      </div>
    </aside>
  );
};

export default Sidebar;

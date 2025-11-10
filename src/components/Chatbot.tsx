import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MessageCircle, X, Send } from "lucide-react";
import { cn } from "@/lib/utils";

interface Message {
  id: string;
  text: string;
  sender: "user" | "bot";
  timestamp: Date;
}

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      text: "Halo! Saya adalah asisten virtual SIAM UNPRI. Bagaimana saya bisa membantu Anda hari ini? Anda bisa bertanya tentang KRS, jadwal kuliah, atau fitur lainnya.",
      sender: "bot",
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState("");

  const handleSend = () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputValue,
      sender: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");

    // Simple bot response simulation
    setTimeout(() => {
      let botResponse = "Maaf, saya belum bisa memahami pertanyaan Anda. Silakan coba lagi atau hubungi admin untuk bantuan lebih lanjut.";
      const input = inputValue.toLowerCase();

      // KRS related questions
      if (input.includes("krs") || input.includes("kartu rencana studi")) {
        if (input.includes("cara") || input.includes("bagaimana") || input.includes("mengisi")) {
          botResponse = "Untuk mengisi KRS, ikuti langkah berikut:\n1. Pilih menu 'Kartu Studi Baru' di sidebar\n2. Pilih semester yang aktif\n3. Pilih mata kuliah yang tersedia\n4. Pastikan tidak ada jadwal yang bertabrakan\n5. Klik 'Simpan' untuk menyimpan KRS Anda";
        } else if (input.includes("batal") || input.includes("hapus")) {
          botResponse = "Untuk membatalkan KRS, masuk ke menu 'Kartu Studi Baru', pilih mata kuliah yang ingin dibatalkan, lalu klik tombol hapus. Pastikan Anda membatalkan sebelum batas waktu yang ditentukan.";
        } else if (input.includes("batas") || input.includes("deadline")) {
          botResponse = "Batas waktu pengisian KRS biasanya diumumkan melalui pengumuman universitas. Silakan cek menu pengumuman untuk informasi terkini mengenai jadwal akademik.";
        } else {
          botResponse = "Untuk mengisi KRS, Anda dapat pergi ke menu 'Kartu Studi Baru' di sidebar dan pilih semester yang aktif. Pastikan Anda memilih mata kuliah sesuai dengan jadwal yang tersedia.";
        }
      } 
      // Schedule related questions
      else if (input.includes("jadwal")) {
        if (input.includes("ujian") || input.includes("uts") || input.includes("uas")) {
          botResponse = "Jadwal ujian (UTS/UAS) akan diumumkan melalui menu pengumuman. Anda juga bisa mengeceknya di menu 'Informasi Program Studi' setelah jadwal ujian dipublikasikan oleh fakultas.";
        } else if (input.includes("kuliah") || input.includes("kelas")) {
          botResponse = "Jadwal mata kuliah dapat dilihat setelah Anda mengisi KRS. Anda juga bisa mengakses informasi jadwal melalui menu 'Informasi Program Studi' di sidebar.";
        } else if (input.includes("libur")) {
          botResponse = "Jadwal libur akademik dapat dilihat di menu pengumuman universitas atau kalender akademik yang biasanya tersedia di awal semester.";
        } else {
          botResponse = "Jadwal mata kuliah dapat dilihat setelah Anda mengisi KRS. Anda juga bisa mengakses informasi jadwal melalui menu 'Informasi Program Studi' di sidebar.";
        }
      } 
      // Payment related questions
      else if (input.includes("pembayaran") || input.includes("ukt") || input.includes("biaya") || input.includes("bayar")) {
        if (input.includes("cara") || input.includes("bagaimana")) {
          botResponse = "Pembayaran UKT dapat dilakukan melalui:\n1. Transfer bank (lihat nomor rekening di pengumuman)\n2. Virtual account yang tersedia\n3. Langsung ke bagian keuangan universitas\n\nPastikan menyimpan bukti pembayaran untuk keperluan validasi.";
        } else if (input.includes("tenggat") || input.includes("deadline") || input.includes("batas")) {
          botResponse = "Batas waktu pembayaran UKT biasanya setiap awal semester. Silakan cek pengumuman terbaru untuk tanggal pasti dan hindari keterlambatan agar tidak dikenakan sanksi.";
        } else {
          botResponse = "Informasi pembayaran UKT dapat dilihat di pengumuman atau hubungi bagian keuangan universitas. Pastikan pembayaran dilakukan tepat waktu agar tidak ada kendala dalam perkuliahan.";
        }
      } 
      // Library related questions
      else if (input.includes("perpustakaan") || input.includes("buku") || input.includes("pinjam")) {
        if (input.includes("buku")) {
          botResponse = "Untuk meminjam buku di perpustakaan:\n1. Akses menu 'Perpustakaan' di sidebar\n2. Cari buku yang Anda butuhkan\n3. Klik 'Pinjam' jika buku tersedia\n4. Datang ke perpustakaan dengan membawa kartu mahasiswa untuk pengambilan buku";
        } else if (input.includes("jam") || input.includes("buka")) {
          botResponse = "Jam operasional perpustakaan biasanya Senin-Jumat pukul 08.00-16.00 WIB. Untuk informasi lebih detail, silakan kunjungi menu 'Perpustakaan' atau hubungi petugas perpustakaan.";
        } else {
          botResponse = "Anda dapat mengakses layanan perpustakaan melalui menu 'Perpustakaan' di sidebar. Di sana Anda bisa mencari buku, membuat reservasi, dan melihat riwayat kunjungan.";
        }
      } 
      // Research related questions
      else if (input.includes("penelitian") || input.includes("skripsi") || input.includes("tugas akhir")) {
        if (input.includes("daftar") || input.includes("mengajukan")) {
          botResponse = "Untuk mengajukan penelitian/skripsi:\n1. Akses menu 'Penelitian' di sidebar\n2. Klik 'Buat Proposal Baru'\n3. Isi formulir proposal penelitian\n4. Upload dokumen yang diperlukan\n5. Submit untuk review dosen pembimbing";
        } else if (input.includes("pembimbing")) {
          botResponse = "Informasi dosen pembimbing dapat dilihat setelah proposal penelitian Anda disetujui. Anda bisa mengeceknya di menu 'Penelitian' bagian 'Status Proposal'.";
        } else {
          botResponse = "Untuk informasi penelitian, silakan akses menu 'Penelitian' di sidebar. Anda bisa melihat proposal, laporan, publikasi, dan jadwal diseminasi penelitian.";
        }
      } 
      // Attendance related questions
      else if (input.includes("presensi") || input.includes("absen") || input.includes("kehadiran")) {
        botResponse = "Untuk melakukan presensi:\n1. Akses menu 'Presensi Harian' di sidebar kiri\n2. Atau gunakan menu 'QR Code' untuk scan QR code dari dosen\n\nPresensi harus dilakukan saat kelas berlangsung sesuai jadwal yang ditentukan.";
      } 
      // Academic documents
      else if (input.includes("transkrip") || input.includes("nilai") || input.includes("ipk") || input.includes("ips")) {
        if (input.includes("lihat") || input.includes("cek")) {
          botResponse = "Untuk melihat transkrip nilai:\n1. Pilih menu 'Transkrip Akademik Sementara' di sidebar kiri\n2. Pilih semester yang ingin dilihat\n3. Anda bisa mencetak atau download transkrip dalam format PDF";
        } else {
          botResponse = "Nilai dan IPK Anda dapat dilihat melalui menu 'Transkrip Akademik Sementara' di sidebar kiri. Di sana tersedia riwayat nilai per semester dan IPK kumulatif.";
        }
      } 
      // General help
      else if (input.includes("bantuan") || input.includes("help") || input.includes("tolong")) {
        botResponse = "Saya dapat membantu Anda dengan informasi mengenai:\n• KRS (Kartu Rencana Studi)\n• Jadwal kuliah dan ujian\n• Pembayaran UKT\n• Perpustakaan\n• Penelitian/Skripsi\n• Presensi\n• Transkrip nilai\n\nSilakan tanyakan apa yang ingin Anda ketahui!";
      }
      // Greeting
      else if (input.includes("halo") || input.includes("hai") || input.includes("hello") || input.includes("hi")) {
        botResponse = "Halo! Selamat datang di Asisten Virtual SIAM UNPRI. Ada yang bisa saya bantu hari ini?";
      } else if (input.includes("terima kasih") || input.includes("thanks") || input.includes("makasih")) {
        botResponse = "Sama-sama! Jika ada pertanyaan lain, jangan ragu untuk bertanya. Semoga sukses dengan perkuliahan Anda! 😊";
      }

      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: botResponse,
        sender: "bot",
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, botMessage]);
    }, 800);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSend();
    }
  };

  return (
    <>
      {/* Floating Button */}
      <Button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "fixed bottom-6 right-6 h-14 w-14 rounded-full shadow-lg z-50 transition-all",
          isOpen && "rotate-0"
        )}
        size="icon"
      >
        {isOpen ? <X className="w-6 h-6" /> : <MessageCircle className="w-6 h-6" />}
      </Button>

      {/* Chat Window */}
      {isOpen && (
        <Card className="fixed bottom-24 right-6 w-96 h-[500px] shadow-2xl z-40 flex flex-col">
          {/* Header */}
          <div className="bg-primary text-primary-foreground p-4 rounded-t-lg">
            <h3 className="font-semibold">Asisten Virtual SIAM</h3>
            <p className="text-xs opacity-90">Online - Siap Membantu</p>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={cn(
                  "flex",
                  message.sender === "user" ? "justify-end" : "justify-start"
                )}
              >
                <div
                  className={cn(
                    "max-w-[80%] rounded-lg p-3 text-sm",
                    message.sender === "user"
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted text-foreground"
                  )}
                >
                  <p>{message.text}</p>
                  <p className="text-xs opacity-70 mt-1">
                    {message.timestamp.toLocaleTimeString("id-ID", {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Input */}
          <div className="p-4 border-t border-border">
            <div className="flex gap-2">
              <Input
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ketik pertanyaan Anda..."
                className="flex-1"
              />
              <Button onClick={handleSend} size="icon">
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </Card>
      )}
    </>
  );
};

export default Chatbot;

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

      if (inputValue.toLowerCase().includes("krs")) {
        botResponse = "Untuk mengisi KRS, Anda dapat pergi ke menu 'Kartu Studi Baru' di sidebar dan pilih semester yang aktif. Pastikan Anda memilih mata kuliah sesuai dengan jadwal yang tersedia.";
      } else if (inputValue.toLowerCase().includes("jadwal")) {
        botResponse = "Jadwal mata kuliah dapat dilihat setelah Anda mengisi KRS. Anda juga bisa mengakses informasi jadwal melalui menu 'Informasi Program Studi' di sidebar.";
      } else if (inputValue.toLowerCase().includes("pembayaran") || inputValue.toLowerCase().includes("ukt")) {
        botResponse = "Informasi pembayaran UKT dapat dilihat di pengumuman atau hubungi bagian keuangan universitas. Pastikan pembayaran dilakukan tepat waktu agar tidak ada kendala dalam perkuliahan.";
      } else if (inputValue.toLowerCase().includes("perpustakaan")) {
        botResponse = "Anda dapat mengakses layanan perpustakaan melalui menu 'Perpustakaan' di sidebar. Di sana Anda bisa mencari buku, membuat reservasi, dan melihat riwayat kunjungan.";
      } else if (inputValue.toLowerCase().includes("penelitian")) {
        botResponse = "Untuk informasi penelitian, silakan akses menu 'Penelitian' di sidebar. Anda bisa melihat proposal, laporan, publikasi, dan jadwal diseminasi penelitian.";
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

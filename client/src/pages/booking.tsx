import { Header } from "@/components/layout/header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format } from "date-fns";
import { tr } from "date-fns/locale";
import { CalendarIcon, Clock, CheckCircle } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { useToast } from "@/hooks/use-toast";

export default function Booking() {
  const [date, setDate] = useState<Date>();
  const [step, setStep] = useState(1);
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep(2);
    toast({
      title: "Randevu Talebi Alındı",
      description: "Uzmanlarımız en kısa sürede sizinle iletişime geçecektir.",
    });
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <Header />
      
      <main className="flex-1 pt-24 pb-20 px-4 md:px-8 container mx-auto max-w-5xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          
          {/* Left Column: Info */}
          <div className="space-y-8">
            <div>
              <h1 className="text-4xl font-bold text-slate-900 mb-4">
                Ücretsiz <span className="text-gradient-primary">Ön Görüşme</span> Planlayın
              </h1>
              <p className="text-lg text-slate-600">
                Uzmanlarımızla yüz yüze veya online görüşerek hayalinizdeki görünüme bir adım daha yaklaşın. AI simülasyon sonuçlarınızı da görüşmede değerlendirebiliriz.
              </p>
            </div>

            <div className="glass-panel p-6 rounded-3xl space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0">
                  <CheckCircle className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900">Kişiselleştirilmiş Analiz</h3>
                  <p className="text-sm text-slate-500">Yüz yapınıza özel detaylı analiz ve beklenti yönetimi.</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0">
                  <CheckCircle className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900">3D Simülasyon Değerlendirmesi</h3>
                  <p className="text-sm text-slate-500">Uygulama üzerinde yaptığınız simülasyonların doktor yorumu.</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0">
                  <CheckCircle className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900">Net Fiyatlandırma</h3>
                  <p className="text-sm text-slate-500">Sürpriz maliyetler olmadan şeffaf tedavi planı.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Form */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="glass-panel p-8 rounded-3xl shadow-xl"
          >
            {step === 1 ? (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-700">Ad</label>
                    <Input placeholder="Adınız" required />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-700">Soyad</label>
                    <Input placeholder="Soyadınız" required />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-700">E-posta</label>
                  <Input type="email" placeholder="ornek@email.com" required />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-700">Telefon</label>
                  <Input type="tel" placeholder="0555 555 55 55" required />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-700">Tercih Edilen Tarih</label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-full justify-start text-left font-normal",
                          !date && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {date ? format(date, "PPP", { locale: tr }) : <span>Tarih seçin</span>}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={date}
                        onSelect={setDate}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-700">Notlarınız (İsteğe bağlı)</label>
                  <Textarea placeholder="Özellikle sormak istediğiniz konular..." />
                </div>

                <Button type="submit" className="w-full shadow-lg shadow-primary/20 text-lg py-6">
                  Randevu Oluştur
                </Button>
              </form>
            ) : (
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center justify-center text-center h-full py-12 space-y-6"
              >
                <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-4">
                  <CheckCircle className="w-10 h-10" />
                </div>
                <h2 className="text-2xl font-bold text-slate-900">Talebiniz Alındı!</h2>
                <p className="text-slate-600 max-w-xs">
                  Randevu talebiniz başarıyla bize ulaştı. Müşteri temsilcimiz en kısa sürede sizi arayarak saati netleştirecektir.
                </p>
                <Button onClick={() => setStep(1)} variant="outline" className="mt-4">
                  Yeni Randevu Al
                </Button>
              </motion.div>
            )}
          </motion.div>

        </div>
      </main>
    </div>
  );
}

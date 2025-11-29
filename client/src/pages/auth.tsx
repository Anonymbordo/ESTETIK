import { useState } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { motion, AnimatePresence } from "framer-motion";
import { Video, ArrowRight, Sparkles, ShieldCheck, ScanFace } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [, setLocation] = useLocation();
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Mock authentication
    if (email === "ddemurathan12@gmail.com" && password === "deneme123") {
      toast({
        title: "Giriş Başarılı",
        description: "MDAI platformuna hoş geldiniz.",
      });
      setLocation("/");
    } else {
      toast({
        variant: "destructive",
        title: "Hatalı Giriş",
        description: "Lütfen bilgilerinizi kontrol edin.",
      });
    }
  };

  return (
    <div className="min-h-screen w-full bg-slate-50 flex flex-col lg:flex-row overflow-hidden">
      
      {/* Left Panel - Brand & Animation */}
      <div className="lg:w-1/2 bg-gradient-to-br from-slate-900 to-slate-800 relative overflow-hidden flex flex-col justify-center p-8 lg:p-16 text-white">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 opacity-20">
           <div className="absolute top-0 left-0 w-full h-full bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-100 contrast-150 mix-blend-overlay"></div>
           <motion.div 
             animate={{ 
               scale: [1, 1.2, 1],
               rotate: [0, 90, 0],
             }}
             transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
             className="absolute -top-24 -right-24 w-96 h-96 bg-primary/30 rounded-full blur-3xl"
           />
           <motion.div 
             animate={{ 
               scale: [1, 1.5, 1],
               x: [0, 50, 0],
             }}
             transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
             className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-cyan-500/20 rounded-full blur-3xl"
           />
        </div>

        <div className="relative z-10 space-y-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="flex items-center gap-3"
          >
            <div className="w-12 h-12 bg-gradient-to-br from-primary to-cyan-400 rounded-2xl flex items-center justify-center shadow-lg shadow-cyan-500/30">
              <Video className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-3xl font-bold tracking-tight">MDAI</h1>
          </motion.div>

          <div className="space-y-6">
            <motion.h2 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="text-4xl lg:text-5xl font-bold leading-tight"
            >
              Estetikte <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-cyan-400">
                Yapay Zeka Devrimi
              </span>
            </motion.h2>
            
            <div className="space-y-4 max-w-md">
              {[
                { icon: ScanFace, text: "Gerçek zamanlı yüz analizi ve simülasyon" },
                { icon: Sparkles, text: "Yapay zeka destekli estetik öngörü" },
                { icon: ShieldCheck, text: "Güvenli ve kişiselleştirilmiş deneyim" }
              ].map((item, idx) => (
                <motion.div 
                  key={idx}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.6 + (idx * 0.2) }}
                  className="flex items-center gap-3 text-slate-300 bg-white/5 p-3 rounded-xl backdrop-blur-sm border border-white/10"
                >
                  <item.icon className="w-5 h-5 text-primary" />
                  <span className="text-sm font-medium">{item.text}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Right Panel - Auth Form */}
      <div className="lg:w-1/2 flex items-center justify-center p-6 lg:p-12 relative">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center lg:text-left">
            <h3 className="text-2xl font-bold text-slate-900">
              {isLogin ? "Tekrar Hoş Geldiniz" : "Hesap Oluşturun"}
            </h3>
            <p className="text-slate-500 mt-2">
              {isLogin 
                ? "Simülasyonlarınıza erişmek için giriş yapın." 
                : "MDAI dünyasına katılmak için bilgilerinizi girin."}
            </p>
          </div>

          <Card className="p-6 md:p-8 border-slate-100 shadow-xl shadow-slate-200/50 bg-white/80 backdrop-blur-xl rounded-3xl">
            <form onSubmit={handleSubmit} className="space-y-5">
              {!isLogin && (
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Ad</Label>
                    <Input placeholder="Adınız" className="rounded-xl bg-slate-50/50" />
                  </div>
                  <div className="space-y-2">
                    <Label>Soyad</Label>
                    <Input placeholder="Soyadınız" className="rounded-xl bg-slate-50/50" />
                  </div>
                </div>
              )}

              <div className="space-y-2">
                <Label>E-posta</Label>
                <Input 
                  type="email" 
                  placeholder="ornek@email.com" 
                  className="rounded-xl bg-slate-50/50"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label>Şifre</Label>
                <Input 
                  type="password" 
                  placeholder="••••••••" 
                  className="rounded-xl bg-slate-50/50"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>

              <Button className="w-full py-6 rounded-xl text-lg font-semibold shadow-lg shadow-primary/25 hover:shadow-primary/40 transition-all duration-300 group">
                {isLogin ? "Giriş Yap" : "Kayıt Ol"}
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-sm text-slate-500">
                {isLogin ? "Hesabınız yok mu?" : "Zaten hesabınız var mı?"}
                <button 
                  onClick={() => setIsLogin(!isLogin)}
                  className="ml-2 font-semibold text-primary hover:underline"
                >
                  {isLogin ? "Hemen Kaydolun" : "Giriş Yapın"}
                </button>
              </p>
            </div>
          </Card>

          {/* Mobile Only Branding Footer */}
          <div className="lg:hidden text-center text-xs text-slate-400 mt-8">
            &copy; 2024 MDAI Technologies. Tüm hakları saklıdır.
          </div>
        </div>
      </div>
    </div>
  );
}

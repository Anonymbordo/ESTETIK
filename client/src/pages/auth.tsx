import { useState } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { motion } from "framer-motion";
import { Video, ArrowRight, ScanFace, Smartphone, Check } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [, setLocation] = useLocation();
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (email === "ddemurathan12@gmail.com" && password === "deneme123") {
      toast({
        title: "Giriş Başarılı",
        description: "MDAI platformuna hoş geldiniz.",
        className: "bg-green-50 border-green-200 text-green-900"
      });
      setLocation("/simulation");
    } else {
      toast({
        variant: "destructive",
        title: "Hatalı Giriş",
        description: "Lütfen bilgilerinizi kontrol edin.",
      });
    }
  };

  return (
    <div className="min-h-screen w-full bg-slate-50 flex flex-col lg:flex-row overflow-hidden font-sans">
      
      {/* Top Panel (Mobile) / Left Panel (Desktop) */}
      <div className="relative lg:w-1/2 bg-[#0f172a] overflow-hidden flex flex-col justify-start pt-12 px-6 lg:justify-center lg:p-16 text-white min-h-[45vh] lg:min-h-screen">
        {/* Background Gradient/Noise */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0f172a] to-[#1e293b]">
           <div className="absolute top-0 left-0 w-full h-full bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 mix-blend-soft-light"></div>
           
           {/* Abstract Glow */}
           <div className="absolute top-[-10%] right-[-10%] w-[300px] h-[300px] bg-blue-500/20 rounded-full blur-[80px]" />
           <div className="absolute bottom-[20%] left-[-10%] w-[250px] h-[250px] bg-cyan-500/10 rounded-full blur-[60px]" />
        </div>

        <div className="relative z-10 flex flex-col h-full lg:h-auto">
          {/* Logo */}
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-3 mb-8 lg:mb-12"
          >
            <div className="w-10 h-10 bg-white/10 backdrop-blur-md rounded-xl flex items-center justify-center border border-white/10">
              <Video className="w-5 h-5 text-cyan-300" />
            </div>
            <span className="text-xl font-bold tracking-wide text-white">MDAI</span>
          </motion.div>

          {/* Main Text */}
          <div className="space-y-6 mb-auto lg:mb-0">
            <motion.h2 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-4xl lg:text-6xl font-bold leading-[1.1] tracking-tight"
            >
              Güzelliğin <br/>
              <span className="text-cyan-400">
                Dijital İkizi
              </span>
            </motion.h2>
            
            {/* Tags */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="flex gap-3 overflow-x-auto pb-2 no-scrollbar"
            >
               <div className="bg-[#1e293b] px-4 py-2 rounded-full text-xs font-medium border border-white/10 flex items-center gap-2 text-slate-300 whitespace-nowrap shadow-lg">
                 <ScanFace className="w-3.5 h-3.5 text-cyan-400" /> 
                 Yüz Analizi
               </div>
               <div className="bg-[#1e293b] px-4 py-2 rounded-full text-xs font-medium border border-white/10 flex items-center gap-2 text-slate-300 whitespace-nowrap shadow-lg">
                 <Smartphone className="w-3.5 h-3.5 text-cyan-400" /> 
                 Mobil Uyumlu
               </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Bottom Sheet (Mobile) / Right Panel (Desktop) */}
      <div className="lg:w-1/2 flex flex-col items-center justify-start pt-10 pb-8 px-6 lg:justify-center lg:p-12 relative -mt-12 lg:mt-0 bg-white rounded-t-[2.5rem] lg:rounded-none z-20 shadow-[0_-10px_40px_rgba(0,0,0,0.1)] lg:shadow-none min-h-[55vh]">
        
        {/* Mobile Handle Indicator */}
        <div className="w-12 h-1.5 bg-slate-200 rounded-full absolute top-4 left-1/2 -translate-x-1/2 lg:hidden" />

        <div className="w-full max-w-sm space-y-8 mt-4 lg:mt-0">
          <div className="text-center">
            <h3 className="text-2xl font-bold text-slate-900">
              {isLogin ? "Tekrar Hoş Geldiniz" : "Hesap Oluşturun"}
            </h3>
            <p className="text-slate-500 mt-2 text-sm">
              {isLogin 
                ? "Devam etmek için kimliğinizi doğrulayın." 
                : "Profesyonel estetik yolculuğunuza başlayın."}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {!isLogin && (
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <Label className="text-[10px] uppercase tracking-wider text-slate-400 font-bold ml-1">Ad</Label>
                  <Input placeholder="Adınız" className="h-12 rounded-2xl bg-slate-50 border-slate-200 focus:bg-white transition-all" />
                </div>
                <div className="space-y-1.5">
                  <Label className="text-[10px] uppercase tracking-wider text-slate-400 font-bold ml-1">Soyad</Label>
                  <Input placeholder="Soyadınız" className="h-12 rounded-2xl bg-slate-50 border-slate-200 focus:bg-white transition-all" />
                </div>
              </div>
            )}

            <div className="space-y-1.5">
              <Label className="text-[10px] uppercase tracking-wider text-slate-400 font-bold ml-1">E-posta</Label>
              <div className="relative">
                <Input 
                  type="email" 
                  placeholder="mail@ornek.com" 
                  className="h-12 pl-4 rounded-2xl bg-slate-50 border-slate-200 focus:bg-white transition-all text-slate-900 placeholder:text-slate-400"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                {email.includes('@') && (
                  <div className="absolute right-3 top-3.5 text-emerald-500 animate-in zoom-in">
                    <Check className="w-5 h-5" />
                  </div>
                )}
              </div>
            </div>

            <div className="space-y-1.5">
              <div className="flex justify-between px-1">
                <Label className="text-[10px] uppercase tracking-wider text-slate-400 font-bold">Şifre</Label>
                {isLogin && <a href="#" className="text-[11px] font-semibold text-primary hover:text-primary/80">Unuttum?</a>}
              </div>
              <Input 
                type="password" 
                placeholder="••••••••" 
                className="h-12 rounded-2xl bg-slate-50 border-slate-200 focus:bg-white transition-all text-slate-900 placeholder:text-slate-400"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <Button className="w-full h-14 rounded-2xl text-base font-bold shadow-xl shadow-primary/20 hover:shadow-primary/30 hover:scale-[1.01] active:scale-[0.99] transition-all duration-200 bg-gradient-to-r from-[#0ea5e9] to-[#06b6d4] text-white mt-2">
              {isLogin ? "Giriş Yap" : "Kayıt Ol"}
              <ArrowRight className="w-5 h-5 ml-2 opacity-90" />
            </Button>
          </form>

          <div className="relative py-2">
             <div className="absolute inset-0 flex items-center">
               <span className="w-full border-t border-slate-100" />
             </div>
             <div className="relative flex justify-center text-[10px] uppercase font-bold tracking-widest">
               <span className="bg-white px-3 text-slate-300">Veya</span>
             </div>
           </div>

           <div className="grid grid-cols-2 gap-4">
             <Button variant="outline" className="h-12 rounded-2xl border-slate-200 hover:bg-slate-50 text-slate-600 font-medium">
               <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/></svg>
               Google
             </Button>
             <Button variant="outline" className="h-12 rounded-2xl border-slate-200 hover:bg-slate-50 text-slate-600 font-medium">
                <svg className="w-5 h-5 mr-2 text-black" fill="currentColor" viewBox="0 0 24 24"><path d="M16.365 1.43c0 1.14-.493 2.27-1.177 3.08-.744.9-1.99 1.57-2.987 1.57-.12 0-.23-.02-.3-.03-.01-.06-.04-.15-.04-.21.09-1.99 1.25-3.98 2.96-4.72.5-.23 1.13-.27 1.544-.27zM16.94 5.8c-2.19-1.09-4.13-1.24-5.61-1.24-2.7 0-4.55 1.5-4.55 4.36 0 3.09 2.16 4.98 5.25 4.98 2.45 0 4.05-1.47 4.05-3.64 0-2.07-1.32-3.43-3.34-3.43-1.49 0-2.6.95-2.6 2.38 0 1.18.81 1.99 2.03 1.99 1.22 0 2.08-.93 2.08-2.43 0-.14-.01-.28-.03-.42l.03-.01c2.27.29 3.84 2.35 3.84 4.86 0 2.64-1.55 4.76-3.92 4.76-2.08 0-3.55-1.59-3.55-3.79 0-2.44 1.87-4.34 4.62-4.34.62 0 1.22.1 1.79.28.12.04.25.06.38.06.39 0 .78-.21 1.02-.56.35-.5.24-1.18-.26-1.53l-.04-.03zm-5.46 5.26c-.84 0-1.35-.71-1.35-1.55 0-.78.5-1.51 1.35-1.51.82 0 1.35.71 1.35 1.53 0 .8-.5 1.53-1.35 1.53z"/></svg>
                Apple
             </Button>
           </div>

          <div className="mt-8 text-center pb-4">
            <p className="text-sm text-slate-500 font-medium">
              {isLogin ? "Hesabınız yok mu?" : "Zaten hesabınız var mı?"}
              <button 
                onClick={() => setIsLogin(!isLogin)}
                className="ml-2 font-bold text-primary hover:text-cyan-600 transition-colors"
              >
                {isLogin ? "Hemen Kaydolun" : "Giriş Yapın"}
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

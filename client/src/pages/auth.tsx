import { useState } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { motion, AnimatePresence } from "framer-motion";
import { Video, ArrowRight, Sparkles, ShieldCheck, ScanFace, Check, Smartphone } from "lucide-react";
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
    <div className="min-h-screen w-full bg-slate-50 flex flex-col lg:flex-row overflow-hidden">
      
      {/* Left Panel - Brand & Animation */}
      <div className="lg:w-1/2 bg-slate-900 relative overflow-hidden flex flex-col justify-end lg:justify-center p-8 lg:p-16 text-white min-h-[40vh] lg:min-h-screen">
        {/* Animated Background Elements */}
        <div className="absolute inset-0">
           <div className="absolute top-0 left-0 w-full h-full bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-100 contrast-150 mix-blend-overlay"></div>
           
           {/* Dynamic Mesh Gradients */}
           <motion.div 
             animate={{ 
               scale: [1, 1.2, 1],
               opacity: [0.3, 0.5, 0.3],
               rotate: [0, 45, 0],
             }}
             transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
             className="absolute top-[-20%] right-[-20%] w-[80%] h-[80%] bg-primary/40 rounded-full blur-[100px]"
           />
           <motion.div 
             animate={{ 
               scale: [1, 1.5, 1],
               opacity: [0.2, 0.4, 0.2],
               x: [-50, 50, -50],
             }}
             transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
             className="absolute bottom-[-20%] left-[-20%] w-[80%] h-[80%] bg-cyan-500/30 rounded-full blur-[120px]"
           />
        </div>

        <div className="relative z-10 space-y-6 lg:space-y-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="flex items-center gap-3"
          >
            <div className="w-10 h-10 lg:w-14 lg:h-14 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl flex items-center justify-center shadow-2xl">
              <Video className="w-5 h-5 lg:w-7 lg:h-7 text-cyan-300" />
            </div>
            <span className="text-xl lg:text-2xl font-bold tracking-tight">MDAI</span>
          </motion.div>

          <div className="space-y-4 lg:space-y-6">
            <motion.h2 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="text-3xl lg:text-6xl font-bold leading-tight"
            >
              Güzelliğin <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-blue-400">
                Dijital İkizi
              </span>
            </motion.h2>
            
            <p className="text-slate-300 text-sm lg:text-lg max-w-md leading-relaxed hidden lg:block">
              Yapay zeka destekli analiz algoritmaları ile yüz hatlarınızı keşfedin, simüle edin ve mükemmelliği planlayın.
            </p>

            {/* Mobile-only compact features */}
            <div className="flex gap-3 lg:hidden overflow-x-auto pb-2 no-scrollbar">
               <div className="bg-white/10 backdrop-blur-sm px-3 py-1.5 rounded-full text-xs font-medium border border-white/10 flex items-center gap-1.5 whitespace-nowrap">
                 <ScanFace className="w-3.5 h-3.5 text-cyan-300" /> Yüz Analizi
               </div>
               <div className="bg-white/10 backdrop-blur-sm px-3 py-1.5 rounded-full text-xs font-medium border border-white/10 flex items-center gap-1.5 whitespace-nowrap">
                 <Smartphone className="w-3.5 h-3.5 text-cyan-300" /> Mobil Uyumlu
               </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Panel - Auth Form */}
      <div className="lg:w-1/2 flex flex-col items-center justify-center p-6 lg:p-12 relative -mt-8 lg:mt-0 bg-slate-50 rounded-t-[2rem] lg:rounded-none z-20">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center lg:text-left">
            <h3 className="text-2xl lg:text-3xl font-bold text-slate-900 tracking-tight">
              {isLogin ? "Tekrar Hoş Geldiniz" : "Hesap Oluşturun"}
            </h3>
            <p className="text-slate-500 mt-2 text-sm lg:text-base">
              {isLogin 
                ? "Devam etmek için kimliğinizi doğrulayın." 
                : "Profesyonel estetik yolculuğunuza başlayın."}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {!isLogin && (
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-xs uppercase tracking-wider text-slate-500 font-semibold">Ad</Label>
                  <Input placeholder="Adınız" className="h-12 rounded-xl bg-white border-slate-200 focus:border-primary focus:ring-primary/20" />
                </div>
                <div className="space-y-2">
                  <Label className="text-xs uppercase tracking-wider text-slate-500 font-semibold">Soyad</Label>
                  <Input placeholder="Soyadınız" className="h-12 rounded-xl bg-white border-slate-200 focus:border-primary focus:ring-primary/20" />
                </div>
              </div>
            )}

            <div className="space-y-2">
              <Label className="text-xs uppercase tracking-wider text-slate-500 font-semibold">E-posta</Label>
              <div className="relative">
                <Input 
                  type="email" 
                  placeholder="mail@ornek.com" 
                  className="h-12 pl-4 rounded-xl bg-white border-slate-200 focus:border-primary focus:ring-primary/20 transition-all"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                {email.includes('@') && (
                  <div className="absolute right-3 top-3 text-green-500 animate-in zoom-in">
                    <Check className="w-5 h-5" />
                  </div>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between">
                <Label className="text-xs uppercase tracking-wider text-slate-500 font-semibold">Şifre</Label>
                {isLogin && <a href="#" className="text-xs text-primary hover:underline">Unuttum?</a>}
              </div>
              <Input 
                type="password" 
                placeholder="••••••••" 
                className="h-12 rounded-xl bg-white border-slate-200 focus:border-primary focus:ring-primary/20 transition-all"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <Button className="w-full h-14 rounded-2xl text-lg font-bold shadow-xl shadow-primary/20 hover:shadow-primary/30 hover:scale-[1.02] transition-all duration-300 bg-gradient-to-r from-primary to-cyan-600 text-white">
              {isLogin ? "Giriş Yap" : "Kayıt Ol"}
              <ArrowRight className="w-5 h-5 ml-2 opacity-80" />
            </Button>
          </form>

          <div className="relative">
             <div className="absolute inset-0 flex items-center">
               <span className="w-full border-t border-slate-200" />
             </div>
             <div className="relative flex justify-center text-xs uppercase">
               <span className="bg-slate-50 px-2 text-slate-400 font-medium">veya</span>
             </div>
           </div>

           <div className="grid grid-cols-2 gap-4">
             <Button variant="outline" className="h-12 rounded-xl border-slate-200 hover:bg-white hover:border-slate-300 text-slate-600">
               <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/></svg>
               Google
             </Button>
             <Button variant="outline" className="h-12 rounded-xl border-slate-200 hover:bg-white hover:border-slate-300 text-slate-600">
                <svg className="w-5 h-5 mr-2 text-black" fill="currentColor" viewBox="0 0 24 24"><path d="M16.365 1.43c0 1.14-.493 2.27-1.177 3.08-.744.9-1.99 1.57-2.987 1.57-.12 0-.23-.02-.3-.03-.01-.06-.04-.15-.04-.21.09-1.99 1.25-3.98 2.96-4.72.5-.23 1.13-.27 1.544-.27zM16.94 5.8c-2.19-1.09-4.13-1.24-5.61-1.24-2.7 0-4.55 1.5-4.55 4.36 0 3.09 2.16 4.98 5.25 4.98 2.45 0 4.05-1.47 4.05-3.64 0-2.07-1.32-3.43-3.34-3.43-1.49 0-2.6.95-2.6 2.38 0 1.18.81 1.99 2.03 1.99 1.22 0 2.08-.93 2.08-2.43 0-.14-.01-.28-.03-.42l.03-.01c2.27.29 3.84 2.35 3.84 4.86 0 2.64-1.55 4.76-3.92 4.76-2.08 0-3.55-1.59-3.55-3.79 0-2.44 1.87-4.34 4.62-4.34.62 0 1.22.1 1.79.28.12.04.25.06.38.06.39 0 .78-.21 1.02-.56.35-.5.24-1.18-.26-1.53l-.04-.03zm-5.46 5.26c-.84 0-1.35-.71-1.35-1.55 0-.78.5-1.51 1.35-1.51.82 0 1.35.71 1.35 1.53 0 .8-.5 1.53-1.35 1.53z"/></svg>
                Apple
             </Button>
           </div>

          <div className="mt-6 text-center">
            <p className="text-sm text-slate-500">
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

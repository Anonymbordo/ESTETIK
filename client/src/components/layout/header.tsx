import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Video, Calendar, MessageSquare, User, Home, Images, Stethoscope, Sparkles } from "lucide-react";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function Header() {
  const [location] = useLocation();
  const [scrolled, setScrolled] = useState(false);

  // Handle scroll effect for glassmorphism
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isActive = (path: string) => location === path;

  const navItems = [
    { path: "/simulation", label: "Simülasyon", icon: Sparkles },
    { path: "/gallery", label: "Galeri", icon: Images },
    { path: "/specialists", label: "Uzmanlar", icon: Stethoscope },
    { path: "/booking", label: "Randevu", icon: Calendar }
  ];

  return (
    <>
      {/* Desktop Header */}
      <header 
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          scrolled ? "bg-white/80 backdrop-blur-xl shadow-sm border-b border-white/20 h-16" : "bg-transparent h-20"
        } hidden md:block`}
      >
        <div className="container mx-auto h-full px-8 flex items-center justify-between">
          <Link href="/simulation">
            <div className="flex items-center gap-2 cursor-pointer group">
              <div className="w-10 h-10 bg-gradient-to-br from-primary to-cyan-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-primary/20 group-hover:shadow-primary/40 transition-all duration-300 transform group-hover:scale-105">
                <Video className="w-5 h-5" />
              </div>
              <span className="font-bold text-xl tracking-tight text-slate-900 group-hover:text-primary transition-colors">
                MDAI
              </span>
            </div>
          </Link>

          <nav className="flex items-center gap-1 bg-white/50 p-1.5 rounded-full border border-white/40 backdrop-blur-md shadow-sm">
            {navItems.slice(0, 3).map((link) => (
              <Link key={link.path} href={link.path}>
                <div 
                  className={`px-6 py-2.5 rounded-full text-sm font-medium transition-all cursor-pointer relative overflow-hidden ${
                    isActive(link.path) 
                      ? "text-primary" 
                      : "text-slate-500 hover:text-slate-900 hover:bg-white/50"
                  }`}
                >
                  <span className="relative z-10 flex items-center gap-2">
                    {/* <link.icon className="w-4 h-4" /> */}
                    {link.label}
                  </span>
                  {isActive(link.path) && (
                    <motion.div
                      layoutId="desktopNav"
                      className="absolute inset-0 bg-white rounded-full shadow-sm border border-slate-100 -z-0"
                      transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                </div>
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <Link href="/booking">
              <Button className="shadow-lg shadow-primary/20 rounded-full px-6 hover:shadow-primary/40 transition-all hover:-translate-y-0.5 bg-slate-900 text-white hover:bg-slate-800">
                <Calendar className="w-4 h-4 mr-2" />
                <span>Randevu Al</span>
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Mobile Top Bar (Logo & Profile) */}
      <header className="fixed top-0 left-0 right-0 z-40 h-16 bg-white/80 backdrop-blur-xl border-b border-slate-100 flex items-center justify-between px-4 md:hidden">
        <Link href="/simulation">
           <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-br from-primary to-cyan-600 rounded-lg flex items-center justify-center text-white shadow-md shadow-primary/20">
                <Video className="w-4 h-4" />
              </div>
              <span className="font-bold text-lg tracking-tight text-slate-900">MDAI</span>
           </div>
        </Link>
        <Button variant="ghost" size="icon" className="rounded-full text-slate-500">
          <User className="w-5 h-5" />
        </Button>
      </header>

      {/* Mobile Bottom Navigation Bar (App-like) */}
      <nav className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-slate-100 pb-safe-area-inset-bottom md:hidden shadow-[0_-4px_20px_rgba(0,0,0,0.05)]">
        <div className="flex justify-around items-center h-16 px-2">
          {navItems.map((link) => {
            const active = isActive(link.path);
            return (
              <Link key={link.path} href={link.path}>
                <div className="flex flex-col items-center justify-center w-16 gap-1 cursor-pointer relative">
                  <div 
                    className={`p-1.5 rounded-xl transition-all duration-300 ${
                      active 
                        ? "bg-primary/10 text-primary translate-y-[-4px]" 
                        : "text-slate-400 hover:text-slate-600"
                    }`}
                  >
                    <link.icon className={`w-6 h-6 ${active ? "fill-current" : ""}`} strokeWidth={active ? 2.5 : 2} />
                  </div>
                  <span className={`text-[10px] font-medium transition-colors ${active ? "text-primary" : "text-slate-400"}`}>
                    {link.label}
                  </span>
                  {active && (
                    <motion.div 
                      layoutId="mobileNavIndicator"
                      className="absolute -bottom-2 w-1 h-1 bg-primary rounded-full"
                    />
                  )}
                </div>
              </Link>
            );
          })}
        </div>
      </nav>
    </>
  );
}

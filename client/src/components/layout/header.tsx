import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Video, Calendar, MessageSquare, User, Menu, X } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function Header() {
  const [location] = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isActive = (path: string) => location === path;

  const navItems = [
    { path: "/simulation", label: "Simülasyon" },
    { path: "/gallery", label: "Galeri" },
    { path: "/specialists", label: "Uzmanlar" }
  ];

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-40 bg-white/70 backdrop-blur-xl border-b border-white/20 shadow-sm transition-all duration-300">
        <div className="container mx-auto h-16 px-4 md:px-8 flex items-center justify-between">
          <Link href="/simulation">
            <div className="flex items-center gap-2 cursor-pointer group">
              <div className="w-9 h-9 bg-gradient-to-br from-primary to-cyan-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-primary/20 group-hover:shadow-primary/40 transition-all duration-300 transform group-hover:scale-105">
                <Video className="w-5 h-5" />
              </div>
              <span className="font-bold text-xl tracking-tight text-slate-900 group-hover:text-primary transition-colors">
                MDAI
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1 bg-slate-100/50 p-1 rounded-full border border-slate-200/50 backdrop-blur-sm">
            {navItems.map((link) => (
              <Link key={link.path} href={link.path}>
                <div 
                  className={`px-5 py-2 rounded-full text-sm font-medium transition-all cursor-pointer relative overflow-hidden ${
                    isActive(link.path) 
                      ? "bg-white text-primary shadow-sm" 
                      : "text-slate-600 hover:text-slate-900 hover:bg-white/50"
                  }`}
                >
                  <span className="relative z-10">{link.label}</span>
                  {isActive(link.path) && (
                    <motion.div
                      layoutId="activeTab"
                      className="absolute inset-0 bg-white rounded-full shadow-sm -z-0"
                      transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                </div>
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <div className="hidden md:flex items-center gap-2">
              <Button variant="ghost" size="icon" className="text-slate-600 hover:bg-slate-100 rounded-full transition-colors">
                <MessageSquare className="w-5 h-5" />
              </Button>
              <Link href="/booking">
                <Button className="shadow-lg shadow-primary/20 rounded-full px-6 hover:shadow-primary/40 transition-all hover:-translate-y-0.5">
                  <Calendar className="w-4 h-4 mr-2" />
                  <span>Randevu Al</span>
                </Button>
              </Link>
            </div>

            {/* Mobile Menu Toggle */}
            <Button 
              variant="ghost" 
              size="icon" 
              className="md:hidden text-slate-600"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </Button>
          </div>
        </div>
      </header>

      {/* Mobile Navigation Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-30 bg-white/95 backdrop-blur-xl pt-24 px-6 md:hidden flex flex-col gap-6"
          >
            <div className="flex flex-col gap-2">
              {navItems.map((link) => (
                <Link key={link.path} href={link.path}>
                  <div 
                    onClick={() => setMobileMenuOpen(false)}
                    className={`p-4 text-lg font-medium rounded-2xl transition-all ${
                      isActive(link.path) 
                        ? "bg-primary/10 text-primary" 
                        : "text-slate-600 hover:bg-slate-50"
                    }`}
                  >
                    {link.label}
                  </div>
                </Link>
              ))}
            </div>
            
            <div className="mt-auto mb-8 space-y-4">
              <Link href="/booking">
                <Button className="w-full py-6 text-lg shadow-lg shadow-primary/20 rounded-xl" onClick={() => setMobileMenuOpen(false)}>
                  <Calendar className="w-5 h-5 mr-2" />
                  Randevu Al
                </Button>
              </Link>
              <Button variant="outline" className="w-full py-6 text-lg rounded-xl" onClick={() => setMobileMenuOpen(false)}>
                <MessageSquare className="w-5 h-5 mr-2" />
                Destek
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

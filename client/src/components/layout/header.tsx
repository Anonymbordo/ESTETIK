import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Video, Calendar, MessageSquare, User } from "lucide-react";

export function Header() {
  const [location] = useLocation();

  const isActive = (path: string) => location === path;

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/70 backdrop-blur-xl border-b border-white/20 shadow-sm">
      <div className="container mx-auto h-16 px-4 md:px-8 flex items-center justify-between">
        <Link href="/">
          <div className="flex items-center gap-2 cursor-pointer group">
            <div className="w-9 h-9 bg-gradient-to-br from-primary to-cyan-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-primary/20 group-hover:shadow-primary/40 transition-all">
              <Video className="w-5 h-5" />
            </div>
            <span className="font-bold text-xl tracking-tight text-slate-900 group-hover:text-primary transition-colors">
              Rhinoplasty<span className="text-primary">AI</span>
            </span>
          </div>
        </Link>

        <nav className="hidden md:flex items-center gap-1 bg-slate-100/50 p-1 rounded-full border border-slate-200/50">
          {[
            { path: "/", label: "Simulation" },
            { path: "/gallery", label: "Gallery" },
            { path: "/specialists", label: "Specialists" }
          ].map((link) => (
            <Link key={link.path} href={link.path}>
              <div 
                className={`px-5 py-2 rounded-full text-sm font-medium transition-all cursor-pointer ${
                  isActive(link.path) 
                    ? "bg-white text-primary shadow-sm" 
                    : "text-slate-600 hover:text-slate-900 hover:bg-white/50"
                }`}
              >
                {link.label}
              </div>
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" className="text-slate-600 hover:bg-slate-100 rounded-full">
            <MessageSquare className="w-5 h-5" />
          </Button>
          <Button className="hidden sm:flex gap-2 shadow-lg shadow-primary/20 rounded-full px-6">
            <Calendar className="w-4 h-4" />
            <span>Book Consultation</span>
          </Button>
          <Button size="icon" variant="ghost" className="sm:hidden">
            <User className="w-5 h-5" />
          </Button>
        </div>
      </div>
    </header>
  );
}

import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Video, Calendar, MessageSquare, User } from "lucide-react";

export function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200 h-16">
      <div className="container mx-auto h-full px-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center text-white">
            <Video className="w-5 h-5" />
          </div>
          <span className="font-bold text-xl tracking-tight text-slate-900">Rhinoplasty<span className="text-primary">AI</span></span>
        </div>

        <nav className="hidden md:flex items-center gap-8">
          <Link href="/" className="text-sm font-medium text-slate-600 hover:text-primary transition-colors">Simulation</Link>
          <Link href="/gallery" className="text-sm font-medium text-slate-600 hover:text-primary transition-colors">Gallery</Link>
          <Link href="/specialists" className="text-sm font-medium text-slate-600 hover:text-primary transition-colors">Specialists</Link>
        </nav>

        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" className="text-slate-600">
            <MessageSquare className="w-5 h-5" />
          </Button>
          <Button variant="outline" className="hidden sm:flex gap-2 border-primary/20 text-primary hover:bg-primary/5">
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

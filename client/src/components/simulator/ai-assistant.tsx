import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Mic, MessageCircle, X, Send, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export function AIAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: 'assistant', text: "Merhaba! Ben Dr. AI. Size randevu planlamasında veya prosedürle ilgili sorularınızda yardımcı olabilirim." }
  ]);
  const [isListening, setIsListening] = useState(false);

  const toggleOpen = () => setIsOpen(!isOpen);

  return (
    <>
      {/* Floating Action Button */}
      <motion.div 
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        className="fixed bottom-6 right-6 z-50"
      >
        <Button 
          onClick={toggleOpen}
          size="icon" 
          className="h-14 w-14 rounded-full shadow-xl bg-gradient-to-br from-primary to-cyan-600 hover:shadow-2xl hover:scale-105 transition-all duration-300"
        >
          {isOpen ? <X className="w-6 h-6" /> : <MessageCircle className="w-6 h-6" />}
        </Button>
      </motion.div>

      {/* Chat Interface */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-24 right-6 z-50 w-80 md:w-96"
          >
            <Card className="overflow-hidden shadow-2xl border-primary/10 rounded-2xl">
              {/* Header */}
              <div className="bg-gradient-to-r from-primary to-cyan-600 p-4 text-white flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                    <Sparkles className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold text-sm">Estetik Asistanı</h3>
                    <p className="text-xs text-white/80 flex items-center gap-1">
                      <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse" />
                      Çevrimiçi
                    </p>
                  </div>
                </div>
              </div>

              {/* Chat Area */}
              <div className="h-80 bg-slate-50 p-4 overflow-y-auto space-y-4">
                {messages.map((msg, idx) => (
                  <div 
                    key={idx} 
                    className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div 
                      className={`max-w-[80%] p-3 rounded-2xl text-sm ${
                        msg.role === 'user' 
                          ? 'bg-primary text-white rounded-tr-none' 
                          : 'bg-white border border-slate-200 text-slate-700 rounded-tl-none shadow-sm'
                      }`}
                    >
                      {msg.text}
                    </div>
                  </div>
                ))}
                {isListening && (
                  <div className="flex justify-center my-4">
                    <div className="flex gap-1">
                      <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                      <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                      <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                    </div>
                  </div>
                )}
              </div>

              {/* Input Area */}
              <div className="p-3 bg-white border-t border-slate-100 flex items-center gap-2">
                <Button 
                  variant="ghost" 
                  size="icon"
                  className={`rounded-full ${isListening ? 'bg-red-50 text-red-500' : 'text-slate-400'}`}
                  onClick={() => setIsListening(!isListening)}
                >
                  <Mic className="w-5 h-5" />
                </Button>
                <input 
                  type="text" 
                  placeholder="Bir mesaj yazın..." 
                  className="flex-1 bg-slate-50 border-none rounded-full px-4 py-2 text-sm focus:ring-2 focus:ring-primary/20 outline-none"
                />
                <Button size="icon" variant="ghost" className="text-primary">
                  <Send className="w-5 h-5" />
                </Button>
              </div>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

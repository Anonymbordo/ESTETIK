import { Header } from "@/components/layout/header";
import { SimulatorEngine } from "@/components/simulator/simulator-engine";
import { AIAssistant } from "@/components/simulator/ai-assistant";
import { useState } from "react";
import { motion } from "framer-motion";

export default function Home() {
  const [snapshot, setSnapshot] = useState<string | null>(null);

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-slate-50 flex flex-col"
    >
      <Header />
      
      <main className="flex-1">
        <SimulatorEngine onSnapshot={setSnapshot} />
      </main>

      <AIAssistant />
    </motion.div>
  );
}

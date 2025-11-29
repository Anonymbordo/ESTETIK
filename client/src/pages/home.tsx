import { Header } from "@/components/layout/header";
import { SimulatorEngine } from "@/components/simulator/simulator-engine";
import { AIAssistant } from "@/components/simulator/ai-assistant";
import { useState } from "react";

export default function Home() {
  const [snapshot, setSnapshot] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <Header />
      
      <main className="flex-1">
        <SimulatorEngine onSnapshot={setSnapshot} />
      </main>

      <AIAssistant />
    </div>
  );
}

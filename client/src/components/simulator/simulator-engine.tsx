import { useState, useRef, useEffect } from "react";
import Webcam from "react-webcam";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Camera, RefreshCw, ChevronUp, ChevronDown, Maximize2, ScanFace, Wand2, Info, Sliders } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Drawer, DrawerContent, DrawerTrigger, DrawerHeader, DrawerTitle, DrawerDescription, DrawerFooter, DrawerClose } from "@/components/ui/drawer"; // Assuming drawer component exists or simulating sheet behavior

interface SimulatorProps {
  onSnapshot: (image: string) => void;
}

export function SimulatorEngine({ onSnapshot }: SimulatorProps) {
  const webcamRef = useRef<Webcam>(null);
  const [width, setWidth] = useState(0); 
  const [lift, setLift] = useState(0);   
  const [bridge, setBridge] = useState(0); 
  const [showMesh, setShowMesh] = useState(true);
  const [processing, setProcessing] = useState(false);
  const [activeControl, setActiveControl] = useState<'width' | 'lift' | 'bridge'>('width');

  // Filter Setup
  const filterId = "nose-warp";

  const handleCapture = () => {
    const imageSrc = webcamRef.current?.getScreenshot();
    if (imageSrc) {
      setProcessing(true);
      // Simulate shutter effect
      const shutter = document.createElement('div');
      shutter.className = "fixed inset-0 bg-white z-[60] pointer-events-none animate-out fade-out duration-500";
      document.body.appendChild(shutter);
      setTimeout(() => {
        shutter.remove();
        onSnapshot(imageSrc);
        setProcessing(false);
      }, 200);
    }
  };

  const reset = () => {
    setWidth(0);
    setLift(0);
    setBridge(0);
  };

  return (
    <div className="relative w-full h-[calc(100vh-4rem)] md:h-screen flex flex-col lg:flex-row bg-slate-50 overflow-hidden pt-16 md:pt-20 pb-16 md:pb-0">
      
      {/* Main Viewport (Webcam) */}
      <div className="flex-1 relative w-full h-full bg-black lg:rounded-3xl overflow-hidden shadow-2xl lg:m-8 lg:border-4 lg:border-white lg:ring-1 lg:ring-slate-200 group">
        <div className="absolute inset-0 flex items-center justify-center bg-slate-900">
          <Webcam
            ref={webcamRef}
            audio={false}
            screenshotFormat="image/jpeg"
            videoConstraints={{ facingMode: "user", aspectRatio: 0.75 }} // Portrait for mobile
            className="w-full h-full object-cover scale-x-[-1]" // Mirror effect
            style={{ filter: `url(#${filterId})` }}
          />
          
          {/* Mesh Overlay */}
          <AnimatePresence>
            {showMesh && (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.4 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 pointer-events-none flex items-center justify-center"
              >
                <svg viewBox="0 0 200 200" className="w-64 h-64 text-primary animate-pulse drop-shadow-[0_0_8px_rgba(14,165,233,0.5)]">
                  <path d="M100,40 C110,40 115,50 115,70 C115,90 110,100 100,105 C90,100 85,90 85,70 C85,50 90,40 100,40" fill="none" stroke="currentColor" strokeWidth="0.5" />
                  <path d="M100,40 L100,105" fill="none" stroke="currentColor" strokeWidth="0.5" strokeDasharray="2 2" />
                  {/* Tech Dots */}
                  <circle cx="100" cy="40" r="1.5" className="fill-white" />
                  <circle cx="100" cy="105" r="1.5" className="fill-white" />
                  <circle cx="115" cy="70" r="1.5" className="fill-white" />
                  <circle cx="85" cy="70" r="1.5" className="fill-white" />
                </svg>
                <div className="absolute inset-0 bg-[linear-gradient(to_bottom,transparent_0%,rgba(14,165,233,0.1)_50%,transparent_100%)] animate-[scan_3s_ease-in-out_infinite]" />
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Filter Logic */}
        <svg className="absolute w-0 h-0">
          <defs>
            <filter id={filterId}>
              <feTurbulence type="fractalNoise" baseFrequency={0.01 + (width * 0.0001)} numOctaves="1" result="noise" />
              <feDisplacementMap in="SourceGraphic" in2="noise" scale={width + bridge + lift} xChannelSelector="R" yChannelSelector="G" />
            </filter>
          </defs>
        </svg>

        {/* Mobile Floating Controls (Top Right) */}
        <div className="absolute top-4 right-4 flex flex-col gap-2 md:hidden z-20">
           <Button 
            variant="secondary" 
            size="icon" 
            onClick={() => setShowMesh(!showMesh)}
            className="rounded-full w-10 h-10 bg-black/40 backdrop-blur-md border border-white/10 text-white hover:bg-black/60"
          >
            <ScanFace className="w-5 h-5" />
          </Button>
          <Button 
            variant="secondary" 
            size="icon" 
            onClick={reset}
            className="rounded-full w-10 h-10 bg-black/40 backdrop-blur-md border border-white/10 text-white hover:bg-black/60"
          >
            <RefreshCw className="w-4 h-4" />
          </Button>
        </div>

        {/* Capture Button (Bottom Center) */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20">
          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-primary to-cyan-400 rounded-full blur opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-tilt"></div>
            <Button 
              variant="secondary" 
              size="icon" 
              onClick={handleCapture}
              className="relative rounded-full w-16 h-16 bg-white text-slate-900 hover:bg-slate-50 shadow-2xl border-4 border-white/50"
            >
              <Camera className="w-8 h-8" />
            </Button>
          </div>
        </div>
      </div>

      {/* Controls Panel - Desktop Sidebar / Mobile Bottom Sheet Style */}
      <div className="
        md:w-96 shrink-0 flex flex-col bg-white md:bg-white/80 md:backdrop-blur-lg md:border-l md:border-slate-200 shadow-xl z-30
        fixed bottom-16 left-0 right-0 md:static md:h-auto
        rounded-t-[2rem] md:rounded-none transition-transform duration-300 transform translate-y-0
        border-t border-slate-200/50 md:border-t-0
      ">
        {/* Mobile Handle */}
        <div className="w-12 h-1.5 bg-slate-200 rounded-full mx-auto mt-3 mb-1 md:hidden" />

        <div className="p-6 md:p-8 flex flex-col h-full">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-bold bg-gradient-to-r from-slate-900 to-slate-600 bg-clip-text text-transparent flex items-center gap-2">
              <Sliders className="w-4 h-4 text-primary" />
              Ayarlar
            </h2>
            <span className="text-[10px] font-mono bg-primary/10 text-primary px-2 py-1 rounded-full">v2.1 AI</span>
          </div>

          <div className="space-y-8 flex-1 overflow-y-auto pb-20 md:pb-0 pr-2 md:pr-0">
            
            {/* Control Items - Enhanced for Mobile Touch */}
            {[
              { id: 'width', label: 'Burun Genişliği', icon: Maximize2, val: width, set: setWidth, minLabel: 'Dar', maxLabel: 'Geniş' },
              { id: 'lift', label: 'Burun Ucu', icon: ChevronUp, val: lift, set: setLift, minLabel: 'Düşük', maxLabel: 'Kalkık' },
              { id: 'bridge', label: 'Kemer', icon: Wand2, val: bridge, set: setBridge, minLabel: 'Düz', maxLabel: 'Kemerli' },
            ].map((control) => (
              <div key={control.id} className="space-y-3 touch-manipulation">
                <div className="flex justify-between items-center">
                  <label className={`text-sm font-semibold flex items-center gap-2 transition-colors ${activeControl === control.id ? 'text-primary' : 'text-slate-600'}`}>
                    <div className={`p-1.5 rounded-lg ${activeControl === control.id ? 'bg-primary text-white' : 'bg-slate-100 text-slate-500'}`}>
                      <control.icon className="w-3.5 h-3.5" />
                    </div>
                    {control.label}
                  </label>
                  <span className="text-xs font-mono font-medium text-slate-400 w-8 text-right">
                    {control.val > 0 ? '+' : ''}{control.val}
                  </span>
                </div>
                
                <div className="relative h-8 flex items-center">
                   <Slider 
                    defaultValue={[0]} 
                    max={50} 
                    min={-50} 
                    step={1} 
                    value={[control.val]}
                    onValueChange={(vals) => {
                      control.set(vals[0]);
                      setActiveControl(control.id as any);
                    }}
                    className="cursor-grab active:cursor-grabbing"
                  />
                </div>
                
                <div className="flex justify-between text-[10px] font-medium text-slate-400 uppercase tracking-wider px-1">
                  <span>{control.minLabel}</span>
                  <span>{control.maxLabel}</span>
                </div>
              </div>
            ))}

            {/* Info Card */}
            <div className="bg-blue-50/50 border border-blue-100 rounded-xl p-4 flex gap-3">
              <Info className="w-5 h-5 text-blue-500 shrink-0" />
              <p className="text-xs text-slate-600 leading-relaxed">
                Değişiklikler <span className="font-semibold text-slate-900">gerçek zamanlı</span> olarak işlenir. Simülasyonu kaydetmek için kamera butonuna basınız.
              </p>
            </div>
          </div>

          <div className="hidden md:block mt-4 pt-6 border-t border-slate-100">
            <Button className="w-full py-6 text-lg shadow-lg shadow-primary/20">
              Rapor Oluştur
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

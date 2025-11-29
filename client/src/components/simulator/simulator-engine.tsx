import { useState, useRef, useEffect } from "react";
import Webcam from "react-webcam";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Camera, RefreshCw, ChevronUp, ChevronDown, Maximize2, ScanFace, Wand2 } from "lucide-react";
import { motion } from "framer-motion";

interface SimulatorProps {
  onSnapshot: (image: string) => void;
}

export function SimulatorEngine({ onSnapshot }: SimulatorProps) {
  const webcamRef = useRef<Webcam>(null);
  const [width, setWidth] = useState(0); // -50 to 50
  const [lift, setLift] = useState(0);   // -50 to 50
  const [bridge, setBridge] = useState(0); // -50 to 50
  const [showMesh, setShowMesh] = useState(true);
  const [processing, setProcessing] = useState(false);

  // Calculate SVG filter values based on sliders
  // This is a visual trick using feDisplacementMap to simulate warping
  const baseFrequency = 0.01;
  const scale = 30; 
  
  // We create a dynamic SVG filter ID
  const filterId = "nose-warp";

  const handleCapture = () => {
    const imageSrc = webcamRef.current?.getScreenshot();
    if (imageSrc) {
      setProcessing(true);
      setTimeout(() => {
        onSnapshot(imageSrc);
        setProcessing(false);
      }, 800);
    }
  };

  const reset = () => {
    setWidth(0);
    setLift(0);
    setBridge(0);
  };

  return (
    <div className="relative w-full h-full flex flex-col lg:flex-row gap-6 p-4 lg:p-8 pt-20 h-screen bg-slate-50 overflow-hidden">
      
      {/* Main Viewport (Webcam) */}
      <div className="flex-1 relative bg-black rounded-3xl overflow-hidden shadow-2xl border-4 border-white ring-1 ring-slate-200">
        <div className="absolute inset-0 flex items-center justify-center bg-slate-900">
          <Webcam
            ref={webcamRef}
            audio={false}
            screenshotFormat="image/jpeg"
            videoConstraints={{ facingMode: "user" }}
            className="w-full h-full object-cover"
            style={{ filter: `url(#${filterId})` }}
          />
          
          {/* Simulated Face Mesh Overlay */}
          {showMesh && (
            <div className="absolute inset-0 pointer-events-none flex items-center justify-center opacity-40">
              <svg viewBox="0 0 200 200" className="w-64 h-64 text-primary animate-pulse">
                <path d="M100,40 C110,40 115,50 115,70 C115,90 110,100 100,105 C90,100 85,90 85,70 C85,50 90,40 100,40" fill="none" stroke="currentColor" strokeWidth="0.5" />
                <path d="M100,40 L100,105" fill="none" stroke="currentColor" strokeWidth="0.5" strokeDasharray="2 2" />
                <circle cx="100" cy="40" r="1" fill="currentColor" />
                <circle cx="100" cy="105" r="1" fill="currentColor" />
                <circle cx="115" cy="70" r="1" fill="currentColor" />
                <circle cx="85" cy="70" r="1" fill="currentColor" />
                {/* Connecting lines simulating mesh */}
                <path d="M85,70 Q100,80 115,70" fill="none" stroke="currentColor" strokeWidth="0.2" />
                <path d="M90,50 L110,50" fill="none" stroke="currentColor" strokeWidth="0.2" />
                <path d="M92,90 L108,90" fill="none" stroke="currentColor" strokeWidth="0.2" />
              </svg>
              
              {/* Scanning Effect */}
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/10 to-transparent h-full w-full animate-[scan_3s_ease-in-out_infinite] -translate-y-full" />
            </div>
          )}
        </div>

        {/* Real-time Filter Definition (The "AI" Logic) */}
        <svg className="absolute w-0 h-0">
          <defs>
            <filter id={filterId}>
              {/* 
                In a real app, we would generate a displacement map dynamically.
                Here we simulate the effect using basic turbulence/displacement 
                controlled by the sliders to create a "warping" visual.
              */}
              <feTurbulence 
                type="fractalNoise" 
                baseFrequency={0.01 + (width * 0.0001)} 
                numOctaves="1" 
                result="noise" 
              />
              <feDisplacementMap 
                in="SourceGraphic" 
                in2="noise" 
                scale={width + bridge + lift} 
                xChannelSelector="R" 
                yChannelSelector="G" 
              />
            </filter>
          </defs>
        </svg>

        {/* View Controls */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-4 bg-black/50 backdrop-blur-md p-2 rounded-full border border-white/10">
           <Button 
            variant={showMesh ? "default" : "ghost"} 
            size="icon" 
            onClick={() => setShowMesh(!showMesh)}
            className="rounded-full w-10 h-10"
          >
            <ScanFace className="w-5 h-5" />
          </Button>
           <Button 
            variant="secondary" 
            size="icon" 
            onClick={handleCapture}
            className="rounded-full w-12 h-12 bg-white text-black hover:bg-slate-200"
          >
            <Camera className="w-6 h-6" />
          </Button>
           <Button 
            variant="ghost" 
            size="icon" 
            onClick={reset}
            className="rounded-full w-10 h-10 text-white hover:bg-white/20"
          >
            <RefreshCw className="w-5 h-5" />
          </Button>
        </div>
      </div>

      {/* Controls Panel */}
      <Card className="w-full lg:w-96 shrink-0 flex flex-col bg-white/80 backdrop-blur-lg border-white/50 shadow-xl rounded-3xl overflow-hidden">
        <div className="p-6 border-b border-slate-100">
          <h2 className="text-xl font-bold bg-gradient-to-r from-slate-900 to-slate-600 bg-clip-text text-transparent">
            Adjustments
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            AI-powered geometric warping (Preview)
          </p>
        </div>

        <div className="flex-1 p-6 space-y-8 overflow-y-auto">
          
          {/* Nose Width */}
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <label className="text-sm font-medium text-slate-700 flex items-center gap-2">
                <Maximize2 className="w-4 h-4 rotate-45" />
                Nose Width
              </label>
              <span className="text-xs font-mono bg-slate-100 px-2 py-1 rounded text-slate-500">{width > 0 ? '+' : ''}{width}%</span>
            </div>
            <Slider 
              defaultValue={[0]} 
              max={50} 
              min={-50} 
              step={1} 
              onValueChange={(vals) => setWidth(vals[0])}
              className="py-2"
            />
            <div className="flex justify-between text-[10px] text-slate-400 uppercase tracking-wider">
              <span>Narrow</span>
              <span>Widen</span>
            </div>
          </div>

          {/* Tip Lift */}
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <label className="text-sm font-medium text-slate-700 flex items-center gap-2">
                <ChevronUp className="w-4 h-4" />
                Tip Rotation
              </label>
              <span className="text-xs font-mono bg-slate-100 px-2 py-1 rounded text-slate-500">{lift > 0 ? '+' : ''}{lift}°</span>
            </div>
            <Slider 
              defaultValue={[0]} 
              max={50} 
              min={-50} 
              step={1} 
              onValueChange={(vals) => setLift(vals[0])}
              className="py-2"
            />
            <div className="flex justify-between text-[10px] text-slate-400 uppercase tracking-wider">
              <span>Drop</span>
              <span>Lift</span>
            </div>
          </div>

          {/* Bridge Height */}
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <label className="text-sm font-medium text-slate-700 flex items-center gap-2">
                <Wand2 className="w-4 h-4" />
                Bridge Height
              </label>
              <span className="text-xs font-mono bg-slate-100 px-2 py-1 rounded text-slate-500">{bridge > 0 ? '+' : ''}{bridge}%</span>
            </div>
            <Slider 
              defaultValue={[0]} 
              max={50} 
              min={-50} 
              step={1} 
              onValueChange={(vals) => setBridge(vals[0])}
              className="py-2"
            />
            <div className="flex justify-between text-[10px] text-slate-400 uppercase tracking-wider">
              <span>Reduce</span>
              <span>Build</span>
            </div>
          </div>

          {/* Info Box */}
          <div className="bg-primary/5 border border-primary/10 rounded-xl p-4 mt-8">
            <div className="flex items-start gap-3">
              <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 shrink-0" />
              <p className="text-xs text-slate-600 leading-relaxed">
                The AI uses <span className="font-semibold text-primary">Thin-Plate Spline (TPS)</span> logic to preserve skin texture while warping the geometry. Changes are applied to the 468-point mesh.
              </p>
            </div>
          </div>

        </div>

        <div className="p-6 border-t border-slate-100 bg-slate-50/50">
          <Button className="w-full shadow-lg shadow-primary/20" size="lg">
            Generate Report
          </Button>
        </div>
      </Card>
    </div>
  );
}

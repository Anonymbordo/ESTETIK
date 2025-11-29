import { useState, useRef, useCallback, useEffect } from "react";
import Webcam from "react-webcam";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Camera, RefreshCw, ChevronUp, Maximize2, ScanFace, Wand2, Info, Sliders, Image as ImageIcon, Loader2, Download, Share2, Check, Move } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface SimulatorProps {
  onSnapshot: (image: string) => void;
}

// Initial positions for the mesh points (relative to 200x200 viewBox)
const INITIAL_POINTS = {
  bridgeTop: { x: 100, y: 40 },
  bridgeMid: { x: 100, y: 70 },
  tip: { x: 100, y: 105 },
  leftAla: { x: 85, y: 85 },
  rightAla: { x: 115, y: 85 },
};

export function SimulatorEngine({ onSnapshot }: SimulatorProps) {
  const webcamRef = useRef<Webcam>(null);
  const [mode, setMode] = useState<'live' | 'photo'>('live');
  
  // Simulation State
  const [width, setWidth] = useState(0); 
  const [lift, setLift] = useState(0);   
  const [bridge, setBridge] = useState(0); 
  const [showMesh, setShowMesh] = useState(true);
  
  // Interactive Points State
  const [points, setPoints] = useState(INITIAL_POINTS);
  const [draggedPoint, setDraggedPoint] = useState<string | null>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  
  // Process State
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedResult, setGeneratedResult] = useState<string | null>(null);
  
  const [activeControl, setActiveControl] = useState<'width' | 'lift' | 'bridge'>('width');

  // Filter Setup
  const filterId = "nose-warp";

  // Update points when sliders change (bi-directional binding)
  useEffect(() => {
    if (draggedPoint) return; // Don't update from sliders while dragging

    setPoints(prev => ({
      ...prev,
      // Width affects side points
      leftAla: { x: INITIAL_POINTS.leftAla.x - (width * 0.2), y: INITIAL_POINTS.leftAla.y },
      rightAla: { x: INITIAL_POINTS.rightAla.x + (width * 0.2), y: INITIAL_POINTS.rightAla.y },
      // Lift affects tip y
      tip: { x: INITIAL_POINTS.tip.x, y: INITIAL_POINTS.tip.y - (lift * 0.3) },
      // Bridge affects bridge mid point (simulating bump reduction/increase)
      bridgeMid: { x: INITIAL_POINTS.bridgeMid.x, y: INITIAL_POINTS.bridgeMid.y - (bridge * 0.1) } // Simplified visual
    }));
  }, [width, lift, bridge, draggedPoint]);

  const handleCapture = useCallback(() => {
    const imageSrc = webcamRef.current?.getScreenshot();
    if (imageSrc) {
      const shutter = document.createElement('div');
      shutter.className = "fixed inset-0 bg-white z-[60] pointer-events-none animate-out fade-out duration-500";
      document.body.appendChild(shutter);
      setTimeout(() => shutter.remove(), 500);

      if (mode === 'photo') {
        setCapturedImage(imageSrc);
        resetSliders();
      } else {
        setCapturedImage(imageSrc);
        startGeneration();
      }
    }
  }, [mode, webcamRef]);

  const startGeneration = () => {
    setIsGenerating(true);
    setTimeout(() => {
      setIsGenerating(false);
      setGeneratedResult(capturedImage || "result"); 
      onSnapshot(capturedImage || "");
    }, 3000);
  };

  const resetSliders = () => {
    setWidth(0);
    setLift(0);
    setBridge(0);
    setPoints(INITIAL_POINTS);
  };

  const resetAll = () => {
    setCapturedImage(null);
    setGeneratedResult(null);
    setIsGenerating(false);
    resetSliders();
  };

  // --- Drag Logic ---
  const handlePointerDown = (pointId: string, e: React.PointerEvent) => {
    e.stopPropagation();
    // @ts-ignore
    e.target.setPointerCapture(e.pointerId);
    setDraggedPoint(pointId);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!draggedPoint || !svgRef.current) return;

    const svgRect = svgRef.current.getBoundingClientRect();
    // Convert client coordinates to SVG coordinates (viewBox 0 0 200 200)
    const scaleX = 200 / svgRect.width;
    const scaleY = 200 / svgRect.height;
    
    const x = (e.clientX - svgRect.left) * scaleX;
    const y = (e.clientY - svgRect.top) * scaleY;

    // Update point position locally
    setPoints(prev => ({
      ...prev,
      [draggedPoint]: { x, y }
    }));

    // Update sliders based on point movement (Inverse kinematics-ish)
    if (draggedPoint === 'tip') {
      // Calculate lift based on Y difference
      const diffY = INITIAL_POINTS.tip.y - y;
      setLift(Math.max(-50, Math.min(50, diffY / 0.3)));
    } else if (draggedPoint === 'rightAla') {
      // Calculate width based on X difference
      const diffX = x - INITIAL_POINTS.rightAla.x;
      setWidth(Math.max(-50, Math.min(50, diffX / 0.2)));
    } else if (draggedPoint === 'leftAla') {
       // Calculate width based on X difference (mirrored)
      const diffX = INITIAL_POINTS.leftAla.x - x;
      setWidth(Math.max(-50, Math.min(50, diffX / 0.2)));
    } else if (draggedPoint === 'bridgeTop' || draggedPoint === 'bridgeMid') {
       // Simple bridge adjustment
       const diffY = INITIAL_POINTS.bridgeMid.y - y;
       setBridge(Math.max(-50, Math.min(50, diffY / 0.1)));
    }
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    setDraggedPoint(null);
    // @ts-ignore
    e.target.releasePointerCapture(e.pointerId);
  };


  const WarpFilter = () => (
    <svg className="absolute w-0 h-0">
      <defs>
        <filter id={filterId}>
          <feTurbulence type="fractalNoise" baseFrequency={0.01 + (width * 0.0001)} numOctaves="1" result="noise" />
          <feDisplacementMap in="SourceGraphic" in2="noise" scale={width + bridge + lift} xChannelSelector="R" yChannelSelector="G" />
        </filter>
      </defs>
    </svg>
  );

  // Mask Overlay to isolate the effect
  const NoseMask = () => {
      // Calculate mask position based on points
      const minX = Math.min(points.leftAla.x, points.bridgeTop.x) - 20;
      const maxX = Math.max(points.rightAla.x, points.bridgeTop.x) + 20;
      const minY = points.bridgeTop.y - 20;
      const maxY = points.tip.y + 20;

      // Convert SVG coordinates (0-200) to percentage (0-100%)
      const left = (minX / 200) * 100;
      const top = (minY / 200) * 100;
      const w = ((maxX - minX) / 200) * 100;
      const h = ((maxY - minY) / 200) * 100;

      return (
          <div 
            className="absolute pointer-events-none rounded-[50%]"
            style={{
                top: `${top}%`,
                left: `${left}%`,
                width: `${w}%`,
                height: `${h}%`,
                backdropFilter: `url(#${filterId})`,
                WebkitBackdropFilter: `url(#${filterId})`,
                maskImage: 'radial-gradient(ellipse at center, black 40%, transparent 70%)',
                WebkitMaskImage: 'radial-gradient(ellipse at center, black 40%, transparent 70%)',
                zIndex: 10
            }}
          />
      )
  }

  const Controls = () => (
    <div className="space-y-6">
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
                {control.val > 0 ? '+' : ''}{Math.round(control.val)}
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
    </div>
  );

  // Result View
  if (generatedResult) {
    return (
      <div className="w-full h-[calc(100vh-4rem)] md:h-screen flex flex-col items-center justify-center bg-slate-900 p-6 pt-24">
        <motion.div 
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="relative max-w-md w-full aspect-[3/4] bg-black rounded-3xl overflow-hidden shadow-2xl border border-white/10"
        >
          <img 
            src={capturedImage!} 
            alt="Result" 
            className="w-full h-full object-cover"
          />
          
          {/* Apply mask on result too */}
          <WarpFilter />
          <NoseMask />
          
          <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/90 to-transparent z-20">
            <div className="flex gap-3">
              <Button onClick={resetAll} variant="outline" className="flex-1 border-white/20 text-white hover:bg-white/10 bg-white/5 backdrop-blur-sm">
                <RefreshCw className="w-4 h-4 mr-2" /> Yeni
              </Button>
              <Button className="flex-1 bg-primary text-white shadow-lg shadow-primary/30">
                <Download className="w-4 h-4 mr-2" /> Kaydet
              </Button>
            </div>
          </div>

          <div className="absolute top-4 right-4 bg-green-500/20 backdrop-blur-md text-green-400 px-3 py-1 rounded-full text-xs font-bold border border-green-500/30 flex items-center gap-1 z-20">
            <Check className="w-3 h-3" /> AI ANALİZİ TAMAMLANDI
          </div>
        </motion.div>
      </div>
    );
  }

  // Loading View
  if (isGenerating) {
    return (
      <div className="w-full h-[calc(100vh-4rem)] md:h-screen flex flex-col items-center justify-center bg-slate-50 pt-20">
        <div className="relative">
          <div className="w-24 h-24 rounded-full border-4 border-slate-100 border-t-primary animate-spin" />
          <div className="absolute inset-0 flex items-center justify-center">
             <Wand2 className="w-8 h-8 text-primary animate-pulse" />
          </div>
        </div>
        <h2 className="mt-8 text-xl font-bold text-slate-900">AI Model Oluşturuluyor</h2>
        <p className="text-slate-500 mt-2 text-sm animate-pulse">Yüz geometrisi analiz ediliyor...</p>
      </div>
    );
  }

  return (
    <div className="relative w-full h-[calc(100vh-4rem)] md:h-screen flex flex-col lg:flex-row bg-slate-50 overflow-hidden pt-16 md:pt-20 pb-0">
      <WarpFilter />
      
      {/* Mode Switcher */}
      <div className="absolute top-20 md:top-24 left-0 right-0 z-30 flex justify-center px-4 pointer-events-none">
        <div className="bg-white/90 backdrop-blur-md p-1.5 rounded-2xl shadow-lg border border-white/20 pointer-events-auto inline-flex">
          <button
            onClick={() => { setMode('live'); resetSliders(); setCapturedImage(null); }}
            className={`px-4 py-2 rounded-xl text-xs md:text-sm font-bold transition-all ${
              mode === 'live' 
                ? 'bg-primary text-white shadow-md' 
                : 'text-slate-500 hover:bg-slate-50'
            }`}
          >
            Canlı Ayarla
          </button>
          <button
            onClick={() => { setMode('photo'); resetSliders(); setCapturedImage(null); }}
            className={`px-4 py-2 rounded-xl text-xs md:text-sm font-bold transition-all ${
              mode === 'photo' 
                ? 'bg-primary text-white shadow-md' 
                : 'text-slate-500 hover:bg-slate-50'
            }`}
          >
            Fotoğraftan Ayarla
          </button>
        </div>
      </div>
      
      {/* Main Viewport */}
      <div className="flex-1 relative w-full h-full bg-black lg:rounded-3xl overflow-hidden shadow-2xl lg:m-8 lg:border-4 lg:border-white lg:ring-1 lg:ring-slate-200 group">
        <div className="absolute inset-0 flex items-center justify-center bg-slate-900">
          {capturedImage && mode === 'photo' ? (
            <img 
              src={capturedImage} 
              alt="Captured" 
              className="w-full h-full object-cover scale-x-[-1]"
              // style={{ filter: `url(#${filterId})` }} // REMOVED GLOBAL FILTER
            />
          ) : (
            <Webcam
              ref={webcamRef}
              audio={false}
              screenshotFormat="image/jpeg"
              videoConstraints={{ facingMode: "user", aspectRatio: 0.75 }}
              className="w-full h-full object-cover scale-x-[-1]"
              // style={{ filter: mode === 'live' ? `url(#${filterId})` : 'none' }} // REMOVED GLOBAL FILTER
            />
          )}

          {/* 
            ISOLATED NOSE EFFECT
            This overlays the warping filter ONLY on the nose area defined by the points.
          */}
          <NoseMask />
          
          {/* Interactive Mesh Overlay */}
          <AnimatePresence>
            {showMesh && !generatedResult && (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 flex items-center justify-center z-20"
              >
                 <svg 
                    ref={svgRef}
                    viewBox="0 0 200 200" 
                    className="w-64 h-64 drop-shadow-[0_0_8px_rgba(14,165,233,0.5)] touch-none"
                    onPointerMove={handlePointerMove}
                    onPointerUp={handlePointerUp}
                    onPointerLeave={handlePointerUp}
                 >
                  {/* Connecting Lines */}
                  <path 
                    d={`M${points.bridgeTop.x},${points.bridgeTop.y} L${points.bridgeMid.x},${points.bridgeMid.y} L${points.tip.x},${points.tip.y}`} 
                    fill="none" stroke="rgba(14,165,233,0.5)" strokeWidth="1" 
                  />
                  <path 
                    d={`M${points.leftAla.x},${points.leftAla.y} Q${points.tip.x},${points.tip.y+10} ${points.rightAla.x},${points.rightAla.y}`} 
                    fill="none" stroke="rgba(14,165,233,0.5)" strokeWidth="1" 
                  />
                  <path 
                    d={`M${points.bridgeTop.x},${points.bridgeTop.y} L${points.leftAla.x},${points.leftAla.y}`} 
                    fill="none" stroke="rgba(14,165,233,0.3)" strokeWidth="0.5" strokeDasharray="2 2"
                  />
                   <path 
                    d={`M${points.bridgeTop.x},${points.bridgeTop.y} L${points.rightAla.x},${points.rightAla.y}`} 
                    fill="none" stroke="rgba(14,165,233,0.3)" strokeWidth="0.5" strokeDasharray="2 2"
                  />

                  {/* Interactive Points */}
                  {Object.entries(points).map(([key, p]) => (
                    <circle 
                      key={key}
                      cx={p.x} 
                      cy={p.y} 
                      r={draggedPoint === key ? 6 : 4} 
                      className={`
                        cursor-grab active:cursor-grabbing transition-all duration-200
                        ${draggedPoint === key ? 'fill-white stroke-primary stroke-[3px]' : 'fill-white/80 stroke-transparent hover:fill-white hover:stroke-primary/50 hover:stroke-2'}
                      `}
                      onPointerDown={(e) => handlePointerDown(key, e)}
                    />
                  ))}
                </svg>
                
                {/* Helper Text (only shows initially) */}
                 <div className="absolute bottom-4 left-0 right-0 text-center pointer-events-none opacity-0 animate-[fadeIn_1s_ease-in_2s_forwards]">
                   <span className="bg-black/50 text-white text-[10px] px-2 py-1 rounded-full backdrop-blur-md">
                     Noktaları sürükleyerek düzenleyin
                   </span>
                 </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Action Buttons */}
        <div className="absolute bottom-32 md:bottom-8 left-1/2 -translate-x-1/2 z-20 flex items-center gap-4">
          {mode === 'photo' && capturedImage ? (
             <>
               <Button variant="secondary" size="icon" onClick={() => setCapturedImage(null)} className="rounded-full w-12 h-12 bg-white/20 backdrop-blur-md text-white hover:bg-white/40 border border-white/20">
                 <RefreshCw className="w-5 h-5" />
               </Button>
               <Button onClick={startGeneration} className="rounded-full px-8 h-12 bg-gradient-to-r from-primary to-cyan-500 text-white shadow-xl shadow-cyan-500/30 font-bold">
                 <Wand2 className="w-4 h-4 mr-2" />
                 AI Oluştur
               </Button>
             </>
          ) : (
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
          )}
        </div>
        
        {/* Mobile Control Toggle (Only show mesh toggle) */}
        <div className="absolute top-4 right-4 flex flex-col gap-2 md:hidden z-20">
           <Button 
            variant="secondary" 
            size="icon" 
            onClick={() => setShowMesh(!showMesh)}
            className="rounded-full w-10 h-10 bg-black/40 backdrop-blur-md border border-white/10 text-white hover:bg-black/60"
          >
            <ScanFace className="w-5 h-5" />
          </Button>
        </div>
      </div>

      {/* Controls Panel - Sidebar / Bottom Sheet */}
      <div className="
        md:w-96 shrink-0 flex flex-col bg-white md:bg-white/80 md:backdrop-blur-lg md:border-l md:border-slate-200 shadow-[0_-10px_40px_rgba(0,0,0,0.1)] z-30
        fixed bottom-16 left-0 right-0 md:static md:h-auto
        rounded-t-[2rem] md:rounded-none transition-transform duration-300
        border-t border-slate-200/50 md:border-t-0
        max-h-[45vh] md:max-h-none
      ">
        {/* Mobile Handle */}
        <div className="w-12 h-1.5 bg-slate-200 rounded-full mx-auto mt-3 mb-1 md:hidden" />

        <div className="p-6 md:p-8 flex flex-col h-full overflow-hidden">
          <div className="flex items-center justify-between mb-6 shrink-0">
            <h2 className="text-lg font-bold bg-gradient-to-r from-slate-900 to-slate-600 bg-clip-text text-transparent flex items-center gap-2">
              <Sliders className="w-4 h-4 text-primary" />
              Ayarlar
            </h2>
            {mode === 'live' && <span className="text-[10px] font-bold bg-green-100 text-green-700 px-2 py-1 rounded-full flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"/> CANLI</span>}
            {mode === 'photo' && <span className="text-[10px] font-bold bg-blue-100 text-blue-700 px-2 py-1 rounded-full flex items-center gap-1"><ImageIcon className="w-3 h-3"/> FOTO</span>}
          </div>

          {/* Only show controls if:
              1. Mode is LIVE
              2. Mode is PHOTO AND we have a captured image
          */}
          {(mode === 'live' || (mode === 'photo' && capturedImage)) ? (
             <div className="flex-1 overflow-y-auto pb-8 md:pb-0 pr-2 md:pr-0 space-y-6">
               <Controls />
               
               <div className="bg-blue-50/50 border border-blue-100 rounded-xl p-3 flex gap-3 shrink-0">
                  <Info className="w-4 h-4 text-blue-500 shrink-0 mt-0.5" />
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {mode === 'live' 
                      ? "Değişiklikler canlı yayında uygulanır. Noktaları sürükleyerek veya slider ile düzenleyin." 
                      : "Fotoğraf üzerindeki noktaları düzenleyin ve 'AI Oluştur' ile sonucu alın."}
                  </p>
               </div>
             </div>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center text-center space-y-3 pb-8 text-slate-400">
              <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center">
                <Camera className="w-8 h-8 text-slate-300" />
              </div>
              <p className="text-sm font-medium">Düzenlemeye başlamak için<br/>önce fotoğraf çekin.</p>
            </div>
          )}

          <div className="hidden md:block mt-4 pt-6 border-t border-slate-100 shrink-0">
            <Button className="w-full py-6 text-lg shadow-lg shadow-primary/20" disabled={!capturedImage && mode === 'photo'} onClick={mode === 'photo' && capturedImage ? startGeneration : handleCapture}>
              {mode === 'live' ? 'Rapor Oluştur' : 'Sonucu Gör'}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

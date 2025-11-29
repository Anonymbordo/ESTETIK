import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { MoveHorizontal } from "lucide-react";

interface ComparisonSliderProps {
  beforeImage: string;
  afterImage: string;
  className?: string;
}

export function ComparisonSlider({ beforeImage, afterImage, className = "" }: ComparisonSliderProps) {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMove = (event: React.MouseEvent | React.TouchEvent) => {
    if (!isDragging || !containerRef.current) return;

    const containerRect = containerRef.current.getBoundingClientRect();
    const clientX = 'touches' in event ? event.touches[0].clientX : (event as React.MouseEvent).clientX;
    
    const position = ((clientX - containerRect.left) / containerRect.width) * 100;
    setSliderPosition(Math.min(Math.max(position, 0), 100));
  };

  return (
    <div 
      className={`relative w-full aspect-[3/4] md:aspect-[4/3] overflow-hidden rounded-2xl select-none cursor-ew-resize group ${className}`}
      ref={containerRef}
      onMouseDown={() => setIsDragging(true)}
      onMouseUp={() => setIsDragging(false)}
      onMouseLeave={() => setIsDragging(false)}
      onTouchStart={() => setIsDragging(true)}
      onTouchEnd={() => setIsDragging(false)}
      onMouseMove={handleMove}
      onTouchMove={handleMove}
    >
      {/* After Image (Background) */}
      <img 
        src={afterImage} 
        alt="After" 
        className="absolute top-0 left-0 w-full h-full object-cover pointer-events-none"
      />
      
      {/* Before Image (Clipped) */}
      <div 
        className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none"
        style={{ width: `${sliderPosition}%` }}
      >
        <img 
          src={beforeImage} 
          alt="Before" 
          className="absolute top-0 left-0 w-full h-full max-w-none object-cover"
          style={{ width: containerRef.current ? containerRef.current.offsetWidth : '100%' }} 
        />
        
        {/* Label Overlay */}
        <div className="absolute top-4 left-4 bg-black/30 backdrop-blur-md text-white text-xs font-bold px-3 py-1 rounded-full border border-white/20">
          BEFORE
        </div>
      </div>

      {/* Label Overlay for After */}
      <div className="absolute top-4 right-4 bg-primary/80 backdrop-blur-md text-white text-xs font-bold px-3 py-1 rounded-full border border-white/20 pointer-events-none">
        AFTER
      </div>

      {/* Slider Handle */}
      <div 
        className="absolute top-0 bottom-0 w-1 bg-white cursor-ew-resize z-10 shadow-[0_0_15px_rgba(0,0,0,0.3)]"
        style={{ left: `${sliderPosition}%` }}
      >
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center text-primary transition-transform group-hover:scale-110">
          <MoveHorizontal className="w-5 h-5" />
        </div>
      </div>
    </div>
  );
}

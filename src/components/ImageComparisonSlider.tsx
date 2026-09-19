import { useState, useRef, useCallback } from "react";
import { motion } from "framer-motion";

interface ImageComparisonSliderProps {
  beforeImage: string;
  afterImage: string;
  beforeLabel?: string;
  afterLabel?: string;
  beforeAlt: string;
  afterAlt: string;
}

const ImageComparisonSlider = ({
  beforeImage,
  afterImage,
  beforeLabel = "Before",
  afterLabel = "After",
  beforeAlt,
  afterAlt,
}: ImageComparisonSliderProps) => {
  const [sliderPosition, setSliderPosition] = useState(52);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMove = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percentage = Math.min(Math.max((x / rect.width) * 100, 0), 100);
    setSliderPosition(percentage);
  }, []);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!isDragging) return;
    handleMove(e.clientX);
  }, [isDragging, handleMove]);

  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    handleMove(e.touches[0].clientX);
  }, [handleMove]);

  return (
    <div
      ref={containerRef}
      className="relative w-full aspect-[4/2.85] overflow-hidden rounded-[1.5rem] select-none shadow-xl border border-white/40 bg-stone-100 cursor-ew-resize group"
      onMouseMove={handleMouseMove}
      onMouseDown={() => setIsDragging(true)}
      onMouseUp={() => setIsDragging(false)}
      onMouseLeave={() => setIsDragging(false)}
      onTouchMove={handleTouchMove}
      onTouchStart={() => setIsDragging(true)}
      onTouchEnd={() => setIsDragging(false)}
    >
      <img src={afterImage} alt={afterAlt} className="absolute inset-0 w-full h-full object-cover" draggable={false} />
      <div className="absolute inset-0 bg-gradient-to-t from-primary/15 via-transparent to-transparent pointer-events-none" />

      <div className="absolute inset-0 overflow-hidden" style={{ width: `${sliderPosition}%` }}>
        <img
          src={beforeImage}
          alt={beforeAlt}
          className="absolute inset-0 w-full h-full object-cover"
          style={{ width: containerRef.current?.offsetWidth || "100%", maxWidth: "none" }}
          draggable={false}
        />
        <div className="absolute inset-0 bg-primary/8 backdrop-grayscale-[0.15]" />
      </div>

      <div
        className="absolute top-0 bottom-0 w-[2px] bg-white shadow-[0_0_12px_hsl(0_0%_100%/0.9)] z-10"
        style={{ left: `${sliderPosition}%`, transform: "translateX(-50%)" }}
      >
        <motion.div
          animate={{ scale: isDragging ? 1.1 : 1 }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[44px] h-[44px] bg-white rounded-full flex items-center justify-center shadow-[0_8px_20px_hsl(215_66%_14%/0.18)] border border-border"
        >
          <div className="flex items-center gap-1">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M9 3L4 7L9 11" stroke="hsl(215 66% 14%)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/><path d="M5 3L10 7L5 11" stroke="hsl(44 70% 50%)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{transform:'translateX(2px)'}}/></svg>
          </div>
        </motion.div>
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1 h-6 bg-white/80 rounded-full -translate-y-1" />
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-6 bg-white/80 rounded-full translate-y-1" />
      </div>

      <div className="absolute top-4 left-4 glass-dark text-white px-3.5 py-1.5 rounded-full text-xs font-bold tracking-wide flex items-center gap-2">
        <span className="w-2 h-2 rounded-full bg-white/90 animate-pulse" />
        {beforeLabel}
      </div>
      <div className="absolute top-4 right-4 bg-accent text-accent-foreground px-3.5 py-1.5 rounded-full text-xs font-bold shadow-md border border-white/20">
        {afterLabel}
      </div>

      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 glass px-3 py-1 rounded-full text-[11px] font-bold text-foreground/70 opacity-0 group-hover:opacity-100 transition-opacity hidden md:flex items-center gap-1.5">
        Drag to compare ↔
      </div>
    </div>
  );
};

export default ImageComparisonSlider;

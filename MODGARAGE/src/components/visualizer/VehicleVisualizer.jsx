import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Eye, Shield, Zap, Sparkles, Orbit } from "lucide-react";

const PAINT_TYPES = {
  Stock: { blend: "normal", opacity: 0, desc: "Original factory paint spec" },
  Glossy: { blend: "color", opacity: 0.78, desc: "High-gloss protective lacquer coating" },
  Matte: { blend: "multiply", opacity: 0.72, desc: "Light-absorbing satin stealth finish" },
  Chrome: { blend: "color-dodge", opacity: 0.85, desc: "Mirror metallic high-reflectivity chrome" },
  Chameleon: { blend: "hue", opacity: 0.8, desc: "Angle-dependent multi-hue color shift" }
};

const VehicleVisualizer = ({ car, visuals, isSpinning = false }) => {
  const [viewMode, setViewMode] = useState("studio"); // 'studio' | 'xray' | 'aero'
  const paintSpec = PAINT_TYPES[visuals.paintType || "Stock"];

  // Calculate underglow color
  const underglowColor = visuals.neon === "None" ? "transparent" : visuals.neon;

  return (
    <div className="relative w-full h-[380px] md:h-[480px] rounded-3xl border border-white/8 bg-[#070707] overflow-hidden flex flex-col justify-between p-6 select-none shadow-2xl">
      {/* Top HUD Console */}
      <div className="relative z-20 flex justify-between items-start gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
            <p className="text-[9px] font-bold tracking-[0.25em] text-emerald-400">LIVE RENDER HUD</p>
          </div>
          <h2 className="text-xl font-black tracking-tight text-white flex items-center gap-1.5">
            {car.brand.toUpperCase()} <span className="text-white/40 font-light">{car.model}</span>
          </h2>
          <p className="text-[10px] text-white/30 font-medium tracking-wide">
            Build Signature: <span className="font-mono text-white/50">{visuals.paintType} // {visuals.wheels}</span>
          </p>
        </div>

        {/* View Switchers */}
        <div className="flex bg-black/40 border border-white/8 p-1 rounded-full gap-1 backdrop-blur-md">
          {[
            { id: "studio", label: "STUDIO", icon: <Eye size={10} /> },
            { id: "xray", label: "X-RAY", icon: <Zap size={10} /> },
            { id: "aero", label: "AERO MASK", icon: <Shield size={10} /> }
          ].map((mode) => (
            <button
              key={mode.id}
              onClick={() => setViewMode(mode.id)}
              className={`flex items-center gap-1.5 text-[8px] font-bold px-3 py-1.5 rounded-full tracking-widest transition-all duration-300 ${
                viewMode === mode.id
                  ? "bg-white/10 text-white shadow-inner"
                  : "text-white/40 hover:text-white/80 hover:bg-white/5"
              }`}
            >
              {mode.icon}
              {mode.label}
            </button>
          ))}
        </div>
      </div>

      {/* Grid Floor Overlay & Background Elements */}
      <div className="absolute inset-0 pointer-events-none z-0">
        {/* Luxury studio lines */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.03)_0%,transparent_75%)]" />
        <div className="absolute bottom-0 left-0 right-0 h-[150px] bg-gradient-to-t from-black to-transparent" />
        
        {/* Grid Floor */}
        <div 
          className="absolute bottom-0 left-0 right-0 h-[200px] opacity-15"
          style={{
            backgroundImage: "linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)",
            backgroundSize: "20px 20px",
            perspective: "500px",
            transform: "rotateX(60deg) scaleY(1.5)",
            transformOrigin: "bottom center"
          }}
        />

        {/* Ambient background light circle */}
        <div 
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] rounded-full blur-[100px] opacity-20 transition-all duration-700"
          style={{
            background: `radial-gradient(circle, ${visuals.color || "#ffffff"} 0%, transparent 70%)`
          }}
        />
      </div>

      {/* RENDER VIEWPORT */}
      <div className="relative flex-1 flex items-center justify-center z-10 w-full">
        <AnimatePresence mode="wait">
          <motion.div
            key={`${car.id}-${viewMode}`}
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.02 }}
            transition={{ duration: 0.45 }}
            className="relative w-full max-w-[520px] h-full flex items-center justify-center"
          >
            {/* 1. PULSING NEON UNDERGLOW SHADOW */}
            {underglowColor !== "transparent" && (
              <motion.div
                animate={{
                  opacity: [0.65, 0.9, 0.65],
                  scale: [1, 1.04, 1]
                }}
                transition={{
                  duration: 2.2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="absolute bottom-[22%] left-[12%] right-[12%] h-[24px] rounded-[50%] filter blur-[20px] z-0"
                style={{
                  background: underglowColor,
                  boxShadow: `0 0 45px 15px ${underglowColor}`,
                }}
              />
            )}

            {/* 2. BASE CAR CUTOUT LAYERING */}
            <div className="relative w-full flex justify-center">
              {/* Base image */}
              <img
                src={car.image}
                alt={car.model}
                className={`w-full max-h-[220px] md:max-h-[280px] object-contain transition-all duration-500 z-10 select-none pointer-events-none ${
                  viewMode === "xray" ? "brightness-50 saturate-0 hue-rotate-180 invert" : 
                  viewMode === "aero" ? "brightness-[0.2] saturate-[0.1]" : ""
                }`}
              />

              {/* 3. SHADOW MAP & PAINT SHIFT MASK OVERLAY */}
              {viewMode === "studio" && (
                <div
                  className="absolute inset-0 z-12 pointer-events-none transition-all duration-500"
                  style={{
                    backgroundColor: visuals.color || "#ffffff",
                    mixBlendMode: paintSpec.blend,
                    maskImage: `url(${car.image})`,
                    WebkitMaskImage: `url(${car.image})`,
                    maskSize: "contain",
                    WebkitMaskSize: "contain",
                    maskRepeat: "no-repeat",
                    WebkitMaskRepeat: "no-repeat",
                    maskPosition: "center",
                    WebkitMaskPosition: "center",
                    opacity: paintSpec.opacity,
                    transform: "translate3d(0, 0, 0)",
                    willChange: "transform, opacity, filter"
                  }}
                />
              )}

              {/* 4. CHAMELEON DUAL GRADIENT SHIFT LAYER */}
              {viewMode === "studio" && visuals.paintType === "Chameleon" && (
                <div
                  className="absolute inset-0 z-13 pointer-events-none opacity-55 mix-blend-color-burn"
                  style={{
                    background: `linear-gradient(135deg, ${visuals.color} 0%, #1e3c72 50%, #2a5298 100%)`,
                    maskImage: `url(${car.image})`,
                    WebkitMaskImage: `url(${car.image})`,
                    maskSize: "contain",
                    WebkitMaskSize: "contain",
                    maskRepeat: "no-repeat",
                    WebkitMaskRepeat: "no-repeat",
                    maskPosition: "center",
                    WebkitMaskPosition: "center",
                    transform: "translate3d(0, 0, 0)",
                    willChange: "transform, opacity, filter"
                  }}
                />
              )}

              {/* 5. AERO HEATMAP (Windtunnel simulation mode) */}
              {viewMode === "aero" && (
                <div
                  className="absolute inset-0 z-14 pointer-events-none opacity-70 mix-blend-color-dodge"
                  style={{
                    background: "radial-gradient(circle at 20% 50%, rgba(239, 68, 68, 0.8) 0%, rgba(245, 158, 11, 0.4) 40%, rgba(16, 185, 129, 0) 80%)",
                    maskImage: `url(${car.image})`,
                    WebkitMaskImage: `url(${car.image})`,
                    maskSize: "contain",
                    WebkitMaskSize: "contain",
                    maskRepeat: "no-repeat",
                    WebkitMaskRepeat: "no-repeat",
                    maskPosition: "center",
                    WebkitMaskPosition: "center",
                    transform: "translate3d(0, 0, 0)",
                    willChange: "transform, opacity, filter"
                  }}
                />
              )}

              {/* 6. WINDOW TINT MASK LAYER */}
              {viewMode === "studio" && visuals.tint !== "Clear" && (
                <div
                  className="absolute inset-0 z-15 pointer-events-none mix-blend-multiply transition-all duration-300"
                  style={{
                    backgroundColor: visuals.tint.includes("Gold") ? "#cca43b" : "#000000",
                    maskImage: `url(${car.image})`,
                    WebkitMaskImage: `url(${car.image})`,
                    maskSize: "contain",
                    WebkitMaskSize: "contain",
                    maskRepeat: "no-repeat",
                    WebkitMaskRepeat: "no-repeat",
                    maskPosition: "center",
                    WebkitMaskPosition: "center",
                    opacity: visuals.tint.includes("Limo") ? 0.78 : visuals.tint.includes("Dark") ? 0.52 : 0.28,
                    transform: "translate3d(0, 0, 0)",
                    willChange: "transform, opacity, filter"
                  }}
                />
              )}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Floating HUD Telemetry Overlays */}
      {viewMode === "xray" && (
        <div className="absolute top-1/3 left-8 z-20 space-y-2 text-white bg-black/60 border border-red-500/30 p-3 rounded-lg backdrop-blur-sm">
          <p className="text-[8px] tracking-widest text-red-400 font-bold">STRUCTURAL INTEGRITY</p>
          <p className="text-[10px] font-mono">CHASSIS: REINFORCED CHROMOLY</p>
          <p className="text-[10px] font-mono">DRIVETRAIN: {car.specs.driveTrain}</p>
          <p className="text-[10px] font-mono">ENGINE CORE: ACTIVE</p>
        </div>
      )}

      {/* Rims Interactive Inspect Wheel Deck */}
      <div className="relative z-20 flex justify-between items-end">
        {/* Visual spec checklist pill */}
        <div className="flex gap-2">
          <div className="flex items-center gap-1 px-3 py-1.5 rounded-full border border-white/8 bg-black/35 backdrop-blur-md">
            <Orbit size={10} className={`text-white/40 ${isSpinning ? "animate-spin" : ""}`} />
            <span className="text-[8px] font-black tracking-widest text-white/50">{visuals.wheels.toUpperCase()}</span>
          </div>
          {visuals.driveMode !== "Street Mode" && (
            <div className="flex items-center gap-1 px-3 py-1.5 rounded-full border border-emerald-500/20 bg-emerald-500/5 backdrop-blur-md">
              <Sparkles size={9} className="text-emerald-400" />
              <span className="text-[8px] font-black tracking-widest text-emerald-400">{visuals.driveMode.toUpperCase()}</span>
            </div>
          )}
        </div>

        {/* Small floating instructions or details */}
        <div className="text-right">
          <p className="text-[8px] tracking-[0.2em] text-white/20 mb-0.5">CURRENT SPEC VALUE</p>
          <p className="text-sm font-bold tracking-tight text-white font-mono">
            +{visuals.paintType !== "Stock" ? "₹85,000" : "₹0"} Paint Spec
          </p>
        </div>
      </div>
    </div>
  );
};

export default React.memo(VehicleVisualizer);

import { useNavigate } from "react-router";
import { motion } from "framer-motion";
import { ShieldAlert, Home, Compass } from "lucide-react";
import Button from "../components/ui/Button";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#060606] text-white flex flex-col items-center justify-center p-6 relative overflow-hidden select-none">
      
      {/* Background aesthetics */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(239,68,68,0.04)_0%,transparent_60%)] pointer-events-none" />
      
      <div 
        className="absolute inset-0 opacity-5 pointer-events-none"
        style={{
          backgroundImage: "linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)",
          backgroundSize: "30px 30px",
        }}
      />

      <div className="relative z-10 text-center max-w-lg space-y-8 flex flex-col items-center">
        {/* Warning Indicator */}
        <motion.div
          animate={{ 
            scale: [1, 1.05, 1],
            borderColor: ["rgba(245,158,11,0.2)", "rgba(245,158,11,0.6)", "rgba(245,158,11,0.2)"]
          }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="w-16 h-16 rounded-full border bg-amber-500/5 text-amber-400 flex items-center justify-center shadow-lg shadow-amber-500/5"
        >
          <ShieldAlert size={28} className="animate-pulse" />
        </motion.div>

        {/* Diagnostic Code */}
        <div>
          <div className="flex items-center justify-center gap-2 mb-2">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-ping" />
            <p className="text-[9px] font-black tracking-[0.3em] text-amber-400">NAVIGATION ERROR CODE 404</p>
          </div>
          
          <h1 className="text-4xl sm:text-5xl font-black tracking-[0.1em] uppercase text-white">
            ROUTE <span className="text-white/30 font-light">LOST</span>
          </h1>
          
          <p className="text-xs text-white/40 leading-relaxed max-w-sm mt-4 mx-auto">
            The coordinates you requested have derailed. The diagnostic logs report a severed telemetry signal in the wind-tunnel simulations.
          </p>
        </div>

        {/* Simulated dashboard warning console */}
        <div className="w-full bg-white/[0.015] border border-white/6 rounded-2xl p-5 text-left font-mono text-[9px] text-white/50 space-y-2 max-w-sm">
          <div className="flex justify-between border-b border-white/5 pb-2 text-white/30">
            <span>DIAGNOSTIC TELEMETRY REPORT:</span>
            <span className="text-amber-400">WARN_SIGNAL_LOST</span>
          </div>
          <div className="flex justify-between">
            <span>SATELLITE ACCURACY:</span>
            <span>0.00%</span>
          </div>
          <div className="flex justify-between">
            <span>GEOLOCATION MATRIX:</span>
            <span>[OUT_OF_BOUNDS]</span>
          </div>
          <div className="flex justify-between">
            <span>SYS_STATUS:</span>
            <span className="text-red-400 font-bold">GPS_SEVERED_FATAL</span>
          </div>
        </div>

        {/* Actions Row */}
        <div className="flex flex-wrap gap-3 justify-center">
          <Button
            variant="primary"
            onClick={() => navigate("/")}
            icon={<Home size={11} />}
            className="!py-3.5"
          >
            ACTIVATE HOMEPAGE
          </Button>
          <Button
            variant="secondary"
            onClick={() => navigate("/vehicles")}
            icon={<Compass size={11} />}
            className="!py-3.5"
          >
            EXPLORE FLEET
          </Button>
        </div>
      </div>

    </div>
  );
};

export default NotFound;

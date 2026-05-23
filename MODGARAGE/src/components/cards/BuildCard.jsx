import React from "react";
import { useNavigate } from "react-router";
import { motion } from "framer-motion";
import { Trash2, Edit3, Columns, Calendar, Cpu } from "lucide-react";
import { CATEGORY_ACCENTS } from "../../utils/vehiclesData";
import Badge from "../ui/Badge";

const formatPrice = (p) => {
  if (p >= 10000000) return `₹${(p / 10000000).toFixed(2)} Cr`;
  if (p >= 100000)   return `₹${(p / 100000).toFixed(1)} L`;
  return `₹${p.toLocaleString()}`;
};

const BuildCard = ({ build, car, onDelete, onCompare }) => {
  const navigate = useNavigate();
  const accent = car ? (CATEGORY_ACCENTS[car.category] ?? "#ffffff") : "#ffffff";

  if (!car) return null;

  // Format date
  const dateStr = build.timestamp 
    ? new Date(build.timestamp).toLocaleDateString(undefined, { month: "short", day: "numeric", year: "numeric" }) 
    : "Recently Saved";

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.3 }}
      className="group relative rounded-[24px] border border-white/8 bg-[#0b0b0b] overflow-hidden flex flex-col justify-between"
    >
      {/* Upper image and metadata overlay */}
      <div className="relative h-[160px] overflow-hidden bg-black/45">
        <img
          src={car.image}
          alt={build.name}
          className="h-full w-full object-cover transition-all duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0b0b0b] via-black/10 to-transparent" />
        
        {/* Custom paint finish circle indicator over car */}
        <div className="absolute bottom-3 left-4 flex items-center gap-1.5 bg-black/60 border border-white/10 px-2.5 py-1 rounded-full backdrop-blur-md">
          <span className="w-2.5 h-2.5 rounded-full border border-white/20" style={{ backgroundColor: build.visuals.color }} />
          <span className="text-[7.5px] font-black tracking-widest text-white/70">
            {build.visuals.paintType?.toUpperCase()}
          </span>
        </div>

        {/* Date badge */}
        <div className="absolute top-3 right-3 flex items-center gap-1 text-[7.5px] font-bold text-white/40 bg-black/50 border border-white/6 px-2 py-1 rounded-full">
          <Calendar size={8} />
          {dateStr.toUpperCase()}
        </div>

        {/* Base Car Model Title overlay */}
        <div className="absolute top-3 left-3">
          <Badge variant="category" accentColor={accent}>
            {car.brand.toUpperCase()} {car.model.toUpperCase()}
          </Badge>
        </div>
      </div>

      {/* Main body info */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div className="space-y-4">
          {/* Custom Spec Name */}
          <div className="flex justify-between items-start gap-2">
            <div>
              <p className="text-[8px] tracking-[0.25em] text-white/30 mb-0.5">CUSTOM SPEC</p>
              <h3 className="text-base font-black tracking-tight text-white line-clamp-1">
                {build.name.toUpperCase()}
              </h3>
            </div>
            <div className="text-right">
              <p className="text-[8px] tracking-[0.25em] text-white/30 mb-0.5">TOTAL BUILD VALUE</p>
              <p className="text-sm font-mono font-black text-white" style={{ color: accent }}>
                {formatPrice(build.totalCost)}
              </p>
            </div>
          </div>

          {/* Quick Details Parameter list */}
          <div className="grid grid-cols-2 gap-2 text-[9px] text-white/50">
            {[
              { label: "WHEELS", value: build.visuals.wheels },
              { label: "SPOILER", value: build.visuals.spoiler },
              { label: "BODY KIT", value: build.visuals.bodyKit },
              { label: "DRIVE MODE", value: build.visuals.driveMode, icon: <Cpu size={8} className="text-emerald-400 shrink-0" /> }
            ].map((spec, i) => (
              <div key={i} className="flex flex-col p-2 bg-white/[0.015] border border-white/5 rounded-xl">
                <span className="text-[7px] text-white/20 tracking-wider mb-0.5">{spec.label}</span>
                <span className="font-bold text-white/70 flex items-center gap-1 truncate">
                  {spec.icon}
                  {spec.value}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Actions Row */}
        <div className="flex gap-2 mt-5 pt-4 border-t border-white/5">
          {/* Delete build action */}
          <button
            onClick={() => onDelete(build.id)}
            className="p-3.5 rounded-full bg-red-500/5 border border-red-500/15 hover:bg-red-500/15 text-red-400 transition-all duration-300 active:scale-95"
            title="Delete from garage"
          >
            <Trash2 size={12} />
          </button>

          {/* Compare Build action */}
          <button
            onClick={onCompare}
            className="flex-1 flex items-center justify-center gap-1.5 rounded-full py-3 text-[9px] font-black tracking-widest bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 text-white transition-all duration-300 active:scale-95"
          >
            <Columns size={10} />
            COMPARE SPEC
          </button>

          {/* Re-Tune / load studio action */}
          <button
            onClick={() => navigate(`/customize/${build.carId}`)}
            className="flex-1 flex items-center justify-center gap-1.5 rounded-full py-3 text-[9px] font-black tracking-widest text-black bg-white hover:bg-white/90 transition-all duration-300 active:scale-95 shadow-md hover:scale-102"
          >
            <Edit3 size={10} />
            RE-TUNE
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default React.memo(BuildCard);

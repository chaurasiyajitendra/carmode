import React from "react";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { motion } from "framer-motion";
import { ArrowUpRight, Zap, Gauge, Cpu, Activity, Heart, Columns } from "lucide-react";

import ProgressBar from "../ui/ProgressBar";
import { CATEGORY_ACCENTS } from "../../utils/vehiclesData";
import { toggleFavorite, addToCompare, removeFromCompare } from "../../features/customization/customizationSlice";
import { selectFavorites, selectCompareList } from "../../features/customization/customizationSelectors";


const formatPrice = (p) => {
  if (p >= 10000000) return `₹${(p / 10000000).toFixed(1)} Cr`;
  if (p >= 100000)   return `₹${(p / 100000).toFixed(1)} L`;
  return `₹${p.toLocaleString()}`;
};

const VehicleCard = ({ car, index, isFavorite: propIsFavorite, inCompare: propInCompare }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const accent = CATEGORY_ACCENTS[car.category] ?? "#ffffff";

  const favorites = useSelector(selectFavorites) || [];
  const compareList = useSelector(selectCompareList) || [];

  const isFavorite = propIsFavorite !== undefined 
    ? propIsFavorite 
    : favorites.map(String).includes(String(car.id));


  const inCompare = propInCompare !== undefined
    ? propInCompare
    : compareList.some((item) => String(item.carId) === String(car.id));

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{
        duration: 0.40,
        delay: (index % 12) * 0.2,
        ease: "easeInOut",
      }}
      whileHover={{ 
        y: -6,
        boxShadow: `0 25px 50px -12px rgba(0, 0, 0, 0.7), 0 0 25px ${accent}15`
      }}
      onClick={() => navigate(`/single/${car.id}`)}
      className="group  relative overflow-hidden rounded-[26px] border border-white/[0.03] bg-[#08080c]/50 backdrop-blur-xl cursor-pointer select-none transition-all duration-500 hover:border-white/[0.12] hover:bg-[#0d0d14]/70"
      style={{
        boxShadow: "0 20px 45px -20px rgba(0,0,0,0.85)"
      }}
    >
      {/* ── IMAGE WRAPPER ── */}
      <div className="relative h-[200px] overflow-hidden bg-black/40">
        
        {/* Parallax Image Scale */}
        <img
          src={car.image}
          alt={`${car.brand} ${car.model}`}
          loading="lazy"
          className="h-full w-full object-cover transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:scale-105 filter brightness-[0.88] contrast-[1.03] group-hover:brightness-100 group-hover:contrast-100"
        />

        {/* Dynamic Dark Vignette overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#08080c] via-black/10 to-transparent" />
        
        {/* Top Badges overlay */}
        <div className="absolute left-4 top-4 flex items-center gap-2 z-10">
          <span 
            className="rounded-full px-3 py-1 text-[8px] font-black tracking-widest text-black shadow-md font-mono"
            style={{ backgroundColor: accent }}
          >
            {car.category.toUpperCase()}
          </span>

          <span className="rounded-full border border-white/5 bg-black/40 px-2.5 py-1 text-[8px] font-black tracking-widest text-white/50 backdrop-blur-md font-mono">
            {car.year}
          </span>
        </div>

        {/* Dynamic Favorite toggle overlay button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            dispatch(toggleFavorite(car.id));
          }}
          className={`absolute right-4 top-4 z-10 flex h-9 w-9 items-center justify-center rounded-full border backdrop-blur-md transition-all duration-300 cursor-pointer ${
            isFavorite
              ? "border-red-500/50 bg-red-500 text-white shadow-[0_0_15px_rgba(239,68,68,0.4)] hover:scale-105 active:scale-95"
              : "border-white/10 bg-black/40 text-white/60 hover:scale-105 hover:bg-black/60 hover:text-white hover:border-white/25 active:scale-95"
          }`}
          aria-label="Add to favorites"
        >
          <Heart size={12} className={isFavorite ? "fill-current text-white" : ""} />
        </button>

        {/* Config hover arrow indicator */}
        <div className="absolute bottom-4 right-4 translate-y-1.5 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100 z-10">
          <div
            className="flex h-8 w-8 items-center justify-center rounded-full shadow-lg shadow-black/40"
            style={{ background: accent }}
          >
            <ArrowUpRight size={12} className="text-black" />
          </div>
        </div>
      </div>

      {/* ── CARD CONTENT BODY ── */}
      <div className="relative z-10 flex flex-col gap-5 p-6 bg-gradient-to-b from-transparent to-[#08080c]/90">
        
        {/* Title and price metrics */}
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <p className="mb-0.5 truncate text-[8px] font-black tracking-[0.3em] text-white/20 uppercase">
              {car.brand}
            </p>
            <h4 className="truncate text-lg font-black tracking-tight text-white transition duration-300">
              {car.model}
            </h4>
          </div>

          <div className="shrink-0 text-right">
            <p className="text-[8px] font-black tracking-[0.2em] text-white/20 uppercase">VALUATION</p>
            <p className="mt-0.5 text-sm font-black font-mono" style={{ color: accent }}>
              {formatPrice(car.basePrice)}
            </p>
          </div>
        </div>

        {/* Elegant Spec badge matrix */}
        <div className="grid grid-cols-2 gap-2.5 border-t border-white/5 pt-4">
          <div className="flex items-center gap-2 rounded-xl border border-white/[0.03] bg-white/[0.01] px-3 py-2.5 hover:bg-white/[0.02] hover:border-white/5 transition-all duration-300">
            <Zap size={11} className="shrink-0" style={{ color: accent }} />
            <span className="text-[9px] font-bold font-mono text-white/70">{car.specs.hp} HP</span>
          </div>

          <div className="flex items-center gap-2 rounded-xl border border-white/[0.03] bg-white/[0.01] px-3 py-2.5 hover:bg-white/[0.02] hover:border-white/5 transition-all duration-300">
            <Gauge size={11} className="shrink-0" style={{ color: accent }} />
            <span className="text-[9px] font-bold font-mono text-white/70 truncate">{car.specs.topSpeed}</span>
          </div>

          <div className="flex items-center gap-2 rounded-xl border border-white/[0.03] bg-white/[0.01] px-3 py-2.5 hover:bg-white/[0.02] hover:border-white/5 transition-all duration-300">
            <Cpu size={11} className="shrink-0" style={{ color: accent }} />
            <span className="text-[9px] font-bold font-mono text-white/70">{car.specs.driveTrain}</span>
          </div>

          <div className="flex items-center gap-2 rounded-xl border border-white/[0.03] bg-white/[0.01] px-3 py-2.5 hover:bg-white/[0.02] hover:border-white/5 transition-all duration-300">
            <Activity size={11} className="shrink-0" style={{ color: accent }} />
            <span className="text-[9px] font-bold font-mono text-white/70 truncate">{car.specs.fuelType}</span>
          </div>
        </div>

        {/* Spaced progression gauge indicators */}
        <div className="space-y-2.5 pt-1">
          {[
            { label: "SPD", value: car.stats.speed },
            { label: "HDL", value: car.stats.handling },
            { label: "CMF", value: car.stats.comfort },
          ].map(({ label, value }) => (
            <div key={label} className="flex items-center gap-2.5">
              <span className="w-8 text-[8px] font-black tracking-[0.3em] text-white/20 font-mono">{label}</span>
              <ProgressBar value={value} accentColor={accent} height="h-[2px]" className="flex-1" />
              <span className="w-6 text-right text-[8px] font-bold font-mono text-white/45">{value}</span>
            </div>
          ))}
        </div>

        {/* Dedicated customized CTAs: Apple/Tesla Solid High-Contrast Minimalism */}
        <div className="flex items-center gap-2.5 border-t border-white/5 pt-4">
          
          {/* Configure/Build action: Highly aesthetic solid white button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              navigate(`/customize/${car.id}`);
            }}
            className="flex-1 h-11 rounded-full text-[9px] font-bold font-mono tracking-[0.25em] transition-all duration-300 cursor-pointer text-center bg-white text-black hover:bg-white/95 active:scale-95 shadow-md flex items-center justify-center gap-1.5"
            style={{
              boxShadow: `0 4px 12px rgba(255, 255, 255, 0.05)`,
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.boxShadow = `0 0 25px ${accent}40`;
              e.currentTarget.style.transform = "translateY(-1px) scale(1.02)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.boxShadow = `0 4px 12px rgba(255, 255, 255, 0.05)`;
              e.currentTarget.style.transform = "translateY(0) scale(1)";
            }}
          >
            CONFIGURE BUILD
            <ArrowUpRight size={10} strokeWidth={2.5} />
          </button>

          {/* Matrix compare action: Custom premium icon circle button next to it */}
          <button
            onClick={(e) => {
              e.stopPropagation();

              if (inCompare) {
                dispatch(removeFromCompare(car.id));
              } else {
                if (compareList.length >= 3) {
                  alert("Specs matrix configuration board is full! Limit: 3 vehicles.");
                  return;
                }

                dispatch(
                  addToCompare({
                    id: String(car.id),
                    carId: car.id,
                    isCustomBuild: false,
                    name: `${car.brand.toUpperCase()} ${car.model.toUpperCase()}`,
                    visuals: null,
                    totalCost: car.basePrice,
                    stats: car.stats,
                    car,
                  })
                );
              }
            }}
            className={`h-11 w-11 rounded-full shrink-0 flex items-center justify-center transition-all duration-300 cursor-pointer border ${
              inCompare
                ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/25 hover:border-emerald-500/50 active:scale-95 shadow-[0_0_20px_rgba(16,185,129,0.15)]"
                : "border-white/10 bg-white/[0.02] text-white/50 hover:bg-white/[0.06] hover:border-white/20 hover:text-white active:scale-95"
            }`}
            title={inCompare ? "Added to Compare" : "Add to Compare"}
            aria-label="Add to comparison board"
            onMouseEnter={(e) => {
              if (!inCompare) {
                e.currentTarget.style.boxShadow = `0 0 15px ${accent}25`;
              }
            }}
            onMouseLeave={(e) => {
              if (!inCompare) {
                e.currentTarget.style.boxShadow = `none`;
              }
            }}
          >
            <Columns size={13} className={inCompare ? "stroke-[2.5]" : "stroke-[1.5]"} />
          </button>
        </div>
      </div>

      {/* Futuristic soft neon glow backdrop overlay */}
      <div
        className="pointer-events-none absolute bottom-[-100px] left-1/2 h-[220px] w-[220px] -translate-x-1/2 rounded-full opacity-0 blur-[100px] transition-all duration-1000 group-hover:opacity-75"
        style={{ background: accent }}
      />
    </motion.div>
  );
};

export default React.memo(VehicleCard);
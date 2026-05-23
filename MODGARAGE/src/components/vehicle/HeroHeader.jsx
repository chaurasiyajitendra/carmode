import React, { useMemo } from "react";
import { ArrowLeft, Heart, Columns, Compass } from "lucide-react";

const formatPrice  = (p) => {
  if (p >= 10000000) return `₹${(p / 10000000).toFixed(2)}Cr`;
  if (p >= 100000)   return `₹${(p / 100000).toFixed(1)}L`;
  return `₹${p.toLocaleString()}`;
};

const HeroHeader = ({
  car, accent, navigate,
  isFavorite, inCompare,
  displayNums,
  onFavoriteToggle, onCompareToggle,
}) => {
  const quickStats = useMemo(() => [
    { label: "POWER",     val: `${displayNums?.hp ?? "—"} HP` },
    { label: "TOP SPEED", val: `${displayNums?.topSpeed ?? "—"} KM/H` },
    { label: "TORQUE",    val: `${displayNums?.torque ?? "—"} NM` },
    { label: "MILEAGE",   val: car.specs.mileage },
  ], [displayNums, car.specs.mileage]);

  return (
    <div className="relative h-[54vh] overflow-hidden shrink-0">
      <img
        src={car.image}
        alt={car.model}
        className="h-full w-full object-cover pointer-events-none"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-[#050505]" />
      <div className="absolute inset-0 bg-gradient-to-r from-[#050505]/88 via-transparent to-transparent" />

      {/* Top ribbon */}
      <div className="absolute top-0 left-0 right-0 flex items-center justify-between px-8 py-5">
        <button
          onClick={() => navigate("/vehicles")}
          className="flex items-center gap-2 text-xs tracking-[0.25em] text-white/50 hover:text-white transition cursor-pointer"
        >
          <ArrowLeft size={14} /> FLEET
        </button>
        <div className="flex items-center gap-4">
          <div className="flex items-center bg-black/40 backdrop-blur-md rounded-full border border-white/10 p-1.5 gap-1">
            <button
              onClick={onFavoriteToggle}
              className={`p-2 rounded-full transition-all duration-300 cursor-pointer ${
                isFavorite
                  ? "text-red-500 hover:text-red-600 bg-red-500/10"
                  : "text-white/50 hover:text-white hover:bg-white/5"
              }`}
            >
              <Heart size={14} fill={isFavorite ? "currentColor" : "none"} />
            </button>
            <button
              onClick={onCompareToggle}
              className={`p-2 rounded-full transition-all duration-300 cursor-pointer ${
                inCompare
                  ? "text-emerald-400 hover:text-emerald-500 bg-emerald-500/10"
                  : "text-white/50 hover:text-white hover:bg-white/5"
              }`}
            >
              <Columns size={14} />
            </button>
            <button
              onClick={() => navigate(`/customize/${car.id}`)}
              className="p-2 rounded-full text-white/50 hover:text-white hover:bg-white/5 transition-all duration-300 cursor-pointer"
            >
              <Compass size={14} />
            </button>
          </div>
          <div
            className="text-[9px] tracking-[0.3em] font-bold px-3 py-1.5 rounded-full border pointer-events-none"
            style={{ color: accent, borderColor: `${accent}40`, background: `${accent}15` }}
          >
            {car.category.toUpperCase()}
          </div>
        </div>
      </div>

      {/* Vehicle meta */}
      <div className="absolute bottom-14 left-8 pointer-events-none">
        <p className="text-[9px] tracking-[0.45em] text-white/30 mb-1.5 uppercase">
          {car.brand.toUpperCase()} · {car.year}
        </p>
        <h1 className="text-[50px] font-black tracking-tight leading-none">
          {car.model}
        </h1>
        <div className="flex items-center gap-4 mt-3 flex-wrap">
          <span className="text-xs text-white/35">{car.specs.engine}</span>
          <span className="text-white/15">·</span>
          <span className="text-xs text-white/35">{car.specs.driveTrain}</span>
          <span className="text-white/15">·</span>
          <span className="text-sm font-bold" style={{ color: accent }}>
            {formatPrice(car.basePrice)}
          </span>
        </div>
      </div>

      {/* Quick stats bar */}
      <div className="absolute bottom-0 right-0 flex pointer-events-none">
        {quickStats.map(({ label, val }) => (
          <div
            key={label}
            className="bg-black/65 backdrop-blur-xl border-l border-white/8 px-5 py-3.5"
          >
            <p className="text-[8px] tracking-[0.3em] text-white/30 mb-1">{label}</p>
            <p className="text-sm font-bold">{val}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default React.memo(HeroHeader);
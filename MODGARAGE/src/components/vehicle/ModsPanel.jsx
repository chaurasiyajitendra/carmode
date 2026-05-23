import React, { useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, Circle } from "lucide-react";
import Badge from "../ui/Badge";

const EFF_LABELS = {
  hp: "HP", torque: "TQ", topSpeed: "SPD",
  handling: "HDL", comfort: "CMF", durability: "DUR",
};

const formatPrice = (p) => {
  if (p >= 10000000) return `₹${(p / 10000000).toFixed(2)}Cr`;
  if (p >= 100000)   return `₹${(p / 100000).toFixed(1)}L`;
  return `₹${p.toLocaleString()}`;
};

// ── ModCard ────────────────────────────────────────────────────────────────
const ModCard = React.memo(({ mod, isSelected, accent, onClick, onMouseEnter, onMouseLeave }) => {
  const effs = useMemo(
    () => Object.entries(mod.fx).filter(([, v]) => v !== 0),
    [mod.fx]
  );

  return (
    <motion.div
      whileHover={{ x: 3 }}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onClick={onClick}
      className={` rounded-2xl  border p-5 cursor-pointer transition-all duration-200 ${
        isSelected
          ? "border-white/22 bg-white/[0.05]"
          : "border-white/7 bg-white/[0.017] hover:border-white/13"
      }`}
    >
      {isSelected && (
        <div
          className="absolute top-0 left-0 bottom-0 w-[3px] rounded-l-2xl"
          style={{ background: accent }}
        />
      )}
      <div className="flex items-start gap-3">
        <div className="flex-1 min-w-0">
          <Badge tier={mod.tier} className="mb-2" />
          <h3 className="text-sm font-black tracking-tight mb-1">{mod.name}</h3>
          <p className="text-[10px] text-white/38 leading-relaxed">{mod.desc}</p>
          {effs.length > 0 && (
            <div className="flex flex-wrap gap-1.5 mt-3">
              {effs.map(([k, v]) => (
                <span
                  key={k}
                  className={`text-[8px] font-bold px-2 py-0.5 rounded-full tracking-wide ${
                    v > 0
                      ? "bg-emerald-500/10 text-emerald-400"
                      : "bg-red-500/10 text-red-400"
                  }`}
                >
                  {v > 0 ? "+" : ""}{v} {EFF_LABELS[k] ?? k.toUpperCase()}
                </span>
              ))}
            </div>
          )}
        </div>
        <div className="flex flex-col items-end gap-3 shrink-0">
          <div style={{ color: isSelected ? accent : "rgba(255,255,255,0.15)" }}>
            {isSelected ? <CheckCircle2 size={20} /> : <Circle size={20} />}
          </div>
          <div className="text-right">
            <p className="text-[8px] tracking-widest text-white/22">COST</p>
            <p className="text-sm font-bold">{formatPrice(mod.cost)}</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
});
ModCard.displayName = "ModCard";

// ── ModsPanel ──────────────────────────────────────────────────────────────
const ModsPanel = ({
  car, modTree, effectiveCat, currentCatData,
  selectedModIds, accent,
  onCatChange, onModToggle, onModHover, onModLeave,
}) => (
  <div className="flex-1 min-w-0 border-r border-white/6 flex flex-col overflow-hidden">
    {/* Category tabs */}
    <div className="flex  border-b border-white/6 overflow-x-auto scrollbar-none shrink-0">
      {modTree.map((cat) => {
        const active = effectiveCat === cat.id;
        const count  = cat.mods.filter((m) => selectedModIds.includes(m.id)).length;
        return (
          <button
            key={cat.id}
            onClick={() => onCatChange(cat.id)}
            className={`relative shrink-0 px-6 py-4 text-[9px] tracking-[0.28em] transition-all whitespace-nowrap cursor-pointer ${
              active ? "bg-white/[0.04] text-white" : "text-white/28 hover:text-white/60"
            }`}
          >
            {cat.icon} {cat.label}
            {count > 0 && (
              <span
                className="ml-2 inline-flex items-center justify-center w-[18px] h-[18px] rounded-full text-[8px] font-black text-black"
                style={{ background: accent }}
              >
                {count}
              </span>
            )}
            {active && (
              <motion.div
                layoutId={`vtab-${car.id}`}
                className="absolute bottom-0 left-0 right-0 h-[2px]"
                style={{ background: accent }}
              />
            )}
          </button>
        );
      })}
    </div>

    {/* Cards grid — this is the ONLY scrollable region in left col */}
    <div className="flex-1 overflow-y-auto scrollbar-none p-6">
      <AnimatePresence mode="wait">
        <motion.div
          key={effectiveCat}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.18 }}
          className="grid grid-cols-1 xl:grid-cols-2 gap-3"
        >
          {currentCatData?.mods.map((mod) => (
            <ModCard
              key={mod.id}
              mod={mod}
              isSelected={selectedModIds.includes(mod.id)}
              accent={accent}
              onClick={() => onModToggle(mod.id)}
              onMouseEnter={() => onModHover(mod)}
              onMouseLeave={onModLeave}
            />
          ))}
        </motion.div>
      </AnimatePresence>
    </div>
  </div>
);

export default React.memo(ModsPanel);
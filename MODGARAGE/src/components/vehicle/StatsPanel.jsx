import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Info, ShoppingCart, Save } from "lucide-react";
import { TIER_META } from "../../constants/modTrees";
import ProgressBar from "../ui/ProgressBar";
import Button from "../ui/Button";

const formatPrice = (p) => {
  if (p >= 10000000) return `₹${(p / 10000000).toFixed(2)}Cr`;
  if (p >= 100000)   return `₹${(p / 100000).toFixed(1)}L`;
  return `₹${p.toLocaleString()}`;
};

// ── StatBar ────────────────────────────────────────────────────────────────
const StatBar = React.memo(({ label, unit, base, disp, max, accent }) => {
  const diff = (disp ?? 0) - (base ?? 0);
  return (
    <div>
      <div className="flex items-center justify-between mb-1.5">
        <span className="text-[8px] tracking-[0.25em] text-white/30">{label}</span>
        <div className="flex items-center gap-1.5">
          {diff !== 0 && (
            <span className={`text-[9px] font-bold ${diff > 0 ? "text-emerald-400" : "text-red-400"}`}>
              {diff > 0 ? "+" : ""}{Math.round(diff)}{unit}
            </span>
          )}
          <span className="text-xs font-bold">
            {Math.round(disp ?? 0)}{unit}
          </span>
        </div>
      </div>
      <ProgressBar value={disp ?? 0} max={max} accentColor={accent} height="h-[5px]" />
    </div>
  );
});
StatBar.displayName = "StatBar";

// ── SpecsTable ─────────────────────────────────────────────────────────────
const SpecsTable = React.memo(({ car }) => {
  const rows = [
    ["Engine",       car.specs.engine],
    ["Transmission", car.specs.transmission],
    ["Drivetrain",   car.specs.driveTrain],
    ["Fuel",         car.specs.fuelType],
    ["Weight",       car.specs.weight],
    ["Mileage",      car.specs.mileage],
  ];
  return (
    <div className="p-6 border-b border-white/6 shrink-0">
      <p className="text-[9px] tracking-[0.35em] text-white/28 mb-4">BASE SPECS</p>
      <div className="space-y-2.5">
        {rows.map(([label, val]) => (
          <div key={label} className="flex justify-between items-start gap-2">
            <span className="text-[9px] text-white/28 tracking-wide shrink-0">{label}</span>
            <span className="text-[9px] text-white/60 font-semibold text-right">{val}</span>
          </div>
        ))}
      </div>
    </div>
  );
});
SpecsTable.displayName = "SpecsTable";

// ── StatsPanel ─────────────────────────────────────────────────────────────
const StatsPanel = ({
  car, accent,
  displayNums, baseNums, hoveredMod,
  activeMods, totalCost,
  onQuoteOpen, onSaveOpen, onClearMods,
}) => (
  /*
   * FIX for scroll bug:
   * Remove `h-screen` — let the panel be as tall as the page naturally.
   * The entire page scrolls as one unit; the panel does NOT get its own
   * independent scroll context, which was causing the double-scroll conflict.
   */
  <div className="w-full lg:w-[295px] shrink-0 flex flex-col bg-[#050505] border-t lg:border-t-0 lg:border-l border-white/6">

    {/* ── Performance Profile ── */}
    <div className="p-6 border-b border-white/6">
      <p className="text-[9px] tracking-[0.35em] text-white/28 mb-5">PERFORMANCE PROFILE</p>
      <div className="space-y-4">
        {[
          { key: "hp",       label: "POWER",     unit: " HP",    max: 1800 },
          { key: "torque",   label: "TORQUE",     unit: " NM",    max: 1700 },
          { key: "topSpeed", label: "TOP SPEED",  unit: " KM/H",  max: 500  },
          { key: "handling", label: "HANDLING",   unit: "",       max: 100  },
          { key: "comfort",  label: "COMFORT",    unit: "",       max: 100  },
        ].map(({ key, label, unit, max }) => (
          <StatBar
            key={key}
            label={label}
            unit={unit}
            base={baseNums[key]}
            disp={displayNums?.[key]}
            max={max}
            accent={accent}
          />
        ))}
      </div>

      {hoveredMod && (
        <motion.div
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-4 flex items-start gap-2 rounded-xl border border-white/8 bg-white/[0.02] p-3"
        >
          <Info size={11} className="text-white/25 mt-0.5 shrink-0" />
          <p className="text-[9px] text-white/32 leading-relaxed">
            Previewing{" "}
            <span className="text-white/60 font-semibold">{hoveredMod.name}</span>
          </p>
        </motion.div>
      )}
    </div>

    {/* ── Static specs table ── */}
    <SpecsTable car={car} />

    {/* ── Selected mods list ── */}
    <div className="flex-1 p-6 border-b border-white/6">
      <p className="text-[9px] tracking-[0.35em] text-white/28 mb-3">SELECTED MODS</p>
      {activeMods.length === 0 ? (
        <p className="text-[10px] text-white/18 leading-relaxed">
          No modifications selected yet. Pick parts from the left panel to begin.
        </p>
      ) : (
        <div className="space-y-2">
          <AnimatePresence>
            {activeMods.map((mod) => (
              <motion.div
                key={mod.id}
                layout
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                className="flex items-center justify-between rounded-xl border border-white/7 bg-white/[0.02] px-3 py-2.5 gap-2"
              >
                <div className="min-w-0">
                  <p className="text-[10px] font-semibold leading-tight truncate">{mod.name}</p>
                  <p className="text-[8px] text-white/28 tracking-widest mt-0.5 uppercase">
                    {TIER_META[mod.tier]?.label}
                  </p>
                </div>
                <p className="text-[10px] font-bold shrink-0">{formatPrice(mod.cost)}</p>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}
    </div>

    {/* ── CTA buttons ── */}
    <div className="p-6 bg-black/45 backdrop-blur-md border-t border-white/5">
      <p className="text-[8px] tracking-[0.35em] text-white/28 mb-1">TOTAL MOD COST</p>
      <div className="flex items-baseline gap-2 mb-5">
        <p className="text-3xl font-black">{formatPrice(totalCost || 0)}</p>
        {activeMods.length > 0 && (
          <p className="text-[10px] text-white/28">
            {activeMods.length} mod{activeMods.length !== 1 ? "s" : ""}
          </p>
        )}
      </div>

      <div className="space-y-2">
        <Button
          disabled={activeMods.length === 0}
          variant={activeMods.length > 0 ? "primary" : "secondary"}
          onClick={onQuoteOpen}
          className="w-full justify-center py-3"
          icon={<ShoppingCart size={13} />}
          style={activeMods.length > 0 ? { background: accent, color: "#000" } : {}}
        >
          {activeMods.length === 0 ? "SELECT MODS TO BUILD" : "REQUEST BUILD QUOTE"}
        </Button>
        <Button
          variant="outline"
          onClick={onSaveOpen}
          className="w-full justify-center py-3 border-white/10 hover:border-white/20 hover:bg-white/[0.02] cursor-pointer"
          icon={<Save size={13} />}
        >
          SAVE SPEC TO GARAGE
        </Button>
      </div>

      {activeMods.length > 0 && (
        <button
          onClick={onClearMods}
          className="w-full mt-4 py-2 text-[9px] tracking-[0.3em] text-white/22 hover:text-white/50 transition cursor-pointer"
        >
          CLEAR ALL UPGRADES
        </button>
      )}
    </div>
  </div>
);

export default React.memo(StatsPanel);
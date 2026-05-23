import { useState, useMemo } from "react";
import { useParams, useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { motion, AnimatePresence } from "framer-motion";
import { Save, Check, Play } from "lucide-react";

import { selectAllCars } from "../features/cars/carSelectors";
import { saveBuild, addToCompare } from "../features/customization/customizationSlice";
import VehicleVisualizer from "../components/visualizer/VehicleVisualizer";
import Button from "../components/ui/Button";
import ProgressBar from "../components/ui/ProgressBar";

const AESTHETIC_PRESETS = [
  { name: "Stealth Black", hex: "#111111", desc: "Dark matter light-absorbing coating" },
  { name: "Stealth Crimson", hex: "#800020", desc: "Metallic deep burgundy red tint" },
  { name: "Liquid Gold", hex: "#ffd700", desc: "Highly reflective luxury gold chrome" },
  { name: "Electric Blue", hex: "#00d2ff", desc: "High-voltage performance electric cyan" },
  { name: "Phoenix Orange", hex: "#ff4500", desc: "Fiery gloss volcanic track metallic" },
  { name: "Pearl White", hex: "#f0f8ff", desc: "Elegant gloss iridescent pure pearl" },
  { name: "Toxic Green", hex: "#39ff14", desc: "Acid hyper-car neon green gloss" }
];

const FINISHES = ["Stock", "Glossy", "Matte", "Chrome", "Chameleon"];
const WHEELS = ["OEM Premium", "Forged Aero", "Carbon Monoblock", "Deep-Dish Alloy"];
const RIMS_PAINTS = ["Silver Chrome", "Gloss Black", "Gold", "Matte Anthracite"];
const NEONS = [
  { name: "None", hex: "transparent" },
  { name: "Crimson Red", hex: "#ff0055" },
  { name: "Electric Blue", hex: "#00f0ff" },
  { name: "Acid Green", hex: "#55ff00" },
  { name: "Deep Purple", hex: "#9900ff" },
  { name: "Amber Gold", hex: "#ffaa00" }
];
const TINTS = ["Clear", "50% Smoke", "Limo Black", "Gold Mirror"];
const SPOILERS = ["Stock Lip", "Carbon Lip", "Active Wing", "GT Track Wing"];
const HEADLIGHTS = ["OEM Xenon", "LED Crystal White", "Laser Blue", "Demon Red"];
const KITS = ["Stock Aero", "GT Widebody", "Carbon Splitter Pack"];
const EXHAUSTS = ["Stock Chrome", "Titanium Quad-Tips", "Carbon Dual-Exit"];
const INTERIORS = ["OEM Nappa Leather", "Alcantara Track Spec", "Carbon Fiber Accent", "Bespoke Silk"];
const DRIVE_MODES = ["Street Mode", "Sport Mode", "Drift Mode", "Track Mode", "Drag Mode"];

// Base pricing for mods
const MOD_PRICING = {
  paintFinish: { Stock: 0, Glossy: 25000, Matte: 65000, Chrome: 150000, Chameleon: 220000 },
  wheels: { "OEM Premium": 0, "Forged Aero": 180000, "Carbon Monoblock": 290000, "Deep-Dish Alloy": 150000 },
  rimsPaint: { "Silver Chrome": 0, "Gloss Black": 20000, Gold: 45000, "Matte Anthracite": 35000 },
  neon: { None: 0, "Crimson Red": 25000, "Electric Blue": 25000, "Acid Green": 25000, "Deep Purple": 25000, "Amber Gold": 25000 },
  tint: { Clear: 0, "50% Smoke": 12000, "Limo Black": 22000, "Gold Mirror": 38000 },
  spoiler: { "Stock Lip": 0, "Carbon Lip": 45000, "Active Wing": 135000, "GT Track Wing": 95000 },
  headlight: { "OEM Xenon": 0, "LED Crystal White": 15000, "Laser Blue": 35000, "Demon Red": 45000 },
  kit: { "Stock Aero": 0, "GT Widebody": 480000, "Carbon Splitter Pack": 290000 },
  exhaust: { "Stock Chrome": 0, "Titanium Quad-Tips": 145000, "Carbon Dual-Exit": 75000 },
  interior: { "OEM Nappa Leather": 0, "Alcantara Track Spec": 160000, "Carbon Fiber Accent": 95000, "Bespoke Silk": 240000 },
  driveMode: { "Street Mode": 0, "Sport Mode": 180000, "Drift Mode": 220000, "Track Mode": 390000, "Drag Mode": 320000 }
};

const CustomizationStudio = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const allCars = useSelector(selectAllCars);
  
  // Set active base car
  const activeCar = useMemo(() => {
    if (!allCars || allCars.length === 0) return null;
    const found = allCars.find(c => String(c.id) === String(id));
    return found || allCars[0];
  }, [id, allCars]);

  // Current visual customization configuration
  const [visuals, setVisuals] = useState({
    color: "#111111",
    paintType: "Stock",
    wheels: "OEM Premium",
    rimsColor: "Silver Chrome",
    neon: "None",
    tint: "Clear",
    spoiler: "Stock Lip",
    headlights: "OEM Xenon",
    bodyKit: "Stock Aero",
    exhaust: "Stock Chrome",
    interior: "OEM Nappa Leather",
    driveMode: "Street Mode"
  });

  const [buildName, setBuildName] = useState("");
  const [isSpinning, setIsSpinning] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [activeTab, setActiveTab] = useState("paint"); // 'paint' | 'parts' | 'perf'



  // Calculate modifications cost
  const modCost = useMemo(() => {
    let cost = 0;
    cost += MOD_PRICING.paintFinish[visuals.paintType] || 0;
    cost += MOD_PRICING.wheels[visuals.wheels] || 0;
    cost += MOD_PRICING.rimsPaint[visuals.rimsColor] || 0;
    const neonName = visuals.neon === "None" ? "None" : NEONS.find(n => n.hex === visuals.neon)?.name || "None";
    cost += MOD_PRICING.neon[neonName] || 0;
    cost += MOD_PRICING.tint[visuals.tint] || 0;
    cost += MOD_PRICING.spoiler[visuals.spoiler] || 0;
    cost += MOD_PRICING.headlight[visuals.headlights] || 0;
    cost += MOD_PRICING.kit[visuals.bodyKit] || 0;
    cost += MOD_PRICING.exhaust[visuals.exhaust] || 0;
    cost += MOD_PRICING.interior[visuals.interior] || 0;
    cost += MOD_PRICING.driveMode[visuals.driveMode] || 0;
    return cost;
  }, [visuals]);

  // Calculate performance delta modifications
  const computedStats = useMemo(() => {
    if (!activeCar) return { speed: 50, handling: 50, comfort: 50, durability: 50, hp: 300 };

    let speedDelta = 0;
    let handlingDelta = 0;
    let comfortDelta = 0;
    let durDelta = 0;
    let hpDelta = 0;

    // Finish
    if (visuals.paintType === "Chrome") { speedDelta -= 2; }
    
    // Wheels
    if (visuals.wheels === "Forged Aero") { speedDelta += 4; handlingDelta += 4; }
    else if (visuals.wheels === "Carbon Monoblock") { speedDelta += 7; handlingDelta += 7; }
    else if (visuals.wheels === "Deep-Dish Alloy") { speedDelta += 1; handlingDelta += 5; }

    // Spoiler
    if (visuals.spoiler === "Carbon Lip") { handlingDelta += 3; }
    else if (visuals.spoiler === "Active Wing") { handlingDelta += 9; speedDelta -= 2; }
    else if (visuals.spoiler === "GT Track Wing") { handlingDelta += 13; speedDelta -= 4; }

    // Kit
    if (visuals.bodyKit === "GT Widebody") { handlingDelta += 15; durDelta += 18; comfortDelta -= 6; }
    else if (visuals.bodyKit === "Carbon Splitter Pack") { handlingDelta += 9; speedDelta += 5; }

    // Exhaust
    if (visuals.exhaust === "Titanium Quad-Tips") { speedDelta += 6; hpDelta += 35; }
    else if (visuals.exhaust === "Carbon Dual-Exit") { speedDelta += 3; hpDelta += 15; }

    // Drive Mode
    if (visuals.driveMode === "Sport Mode") { speedDelta += 12; handlingDelta += 6; comfortDelta -= 5; hpDelta += 45; }
    else if (visuals.driveMode === "Drift Mode") { speedDelta += 8; handlingDelta += 15; comfortDelta -= 10; hpDelta += 25; }
    else if (visuals.driveMode === "Track Mode") { speedDelta += 22; handlingDelta += 18; comfortDelta -= 15; hpDelta += 80; }
    else if (visuals.driveMode === "Drag Mode") { speedDelta += 26; handlingDelta -= 5; comfortDelta -= 8; hpDelta += 140; }

    // Interior
    if (visuals.interior === "Alcantara Track Spec") { comfortDelta += 8; durDelta += 5; }
    else if (visuals.interior === "Bespoke Silk") { comfortDelta += 22; }

    return {
      speed: Math.min(100, Math.max(10, activeCar.stats.speed + speedDelta)),
      handling: Math.min(100, Math.max(10, activeCar.stats.handling + handlingDelta)),
      comfort: Math.min(100, Math.max(10, activeCar.stats.comfort + comfortDelta)),
      durability: Math.min(100, Math.max(10, (activeCar.stats.durability || 80) + durDelta)),
      hp: activeCar.specs.hp + hpDelta
    };
  }, [activeCar, visuals]);

  if (!activeCar) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <span className="w-8 h-8 rounded-full border-2 border-white/20 border-t-white animate-spin" />
      </div>
    );
  }

  const basePrice = activeCar.basePrice;
  const totalCost = basePrice + modCost;

  const formatPrice = (p) => {
    if (p >= 10000000) return `₹${(p / 10000000).toFixed(2)} Cr`;
    if (p >= 100000)   return `₹${(p / 100000).toFixed(1)} L`;
    return `₹${p.toLocaleString()}`;
  };

  const handlePresetSelect = (hex) => {
    setVisuals(v => ({ ...v, color: hex }));
  };

  const handleOptionChange = (key, val) => {
    setVisuals(v => ({ ...v, [key]: val }));
  };

  const handleSaveBuild = () => {
    dispatch(
      saveBuild({
        carId: activeCar.id,
        name: buildName.trim() || `${activeCar.model.toUpperCase()} CUSTOM SPEC`,
        visuals,
        totalCost
      })
    );
    setSaveSuccess(true);
    setTimeout(() => {
      setSaveSuccess(false);
      navigate("/garage");
    }, 1800);
  };

  const handleCompareBuild = () => {
    // Add to Compare matrix
    const compareItem = {
      id: `custom_${Date.now()}`,
      carId: activeCar.id,
      isCustomBuild: true,
      name: buildName.trim() || `${activeCar.model.toUpperCase()} SPEC`,
      visuals,
      totalCost,
      stats: computedStats,
      car: activeCar
    };
    dispatch(addToCompare(compareItem));
    navigate("/compare");
  };

  const triggerTestDrive = () => {
    setIsSpinning(true);
    setTimeout(() => {
      setIsSpinning(false);
    }, 4000);
  };

  return (
    <div key={activeCar?.id} className="min-h-screen bg-[#060606] text-white pt-24 pb-12 px-4 sm:px-6 lg:px-8 overflow-hidden">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left config render deck - Columns 1-7 */}
        <div className="lg:col-span-7 space-y-6">
          <VehicleVisualizer 
            car={activeCar} 
            visuals={visuals} 
            isSpinning={isSpinning} 
          />

          {/* Real-time stats display grid */}
          <div className="bg-[#0b0b0b] border border-white/6 rounded-3xl p-6">
            <div className="flex justify-between items-center mb-6">
              <div>
                <p className="text-[8px] tracking-[0.3em] text-white/20">LIVE METRICS</p>
                <h3 className="text-sm font-black tracking-tight text-white">PERFORMANCE DYNAMICS</h3>
              </div>
              <div className="text-right">
                <span className="text-xs font-mono text-emerald-400 font-bold bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20">
                  {computedStats.hp} HP (+{computedStats.hp - activeCar.specs.hp})
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                { label: "SPEED ACCELERATION", val: computedStats.speed, base: activeCar.stats.speed },
                { label: "LATERAL HANDLING & STEER", val: computedStats.handling, base: activeCar.stats.handling },
                { label: "INTERIOR CABIN COMFORT", val: computedStats.comfort, base: activeCar.stats.comfort },
                { label: "CHASSIS SHIELD DURABILITY", val: computedStats.durability, base: activeCar.stats.durability || 80 }
              ].map((stat) => {
                const diff = stat.val - stat.base;
                return (
                  <div key={stat.label} className="space-y-1.5 p-3 rounded-2xl bg-white/[0.015] border border-white/5">
                    <div className="flex justify-between items-center text-[8px] tracking-widest text-white/38">
                      <span>{stat.label}</span>
                      <span className="font-mono font-bold text-white">
                        {stat.val} <span className={diff > 0 ? "text-emerald-400 ml-1" : diff < 0 ? "text-red-400 ml-1" : "text-white/40 ml-1"}>
                          ({diff > 0 ? `+${diff}` : diff})
                        </span>
                      </span>
                    </div>
                    <div className="relative">
                      <ProgressBar 
                        value={stat.val} 
                        accentColor={diff > 0 ? "#10b981" : diff < 0 ? "#ef4444" : "#ffffff"} 
                        height="h-[4px]" 
                      />
                      {/* Overlay base indicator dot */}
                      <div 
                        className="absolute top-0 h-[4px] w-[4px] rounded-full bg-white/40" 
                        style={{ left: `${stat.base}%` }} 
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Drive & Action Control cockpit */}
          <div className="flex flex-wrap gap-4 items-center justify-between bg-black/40 border border-white/8 rounded-3xl p-5 backdrop-blur-md">
            <div>
              <p className="text-[8px] tracking-[0.2em] text-white/20">TOTAL SPEC VALUE</p>
              <h2 className="text-2xl font-black text-white font-mono tracking-tight">
                {formatPrice(totalCost)}
              </h2>
              <p className="text-[10px] text-white/40 mt-0.5">
                Base: {formatPrice(basePrice)} + Mods: {formatPrice(modCost)}
              </p>
            </div>

            <div className="flex gap-2">
              <Button 
                variant="secondary" 
                onClick={triggerTestDrive}
                disabled={isSpinning}
                className="!py-3"
              >
                {isSpinning ? "DRIVING..." : "TEST DRIVE"} <Play size={10} className="ml-1.5 fill-current" />
              </Button>
              <Button 
                variant="outline" 
                onClick={handleCompareBuild}
                className="!py-3"
              >
                COMPARE MATRIX
              </Button>
            </div>
          </div>
        </div>

        {/* Right customization panel - Columns 8-12 */}
        <div className="lg:col-span-5 space-y-6">
          {/* Base Vehicle Selector Dropdown */}
          <div className="bg-[#0b0b0b] border border-white/6 rounded-3xl p-5">
            <p className="text-[8px] tracking-[0.3em] text-white/20 mb-3">SELECT BASE VEHICLE</p>
            <select
              value={activeCar.id}
              onChange={(e) => navigate(`/customize/${e.target.value}`)}
              className="w-full bg-black border border-white/10 rounded-2xl px-4 py-3 text-xs font-bold tracking-widest text-white outline-none cursor-pointer focus:border-white/25"
            >
              {allCars.map(c => (
                <option key={c.id} value={c.id}>
                  {c.brand.toUpperCase()} {c.model} ({c.category.toUpperCase()})
                </option>
              ))}
            </select>
          </div>

          {/* Customization studio interface tab select */}
          <div className="flex border border-white/8 bg-black/40 p-1.5 rounded-full backdrop-blur-md">
            {[
              { id: "paint", label: "PAINT & RIMS" },
              { id: "parts", label: "BODY WORK" },
              { id: "perf", label: "PERFORMANCE" }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-1 text-[9px] font-black tracking-widest py-2.5 rounded-full transition-all duration-300 ${
                  activeTab === tab.id
                    ? "bg-white text-black shadow-lg"
                    : "text-white/40 hover:text-white/80"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Sub Panels rendering */}
          <div className="bg-[#0b0b0b] border border-white/6 rounded-3xl p-6 min-h-[380px] space-y-6">
            <AnimatePresence mode="wait">
              {activeTab === "paint" && (
                <motion.div
                  key="paint"
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -5 }}
                  transition={{ duration: 0.2 }}
                  className="space-y-6"
                >
                  {/* Paint Color Picker */}
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <p className="text-[9px] tracking-widest text-white/30 font-bold">1. BODY COLOR SPEC</p>
                      <span className="text-[10px] font-mono text-white/50">{visuals.color.toUpperCase()}</span>
                    </div>
                    
                    {/* Presets Grid */}
                    <div className="grid grid-cols-7 gap-2">
                      {AESTHETIC_PRESETS.map((preset) => (
                        <button
                          key={preset.name}
                          onClick={() => handlePresetSelect(preset.hex)}
                          className={`w-9 h-9 rounded-full relative transition-all duration-300 hover:scale-105 border ${
                            visuals.color === preset.hex ? "border-white" : "border-white/10"
                          }`}
                          style={{ backgroundColor: preset.hex }}
                          title={preset.name}
                        >
                          {visuals.color === preset.hex && (
                            <Check size={12} className="text-black bg-white rounded-full p-0.5 absolute inset-0 m-auto" />
                          )}
                        </button>
                      ))}
                    </div>

                    <div className="flex gap-3 items-center mt-3 p-3 rounded-2xl bg-white/[0.015] border border-white/5">
                      <span className="text-[9px] tracking-wide text-white/40">Custom HEX:</span>
                      <input 
                        type="color" 
                        value={visuals.color}
                        onChange={(e) => handlePresetSelect(e.target.value)}
                        className="bg-transparent border-0 w-8 h-8 rounded cursor-pointer outline-none shrink-0"
                      />
                      <input 
                        type="text" 
                        value={visuals.color}
                        onChange={(e) => handlePresetSelect(e.target.value)}
                        className="bg-black/60 border border-white/10 rounded-xl px-3 py-1.5 text-[10px] font-mono tracking-widest text-white outline-none w-24"
                      />
                    </div>
                  </div>

                  {/* Paint Finish Type */}
                  <div className="space-y-3">
                    <p className="text-[9px] tracking-widest text-white/30 font-bold">2. PAINT FINISH</p>
                    <div className="grid grid-cols-3 gap-2">
                      {FINISHES.map((finish) => (
                        <button
                          key={finish}
                          onClick={() => handleOptionChange("paintType", finish)}
                          className={`py-3 px-1 rounded-2xl border text-[9px] font-bold tracking-wider text-center transition-all duration-300 ${
                            visuals.paintType === finish 
                              ? "bg-white/10 border-white text-white" 
                              : "bg-white/[0.015] border-white/5 text-white/50 hover:border-white/15"
                          }`}
                        >
                          {finish.toUpperCase()}
                          <p className="text-[7px] text-white/30 font-normal mt-0.5">
                            +{formatPrice(MOD_PRICING.paintFinish[finish])}
                          </p>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Rims Design wheels */}
                  <div className="space-y-3">
                    <p className="text-[9px] tracking-widest text-white/30 font-bold">3. WHEELS DESIGN</p>
                    <div className="space-y-2">
                      {WHEELS.map((wheel) => (
                        <button
                          key={wheel}
                          onClick={() => handleOptionChange("wheels", wheel)}
                          className={`w-full flex justify-between items-center p-3.5 rounded-2xl border transition-all duration-300 ${
                            visuals.wheels === wheel 
                              ? "bg-white/10 border-white text-white" 
                              : "bg-white/[0.017] border-white/5 text-white/50 hover:border-white/15 hover:bg-white/[0.02]"
                          }`}
                        >
                          <span className="text-[10px] font-black tracking-wider">{wheel.toUpperCase()}</span>
                          <span className="text-[10px] font-mono font-bold text-white/80">
                            +{formatPrice(MOD_PRICING.wheels[wheel])}
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Rims paint */}
                  <div className="space-y-3">
                    <p className="text-[9px] tracking-widest text-white/30 font-bold">4. RIMS COATING</p>
                    <div className="grid grid-cols-2 gap-2">
                      {RIMS_PAINTS.map((rp) => (
                        <button
                          key={rp}
                          onClick={() => handleOptionChange("rimsColor", rp)}
                          className={`py-3 px-2 rounded-2xl border text-[9px] font-bold tracking-wider text-center transition-all duration-300 ${
                            visuals.rimsColor === rp 
                              ? "bg-white/10 border-white text-white" 
                              : "bg-white/[0.015] border-white/5 text-white/50 hover:border-white/15"
                          }`}
                        >
                          {rp.toUpperCase()}
                          <p className="text-[7px] text-white/30 font-normal mt-0.5">
                            +{formatPrice(MOD_PRICING.rimsPaint[rp])}
                          </p>
                        </button>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}

              {activeTab === "parts" && (
                <motion.div
                  key="parts"
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -5 }}
                  transition={{ duration: 0.2 }}
                  className="space-y-6"
                >
                  {/* Spoilers */}
                  <div className="space-y-3">
                    <p className="text-[9px] tracking-widest text-white/30 font-bold">5. REAR AERO SPOILER</p>
                    <div className="grid grid-cols-2 gap-2">
                      {SPOILERS.map((sp) => (
                        <button
                          key={sp}
                          onClick={() => handleOptionChange("spoiler", sp)}
                          className={`py-3.5 px-2 rounded-2xl border text-[9px] font-bold tracking-wider text-center transition-all duration-300 ${
                            visuals.spoiler === sp 
                              ? "bg-white/10 border-white text-white" 
                              : "bg-white/[0.015] border-white/5 text-white/50 hover:border-white/15"
                          }`}
                        >
                          {sp.toUpperCase()}
                          <p className="text-[7px] text-white/30 font-normal mt-0.5">
                            +{formatPrice(MOD_PRICING.spoiler[sp])}
                          </p>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Body Kits */}
                  <div className="space-y-3">
                    <p className="text-[9px] tracking-widest text-white/30 font-bold">6. AERO BODY KITS</p>
                    <div className="space-y-2">
                      {KITS.map((kit) => (
                        <button
                          key={kit}
                          onClick={() => handleOptionChange("bodyKit", kit)}
                          className={`w-full flex justify-between items-center p-3.5 rounded-2xl border transition-all duration-300 ${
                            visuals.bodyKit === kit 
                              ? "bg-white/10 border-white text-white" 
                              : "bg-white/[0.017] border-white/5 text-white/50 hover:border-white/15"
                          }`}
                        >
                          <span className="text-[10px] font-black tracking-wider">{kit.toUpperCase()}</span>
                          <span className="text-[10px] font-mono font-bold">
                            +{formatPrice(MOD_PRICING.kit[kit])}
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Neon Underglow */}
                  <div className="space-y-3">
                    <p className="text-[9px] tracking-widest text-white/30 font-bold">7. NEON UNDERGLOW</p>
                    <div className="grid grid-cols-3 gap-2">
                      {NEONS.map((neon) => (
                        <button
                          key={neon.name}
                          onClick={() => handleOptionChange("neon", neon.hex)}
                          className={`py-3 px-1 rounded-2xl border text-[9px] font-bold tracking-wider text-center transition-all duration-300 ${
                            visuals.neon === neon.hex 
                              ? "bg-white/10 border-white text-white" 
                              : "bg-white/[0.015] border-white/5 text-white/50 hover:border-white/15"
                          }`}
                        >
                          <div className="flex items-center justify-center gap-1.5 mb-1">
                            {neon.hex !== "transparent" && (
                              <span className="w-2.5 h-2.5 rounded-full border border-white/10" style={{ backgroundColor: neon.hex }} />
                            )}
                            {neon.name.toUpperCase()}
                          </div>
                          <p className="text-[7px] text-white/30 font-normal">
                            +{formatPrice(MOD_PRICING.neon[neon.name])}
                          </p>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Window Tint */}
                  <div className="space-y-3">
                    <p className="text-[9px] tracking-widest text-white/30 font-bold">8. WINDOW TINTS</p>
                    <div className="grid grid-cols-2 gap-2">
                      {TINTS.map((t) => (
                        <button
                          key={t}
                          onClick={() => handleOptionChange("tint", t)}
                          className={`py-3 px-2 rounded-2xl border text-[9px] font-bold tracking-wider text-center transition-all duration-300 ${
                            visuals.tint === t 
                              ? "bg-white/10 border-white text-white" 
                              : "bg-white/[0.015] border-white/5 text-white/50 hover:border-white/15"
                          }`}
                        >
                          {t.toUpperCase()}
                          <p className="text-[7px] text-white/30 font-normal mt-0.5">
                            +{formatPrice(MOD_PRICING.tint[t])}
                          </p>
                        </button>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}

              {activeTab === "perf" && (
                <motion.div
                  key="perf"
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -5 }}
                  transition={{ duration: 0.2 }}
                  className="space-y-6"
                >
                  {/* Drive Modes */}
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <p className="text-[9px] tracking-widest text-white/30 font-bold">9. PERFORMANCE DRIVE MODES</p>
                      <span className="text-[8px] font-bold bg-amber-500/10 text-amber-400 px-2 py-0.5 rounded-full border border-amber-500/20">CORE ENGINE</span>
                    </div>
                    <div className="space-y-2">
                      {DRIVE_MODES.map((dm) => (
                        <button
                          key={dm}
                          onClick={() => handleOptionChange("driveMode", dm)}
                          className={`w-full flex justify-between items-center p-3.5 rounded-2xl border transition-all duration-300 ${
                            visuals.driveMode === dm 
                              ? "bg-white/10 border-white text-white shadow-md shadow-white/[0.01]" 
                              : "bg-white/[0.017] border-white/5 text-white/50 hover:border-white/15"
                          }`}
                        >
                          <div className="text-left">
                            <span className="text-[10px] font-black tracking-wider block">{dm.toUpperCase()}</span>
                            <span className="text-[7px] text-white/30 font-medium">
                              {dm === "Drift Mode" ? "Increases steering angle & rear bias" : 
                               dm === "Track Mode" ? "Maximum downforce & track suspension map" : 
                               dm === "Drag Mode" ? "Unleashes raw engine HP in a straight line" : 
                               dm === "Sport Mode" ? "Sharper exhaust notes and mapping" : "Stock street cruiser mapping"}
                            </span>
                          </div>
                          <span className="text-[10px] font-mono font-bold">
                            +{formatPrice(MOD_PRICING.driveMode[dm])}
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Headlights LED */}
                  <div className="space-y-3">
                    <p className="text-[9px] tracking-widest text-white/30 font-bold">10. LED HEADLIGHT PACK</p>
                    <div className="grid grid-cols-2 gap-2">
                      {HEADLIGHTS.map((hl) => (
                        <button
                          key={hl}
                          onClick={() => handleOptionChange("headlights", hl)}
                          className={`py-3 px-2 rounded-2xl border text-[9px] font-bold tracking-wider text-center transition-all duration-300 ${
                            visuals.headlights === hl 
                              ? "bg-white/10 border-white text-white" 
                              : "bg-white/[0.015] border-white/5 text-white/50 hover:border-white/15"
                          }`}
                        >
                          {hl.toUpperCase()}
                          <p className="text-[7px] text-white/30 font-normal mt-0.5">
                            +{formatPrice(MOD_PRICING.headlight[hl])}
                          </p>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Exhaust Tips */}
                  <div className="space-y-3">
                    <p className="text-[9px] tracking-widest text-white/30 font-bold">11. EXHAUST SYSTEM</p>
                    <div className="grid grid-cols-2 gap-2">
                      {EXHAUSTS.map((ex) => (
                        <button
                          key={ex}
                          onClick={() => handleOptionChange("exhaust", ex)}
                          className={`py-3 px-2 rounded-2xl border text-[9px] font-bold tracking-wider text-center transition-all duration-300 ${
                            visuals.exhaust === ex 
                              ? "bg-white/10 border-white text-white" 
                              : "bg-white/[0.015] border-white/5 text-white/50 hover:border-white/15"
                          }`}
                        >
                          {ex.toUpperCase()}
                          <p className="text-[7px] text-white/30 font-normal mt-0.5">
                            +{formatPrice(MOD_PRICING.exhaust[ex])}
                          </p>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Interior Specs */}
                  <div className="space-y-3">
                    <p className="text-[9px] tracking-widest text-white/30 font-bold">12. COCKPIT INTERIOR STYLE</p>
                    <div className="space-y-2">
                      {INTERIORS.map((int) => (
                        <button
                          key={int}
                          onClick={() => handleOptionChange("interior", int)}
                          className={`w-full flex justify-between items-center p-3.5 rounded-2xl border transition-all duration-300 ${
                            visuals.interior === int 
                              ? "bg-white/10 border-white text-white" 
                              : "bg-white/[0.017] border-white/5 text-white/50 hover:border-white/15"
                          }`}
                        >
                          <span className="text-[10px] font-black tracking-wider">{int.toUpperCase()}</span>
                          <span className="text-[10px] font-mono font-bold">
                            +{formatPrice(MOD_PRICING.interior[int])}
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Form to Name Build & Save Spec */}
          <div className="bg-[#0b0b0b] border border-white/6 rounded-3xl p-6 space-y-4 relative">
            <p className="text-[9px] tracking-[0.3em] text-white/20">SAVE CONFIGURATION</p>
            
            <div className="space-y-3">
              <input
                type="text"
                placeholder="E.g., STEALTH DEMON, VORTEX GTR..."
                value={buildName}
                onChange={(e) => setBuildName(e.target.value)}
                className="w-full bg-black border border-white/10 rounded-2xl px-4 py-3.5 text-xs font-bold tracking-widest text-white outline-none focus:border-white/25 placeholder-white/20"
              />
              
              <div className="flex gap-2">
                <Button
                  onClick={handleSaveBuild}
                  disabled={saveSuccess}
                  className="flex-1 !py-3.5"
                  icon={saveSuccess ? <Check size={12} /> : <Save size={12} />}
                >
                  {saveSuccess ? "SPEC SAVED!" : "SAVE TO GARAGE"}
                </Button>
              </div>
            </div>

            <AnimatePresence>
              {saveSuccess && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="absolute inset-0 bg-[#070707]/90 rounded-3xl flex flex-col items-center justify-center p-6 text-center z-30"
                >
                  <span className="w-10 h-10 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center mb-3">
                    <Check size={20} />
                  </span>
                  <h4 className="text-sm font-black tracking-tight text-white mb-1">SPEC SIGNED SUCCESSFULLY</h4>
                  <p className="text-[10px] text-white/40 leading-relaxed max-w-[240px]">
                    Saved directly to your virtual garage collection. Synced in LocalStorage!
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

      </div>
    </div>
  );
};

export default CustomizationStudio;

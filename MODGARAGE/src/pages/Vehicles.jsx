import React, { useCallback, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { motion, AnimatePresence } from "framer-motion";
import { 
  SlidersHorizontal, 
  X, 
  ChevronDown, 
  Search, 
  Award
} from "lucide-react";
import { CATEGORY_ACCENTS } from "../utils/vehiclesData";
import {
  setActiveCategory,
  setSearchQuery,
  setSortBy,
  setDriveFilter,
  toggleShowFilters,
  clearAllFilters,
} from "../features/filters/filterSlice";
import {
  selectActiveCategory,
  selectSearchQuery,
  selectSortBy,
  selectDriveFilter,
  selectShowFilters,
  selectFilteredCars,
  selectCategoryCounts,
} from "../features/filters/filterSelectors";
import {
  selectFavorites,
  selectCompareList,
} from "../features/customization/customizationSelectors";
import usePauseLenis from "../hooks/usePauseLenis";
import VehicleCard from "../components/cards/VehicleCard";

const CATEGORIES_LIST = [
  { id: "ALL", label: "All Vehicles", icon: "🚗" },
  { id: "Supercar", label: "Supercars", icon: "🏁" },
  { id: "Drift", label: "Drift", icon: "🌀" },
  { id: "Luxury", label: "Luxury", icon: "💎" },
  { id: "Off-Road", label: "Off-Road", icon: "🏔" },
  { id: "Muscle", label: "Muscle", icon: "💪" },
  { id: "Classic", label: "Classics", icon: "🕰" },
  { id: "Hatchback", label: "Hatchback", icon: "🚘" },
  { id: "Sedan", label: "Sedan", icon: "🚙" },
];

const SORT_OPTIONS_LIST = [
  { value: "default", label: "Featured Models" },
  { value: "hp_desc", label: "Horsepower: High ↓" },
  { value: "price_asc", label: "Price: Low to High ↑" },
  { value: "price_desc", label: "Price: High to Low ↓" },
  { value: "speed_desc", label: "Top Speed: High ↓" },
];

// Price formattings helper
const formatPrice = (p) => {
  if (p >= 10000000) return `₹${(p / 10000000).toFixed(1)} Cr`;
  if (p >= 100000)   return `₹${(p / 100000).toFixed(1)} L`;
  return `₹${p.toLocaleString()}`;
};

const Vehicles = () => {
  // Lock native window scroll using global Lenis coordination hook
  usePauseLenis();
  
  const dispatch = useDispatch();

  // Filters State & Selectors
  const activeCategory = useSelector(selectActiveCategory);
  const searchQuery = useSelector(selectSearchQuery);
  const sortBy = useSelector(selectSortBy);
  const driveFilter = useSelector(selectDriveFilter);
  const showFilters = useSelector(selectShowFilters);
  const filteredCars = useSelector(selectFilteredCars);
  const catCounts = useSelector(selectCategoryCounts);

  // Customization Favorites/Compare Selector bindings
  const favorites = useSelector(selectFavorites) || [];
  const compareList = useSelector(selectCompareList) || [];

  // Theme accent colors calculations
  const activeCatAccent = useMemo(
    () => CATEGORY_ACCENTS[activeCategory] ?? "#ffffff",
    [activeCategory]
  );

  // Live Telemetry Analytics for premium dashboard feedback
  const telemetryData = useMemo(() => {
    if (!filteredCars || filteredCars.length === 0) {
      return { avgHp: 0, peakSpeed: 0, netValuation: 0 };
    }
    const hpList = filteredCars.map(c => c.specs.hp).filter(Boolean);
    const speedList = filteredCars.map(c => parseInt(c.specs.topSpeed) || 0).filter(Boolean);
    const priceList = filteredCars.map(c => c.basePrice).filter(Boolean);

    return {
      avgHp: Math.round(hpList.reduce((a, b) => a + b, 0) / hpList.length) || 0,
      peakSpeed: Math.max(...speedList) || 0,
      netValuation: priceList.reduce((a, b) => a + b, 0) || 0,
    };
  }, [filteredCars]);

  // Dispatch Actions
  const handleCategoryChange = useCallback(
    (catId) => {
      dispatch(setActiveCategory(catId));
    },
    [dispatch]
  );

  const handleSearchChange = useCallback(
    (e) => {
      dispatch(setSearchQuery(e.target.value));
    },
    [dispatch]
  );

  const handleSortChange = useCallback(
    (e) => {
      dispatch(setSortBy(e.target.value));
    },
    [dispatch]
  );

  const handleDriveFilterChange = useCallback(
    (drivetrain) => {
      dispatch(setDriveFilter(drivetrain));
    },
    [dispatch]
  );

  const handleToggleFilters = useCallback(() => {
    dispatch(toggleShowFilters());
  }, [dispatch]);

  const handleClearFilters = useCallback(() => {
    dispatch(clearAllFilters());
  }, [dispatch]);

  return (
    /* 
      ROOT VIEWPORT CONSTRAINER:
      Locks vertical layout to dynamic viewport height (h-[100dvh]).
      Clears global fixed navigation drawer via pt-20 md:pt-24.
      Eliminates all native browser scrolling.
    */
    <div className="h-screen h-[100dvh] w-full flex flex-col bg-[#020204] text-white overflow-hidden pt-20 md:pt-24 select-none">

      {/* DASHBOARD GRID CONTAINER:
          Occupies all available space under fixed header.
          min-h-0 prevents nested flex expansions.
      */}
      <div className="flex-1 flex flex-col lg:flex-row min-h-0 overflow-hidden relative">

        {/* LEFT CONTROL SIDEBAR (Obsidian Telemetry Panel) — fixed block on desktop */}
        {/* data-lenis-prevent locks scrolling inside sidebar without bubbling */}
        <aside 
          data-lenis-prevent
          className="hidden lg:flex flex-col w-[300px] shrink-0 border-r border-white/5 bg-[#030306]/95 p-6 overflow-y-auto scrollbar-none gap-6 select-none z-20"
        >
          
          {/* Header */}
          <div>
            <div className="flex items-center gap-1.5 text-[8px] tracking-[0.35em] text-white/30 font-black">
              <Award size={10} style={{ color: activeCatAccent }} />
              PILOT CONSOLE
            </div>
            <h3 className="text-xs font-black tracking-widest text-white mt-1 uppercase">MODIFICATION DECK</h3>
          </div>

          {/* Categories Grid selectors */}
          <div className="space-y-1">
            <p className="text-[8px] tracking-[0.25em] text-white/20 font-black mb-2 uppercase">VEHICLE CLASSIFICATIONS</p>
            {CATEGORIES_LIST.map((cat) => {
              const count = cat.id === "ALL" ? 50 : (catCounts[cat.id] ?? 0);
              const accent = CATEGORY_ACCENTS[cat.id] ?? "#ffffff";
              const active = activeCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => handleCategoryChange(cat.id)}
                  className={`group relative w-full text-left px-4 py-3 rounded-2xl flex items-center justify-between transition-all duration-300 cursor-pointer ${
                    active ? "bg-white/[0.03] border border-white/5" : "border border-transparent hover:bg-white/[0.01]"
                  }`}
                >
                  {/* Glowing vertical marker line */}
                  {active && (
                    <motion.div
                      layoutId="activeCategoryIndicatorGlow"
                      className="absolute left-0 top-3 bottom-3 w-[2px] rounded-r-full shadow-lg"
                      style={{ background: accent, boxShadow: `0 0 10px ${accent}` }}
                    />
                  )}
                  <span
                    className={`text-[9px] font-black tracking-widest flex items-center gap-2.5 transition-colors duration-300 ${
                      active ? "text-white" : "text-white/35 group-hover:text-white/70"
                    }`}
                  >
                    <span className="text-sm scale-110 filter saturate-75">{cat.icon}</span>
                    {cat.label.toUpperCase()}
                  </span>
                  <span
                    className={`text-[9px] font-bold font-mono transition-colors duration-300 ${
                      active ? "text-white/60 font-black" : "text-white/12"
                    }`}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Drivetrain filter selectors */}
          <div className="border-t border-white/5 pt-5 space-y-3">
            <p className="text-[8px] tracking-[0.25em] text-white/20 font-black uppercase">DRIVETRAIN CONFIGS</p>
            <div className="grid grid-cols-2 gap-2">
              {["ALL", "RWD", "AWD", "4WD"].map((d) => {
                const active = driveFilter === d;
                return (
                  <button
                    key={d}
                    onClick={() => handleDriveFilterChange(d)}
                    className={`h-8 flex items-center justify-center rounded-xl text-[9px] font-bold font-mono tracking-widest border transition-all duration-300 cursor-pointer ${
                      active
                        ? "bg-white border-white text-black font-black"
                        : "border-white/5 bg-white/[0.01] text-white/40 hover:border-white/15 hover:text-white"
                    }`}
                  >
                    {d}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Telemetry live stats widget */}
          <div className="border-t border-white/5 pt-5 mt-auto space-y-4">
            <p className="text-[8px] tracking-[0.25em] text-white/20 font-black uppercase">LIVE INVENTORY TELEMETRY</p>
            <div className="space-y-3 p-4 rounded-2xl bg-white/[0.015] border border-white/5 font-mono text-[9px]">
              <div className="flex justify-between items-center text-white/40">
                <span>FLEET POWER (AVG)</span>
                <span className="text-white font-bold">{telemetryData.avgHp} HP</span>
              </div>
              <div className="flex justify-between items-center text-white/40">
                <span>PEAK INVENTORY SPEED</span>
                <span className="text-white font-bold">{telemetryData.peakSpeed} KPH</span>
              </div>
              <div className="flex justify-between items-center text-white/40">
                <span>COMPARE BOARDS ACTIVE</span>
                <span className="text-white font-bold">{compareList.length} / 3</span>
              </div>
              <div className="flex justify-between items-center border-t border-white/5 pt-2.5 mt-2.5 text-white/40">
                <span>EST. FLEET VALUATION</span>
                <span className="font-black text-emerald-400">{formatPrice(telemetryData.netValuation)}</span>
              </div>
            </div>
          </div>
        </aside>

        {/* RIGHT DISPLAY VIEWPORT STACK:
            Fills remaining horizontal width.
            Enforces vertical layout stacking.
        */}
        <div className="flex-1 flex flex-col min-h-0 overflow-hidden">
          
          {/* HORIZONTAL CATEGORY SCROLL TAB BAR (Mobile Viewport Only) */}
          {/* data-lenis-prevent decouples horizontal scrolls from body scrolls */}
          <div 
            data-lenis-prevent
            className="lg:hidden shrink-0 flex overflow-x-auto gap-2 py-3 px-4 border-b border-white/5 bg-[#030306] scrollbar-none"
          >
            {CATEGORIES_LIST.map((cat) => {
              const count = cat.id === "ALL" ? 50 : (catCounts[cat.id] ?? 0);
              const active = activeCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => handleCategoryChange(cat.id)}
                  className={`relative shrink-0 flex items-center gap-1.5 px-4.5 py-2.5 rounded-full border text-[9px] font-black tracking-widest transition-all duration-300 cursor-pointer ${
                    active
                      ? "bg-white text-black border-white"
                      : "border-white/5 bg-white/[0.01] text-white/50 hover:border-white/15"
                  }`}
                >
                  <span>{cat.icon}</span>
                  <span>{cat.label.toUpperCase()}</span>
                  <span className="text-[8px] opacity-50 ml-0.5">{count}</span>
                </button>
              );
            })}
          </div>

          {/* TELEMETRY ACTION CONSOLE HEADER: Sorting, searching, and counts */}
          <section className="shrink-0 z-10 border-b border-white/5 bg-[#020204]/90 p-4 md:p-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
            
            {/* Search Input widget */}
            <div className="relative flex-1 max-w-md">
              <Search size={14} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30" />
              <input
                type="text"
                value={searchQuery}
                onChange={handleSearchChange}
                placeholder="Search models (e.g. Supra, Porsche, GTR)..."
                className="w-full bg-white/[0.02] border border-white/10 rounded-full py-2.5 pl-10 pr-4 text-xs text-white placeholder-white/20 outline-none transition-all duration-300 focus:bg-white/[0.04] focus:border-white/30"
                style={{
                  boxShadow: searchQuery ? `0 0 10px ${activeCatAccent}15` : "none"
                }}
              />
              {searchQuery && (
                <button
                  onClick={() => dispatch(setSearchQuery(""))}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-white/40 hover:text-white transition cursor-pointer"
                >
                  <X size={12} />
                </button>
              )}
            </div>

            <div className="flex items-center justify-between md:justify-end gap-4 shrink-0">
              
              {/* Telemetry Counter badge */}
              <div className="hidden sm:block text-left pr-4 border-r border-white/5">
                <span className="text-[8px] tracking-[0.25em] text-white/20 font-black block">AVAILABLE MODELS</span>
                <span className="text-xs font-black font-mono text-white/80">{filteredCars.length} SPECS MATCHED</span>
              </div>

              {/* Advanced Sorting Control selection */}
              <div className="relative">
                <select
                  value={sortBy}
                  onChange={handleSortChange}
                  className="h-10 flex items-center appearance-none border border-white/10 rounded-full pl-4 pr-9 bg-white/[0.02] text-[9px] font-bold font-mono tracking-widest text-white outline-none cursor-pointer hover:border-white/20 focus:border-white/30 transition-all duration-300"
                >
                  {SORT_OPTIONS_LIST.map((o) => (
                    <option key={o.value} value={o.value} className="bg-[#08080a] text-white text-xs">
                      {o.label.toUpperCase()}
                    </option>
                  ))}
                </select>
                <ChevronDown size={11} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-white/30 pointer-events-none" />
              </div>

              {/* Mobile Mobile Filter toggle trigger */}
              <button
                onClick={handleToggleFilters}
                className={`lg:hidden flex items-center justify-center h-10 w-10 rounded-full border transition-all duration-300 cursor-pointer ${
                  showFilters
                    ? "border-white bg-white text-black font-black"
                    : "border-white/10 bg-white/[0.02] text-white/60"
                }`}
                aria-label="Toggle drivetrain console"
              >
                <SlidersHorizontal size={14} />
              </button>
            </div>
          </section>

          {/* MOBILE FILTER OVERLAYS PANEL */}
          <AnimatePresence>
            {showFilters && (
              <motion.div
                data-lenis-prevent
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.2, ease: "easeInOut" }}
                className="lg:hidden shrink-0 border-b border-white/5 bg-[#030306] p-4 space-y-3"
              >
                <p className="text-[8px] tracking-[0.25em] text-white/30 font-black uppercase">DRIVETRAIN SELECTION</p>
                <div className="flex gap-2 overflow-x-auto scrollbar-none">
                  {["ALL", "RWD", "AWD", "4WD", "FWD"].map((d) => {
                    const active = driveFilter === d;
                    return (
                      <button
                        key={d}
                        onClick={() => handleDriveFilterChange(d)}
                        className={`px-4 py-2 rounded-full text-[9px] font-black tracking-widest border transition-all duration-300 shrink-0 cursor-pointer ${
                          active
                            ? "bg-white border-white text-black font-black"
                            : "border-white/10 bg-white/[0.01] text-white/50"
                        }`}
                      >
                        {d}
                      </button>
                    );
                  })}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Active Filtering Tag elements */}
          {(driveFilter !== "ALL" || searchQuery || activeCategory !== "ALL") && (
            <div className="shrink-0 px-4 md:px-6 py-2 border-b border-white/5 bg-[#020204] flex flex-wrap gap-2 items-center">
              <span className="text-[7px] font-black tracking-[0.3em] text-white/30 mr-1 uppercase">ACTIVE TELEMETRY FILTERS:</span>
              
              {activeCategory !== "ALL" && (
                <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/[0.03] border border-white/5 text-[8px] font-bold text-white/60">
                  DIVISION: {activeCategory.toUpperCase()}
                  <button onClick={() => dispatch(setActiveCategory("ALL"))} className="hover:text-red-400 transition cursor-pointer">
                    <X size={8} />
                  </button>
                </span>
              )}

              {driveFilter !== "ALL" && (
                <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/[0.03] border border-white/5 text-[8px] font-bold text-white/60">
                  DRIVE: {driveFilter}
                  <button onClick={() => dispatch(setDriveFilter("ALL"))} className="hover:text-red-400 transition cursor-pointer">
                    <X size={8} />
                  </button>
                </span>
              )}

              {searchQuery && (
                <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/[0.03] border border-white/5 text-[8px] font-bold text-white/60">
                  MODEL: "{searchQuery.toUpperCase()}"
                  <button onClick={() => dispatch(setSearchQuery(""))} className="hover:text-red-400 transition cursor-pointer">
                    <X size={8} />
                  </button>
                </span>
              )}

              <button
                onClick={handleClearFilters}
                className="text-[8px] font-black tracking-widest text-red-400 hover:text-red-300 transition duration-300 ml-auto cursor-pointer"
              >
                RESET ALL
              </button>
            </div>
          )}

          {/* 
            MAIN SCROLLABLE CARDS VIEWPORT CONTAINER:
            Enforces full independent height-locked scroll system.
            scrollbar-none prevents clipping and keeps visual elegance.
            data-lenis-prevent locks scroll from bubbling to parent Lenis container.
          */}
          <main 
            data-lenis-prevent
            className="flex-1 min-w-0 overflow-y-auto scrollbar-none px-6 py-6 pb-32 scroll-smooth"
          >
            <AnimatePresence mode="popLayout">
              {filteredCars.length === 0 ? (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex flex-col items-center justify-center py-32 gap-3"
                >
                  <span className="text-4xl filter saturate-50">🏎️</span>
                  <p className="text-[9px] tracking-[0.35em] text-white/20 font-black">NO FLEET VEHICLES MATCH SPECIFICATIONS</p>
                </motion.div>
              ) : (
                <motion.div
                  layout
                  className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-8"
                >
                  {filteredCars.map((car, i) => {
                    const isFav = favorites.map(String).includes(String(car.id));
                    const inComp = compareList.some((item) => String(item.carId) === String(car.id));
                    return (
                      <VehicleCard 
                         key={car.id} 
                         car={car} 
                         index={i} 
                         isFavorite={isFav}
                         inCompare={inComp}
                      />
                    );
                  })}
                </motion.div>
              )}
            </AnimatePresence>
          </main>

        </div>
      </div>
    </div>
  );
};



export default React.memo(Vehicles);

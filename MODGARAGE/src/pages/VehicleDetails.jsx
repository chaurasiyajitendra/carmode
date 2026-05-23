import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useVehicleDetails } from "../hooks/useVehicleDetails";
import HeroHeader    from "../components/vehicle/HeroHeader";
import ModsPanel     from "../components/vehicle/ModsPanel";
import StatsPanel    from "../components/vehicle/StatsPanel";
import QuoteModal    from "../components/vehicle/QuoteModal";
import SaveModal     from "../components/vehicle/SaveModal";

const VehicleDetails = () => {
  const v = useVehicleDetails();

  if (!v.car) {
    return (
      <div className="min-h-screen bg-[#050505] text-white flex flex-col items-center justify-center gap-4">
        <p className="text-white/30 tracking-[0.35em] text-sm font-black">VEHICLE NOT FOUND</p>
        <button
          onClick={() => v.navigate("/vehicles")}
          className="text-xs tracking-widest text-white/50 hover:text-white transition cursor-pointer"
        >
          ← BACK TO FLEET
        </button>
      </div>
    );
  }

  return (
    /*
     * FIX: The page is one tall document. `min-h-screen` + normal block flow
     * means the browser's native scrollbar handles everything. No nested
     * overflow-y-auto fighting each other.
     */
    <div className="min-h-screen bg-[#050505] text-white font-sans">

      <HeroHeader
        car={v.car}
        accent={v.accent}
        navigate={v.navigate}
        isFavorite={v.isFavorite}
        inCompare={v.inCompare}
        displayNums={v.displayNums}
        onFavoriteToggle={v.handleFavoriteToggle}
        onCompareToggle={v.handleCompareToggle}
      />

      {/* ── Split body ── */}
      {/*
       * KEY SCROLL FIX:
       * `items-stretch` and flex-col for mobile, lg:flex-row and lg:items-start for desktop.
       * Neither column locks scroll anymore on mobile, enabling natural flow.
       */}
      <div className="flex flex-col lg:flex-row items-stretch lg:items-start border-t border-white/6">
        <ModsPanel
          car={v.car}
          modTree={v.modTree}
          effectiveCat={v.effectiveCat}
          currentCatData={v.currentCatData}
          selectedModIds={v.selectedModIds}
          accent={v.accent}
          onCatChange={v.setActiveCatId}
          onModToggle={v.handleModToggle}
          onModHover={v.setHoveredMod}
          onModLeave={() => v.setHoveredMod(null)}
        />

        <StatsPanel
          car={v.car}
          accent={v.accent}
          displayNums={v.displayNums}
          baseNums={v.baseNums}
          hoveredMod={v.hoveredMod}
          activeMods={v.activeMods}
          totalCost={v.totalCost}
          onQuoteOpen={() => v.setIsQuoteOpen(true)}
          onSaveOpen={() => {
            v.setBuildName(`${v.car.brand} ${v.car.model} Spec`);
            v.setIsSaveOpen(true);
          }}
          onClearMods={v.handleClearAllMods}
        />
      </div>

      {/* ── Modals ── */}
      <QuoteModal
        isOpen={v.isQuoteOpen}
        onClose={v.handleCloseQuoteModal}
        car={v.car}
        accent={v.accent}
        activeMods={v.activeMods}
        totalCost={v.totalCost}
        quoteSubmitted={v.quoteSubmitted}
        formData={v.formData}
        onFormChange={v.handleFormChange}
        onFormSubmit={v.handleFormSubmit}
      />

      <SaveModal
        isOpen={v.isSaveOpen}
        onClose={() => v.setIsSaveOpen(false)}
        car={v.car}
        accent={v.accent}
        activeMods={v.activeMods}
        totalCost={v.totalCost}
        buildName={v.buildName}
        onBuildNameChange={(e) => v.setBuildName(e.target.value)}
        onSubmit={v.handleSaveBuildSubmit}
      />

      {/* ── Toast ── */}
      <AnimatePresence>
        {v.toastMsg && (
          <motion.div
            initial={{ opacity: 0, y: -20, x: "-50%" }}
            animate={{ opacity: 1, y: 0,  x: "-50%" }}
            exit={{   opacity: 0, y: -20, x: "-50%" }}
            className="fixed top-24 left-1/2 -translate-x-1/2 z-50 bg-[#0c0c0c]/90 border border-white/10 rounded-full px-5 py-2.5 flex items-center gap-2 shadow-2xl backdrop-blur-md"
          >
            <span className="w-1.5 h-1.5 rounded-full" style={{ background: v.accent }} />
            <span className="text-[9px] font-black tracking-[0.25em] text-white uppercase">
              {v.toastMsg}
            </span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default React.memo(VehicleDetails);
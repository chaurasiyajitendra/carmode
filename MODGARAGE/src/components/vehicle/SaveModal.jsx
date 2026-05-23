import React from "react";
import { CheckCircle2 } from "lucide-react";
import Modal from "../ui/Modal";
import Button from "../ui/Button";

const formatPrice = (p) => {
  if (p >= 10000000) return `₹${(p / 10000000).toFixed(2)}Cr`;
  if (p >= 100000)   return `₹${(p / 100000).toFixed(1)}L`;
  return `₹${p.toLocaleString()}`;
};

const SaveModal = ({
  isOpen, onClose, car, accent,
  activeMods, totalCost,
  buildName, onBuildNameChange,
  onSubmit,
}) => (
  <Modal isOpen={isOpen} onClose={onClose} title="SAVE SPEC TO GARAGE" size="md">
    <form onSubmit={onSubmit} className="space-y-5">
      <div className="space-y-2">
        <label className="text-[8px] tracking-[0.25em] text-white/40 font-bold block uppercase">
          SPECIFICATION NAME
        </label>
        <input
          required type="text"
          value={buildName} onChange={onBuildNameChange}
          placeholder="e.g. Stealth Edition"
          className="w-full rounded-xl border border-white/8 bg-white/[0.03] px-4 py-3 text-xs outline-none focus:border-white/20 transition-all text-white placeholder:text-white/20"
        />
      </div>

      <div className="rounded-2xl border border-white/8 bg-white/[0.015] p-4 text-[10px] space-y-2 text-white/55">
        <p className="text-[8px] tracking-widest text-white/30 uppercase font-black">SPEC CHECKLIST</p>
        <div className="flex justify-between">
          <span>Base Vehicle</span>
          <span className="font-bold text-white">{car.brand} {car.model}</span>
        </div>
        <div className="flex justify-between">
          <span>Active Upgrades</span>
          <span className="font-bold text-white">{activeMods.length} Installed</span>
        </div>
        <div className="flex justify-between border-t border-white/5 pt-2 text-xs">
          <span className="font-bold text-white">Total Valuation</span>
          <span className="font-black" style={{ color: accent }}>
            {formatPrice(car.basePrice + totalCost)}
          </span>
        </div>
      </div>

      <Button
        type="submit" variant="primary"
        className="w-full justify-center py-3 cursor-pointer"
        icon={<CheckCircle2 size={12} />}
        style={{ background: accent, color: "#000" }}
      >
        CONFIRM & SAVE SPEC
      </Button>
    </form>
  </Modal>
);

export default React.memo(SaveModal);
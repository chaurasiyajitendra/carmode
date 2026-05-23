import React from "react";
import { motion } from "framer-motion";
import { CheckCircle2, Send } from "lucide-react";
import Modal from "../ui/Modal";
import Button from "../ui/Button";

const formatPrice = (p) => {
  if (p >= 10000000) return `₹${(p / 10000000).toFixed(2)}Cr`;
  if (p >= 100000)   return `₹${(p / 100000).toFixed(1)}L`;
  return `₹${p.toLocaleString()}`;
};

const QuoteModal = ({
  isOpen, onClose, car, accent,
  activeMods, totalCost,
  quoteSubmitted,
  formData, onFormChange, onFormSubmit,
}) => (
  <Modal isOpen={isOpen} onClose={onClose} title="REQUEST BUILD QUOTE" size="lg">
    {quoteSubmitted ? (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex flex-col items-center justify-center py-12 text-center"
      >
        <div
          className="w-16 h-16 rounded-full flex items-center justify-center mb-6"
          style={{ background: `${accent}20` }}
        >
          <CheckCircle2 size={40} style={{ color: accent }} />
        </div>
        <h3 className="text-2xl font-black uppercase tracking-[0.05em] mb-3">
          QUOTE REQUEST SUBMITTED!
        </h3>
        <p className="max-w-md text-xs text-white/60 leading-relaxed mb-6">
          Your customized {car.brand} {car.model} modification specification has been
          received. Our Elite Automotive tuning team will review your order details
          and contact you via email within 24 hours.
        </p>
        <Button onClick={onClose} variant="secondary">CLOSE WINDOW</Button>
      </motion.div>
    ) : (
      <form onSubmit={onFormSubmit} className="space-y-6">
        {/* Build summary */}
        <div className="rounded-2xl border border-white/8 bg-white/[0.015] p-5">
          <p className="text-[8px] tracking-widest text-white/30 uppercase mb-3">BUILD SUMMARY</p>
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-bold text-white/80">
              {car.brand} {car.model}
            </span>
            <span className="text-xs font-medium text-white/50">
              Base: {formatPrice(car.basePrice)}
            </span>
          </div>
          <div className="space-y-1 mb-4">
            {activeMods.map((m) => (
              <div key={m.id} className="flex justify-between text-[10px] text-white/40">
                <span>· {m.name}</span>
                <span>{formatPrice(m.cost)}</span>
              </div>
            ))}
          </div>
          <div className="h-[1px] bg-white/10 my-3" />
          <div className="flex justify-between items-baseline">
            <span className="text-xs font-black uppercase tracking-wider">TOTAL ESTIMATED</span>
            <span className="text-xl font-black" style={{ color: accent }}>
              {formatPrice(car.basePrice + totalCost)}
            </span>
          </div>
        </div>

        {/* Form fields */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            { label: "FULL NAME",      name: "name",  type: "text",  ph: "e.g. John Doe",        span: false },
            { label: "EMAIL ADDRESS",  name: "email", type: "email", ph: "john@example.com",     span: false },
            { label: "PHONE NUMBER",   name: "phone", type: "tel",   ph: "+91 XXXXX XXXXX",       span: true  },
          ].map(({ label, name, type, ph, span }) => (
            <div key={name} className={`space-y-2 ${span ? "md:col-span-2" : ""}`}>
              <label className="text-[8px] tracking-[0.25em] text-white/40 font-bold block uppercase">
                {label}
              </label>
              <input
                required type={type} name={name}
                value={formData[name]} onChange={onFormChange}
                placeholder={ph}
                className="w-full rounded-xl border border-white/8 bg-white/[0.03] px-4 py-3 text-xs outline-none focus:border-white/20 transition-all text-white placeholder:text-white/20"
              />
            </div>
          ))}
          <div className="space-y-2 md:col-span-2">
            <label className="text-[8px] tracking-[0.25em] text-white/40 font-bold block uppercase">
              SPECIAL CUSTOM BUILD NOTES (OPTIONAL)
            </label>
            <textarea
              name="message" value={formData.message} onChange={onFormChange}
              rows={3}
              placeholder="Tell us about custom wrap designs, special exhaust notes, track modifications, etc..."
              className="w-full rounded-xl border border-white/8 bg-white/[0.03] p-4 text-xs outline-none focus:border-white/20 transition-all text-white placeholder:text-white/20 resize-none"
            />
          </div>
        </div>

        <Button
          type="submit" variant="primary"
          className="w-full justify-center mt-4"
          icon={<Send size={12} />}
          style={{ background: accent, color: "#000" }}
        >
          SUBMIT BUILD SPECIFICATION
        </Button>
      </form>
    )}
  </Modal>
);

export default React.memo(QuoteModal);
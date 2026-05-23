import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, Phone, MapPin, Send, CheckCircle, Cpu, Calendar, Clock } from "lucide-react";
import Button from "../components/ui/Button";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    vehicleType: "Supercar",
    consultType: "Performance Remap",
    message: ""
  });

  const [bookingConfirmed, setBookingConfirmed] = useState(false);
  const [ticketId, setTicketId] = useState("");
  const [tunerName, setTunerName] = useState("");

  const tuners = ["Marcus Vance (Master ECU Architect)", "Kenji Sato (Aero & Suspension Tuner)", "Sophia Cruz (Exotic Carbon Specialist)"];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email) return;

    // Generate telemetry IDs
    const id = `TX-${Math.floor(100000 + Math.random() * 900000)}`;
    const randomTuner = tuners[Math.floor(Math.random() * tuners.length)];

    setTicketId(id);
    setTunerName(randomTuner);
    setBookingConfirmed(true);
  };

  const resetForm = () => {
    setFormData({
      name: "",
      email: "",
      vehicleType: "Supercar",
      consultType: "Performance Remap",
      message: ""
    });
    setBookingConfirmed(false);
  };

  return (
    <div className="min-h-screen bg-[#060606] text-white pt-28 pb-16 px-4 sm:px-6 lg:px-8 select-none">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        
        {/* Left info column - Columns 1-5 */}
        <div className="lg:col-span-5 space-y-8">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <p className="text-[9px] font-black tracking-[0.25em] text-emerald-500">TUNER CONSULTATIONS</p>
            </div>
            <h1 className="text-4xl font-black tracking-tight text-white">
              BOOK A <span className="text-white/40 font-light">SESSION</span>
            </h1>
            <p className="text-sm text-white/40 mt-3 leading-relaxed">
              Schedule a bespoke consultation with our elite engineering architects. Let's design, model, and craft your ultimate high-performance build.
            </p>
          </div>

          <div className="space-y-6">
            {[
              { icon: <Mail className="text-emerald-400" size={18} />, label: "ARCHITECTURE SUPPORT", val: "architects@modgarage.co" },
              { icon: <Phone className="text-emerald-400" size={18} />, label: "DIRECT ENQUIRIES", val: "+91 9999 888 777" },
              { icon: <MapPin className="text-emerald-400" size={18} />, label: "PHYSICAL STUDIO", val: "Sector 62, Gurgaon, Haryana, India" }
            ].map((item, i) => (
              <div key={i} className="flex gap-4 items-center p-4 bg-[#0b0b0b] border border-white/6 rounded-2xl">
                <span className="p-3 bg-white/[0.02] border border-white/8 rounded-xl shrink-0">
                  {item.icon}
                </span>
                <div>
                  <p className="text-[7.5px] font-black tracking-widest text-white/30">{item.label}</p>
                  <p className="text-xs font-mono font-bold text-white/80 mt-0.5">{item.val}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="p-5 bg-gradient-to-br from-emerald-500/5 to-transparent border border-emerald-500/10 rounded-2xl space-y-2">
            <h3 className="text-xs font-black tracking-wider text-emerald-400 flex items-center gap-1.5">
              <Cpu size={12} /> TELEMETRY AUDIT INCLUDED
            </h3>
            <p className="text-[10px] text-white/40 leading-relaxed">
              Every booking includes a full wind-tunnel aerodynamics simulation report and an ECU diagnostic mapping review. Valued at ₹45,000 — complimentary.
            </p>
          </div>
        </div>

        {/* Right form column - Columns 6-12 */}
        <div className="lg:col-span-7 bg-[#0b0b0b] border border-white/6 rounded-[32px] p-6 sm:p-8 relative">
          <p className="text-[8.5px] tracking-[0.25em] text-white/20 font-bold mb-6">HQ CONTACT PROTOCOL</p>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-[9px] tracking-widest text-white/30 font-bold">FULL NAME</label>
                <input
                  type="text"
                  required
                  placeholder="E.g., Ashutosh Chaurasiya"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full bg-black border border-white/10 rounded-2xl px-4 py-3.5 text-xs font-bold tracking-widest text-white outline-none focus:border-white/25 placeholder-white/20"
                />
              </div>

              <div className="space-y-2">
                <label className="text-[9px] tracking-widest text-white/30 font-bold">EMAIL ADDRESS</label>
                <input
                  type="email"
                  required
                  placeholder="E.g., you@domain.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full bg-black border border-white/10 rounded-2xl px-4 py-3.5 text-xs font-bold tracking-widest text-white outline-none focus:border-white/25 placeholder-white/20"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-[9px] tracking-widest text-white/30 font-bold">VEHICLE CLASSIFICATION</label>
                <select
                  value={formData.vehicleType}
                  onChange={(e) => setFormData({ ...formData, vehicleType: e.target.value })}
                  className="w-full bg-black border border-white/10 rounded-2xl px-4 py-3.5 text-xs font-bold tracking-widest text-white outline-none cursor-pointer focus:border-white/25"
                >
                  {["Supercar", "Drift", "Off-Road", "Luxury"].map(c => (
                    <option key={c} value={c}>{c.toUpperCase()}</option>
                  ))}
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-[9px] tracking-widest text-white/30 font-bold">CONSULTATION PROTOCOL</label>
                <select
                  value={formData.consultType}
                  onChange={(e) => setFormData({ ...formData, consultType: e.target.value })}
                  className="w-full bg-black border border-white/10 rounded-2xl px-4 py-3.5 text-xs font-bold tracking-widest text-white outline-none cursor-pointer focus:border-white/25"
                >
                  {["Performance Remap", "Carbon Aerodynamics", "Suspension & Angle Setup", "Full Restoration Spec"].map(t => (
                    <option key={t} value={t}>{t.toUpperCase()}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[9px] tracking-widest text-white/30 font-bold">TUNING DESCRIPTION</label>
              <textarea
                rows={4}
                placeholder="Detail your customization dreams, performance goals, or preferred parts..."
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="w-full bg-black border border-white/10 rounded-2xl px-4 py-3.5 text-xs font-bold tracking-widest text-white outline-none focus:border-white/25 placeholder-white/20 resize-none"
              />
            </div>

            <Button
              type="submit"
              className="w-full !py-4"
              icon={<Send size={11} />}
            >
              TRANSMIT REQUEST
            </Button>
          </form>

          {/* Booking Confirmation Overlay */}
          <AnimatePresence>
            {bookingConfirmed && (
              <motion.div
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                className="absolute inset-0 bg-[#070707] rounded-[32px] flex flex-col items-center justify-center p-6 sm:p-8 text-center z-30 select-none"
              >
                <div className="w-14 h-14 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center mb-4">
                  <CheckCircle size={28} />
                </div>
                
                <h3 className="text-xl font-black tracking-tight text-white mb-2">TELEMETRY REQUEST LOGGED</h3>
                <p className="text-xs text-white/40 max-w-sm leading-relaxed mb-6">
                  Your customization inquiry has successfully bypassed the firewall. Our Master Tuners are already reviewing your specs.
                </p>

                {/* Glass ticket console */}
                <div className="w-full max-w-sm bg-white/[0.015] border border-white/8 rounded-2xl p-5 text-left space-y-3 font-mono text-[10px] text-white/60 mb-6">
                  <div className="flex justify-between border-b border-white/5 pb-2">
                    <span className="text-white/30">BOOKING ID:</span>
                    <span className="font-bold text-white">{ticketId}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white/30">CLIENT SPEC:</span>
                    <span className="font-bold text-white">{formData.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white/30">DISCIPLINE:</span>
                    <span className="font-bold text-white">{formData.consultType.toUpperCase()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white/30">ASSIGNED ARCHITECT:</span>
                    <span className="font-bold text-white text-right max-w-[170px] truncate">{tunerName}</span>
                  </div>
                  <div className="flex justify-between border-t border-white/5 pt-2">
                    <span className="text-white/30 flex items-center gap-1"><Calendar size={10} /> DATE:</span>
                    <span className="font-bold text-emerald-400">TOMORROW</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white/30 flex items-center gap-1"><Clock size={10} /> WINDOW:</span>
                    <span className="font-bold text-emerald-400">14:00 - 15:30 IST</span>
                  </div>
                </div>

                <Button variant="outline" onClick={resetForm}>
                  NEW SESSION
                </Button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

      </div>
    </div>
  );
};

export default Contact;

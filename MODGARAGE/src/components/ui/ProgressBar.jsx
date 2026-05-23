import React from "react";
import { motion } from "framer-motion";

const ProgressBar = ({
  value,
  max = 100,
  accentColor = "#ffffff",
  height = "h-[5px]",
  className = "",
}) => {
  const pct = Math.min((value / max) * 100, 100);

  return (
    <div className={`w-full rounded-full bg-white/6 overflow-hidden relative ${height} ${className}`}>
      <motion.div
        className="absolute left-0 top-0 h-full rounded-full"
        style={{ background: accentColor }}
        initial={{ width: 0 }}
        animate={{ width: `${pct}%` }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      />
    </div>
  );
};

export default React.memo(ProgressBar);

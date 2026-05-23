import React from "react";
import { motion } from "framer-motion";

const Button = ({
  children,
  onClick,
  className = "",
  variant = "primary", // primary, secondary, outline, danger, text
  disabled = false,
  glowColor = "",
  icon = null,
  type = "button",
  ...props
}) => {
  const baseStyles =
    "relative inline-flex items-center justify-center rounded-full text-xs font-bold tracking-[0.2em] transition-all duration-300 select-none overflow-hidden outline-none";
  
  const variants = {
    primary:
      "bg-white text-black hover:scale-105 active:scale-95 disabled:bg-white/10 disabled:text-white/30 disabled:scale-100 disabled:cursor-not-allowed",
    secondary:
      "bg-white/10 text-white border border-white/15 backdrop-blur-xl hover:bg-white/20 hover:scale-105 active:scale-95 disabled:opacity-40 disabled:scale-100 disabled:cursor-not-allowed",
    outline:
      "bg-transparent text-white border border-white/20 hover:border-white/50 hover:bg-white/5 hover:scale-105 active:scale-95 disabled:opacity-40 disabled:scale-100 disabled:cursor-not-allowed",
    danger:
      "bg-red-500/10 text-red-400 border border-red-500/20 hover:bg-red-500/25 hover:scale-105 active:scale-95",
    text:
      "bg-transparent text-white/50 hover:text-white py-2 px-0 hover:scale-100 tracking-[0.3em]",
  };

  const paddings = variant === "text" ? "" : "px-7 py-4";

  return (
    <motion.button
      type={type}
      disabled={disabled}
      onClick={onClick}
      whileHover={disabled ? {} : { y: -2 }}
      whileTap={disabled ? {} : { scale: 0.98 }}
      className={`${baseStyles} ${variants[variant]} ${paddings} ${className}`}
      {...props}
    >
      {/* Glow Effect */}
      {glowColor && !disabled && (
        <span
          className="absolute inset-0 -z-10 opacity-0 hover:opacity-100 transition-opacity duration-500 blur-xl scale-125 rounded-full pointer-events-none"
          style={{
            background: `radial-gradient(circle, ${glowColor} 0%, transparent 70%)`,
          }}
        />
      )}

      <span className="relative z-10 flex items-center gap-2">
        {children}
        {icon && <span className="shrink-0">{icon}</span>}
      </span>
    </motion.button>
  );
};

export default React.memo(Button);

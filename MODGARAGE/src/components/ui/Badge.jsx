import React from "react";

const Badge = ({
  children,
  accentColor = "",
  className = "",
  variant = "stage", // stage, category, default
  tier = "S1",       // S1, S2, S3
  ...props
}) => {
  if (variant === "stage") {
    const tierMeta = {
      S1: "bg-emerald-500/10 text-emerald-400 border-emerald-500/30",
      S2: "bg-amber-500/10 text-amber-400 border-amber-500/30",
      S3: "bg-red-500/10 text-red-400 border-red-500/30",
    };
    
    const activeClass = tierMeta[tier] || tierMeta.S1;

    return (
      <span
        className={`inline-block text-[8px] tracking-[0.25em] font-bold px-2.5 py-0.5 rounded-full border ${activeClass} ${className}`}
        {...props}
      >
        {children || `STAGE ${tier.replace("S", "")}`}
      </span>
    );
  }

  // category badge
  if (variant === "category" && accentColor) {
    return (
      <span
        className={`inline-block text-[8px] font-bold tracking-[0.22em] border px-2.5 py-1 rounded-full backdrop-blur-sm ${className}`}
        style={{
          color: accentColor,
          borderColor: `${accentColor}45`,
          background: `${accentColor}18`,
        }}
        {...props}
      >
        {children}
      </span>
    );
  }

  return (
    <span
      className={`inline-block text-[8px] tracking-widest text-white/45 border border-white/10 bg-black/50 backdrop-blur-sm px-2.5 py-1 rounded-full ${className}`}
      {...props}
    >
      {children}
    </span>
  );
};

export default React.memo(Badge);

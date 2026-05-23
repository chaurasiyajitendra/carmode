import { motion } from "framer-motion";

const PremiumLoader = () => {
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#050505] text-white">
      {/* Animated Subtle Glow in center */}
      <div className="absolute h-[300px] w-[300px] rounded-full bg-white/[0.015] blur-[80px]" />

      <div className="relative flex flex-col items-center gap-6">
        {/* Animated Brand Logo */}
        <motion.h1
          initial={{ opacity: 0, letterSpacing: "0.4em" }}
          animate={{ opacity: [0, 1, 0.4, 1], letterSpacing: "0.15em" }}
          transition={{
            duration: 1.8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="text-2xl font-black uppercase tracking-[0.15em] font-sans"
        >
          MODgarage
        </motion.h1>

        {/* Cinematic progress bar track */}
        <div className="relative h-[2px] w-[180px] overflow-hidden rounded-full bg-white/10">
          <motion.div
            initial={{ left: "-100%" }}
            animate={{ left: "100%" }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute h-full w-[40%] bg-white"
          />
        </div>
      </div>
    </div>
  );
};

export default PremiumLoader;

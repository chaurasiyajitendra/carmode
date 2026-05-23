import { memo } from "react";
import { motion } from "framer-motion";
import { Mouse } from "lucide-react";

const Home = () => {
  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-[#0a0a0f] text-white flex flex-col items-center justify-between pt-28 pb-10 px-6 lg:block lg:pt-0 lg:pb-0 lg:px-0">
      {/* Animated Background Glow */}
      <motion.div
        animate={{
          scale: [1, 1.05, 1],
          opacity: [0.4, 0.6, 0.4],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(80,80,90,0.2),transparent_55%)] pointer-events-none"
      />

      {/* Huge Background Text */}
      <motion.div
        initial={{ opacity: 0, scale: 1.2 }}
        animate={{ opacity: 0.08, scale: 1 }}
        transition={{ duration: 2 }}
        className="pointer-events-none absolute -top-10 lg:-top-20 inset-0 flex items-center justify-center z-0"
      >
        <h2 className="select-none uppercase font-[logo] text-[16vw] leading-none tracking-[0.08em]">
          MODgarage
        </h2>
      </motion.div>

      {/* Car Image Wrapper */}
      <motion.div
        initial={{ opacity: 0, y: 60, scale: 0.8 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{
          duration: 1.4,
          ease: "easeOut",
        }}
        whileHover={{
          scale: 1.03,
        }}
        className="relative mt-2 lg:mt-0 lg:absolute lg:left-1/2 lg:top-[55%] lg:-translate-x-1/2 lg:-translate-y-1/2 z-10 w-[95%] md:w-[75%] lg:w-[65%] max-w-[500px] lg:max-w-none flex justify-center"
      >
        <motion.img
          src="./car.png"
          alt="Toyota Trueno"
          className="w-full scale-90 rotate-y-180 object-contain drop-shadow-[0_30px_60px_rgba(0,0,0,0.8)] pointer-events-none"
        />
      </motion.div>

      {/* Responsive Mobile/Tablet Specs Column */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 1 }}
        className="flex flex-row justify-center items-center gap-8 md:gap-12 mt-6 lg:hidden z-20 w-full shrink-0"
      >
        {/* Left Specs */}
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-full border border-white/30 shrink-0">
            <div className="h-1.5 w-1.5 rounded-full bg-white animate-pulse" />
          </div>
          <div className="text-left">
            <p className="text-[7px] uppercase tracking-[0.2em] text-white/50">Top Speed</p>
            <p className="text-[10px] text-white/90 font-bold mt-0.5">201 kph / 125 mph</p>
          </div>
        </div>

        {/* Right Specs */}
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-full border border-white/30 shrink-0">
            <div className="h-1.5 w-1.5 rounded-full bg-white animate-pulse" />
          </div>
          <div className="text-left">
            <p className="text-[7px] uppercase tracking-[0.2em] text-white/50">Power</p>
            <p className="text-[10px] text-white/90 font-bold mt-0.5">112 bhp / 84 kW</p>
          </div>
        </div>
      </motion.div>

      {/* Desktop-Only Left Specs */}
      <motion.div
        initial={{ opacity: 0, x: -80 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.8, duration: 1 }}
        className="hidden lg:flex absolute bottom-40 left-44 z-20 items-center gap-4"
      >
        <div className="flex h-12 w-12 items-center justify-center rounded-full border border-white/50">
          <motion.div
            animate={{
              scale: [1, 1.5, 1],
              opacity: [1, 0.5, 1],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
            }}
            className="h-2 w-2 rounded-full bg-white"
          />
        </div>
        <div>
          <p className="text-[8px] uppercase tracking-[0.2em] text-white/50">Top Speed</p>
          <p className="text-xs text-white/90 font-bold mt-0.5">201 kph / 125 mph</p>
        </div>
      </motion.div>

      {/* Desktop-Only Right Specs */}
      <motion.div
        initial={{ opacity: 0, x: 80 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1, duration: 1 }}
        className="hidden lg:flex absolute bottom-44 right-36 z-20 items-center gap-4"
      >
        <div className="flex h-12 w-12 items-center justify-center rounded-full border border-white/50">
          <motion.div
            animate={{
              scale: [1, 1.5, 1],
              opacity: [1, 0.5, 1],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
            }}
            className="h-2 w-2 rounded-full bg-white"
          />
        </div>
        <div>
          <p className="text-[8px] uppercase tracking-[0.2em] text-white/50">Power</p>
          <p className="text-xs text-white/90 font-bold mt-0.5">112 bhp / 84 kW</p>
        </div>
      </motion.div>

      {/* Description Text */}
      <motion.div
        initial={{ opacity: 0, y: 45 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2, duration: 1 }}
        className="relative lg:absolute mt-6 lg:mt-0 lg:bottom-20 lg:left-1/2 z-20 max-w-xl lg:max-w-3xl lg:-translate-x-1/2 text-center px-4 lg:px-0 shrink-0"
      >
        <p className="text-xs md:text-sm leading-6 md:leading-7 text-white/60 tracking-wider">
          The AE86 generation of the Toyota Corolla Levin and Toyota Sprinter
          Trueno is a lightweight coupe introduced by Toyota in 1983 as part of the
          fifth generation Corolla lineup.
        </p>
      </motion.div>

      {/* Social Links */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.4, duration: 1 }}
        className="relative lg:absolute mt-8 lg:mt-0 lg:bottom-8 lg:left-10 z-20 flex justify-center lg:justify-start gap-8 text-[10px] tracking-widest text-white/50 uppercase w-full lg:w-auto shrink-0"
      >
        {["Twitter", "Facebook", "Instagram"].map((social) => (
          <motion.button
            whileHover={{
              y: -4,
              color: "#ffffff",
            }}
            key={social}
            className="cursor-pointer"
          >
            {social}
          </motion.button>
        ))}
      </motion.div>

      {/* Mouse Indicator */}
      <motion.div
        animate={{
          y: [0, 8, 0],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
        }}
        className="hidden lg:block absolute bottom-8 left-1/2 z-20 -translate-x-1/2 text-white/40 pointer-events-none"
      >
        <Mouse size={20} strokeWidth={1.5} />
      </motion.div>
    </div>
  );
};

export default memo(Home);
import React from "react";
import { motion } from "framer-motion";
import { Link, useLocation, useNavigate } from "react-router";
import { useLenis } from "../hooks/useLenis";
import { X } from "lucide-react";

const menuItems = [
  { label: "HOME", target: "/", isSection: true },
  { label: "FLEET CATALOG", target: "/vehicles", isSection: false },
  { label: "CUSTOM STUDIO", target: "/customize", isSection: false },
  { label: "MY SHOWROOM", target: "/garage", isSection: false },
  { label: "FAVORITES", target: "/favorites", isSection: false },
  { label: "COMPARE SPECS", target: "/compare", isSection: false },
  { label: "ABOUT HQ", target: "#about", isSection: true },
];

const Navbar = ({ data: setNavPanel }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { scrollTo } = useLenis();

  const handleLinkClick = (item, e) => {
    // If it's the nav panel toggle, close it
    if (setNavPanel) {
      setNavPanel(false);
    }

    if (item.isSection) {
      e.preventDefault();
      
      if (location.pathname === "/") {
        // Smooth scroll directly if on landing page
        scrollTo(item.target);
      } else {
        // Navigate to homepage first, then scroll on mount
        navigate(`/${item.target}`);
      }
    }
  };

  return (
    <motion.aside
      initial={{ x: -150, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: -150, opacity: 0 }}
      transition={{ type: "spring", stiffness: 100, damping: 18 }}
      className="fixed left-0 top-0 bottom-0 z-50 w-72 bg-black/95 backdrop-blur-2xl border-r border-white/5 px-8 md:px-12 py-10 md:py-20 flex flex-col justify-between overflow-y-auto scrollbar-none"
    >
      {/* Background Subtle Gradient */}
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_left_top,rgba(255,255,255,0.03),transparent_60%)]" />

      {/* Top Header inside navbar */}
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-black uppercase tracking-[0.3em] text-white/40">
          NAVIGATION
        </h3>
        {setNavPanel && (
          <button
            onClick={() => setNavPanel(false)}
            className="flex h-8 w-8 items-center justify-center rounded-full border border-white/10 bg-white/5 transition hover:scale-110 hover:bg-white hover:text-black"
          >
            <X size={14} />
          </button>
        )}
      </div>

      {/* Menu Links */}
      <motion.nav
        className="space-y-6 my-auto"
        variants={{
          visible: {
            transition: {
              staggerChildren: 0.08,
            },
          },
        }}
        initial="hidden"
        animate="visible"
      >
        {menuItems.map((item) => {
          const isActive = item.isSection
            ? item.target === "#home" && location.pathname === "/"
            : location.pathname.startsWith(item.target);

          return (
            <motion.div
              key={item.label}
              variants={{
                hidden: { opacity: 0, x: -30 },
                visible: { opacity: 1, x: 0 },
              }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              whileHover={{ x: 8 }}
              className="relative"
            >
              {item.isSection ? (
                <a
                  href={item.target}
                  onClick={(e) => handleLinkClick(item, e)}
                  className={`text-sm font-black tracking-[0.25em] transition-all duration-300 ${
                    isActive ? "text-white" : "text-white/50 hover:text-white"
                  }`}
                >
                  {item.label}
                </a>
              ) : (
                <Link
                  to={item.target}
                  onClick={(e) => handleLinkClick(item, e)}
                  className={`text-sm font-black tracking-[0.25em] transition-all duration-300 ${
                    isActive ? "text-white" : "text-white/50 hover:text-white"
                  }`}
                >
                  {item.label}
                </Link>
              )}

              {isActive && (
                <motion.div
                  layoutId="activeNavIndicator"
                  className="absolute -left-6 top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-white"
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
            </motion.div>
          );
        })}
      </motion.nav>

      {/* Footer Inside Navbar */}
      <div>
        <p className="text-[9px] tracking-widest text-white/20 uppercase">
          © 2026 MODGARAGE
        </p>
        <p className="text-[8px] tracking-[0.2em] text-white/30 uppercase mt-1">
          TUNING · AESTHETICS · POWER
        </p>
      </div>
    </motion.aside>
  );
};

export default React.memo(Navbar);
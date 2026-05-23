import { useState, useCallback } from "react";
import { Link, useLocation } from "react-router";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, Search, Compass } from "lucide-react";
import { useSelector } from "react-redux";

import Navbar from "../Navbar";
import SearchOverlay from "./SearchOverlay";
import UserDropdown from "../auth/UserDropdown";
import { selectIsAuthenticated } from "../../features/auth/authSelectors";

const Header = ({ sticky = false }) => {
  const location = useLocation();
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const [navPanel, setNavPanel] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  const toggleNav = useCallback(() => setNavPanel((p) => !p), []);
  const toggleSearch = useCallback(() => setSearchOpen((o) => !o), []);

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className={`${
          sticky ? "fixed bg-[#050505]/80 backdrop-blur-md border-b border-white/5" : "absolute bg-transparent"
        } top-0 left-0 right-0 z-40 flex w-full items-center justify-between px-6 py-6 md:px-12 md:py-7 text-white`}
      >
        {/* Left Side: Burger Menu Trigger */}
        <div className="flex items-center gap-6">
          <button
            onClick={toggleNav}
            className="text-white hover:scale-110 active:scale-95 transition cursor-pointer flex h-10 w-10 items-center justify-center rounded-full border border-white/5 bg-white/[0.02]"
            aria-label="Open navigation menu"
          >
            <Menu size={20} strokeWidth={1.5} />
          </button>
          
          {/* Quick Studio Shortcut */}
          {!location.pathname.startsWith("/customize") && (
            <Link
              to="/customize"
              className="hidden md:flex items-center gap-1.5 text-[9px] tracking-[0.25em] text-white/50 hover:text-white transition font-black border border-white/10 rounded-full px-4 py-2 hover:bg-white/5"
            >
              <Compass size={11} /> CUSTOM STUDIO
            </Link>
          )}
        </div>

        {/* Center: Brand Logo */}
        <Link
          to="/"
          className="text-2xl font-black uppercase tracking-[0.15em] hover:opacity-80 transition cursor-pointer flex items-center gap-2 select-none"
        >
          MOD<span className="text-white/40">garage</span>
        </Link>

        {/* Right Side: Search and Garage */}
        <div className="flex items-center gap-3">
          <button
            onClick={toggleSearch}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-white/5 bg-white/[0.02] transition hover:scale-110 hover:bg-white hover:text-black cursor-pointer"
            aria-label="Open search console"
          >
            <Search size={16} />
          </button>

          {isAuthenticated ? (
            <UserDropdown />
          ) : (
            <Link
              to="/garage"
              className={`text-[9px] font-black tracking-[0.25em] px-5 py-3 rounded-full border transition-all hover:scale-105 ${
                location.pathname === "/garage"
                  ? "bg-white text-black border-white"
                  : "border-white/15 bg-white/5 text-white/80 hover:bg-white hover:text-black hover:border-white"
              }`}
            >
              MY GARAGE
            </Link>
          )}
        </div>
      </motion.header>

      {/* Sidebar Navigation Drawer */}
      <AnimatePresence>
        {navPanel && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              onClick={() => setNavPanel(false)}
              className="fixed inset-0 z-45 bg-black/60 backdrop-blur-sm cursor-pointer"
            />
            <Navbar data={setNavPanel} />
          </>
        )}
      </AnimatePresence>

      {/* Search Console HUD */}
      <SearchOverlay isOpen={searchOpen} onClose={toggleSearch} />
    </>
  );
};

export default Header;

import { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { LogOut, FolderGit, Heart, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

import { selectAuthUser } from "../../features/auth/authSelectors";
import { logout } from "../../features/auth/authSlice";

const UserDropdown = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector(selectAuthUser);
  
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown on clicking outside
  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    
    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, []);

  if (!user) return null;

  const handleLogout = () => {
    setIsOpen(false);
    dispatch(logout());
    navigate("/vehicles");
  };

  const navigateTo = (path) => {
    setIsOpen(false);
    navigate(path);
  };

  // Get user profile initials
  const getInitials = () => {
    if (!user.fullName) return "M";
    return user.fullName
      .split(" ")
      .map(n => n[0])
      .slice(0, 2)
      .join("")
      .toUpperCase();
  };

  return (
    <div className="relative select-none z-30" ref={dropdownRef}>
      {/* Dynamic Profile Toggle Pill */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2.5 px-3 py-1.5 rounded-full border border-white/10 bg-white/[0.02] hover:bg-white/[0.05] hover:border-white/20 transition-all duration-300 cursor-pointer"
        aria-label="Toggle profile menu"
      >
        <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-[#ffd700] to-[#ffaa00] text-black text-[10px] font-black flex items-center justify-center shadow-lg shadow-[#ffd700]/10">
          {getInitials()}
        </div>
        <span className="hidden sm:block text-[9px] font-black tracking-widest text-white/80 uppercase">
          {user.username}
        </span>
        <ChevronDown size={10} className={`text-white/40 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`} />
      </button>

      {/* Dropdown overlay menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            transition={{ duration: 0.25, ease: [0.25, 1, 0.5, 1] }}
            className="absolute right-0 mt-2.5 w-60 bg-[#0a0a0d]/95 border border-white/10 rounded-2xl p-4 backdrop-blur-2xl shadow-2xl overflow-hidden"
          >
            {/* Header info */}
            <div className="border-b border-white/5 pb-3 mb-3">
              <div className="text-[7px] tracking-[0.25em] text-[#ffd700] font-black uppercase mb-1">
                PILOT CREDENTIALS
              </div>
              <h4 className="text-xs font-black tracking-tight text-white truncate">
                {user.fullName}
              </h4>
              <p className="text-[9px] text-white/40 truncate mt-0.5 font-mono">
                {user.email}
              </p>
            </div>

            {/* Collection Actions */}
            <div className="space-y-1">
              {/* My Garage */}
              <button
                onClick={() => navigateTo("/garage")}
                className="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-left text-[9px] font-bold text-white/60 hover:text-white hover:bg-white/[0.03] transition-all cursor-pointer"
              >
                <FolderGit size={12} className="text-white/30" />
                MY GARAGE FLEET
              </button>

              {/* My Favorites */}
              <button
                onClick={() => navigateTo("/favorites")}
                className="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-left text-[9px] font-bold text-white/60 hover:text-white hover:bg-white/[0.03] transition-all cursor-pointer"
              >
                <Heart size={12} className="text-white/30" />
                BOOKMARKED VEHICLES
              </button>
            </div>

            {/* Logout CTA */}
            <div className="border-t border-white/5 pt-3 mt-3">
              <button
                onClick={handleLogout}
                className="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-left text-[9px] font-black tracking-widest text-red-400 hover:text-red-300 hover:bg-red-500/10 border border-transparent hover:border-red-500/10 transition-all cursor-pointer"
              >
                <LogOut size={12} className="shrink-0" />
                SHUTDOWN SESSION
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default UserDropdown;

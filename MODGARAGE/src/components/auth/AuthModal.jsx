import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { X, Award } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

import { selectAuthModal } from "../../features/auth/authSelectors";
import { hideAuthModal } from "../../features/auth/authSlice";
import LoginForm from "../forms/LoginForm";
import RegisterForm from "../forms/RegisterForm";

const AuthModal = () => {
  const dispatch = useDispatch();
  const authModal = useSelector(selectAuthModal);
  
  const [activeForm, setActiveForm] = useState("login"); // 'login' | 'register'

  if (!authModal.isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {/* Obsidian Glass Backdrop Overlay */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => dispatch(hideAuthModal())}
          className="absolute inset-0 bg-black/80 backdrop-blur-md cursor-pointer"
        />

        {/* Modal content body */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          transition={{ duration: 0.35, ease: [0.25, 1, 0.5, 1] }}
          className="relative w-full max-w-md bg-[#0a0a0d]/90 border border-white/10 rounded-[32px] p-6 md:p-8 backdrop-blur-2xl shadow-2xl z-10 overflow-hidden"
        >
          {/* Top HUD warning marker */}
          <div className="flex justify-between items-start mb-6">
            <div>
              <div className="flex items-center gap-1.5 text-[8px] tracking-[0.35em] text-[#ffd700] font-black">
                <Award size={10} />
                PILOT PERMISSION DECK
              </div>
              <h3 className="text-sm font-black tracking-widest text-white mt-1 uppercase">AUTHENTICATE SYSTEM</h3>
            </div>
            
            <button
              onClick={() => dispatch(hideAuthModal())}
              className="h-8 w-8 rounded-full border border-white/5 bg-white/[0.02] text-white/50 hover:text-white flex items-center justify-center transition cursor-pointer"
            >
              <X size={14} />
            </button>
          </div>

          {/* Modal intercept dynamic message prompt */}
          <div className="bg-[#ffd700]/5 border border-[#ffd700]/15 rounded-2xl p-4 mb-6 text-xs text-[#ffd700] font-mono leading-relaxed">
            {authModal.message}
          </div>

          {/* Inner form modules */}
          <div className="min-h-[280px]">
            {activeForm === "login" ? (
              <LoginForm />
            ) : (
              <RegisterForm />
            )}
          </div>

          {/* Switcher Controls footer */}
          <div className="border-t border-white/5 pt-5 mt-6 text-center">
            {activeForm === "login" ? (
              <p className="text-[10px] text-white/40 font-bold uppercase tracking-wider">
                New pilot here?{" "}
                <button
                  onClick={() => setActiveForm("register")}
                  className="text-[#ffd700] hover:text-[#ffaa00] transition cursor-pointer"
                >
                  Create active credentials
                </button>
              </p>
            ) : (
              <p className="text-[10px] text-white/40 font-bold uppercase tracking-wider">
                Already registered?{" "}
                <button
                  onClick={() => setActiveForm("login")}
                  className="text-[#ffd700] hover:text-[#ffaa00] transition cursor-pointer"
                >
                  Access active workspace
                </button>
              </p>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default AuthModal;

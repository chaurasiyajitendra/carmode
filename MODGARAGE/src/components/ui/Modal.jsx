import React, { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

const Modal = ({
  isOpen,
  onClose,
  title = "",
  children,
  className = "",
  size = "md", 
}) => {

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  // Disable body scroll when modal is active
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const sizes = {
    sm: "max-w-md",
    md: "max-w-lg",
    lg: "max-w-2xl",
    xl: "max-w-4xl",
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Overlay Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/80 backdrop-blur-md"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            transition={{ type: "spring", duration: 0.45, bounce: 0.15 }}
            className={`relative z-10 w-full rounded-[28px] border border-white/10 bg-[#0d0d0f] shadow-[0_30px_60px_-15px_rgba(0,0,0,0.8)] p-8 overflow-hidden text-white ${sizes[size]} ${className}`}
          >
            {/* Elegant Background Glow */}
            <div className="pointer-events-none absolute -top-[150px] -right-[150px] h-[300px] w-[300px] rounded-full bg-white/[0.02] blur-[80px]" />

            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              {title && (
                <h2 className="text-xl font-black uppercase tracking-[0.1em] leading-none">
                  {title}
                </h2>
              )}
              <button
                onClick={onClose}
                className="flex h-8 w-8 items-center justify-center rounded-full border border-white/10 bg-white/5 transition hover:scale-105 hover:bg-white hover:text-black"
              >
                <X size={15} />
              </button>
            </div>

            {/* Content Body */}
            <div className="relative z-10 max-h-[70vh] overflow-y-auto scrollbar-none pr-1">
              {children}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default React.memo(Modal);

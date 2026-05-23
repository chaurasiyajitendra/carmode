import { useState, useEffect, useRef, useCallback } from "react";
import { useNavigate } from "react-router";
import { motion, AnimatePresence } from "framer-motion";
import { X, Search, ArrowRight } from "lucide-react";
import { carsData } from "../../utils/vehiclesData";

const SearchOverlay = ({ isOpen, onClose }) => {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const inputRef = useRef(null);

  // Focus input automatically on open
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  // Handle Escape key to close
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape" && isOpen) {
        setQuery("");
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  // Filter cars based on search query
  const results = query.trim()
    ? carsData.filter(
        (car) =>
          car.brand.toLowerCase().includes(query.toLowerCase()) ||
          car.model.toLowerCase().includes(query.toLowerCase()) ||
          car.category.toLowerCase().includes(query.toLowerCase())
      )
    : [];

  const handleResultClick = useCallback(
    (carId) => {
      onClose();
      navigate(`/single/${carId}`);
    },
    [navigate, onClose]
  );

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-50 flex flex-col bg-black/95 backdrop-blur-3xl text-white px-8 py-10 md:px-20 md:py-16"
        >
          {/* Close button */}
          <div className="flex justify-between items-center mb-10">
            <h3 className="text-xs font-black uppercase tracking-[0.3em] text-white/30">
              MODGARAGE HUB SEARCH
            </h3>
            <button
              onClick={() => { setQuery(""); onClose(); }}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 transition hover:scale-110 hover:bg-white hover:text-black cursor-pointer"
            >
              <X size={16} />
            </button>
          </div>

          {/* Search bar input container */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (query.trim()) {
                onClose();
                navigate(`/search?q=${encodeURIComponent(query.trim())}`);
                setQuery("");
              }
            }}
            className="relative max-w-4xl mx-auto w-full mb-12"
          >
            <div className="flex items-center gap-4 border-b border-white/20 pb-4 focus-within:border-white transition-colors duration-300">
              <Search size={24} className="text-white/40" />
              <input
                ref={inputRef}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search by Brand, Model, or Division (e.g., Supra, Drift, Off-Road)..."
                className="bg-transparent text-xl md:text-3xl font-black outline-none w-full tracking-wide placeholder:text-white/10 text-white"
              />
            </div>
            <p className="text-[10px] text-white/20 mt-3 tracking-wider">
              PRESS ENTER TO VIEW RESULTS PAGE · ESC TO EXIT · SELECT RESULTS TO DETONATE SPECIFICATION
            </p>
          </form>

          {/* Results section */}
          <div className="flex-1 overflow-y-auto max-w-4xl mx-auto w-full scrollbar-none pb-10">
            {results.length > 0 ? (
              <div className="space-y-4">
                <p className="text-[9px] tracking-[0.25em] text-white/30 mb-5">
                  MATCHED MACHINES ({results.length})
                </p>
                {results.map((car) => (
                  <motion.div
                    key={car.id}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    whileHover={{ x: 10 }}
                    onClick={() => handleResultClick(car.id)}
                    className="flex justify-between items-center p-4 border border-white/5 bg-white/[0.01] hover:bg-white/[0.03] hover:border-white/15 rounded-2xl cursor-pointer transition-all duration-300 group"
                  >
                    <div className="flex items-center gap-4">
                      <div className="h-12 w-20 overflow-hidden rounded-lg bg-black/40">
                        <img
                          src={car.image}
                          alt={car.model}
                          className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      </div>
                      <div>
                        <span className="text-[9px] text-white/40 tracking-wider uppercase font-semibold">
                          {car.brand}
                        </span>
                        <h4 className="text-base font-black leading-none mt-0.5 tracking-wide">
                          {car.model}
                        </h4>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <span className="text-[8px] text-white/30 tracking-widest block uppercase">
                          DIVISION
                        </span>
                        <span className="text-xs font-bold text-white/60">
                          {car.category.toUpperCase()}
                        </span>
                      </div>
                      <ArrowRight size={16} className="text-white/20 group-hover:text-white transition-colors" />
                    </div>
                  </motion.div>
                ))}
              </div>
            ) : query.trim() ? (
              <div className="flex flex-col items-center justify-center py-20 gap-3 text-center">
                <span className="text-3xl">📭</span>
                <h4 className="text-sm font-black tracking-widest uppercase">
                  NO MATCHES DETECTED
                </h4>
                <p className="text-xs text-white/40 max-w-xs">
                  We couldn't find any vehicles matches. Try searching for JDM, Drift, Off-road, or specific brands.
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                <p className="text-[9px] tracking-[0.25em] text-white/30 mb-5">
                  POPULAR SEARCH CATEGORIES
                </p>
                 <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {[
                    { label: "DRIFT SPEC", term: "Drift" },
                    { label: "SUPERCARS", term: "Supercar" },
                    { label: "LUXURY FLEET", term: "Luxury" },
                    { label: "OFF-ROAD", term: "Off-Road" },
                  ].map((cat) => (
                    <button
                      key={cat.term}
                      onClick={() => {
                        onClose();
                        navigate(`/search?q=${encodeURIComponent(cat.term)}`);
                        setQuery("");
                      }}
                      className="border border-white/5 bg-white/[0.01] hover:bg-white/[0.04] hover:border-white/20 p-6 rounded-2xl text-left cursor-pointer transition"
                    >
                      <h4 className="text-xs font-black tracking-[0.15em] text-white/80">
                        {cat.label}
                      </h4>
                      <p className="text-[9px] text-white/30 mt-1">Browse active segment →</p>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SearchOverlay;

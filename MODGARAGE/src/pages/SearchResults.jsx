import { useMemo, useState } from "react";
import { useSearchParams, useNavigate } from "react-router";
import { motion, AnimatePresence } from "framer-motion";
import { Search as SearchIcon, ArrowRight, ArrowLeft } from "lucide-react";
import { useSelector } from "react-redux";
import { selectFavorites, selectCompareList } from "../features/customization/customizationSelectors";
import { carsData } from "../utils/vehiclesData";
import VehicleCard from "../components/cards/VehicleCard";
import Button from "../components/ui/Button";

const SearchResults = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const favorites = useSelector(selectFavorites) || [];
  const compareList = useSelector(selectCompareList) || [];

  const queryParam = searchParams.get("q") || "";
  const [searchInput, setSearchInput] = useState(queryParam);
  const [prevQuery, setPrevQuery] = useState(queryParam);

  // Sync state if URL param updates during rendering
  if (queryParam !== prevQuery) {
    setSearchInput(queryParam);
    setPrevQuery(queryParam);
  }

  // Filter cars based on search query
  const results = useMemo(() => {
    const term = queryParam.trim().toLowerCase();
    if (!term) return [];
    
    return carsData.filter(
      (car) =>
        car.brand.toLowerCase().includes(term) ||
        car.model.toLowerCase().includes(term) ||
        car.category.toLowerCase().includes(term) ||
        car.specs.engine.toLowerCase().includes(term) ||
        car.specs.driveTrain.toLowerCase().includes(term)
    );
  }, [queryParam]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setSearchParams({ q: searchInput.trim() });
  };

  const handleCategoryClick = (category) => {
    setSearchParams({ q: category });
  };

  return (
    <div className="min-h-screen bg-[#060606] text-white pt-24 pb-16 px-4 sm:px-6 lg:px-8 select-none">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Top Header Panel */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-white/5 pb-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <p className="text-[9px] font-black tracking-[0.25em] text-emerald-500">FLEET INTELLIGENCE CONSOLE</p>
            </div>
            <h1 className="text-3xl font-black tracking-tight text-white flex items-center gap-2">
              SEARCH <span className="text-white/40 font-light">RESULTS</span>
            </h1>
          </div>

          <div>
            <Button
              variant="outline"
              onClick={() => navigate("/vehicles")}
              icon={<ArrowLeft size={11} />}
              className="!py-3"
            >
              FLEET CATALOG
            </Button>
          </div>
        </div>

        {/* Cinematic Search Console */}
        <div className="bg-[#0b0b0b] border border-white/6 rounded-[28px] p-6 max-w-4xl mx-auto w-full">
          <form onSubmit={handleSearchSubmit} className="relative">
            <div className="flex items-center gap-4 border-b border-white/10 pb-4 focus-within:border-white transition-colors duration-300">
              <SearchIcon size={24} className="text-white/40 shrink-0" />
              <input
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                placeholder="Search by Brand, Model, Category (e.g., Porsche, Drift, AWD)..."
                className="bg-transparent text-lg md:text-2xl font-black outline-none w-full tracking-wide placeholder:text-white/10 text-white"
              />
              <button
                type="submit"
                className="p-3.5 rounded-full bg-white text-black hover:scale-105 active:scale-95 transition duration-300"
              >
                <ArrowRight size={16} />
              </button>
            </div>
            <p className="text-[10px] text-white/20 mt-3 tracking-wider uppercase">
              QUERY MATCHES BRAND · DYNAMIC SPECS · AUTOMOTIVE DIVISIONS
            </p>
          </form>
        </div>

        {/* Results Container */}
        <div className="min-h-[350px]">
          <AnimatePresence mode="wait">
            {queryParam.trim() ? (
              results.length > 0 ? (
                <motion.div
                  key="results"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="space-y-6"
                >
                  <p className="text-[9px] tracking-[0.25em] text-white/30 border-b border-white/5 pb-2">
                    MATCHED MACHINES ({results.length})
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {results.map((car, i) => {
                      const isFav = favorites.map(String).includes(String(car.id));
                      const inComp = compareList.some((item) => String(item.carId) === String(car.id));
                      return (
                        <VehicleCard 
                          key={car.id} 
                          car={car} 
                          index={i} 
                          isFavorite={isFav}
                          inCompare={inComp}
                        />
                      );
                    })}
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="empty-results"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex flex-col items-center justify-center py-20 gap-3 text-center bg-[#0b0b0b] border border-white/6 rounded-3xl min-h-[300px]"
                >
                  <span className="text-3xl">📭</span>
                  <h4 className="text-sm font-black tracking-widest uppercase">
                    NO MATCHES DETECTED
                  </h4>
                  <p className="text-xs text-white/40 max-w-xs leading-relaxed">
                    We couldn't locate any vehicles matching <span className="text-white font-bold font-mono">"{queryParam}"</span>. Check spelling or browse our suggested categories.
                  </p>
                </motion.div>
              )
            ) : (
              <motion.div
                key="suggestion-categories"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="space-y-6"
              >
                <p className="text-[9px] tracking-[0.25em] text-white/30 border-b border-white/5 pb-2">
                  POPULAR FLEET SEGMENTS
                </p>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {[
                    { label: "DRIFT RIGS", term: "Drift", desc: "Aero steering monsters" },
                    { label: "HYPER SUPERCARS", term: "Supercar", desc: "High-horsepower machines" },
                    { label: "LUXURY FLEET", term: "Luxury", desc: "Premium touring specs" },
                    { label: "OFF-ROAD DOMINATORS", term: "Off-Road", desc: "Rugged terrain builds" }
                  ].map((cat) => (
                    <button
                      key={cat.term}
                      onClick={() => handleCategoryClick(cat.term)}
                      className="border border-white/5 bg-white/[0.01] hover:bg-white/[0.04] hover:border-white/20 p-6 rounded-2xl text-left cursor-pointer transition duration-300 hover:scale-102 group"
                    >
                      <h4 className="text-xs font-black tracking-[0.15em] text-white group-hover:text-emerald-400 transition-colors">
                        {cat.label}
                      </h4>
                      <p className="text-[9px] text-white/40 mt-1">{cat.desc}</p>
                      <p className="text-[8px] text-white/25 mt-3 tracking-widest">QUERY SEGMENT →</p>
                    </button>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

      </div>
    </div>
  );
};

export default SearchResults;

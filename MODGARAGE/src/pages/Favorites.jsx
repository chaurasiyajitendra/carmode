import { useMemo } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, ArrowLeft, Plus } from "lucide-react";

import { selectAllCars } from "../features/cars/carSelectors";
import { selectFavorites, selectCompareList } from "../features/customization/customizationSelectors";
import VehicleCard from "../components/cards/VehicleCard";
import Button from "../components/ui/Button";

const formatPrice = (p) => {
  if (p >= 10000000) return `₹${(p / 10000000).toFixed(2)} Cr`;
  if (p >= 100000)   return `₹${(p / 100000).toFixed(1)} L`;
  return `₹${p.toLocaleString()}`;
};

const Favorites = () => {
  const navigate = useNavigate();

  const allCars = useSelector(selectAllCars);
  const favoritedIds = useSelector(selectFavorites);
  const compareList = useSelector(selectCompareList) || [];

  // Map favorited IDs to actual car objects
  const favoritedCars = useMemo(() => {
    if (!allCars || !favoritedIds) return [];
    return allCars.filter((c) => favoritedIds.map(String).includes(String(c.id)));
  }, [allCars, favoritedIds]);

  // Calculate total worth of favorited base cars
  const totalFavoritesValuation = useMemo(() => {
    return favoritedCars.reduce((sum, c) => sum + (c.basePrice || 0), 0);
  }, [favoritedCars]);

  return (
    <div className="min-h-screen bg-[#060606] text-white pt-24 pb-16 px-4 sm:px-6 lg:px-8 select-none">
      <div className="max-w-7xl mx-auto space-y-10">
        
        {/* Top Header Console */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-white/5 pb-8">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
              <p className="text-[9px] font-black tracking-[0.25em] text-red-500">FAVORITES HQ CONSOLE</p>
            </div>
            <h1 className="text-3xl font-black tracking-tight text-white">
              BOOKMARKED <span className="text-white/40 font-light">MACHINES</span>
            </h1>
            <p className="text-xs text-white/30 mt-1 max-w-md">
              Your curated collection of premium supercars, drift rigs, and luxury tuner vehicles.
            </p>
          </div>

          <div className="flex gap-2">
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

        {/* Executive Summary Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { label: "BOOKMARKED WORTH (EST.)", value: formatPrice(totalFavoritesValuation), sub: "Valuation of bookmarked base models" },
            { label: "FAVORITE COUNT", value: favoritedCars.length, sub: "Total bookmarked fleet" },
            { label: "STUDIO SAVED", value: "CLOUD-SYNCED", sub: "Saved directly in local storage" },
            { label: "HQ CAPACITY", value: "UNLIMITED", sub: "Add unlimited rigs to your bookmarked fleet" }
          ].map((stat, i) => (
            <div key={i} className="bg-[#0b0b0b] border border-white/6 rounded-2xl p-5 space-y-1">
              <p className="text-[8px] tracking-[0.2em] text-white/20 font-bold">{stat.label}</p>
              <h2 className="text-xl font-black font-mono tracking-tight text-white">{stat.value}</h2>
              <p className="text-[9px] text-white/40">{stat.sub}</p>
            </div>
          ))}
        </div>

        {/* Dynamic Favorites Showcase Deck */}
        <div className="min-h-[400px]">
          <AnimatePresence mode="wait">
            {favoritedCars.length === 0 ? (
              <motion.div
                key="empty"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.25 }}
                className="flex flex-col items-center justify-center text-center p-12 bg-[#0b0b0b] border border-white/6 rounded-3xl min-h-[350px]"
              >
                <div className="w-12 h-12 rounded-full border border-white/10 bg-white/[0.02] flex items-center justify-center text-white/30 mb-4 animate-pulse">
                  <Heart size={20} className="text-white/20" />
                </div>
                <h3 className="text-base font-black tracking-tight text-white mb-1.5">NO BOOKMARKS YET</h3>
                <p className="text-xs text-white/40 max-w-xs leading-relaxed mb-6">
                  Explore the catalog to bookmark your favorite base models and perform deep tuning customizations.
                </p>
                <Button 
                  variant="primary" 
                  onClick={() => navigate("/vehicles")}
                  icon={<Plus size={12} />}
                >
                  EXPLORE FLEET
                </Button>
              </motion.div>
            ) : (
              <motion.div
                key="list"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.25 }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
              >
                {favoritedCars.map((car, i) => {
                  const isFav = favoritedIds.map(String).includes(String(car.id));
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
              </motion.div>
            )}
          </AnimatePresence>
        </div>

      </div>
    </div>
  );
};

export default Favorites;

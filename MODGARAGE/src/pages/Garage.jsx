import { useState, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { motion, AnimatePresence } from "framer-motion";
import { Cpu, Heart, Plus, FolderGit } from "lucide-react";

import { selectAllCars } from "../features/cars/carSelectors";
import { selectSavedBuilds, selectFavorites, selectCompareList } from "../features/customization/customizationSelectors";
import { deleteSavedBuild, addToCompare } from "../features/customization/customizationSlice";

import BuildCard from "../components/cards/BuildCard";
import VehicleCard from "../components/cards/VehicleCard";
import Button from "../components/ui/Button";

const formatPrice = (p) => {
  if (p >= 10000000) return `₹${(p / 10000000).toFixed(2)} Cr`;
  if (p >= 100000)   return `₹${(p / 100000).toFixed(1)} L`;
  return `₹${p.toLocaleString()}`;
};

const Garage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("specs"); // 'specs' | 'favs'

  const allCars = useSelector(selectAllCars);
  const savedBuilds = useSelector(selectSavedBuilds);
  const favoritedIds = useSelector(selectFavorites);
  const compareList = useSelector(selectCompareList) || [];

  // Map favorited IDs to actual car objects
  const favoritedCars = useMemo(() => {
    if (!allCars || !favoritedIds) return [];
    return allCars.filter(c => favoritedIds.map(String).includes(String(c.id)));
  }, [allCars, favoritedIds]);

  // Map saved builds to include their car details
  const buildsWithCarInfo = useMemo(() => {
    if (!savedBuilds || !allCars) return [];
    return savedBuilds.map(build => {
      const car = allCars.find(c => String(c.id) === String(build.carId));
      return { ...build, car };
    });
  }, [savedBuilds, allCars]);

  // Calculate total garage valuation
  const totalGarageValuation = useMemo(() => {
    let total = 0;
    // Add saved builds value
    buildsWithCarInfo.forEach(b => {
      if (b.totalCost) total += b.totalCost;
    });
    // Add favorited base cars value
    favoritedCars.forEach(c => {
      if (c.basePrice) total += c.basePrice;
    });
    return total;
  }, [buildsWithCarInfo, favoritedCars]);

  const handleDeleteBuild = (buildId) => {
    dispatch(deleteSavedBuild(buildId));
  };

  const handleCompareBuild = (build) => {
    const compareItem = {
      id: build.id,
      carId: build.carId,
      isCustomBuild: true,
      name: build.name,
      visuals: build.visuals,
      totalCost: build.totalCost,
      stats: build.car ? build.car.stats : { speed: 50, handling: 50, comfort: 50 },
      car: build.car
    };
    dispatch(addToCompare(compareItem));
    navigate("/compare");
  };

  return (
    <div className="min-h-screen bg-[#060606] text-white pt-24 pb-16 px-4 sm:px-6 lg:px-8 select-none">
      <div className="max-w-7xl mx-auto space-y-10">
        
        {/* Top Header Console */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-white/5 pb-8">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
              <p className="text-[9px] font-black tracking-[0.25em] text-red-500">GARAGE HQ CONSOLE</p>
            </div>
            <h1 className="text-3xl font-black tracking-tight text-white">
              MY CUSTOM <span className="text-white/40 font-light">FLEET</span>
            </h1>
            <p className="text-xs text-white/30 mt-1 max-w-md">
              Manage your personal showroom of custom tuner specs and catalog bookmarks.
            </p>
          </div>

          <div className="flex bg-black/40 border border-white/8 rounded-full p-1.5 backdrop-blur-md">
            <button
              onClick={() => setActiveTab("specs")}
              className={`flex items-center gap-2 text-[9px] font-black tracking-widest px-6 py-3 rounded-full transition-all duration-300 ${
                activeTab === "specs"
                  ? "bg-white text-black shadow-lg"
                  : "text-white/40 hover:text-white/80"
              }`}
            >
              <Cpu size={11} />
              CUSTOM SPECS ({savedBuilds.length})
            </button>
            <button
              onClick={() => setActiveTab("favs")}
              className={`flex items-center gap-2 text-[9px] font-black tracking-widest px-6 py-3 rounded-full transition-all duration-300 ${
                activeTab === "favs"
                  ? "bg-white text-black shadow-lg"
                  : "text-white/40 hover:text-white/80"
              }`}
            >
              <Heart size={11} />
              FAVORITES ({favoritedCars.length})
            </button>
          </div>
        </div>

        {/* Garage Executive Summary stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { label: "FLEET WORTH (EST.)", value: formatPrice(totalGarageValuation), sub: "Total valuation of active assets" },
            { label: "SAVED SPECS", value: savedBuilds.length, sub: "Tuner modifications signed" },
            { label: "FAVORITED BASE", value: favoritedCars.length, sub: "Catalog bookmarked models" },
            { label: "HQ CAPACITY", value: "UNLIMITED", sub: "Cloud synced via local storage" }
          ].map((stat, i) => (
            <div key={i} className="bg-[#0b0b0b] border border-white/6 rounded-2xl p-5 space-y-1">
              <p className="text-[8px] tracking-[0.2em] text-white/20 font-bold">{stat.label}</p>
              <h2 className="text-xl font-black font-mono tracking-tight text-white">{stat.value}</h2>
              <p className="text-[9px] text-white/40">{stat.sub}</p>
            </div>
          ))}
        </div>

        {/* Dynamic Showcase Deck */}
        <div className="min-h-[400px]">
          <AnimatePresence mode="wait">
            {activeTab === "specs" && (
              <motion.div
                key="specs"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.25 }}
              >
                {buildsWithCarInfo.length === 0 ? (
                  <div className="flex flex-col items-center justify-center text-center p-12 bg-[#0b0b0b] border border-white/6 rounded-3xl min-h-[350px]">
                    <div className="w-12 h-12 rounded-full border border-white/10 bg-white/[0.02] flex items-center justify-center text-white/30 mb-4">
                      <FolderGit size={22} />
                    </div>
                    <h3 className="text-base font-black tracking-tight text-white mb-1.5">GARAGE BAY EMPTY</h3>
                    <p className="text-xs text-white/40 max-w-xs leading-relaxed mb-6">
                      You haven't signed any custom visualizer specs yet. Head to the custom studio to tune your dream rig.
                    </p>
                    <Button 
                      variant="primary" 
                      onClick={() => navigate("/vehicles")}
                      icon={<Plus size={12} />}
                    >
                      BROWSE ALL CARS
                    </Button>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {buildsWithCarInfo.map((build) => (
                      <BuildCard
                        key={build.id}
                        build={build}
                        car={build.car}
                        onDelete={handleDeleteBuild}
                        onCompare={() => handleCompareBuild(build)}
                      />
                    ))}
                  </div>
                )}
              </motion.div>
            )}

            {activeTab === "favs" && (
              <motion.div
                key="favs"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.25 }}
              >
                {favoritedCars.length === 0 ? (
                  <div className="flex flex-col items-center justify-center text-center p-12 bg-[#0b0b0b] border border-white/6 rounded-3xl min-h-[350px]">
                    <div className="w-12 h-12 rounded-full border border-white/10 bg-white/[0.02] flex items-center justify-center text-white/30 mb-4">
                      <Heart size={20} className="text-white/20" />
                    </div>
                    <h3 className="text-base font-black tracking-tight text-white mb-1.5">NO FAVORITES BOOKMARKED</h3>
                    <p className="text-xs text-white/40 max-w-xs leading-relaxed mb-6">
                      Bookmark your favorite premium supercars, drift rigs, and luxury SUVs from the fleet catalog.
                    </p>
                    <Button 
                      variant="primary" 
                      onClick={() => navigate("/vehicles")}
                      icon={<Plus size={12} />}
                    >
                      EXPLORE FLEET
                    </Button>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

      </div>
    </div>
  );
};

export default Garage;

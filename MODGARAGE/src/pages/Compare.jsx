import { useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { motion, AnimatePresence } from "framer-motion";
import { Trash2, PlusCircle, Columns } from "lucide-react";

import { selectAllCars } from "../features/cars/carSelectors";
import { selectCompareList } from "../features/customization/customizationSelectors";
import { removeFromCompare, clearCompare, addToCompare } from "../features/customization/customizationSlice";
import Button from "../components/ui/Button";
import ProgressBar from "../components/ui/ProgressBar";

const formatPrice = (p) => {
  if (p >= 10000000) return `₹${(p / 10000000).toFixed(2)} Cr`;
  if (p >= 100000)   return `₹${(p / 100000).toFixed(1)} L`;
  return `₹${p.toLocaleString()}`;
};

const Compare = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const allCars = useSelector(selectAllCars);
  const rawCompareList = useSelector(selectCompareList);

  // Hydrate raw compare items with base car objects if needed
  const compareList = useMemo(() => {
    if (!rawCompareList || !allCars) return [];
    return rawCompareList.map(item => {
      // If it's already got the car details (like custom build added from studio), use it.
      if (item.car) return item;
      
      // Otherwise find the base car details
      const car = allCars.find(c => String(c.id) === String(item.id || item.carId));
      if (!car) return null;
      return {
        id: String(car.id),
        carId: car.id,
        isCustomBuild: false,
        name: `${car.brand.toUpperCase()} ${car.model.toUpperCase()}`,
        visuals: null,
        totalCost: car.basePrice,
        stats: car.stats,
        car
      };
    }).filter(Boolean);
  }, [rawCompareList, allCars]);

  // Find max stats in the currently compared set to highlight the winner
  const winners = useMemo(() => {
    const wins = { hp: 0, speed: 0, handling: 0, comfort: 0, durability: 0, cost: Infinity };
    if (compareList.length === 0) return wins;

    compareList.forEach(item => {
      // Parse HP
      const hpVal = item.stats.hp || item.car.specs.hp || 0;
      if (hpVal > wins.hp) wins.hp = hpVal;

      if (item.stats.speed > wins.speed) wins.speed = item.stats.speed;
      if (item.stats.handling > wins.handling) wins.handling = item.stats.handling;
      if (item.stats.comfort > wins.comfort) wins.comfort = item.stats.comfort;
      
      const durVal = item.stats.durability || item.car.stats.durability || 80;
      if (durVal > wins.durability) wins.durability = durVal;

      if (item.totalCost < wins.cost) wins.cost = item.totalCost;
    });

    return wins;
  }, [compareList]);

  // Available cars that can be added (not already in comparison)
  const availableToAdd = useMemo(() => {
    if (!allCars || !compareList) return [];
    const comparedIds = compareList.map(c => String(c.carId));
    return allCars.filter(c => !comparedIds.includes(String(c.id)));
  }, [allCars, compareList]);

  const handleRemove = (itemId) => {
    dispatch(removeFromCompare(itemId));
  };

  const handleClearAll = () => {
    dispatch(clearCompare());
  };

  const handleAddCar = (carId) => {
    const car = allCars.find(c => String(c.id) === String(carId));
    if (car && compareList.length < 3) {
      dispatch(addToCompare({
        id: String(car.id),
        carId: car.id,
        isCustomBuild: false,
        name: `${car.brand.toUpperCase()} ${car.model.toUpperCase()}`,
        visuals: null,
        totalCost: car.basePrice,
        stats: car.stats,
        car
      }));
    }
  };

  return (
    <div className="min-h-screen bg-[#060606] text-white pt-24 pb-16 px-4 sm:px-6 lg:px-8 select-none">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Top Header Controls */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-white/5 pb-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <p className="text-[9px] font-black tracking-[0.25em] text-emerald-500">SPECIFICATION CROSS-MATRIX</p>
            </div>
            <h1 className="text-3xl font-black tracking-tight text-white flex items-center gap-2">
              <Columns size={24} className="text-emerald-400" />
              COMPARE <span className="text-white/40 font-light">SPECS</span>
            </h1>
          </div>

          <div className="flex gap-2">
            <Button 
              variant="outline" 
              onClick={() => navigate("/vehicles")}
              className="!py-3"
            >
              CATALOG
            </Button>
            {compareList.length > 0 && (
              <Button 
                variant="danger" 
                onClick={handleClearAll}
                className="!py-3"
                icon={<Trash2 size={11} />}
              >
                CLEAR BOARD
              </Button>
            )}
          </div>
        </div>

        {/* COMPARISON SLOTS ROW */}
        {compareList.length === 0 ? (
          <div className="flex flex-col items-center justify-center text-center p-12 bg-[#0b0b0b] border border-white/6 rounded-3xl min-h-[400px]">
            <div className="w-12 h-12 rounded-full border border-white/10 bg-white/[0.02] flex items-center justify-center text-white/30 mb-4 animate-bounce">
              <Columns size={22} />
            </div>
            <h3 className="text-base font-black tracking-tight text-white mb-1.5">BOARD IS EMPTY</h3>
            <p className="text-xs text-white/40 max-w-xs leading-relaxed mb-6">
              Add up to 3 cars from the fleet catalog or custom garage saved specs to perform cross-matrix performance evaluations.
            </p>
            <Button 
              variant="primary" 
              onClick={() => navigate("/vehicles")}
            >
              BROWSE VEHICLES
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch">
            <AnimatePresence mode="popLayout">
              
              {/* Slots 1, 2, 3 mapped from compareList */}
              {compareList.map((item) => {
                const hpVal = item.stats.hp || item.car.specs.hp || 0;
                const speedVal = item.stats.speed;
                const handlingVal = item.stats.handling;
                const comfortVal = item.stats.comfort;
                const durVal = item.stats.durability || item.car.stats.durability || 80;

                return (
                  <motion.div
                    key={item.id}
                    layout
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="relative bg-[#0b0b0b] border border-white/6 rounded-[28px] p-6 flex flex-col justify-between"
                  >
                    {/* Corner Remove Button */}
                    <button
                      onClick={() => handleRemove(item.id)}
                      className="absolute top-4 right-4 p-2 rounded-full bg-white/[0.03] border border-white/8 hover:bg-red-500/10 hover:border-red-500/20 hover:text-red-400 transition-all duration-300 z-20"
                      title="Remove from compare board"
                    >
                      <Trash2 size={12} />
                    </button>

                    {/* upper visual slot */}
                    <div className="space-y-4">
                      <div className="relative h-[130px] rounded-2xl overflow-hidden bg-black/30 flex items-center justify-center">
                        <img 
                          src={item.car.image} 
                          alt={item.name} 
                          className="max-h-[110px] object-contain"
                        />
                        {item.isCustomBuild && (
                          <div className="absolute top-2 left-2">
                            <span className="text-[7.5px] font-black tracking-widest text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/25">
                              CUSTOM TUNED
                            </span>
                          </div>
                        )}
                      </div>

                      {/* Header details */}
                      <div>
                        <p className="text-[8.5px] tracking-widest text-white/30 font-bold mb-0.5">
                          {item.car.brand.toUpperCase()}
                        </p>
                        <h3 className="text-base font-black tracking-tight text-white line-clamp-1">
                          {item.name.toUpperCase()}
                        </h3>
                        <p className="text-xs font-mono font-bold text-emerald-400 mt-1.5">
                          {formatPrice(item.totalCost)}
                          {winners.cost === item.totalCost && compareList.length > 1 && (
                            <span className="text-[8px] bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-2 py-0.5 rounded-full ml-2">
                              BEST VALUE
                            </span>
                          )}
                        </p>
                      </div>

                      {/* Hard specs list section */}
                      <div className="border-y border-white/5 py-4 space-y-2.5">
                        <p className="text-[8px] tracking-[0.2em] text-white/20 font-bold">RAW VEHICLE SPECIFICATIONS</p>
                        {[
                          { label: "Engine Block", val: item.car.specs.engine },
                          { label: "Transmission", val: item.car.specs.transmission },
                          { label: "Drivetrain Layout", val: item.car.specs.driveTrain },
                          { label: "Fuel Type", val: item.car.specs.fuelType }
                        ].map((row, i) => (
                          <div key={i} className="flex justify-between items-start text-[9px]">
                            <span className="text-white/30">{row.label}</span>
                            <span className="font-bold text-white/70 text-right truncate max-w-[150px]">{row.val}</span>
                          </div>
                        ))}
                      </div>

                      {/* Performance Bar Charts section */}
                      <div className="space-y-3.5 pt-2">
                        <p className="text-[8px] tracking-[0.2em] text-white/20 font-bold">PERFORMANCE RATINGS</p>
                        
                        {/* HP Dial */}
                        <div className="flex justify-between items-center text-[9px] font-mono">
                          <span className="text-white/40 font-semibold">POWER (HP)</span>
                          <span className="font-bold">
                            {hpVal} HP 
                            {winners.hp === hpVal && compareList.length > 1 && (
                              <span className="text-[7.5px] bg-emerald-500/10 text-emerald-400 px-1.5 py-0.5 rounded ml-1.5 font-bold">MAX</span>
                            )}
                          </span>
                        </div>

                        {/* Speed Progress Bar */}
                        <div className="space-y-1">
                          <div className="flex justify-between text-[9px] font-mono text-white/40">
                            <span>VELOCITY INDEX (SPD)</span>
                            <span className="font-bold text-white">
                              {speedVal} 
                              {winners.speed === speedVal && compareList.length > 1 && <span className="text-[7.5px] text-emerald-400 font-bold ml-1">MAX</span>}
                            </span>
                          </div>
                          <ProgressBar value={speedVal} accentColor={winners.speed === speedVal && compareList.length > 1 ? "#10b981" : "#ffffff"} height="h-[3px]" />
                        </div>

                        {/* Handling Progress Bar */}
                        <div className="space-y-1">
                          <div className="flex justify-between text-[9px] font-mono text-white/40">
                            <span>LATERAL GRIP (HDL)</span>
                            <span className="font-bold text-white">
                              {handlingVal}
                              {winners.handling === handlingVal && compareList.length > 1 && <span className="text-[7.5px] text-emerald-400 font-bold ml-1">MAX</span>}
                            </span>
                          </div>
                          <ProgressBar value={handlingVal} accentColor={winners.handling === handlingVal && compareList.length > 1 ? "#10b981" : "#ffffff"} height="h-[3px]" />
                        </div>

                        {/* Comfort Progress Bar */}
                        <div className="space-y-1">
                          <div className="flex justify-between text-[9px] font-mono text-white/40">
                            <span>CABIN COMFORT (CMF)</span>
                            <span className="font-bold text-white">
                              {comfortVal}
                              {winners.comfort === comfortVal && compareList.length > 1 && <span className="text-[7.5px] text-emerald-400 font-bold ml-1">MAX</span>}
                            </span>
                          </div>
                          <ProgressBar value={comfortVal} accentColor={winners.comfort === comfortVal && compareList.length > 1 ? "#10b981" : "#ffffff"} height="h-[3px]" />
                        </div>

                        {/* Durability Progress Bar */}
                        <div className="space-y-1">
                          <div className="flex justify-between text-[9px] font-mono text-white/40">
                            <span>CHASSIS SHIELD (DUR)</span>
                            <span className="font-bold text-white">
                              {durVal}
                              {winners.durability === durVal && compareList.length > 1 && <span className="text-[7.5px] text-emerald-400 font-bold ml-1">MAX</span>}
                            </span>
                          </div>
                          <ProgressBar value={durVal} accentColor={winners.durability === durVal && compareList.length > 1 ? "#10b981" : "#ffffff"} height="h-[3px]" />
                        </div>

                      </div>
                    </div>
                  </motion.div>
                );
              })}

              {/* Add Slots if less than 3 compared */}
              {compareList.length < 3 && Array.from({ length: 3 - compareList.length }).map((_, idx) => (
                <div 
                  key={`empty-${idx}`} 
                  className="bg-[#0b0b0b]/35 border border-dashed border-white/10 rounded-[28px] p-6 flex flex-col justify-center items-center min-h-[480px] text-center select-none"
                >
                  <PlusCircle size={28} className="text-white/20 mb-3 animate-pulse" />
                  <h4 className="text-xs font-black tracking-widest text-white/50 mb-1.5">OPEN COMPARE SLOT</h4>
                  <p className="text-[9px] text-white/35 max-w-[200px] mb-4">
                    Add another premium vehicle to perform spec audits.
                  </p>
                  
                  {availableToAdd.length > 0 ? (
                    <select
                      onChange={(e) => {
                        if (e.target.value) {
                          handleAddCar(e.target.value);
                          e.target.value = ""; // reset
                        }
                      }}
                      className="bg-black border border-white/10 rounded-xl px-4 py-2 text-[9px] font-black tracking-widest text-white outline-none cursor-pointer w-full max-w-[180px]"
                      defaultValue=""
                    >
                      <option value="" disabled>ADD VEHICLE...</option>
                      {availableToAdd.map(c => (
                        <option key={c.id} value={c.id}>
                          {c.brand.toUpperCase()} {c.model}
                        </option>
                      ))}
                    </select>
                  ) : (
                    <Button 
                      variant="outline" 
                      onClick={() => navigate("/vehicles")}
                      className="!py-2.5 !px-5"
                    >
                      CATALOG
                    </Button>
                  )}
                </div>
              ))}

            </AnimatePresence>
          </div>
        )}

      </div>
    </div>
  );
};

export default Compare;

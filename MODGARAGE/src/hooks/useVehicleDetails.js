import { useState, useCallback, useMemo } from "react";
import { useParams, useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { selectCarById } from "../features/cars/carSelectors";
import {
  toggleModForCar,
  clearModsForCar,
  toggleFavorite,
  addToCompare,
  removeFromCompare,
  saveBuild,
} from "../features/customization/customizationSlice";
import {
  selectSelectedModIdsForCar,
  selectComputedStatsForCar,
  selectTotalModCostForCar,
  selectActiveModsDetailsForCar,
  selectFavorites,
  selectCompareList,
} from "../features/customization/customizationSelectors";
import { CATEGORY_ACCENTS } from "../utils/vehiclesData";
import { MOD_TREES, FALLBACK_MODS } from "../constants/modTrees";

const EMPTY_ARRAY = [];

export function useVehicleDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const car = useSelector((state) => selectCarById(state, id));

  const [hoveredMod, setHoveredMod] = useState(null);
  const [activeCatId, setActiveCatId] = useState(null);
  const [isQuoteOpen, setIsQuoteOpen] = useState(false);
  const [quoteSubmitted, setQuoteSubmitted] = useState(false);
  const [isSaveOpen, setIsSaveOpen] = useState(false);
  const [buildName, setBuildName] = useState("");
  const [toastMsg, setToastMsg] = useState(null);
  const [formData, setFormData] = useState({
    name: "", email: "", phone: "", message: "",
  });

  const accent = useMemo(
    () => (car ? (CATEGORY_ACCENTS[car.category] ?? "#ffffff") : "#ffffff"),
    [car]
  );

  const modTree = useMemo(
    () => (car ? MOD_TREES[car.category] || FALLBACK_MODS : []),
    [car]
  );

  const effectiveCat = activeCatId ?? modTree[0]?.id;
  const currentCatData = useMemo(
    () => modTree.find((c) => c.id === effectiveCat),
    [modTree, effectiveCat]
  );

  const selectedModIds =
    useSelector((state) => selectSelectedModIdsForCar(state, id)) ?? EMPTY_ARRAY;
  const activeMods =
    useSelector((state) => selectActiveModsDetailsForCar(state, car)) ?? EMPTY_ARRAY;
  const totalCost = useSelector((state) => selectTotalModCostForCar(state, car)) || 0;

  // ── FIX: separate base stats and hovered preview stats ──
  const baseStats   = useSelector((state) => selectComputedStatsForCar(state, car, null));
  const previewStats = useSelector((state) => selectComputedStatsForCar(state, car, hoveredMod));
  // displayNums is always defined — falls back to baseStats
  const displayNums = hoveredMod && previewStats ? previewStats : baseStats;

  const baseNums = useMemo(() => {
    if (!car) return {};
    return {
      hp: car.specs.hp,
      torque: parseInt(car.specs.torque) || 0,
      topSpeed: parseInt(car.specs.topSpeed) || 0,
      handling: car.stats.handling,
      comfort: car.stats.comfort,
    };
  }, [car]);

  const favorites = useSelector(selectFavorites);
  const compareList = useSelector(selectCompareList);

  const isFavorite = useMemo(
    () => (car ? favorites.includes(String(car.id)) : false),
    [favorites, car]
  );

  const inCompare = useMemo(
    () => (car ? compareList.some((item) => String(item.id) === String(car.id)) : false),
    [compareList, car]
  );

  const showToast = useCallback((msg) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 3000);
  }, []);

  const handleFavoriteToggle = useCallback(() => {
    if (!car) return;
    dispatch(toggleFavorite(car.id));
    showToast(isFavorite ? "Removed from Favorites" : "Added to Favorites");
  }, [dispatch, car, isFavorite, showToast]);

  const handleCompareToggle = useCallback(() => {
    if (!car) return;
    if (inCompare) {
      dispatch(removeFromCompare(car.id));
      showToast("Removed from Compare Board");
    } else {
      if (compareList.length >= 3) {
        showToast("Compare Board is full! Max 3 cars.");
        return;
      }
      dispatch(addToCompare({
        id: String(car.id),
        carId: car.id,
        isCustomBuild: selectedModIds.length > 0,
        name:
          selectedModIds.length > 0
            ? `${car.brand.toUpperCase()} ${car.model.toUpperCase()} (TUNED)`
            : `${car.brand.toUpperCase()} ${car.model.toUpperCase()}`,
        totalCost: car.basePrice + totalCost,
        stats: {
          hp: displayNums?.hp ?? car.specs.hp,
          speed: Math.round(((displayNums?.topSpeed ?? 0) / 500) * 100),
          handling: displayNums?.handling ?? car.stats.handling,
          comfort: displayNums?.comfort ?? car.stats.comfort,
          durability: car.stats.durability || 80,
        },
        car,
      }));
      showToast("Added to Compare Board");
    }
  }, [dispatch, car, inCompare, compareList, selectedModIds, totalCost, displayNums, showToast]);

  const handleModToggle = useCallback(
    (modId) => dispatch(toggleModForCar({ carId: car.id, modId })),
    [dispatch, car]
  );

  const handleClearAllMods = useCallback(
    () => dispatch(clearModsForCar(car.id)),
    [dispatch, car]
  );

  const handleFormChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormData((p) => ({ ...p, [name]: value }));
  }, []);

  const handleFormSubmit = useCallback((e) => {
    e.preventDefault();
    setQuoteSubmitted(true);
  }, []);

  const handleCloseQuoteModal = useCallback(() => {
    setIsQuoteOpen(false);
    setTimeout(() => {
      setQuoteSubmitted(false);
      setFormData({ name: "", email: "", phone: "", message: "" });
    }, 300);
  }, []);

  const handleSaveBuildSubmit = useCallback(
    (e) => {
      e.preventDefault();
      if (!car) return;
      dispatch(saveBuild({
        carId: car.id,
        name: buildName,
        modIds: selectedModIds,
        visuals: {
          wheels: "OEM Premium", spoiler: "Stock Lip",
          headlights: "OEM Xenon", bodyKit: "Stock Aero",
          neon: "None", exhaust: "Stock Chrome",
          interior: "OEM Nappa", tint: "Clear",
          rimsColor: "Silver Chrome", driveMode: "Street Mode",
        },
        totalCost: car.basePrice + totalCost,
      }));
      setIsSaveOpen(false);
      showToast("Specification saved to Garage!");
    },
    [dispatch, car, buildName, selectedModIds, totalCost, showToast]
  );

  return {
    id, car, navigate, accent,
    modTree, effectiveCat, currentCatData, activeCatId, setActiveCatId,
    hoveredMod, setHoveredMod,
    selectedModIds, activeMods, totalCost,
    displayNums, baseNums,       // ← clean, always-defined values
    isFavorite, inCompare,
    toastMsg,
    isQuoteOpen, setIsQuoteOpen,
    quoteSubmitted,
    formData, handleFormChange, handleFormSubmit, handleCloseQuoteModal,
    isSaveOpen, setIsSaveOpen,
    buildName, setBuildName, handleSaveBuildSubmit,
    handleModToggle, handleClearAllMods,
    handleFavoriteToggle, handleCompareToggle,
  };
}
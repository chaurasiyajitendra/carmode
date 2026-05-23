import { createSlice } from "@reduxjs/toolkit";

// LocalStorage helpers to ensure state persistence
const loadState = (key, fallback) => {
  try {
    const serialized = localStorage.getItem(key);
    if (serialized === null) return fallback;
    return JSON.parse(serialized);
  } catch {
    return fallback;
  }
};

const saveState = (key, data) => {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (err) {
    console.error("Failed to persist state:", err);
  }
};

const initialState = {
  buildsByCarId: loadState("modgarage_buildsByCarId", {}), // { [carId]: [modId1, modId2, ...] }
  savedBuilds: loadState("modgarage_savedBuilds", []),     // Array of custom build configurations
  favorites: loadState("modgarage_favorites", []),         // Array of car IDs (favorited)
  compareList: loadState("modgarage_compareList", []),     // Array of car/build objects for comparison
};

const customizationSlice = createSlice({
  name: "customization",
  initialState,
  reducers: {
    toggleModForCar: (state, action) => {
      const { carId, modId } = action.payload;
      if (!state.buildsByCarId[carId]) {
        state.buildsByCarId[carId] = [];
      }
      
      const index = state.buildsByCarId[carId].indexOf(modId);
      if (index > -1) {
        state.buildsByCarId[carId].splice(index, 1);
      } else {
        state.buildsByCarId[carId].push(modId);
      }
      saveState("modgarage_buildsByCarId", state.buildsByCarId);
    },
    
    clearModsForCar: (state, action) => {
      const carId = action.payload;
      state.buildsByCarId[carId] = [];
      saveState("modgarage_buildsByCarId", state.buildsByCarId);
    },
    
    saveBuild: (state, action) => {
      const { carId, name, modIds, visuals, totalCost } = action.payload;
      state.savedBuilds.push({
        id: `build_${Date.now()}`,
        carId,
        name: name || `Custom Spec ${state.savedBuilds.length + 1}`,
        modIds: [...(modIds || [])],
        visuals: visuals || {
          color: "#ffffff",
          paintType: "Stock",
          wheels: "OEM Premium",
          spoiler: "Stock Lip",
          headlights: "OEM Xenon",
          bodyKit: "Stock Aero",
          neon: "None",
          exhaust: "Stock Chrome",
          interior: "OEM Nappa",
          tint: "Clear",
          rimsColor: "Silver Chrome",
          driveMode: "Street Mode",
        },
        totalCost: totalCost || 0,
        timestamp: new Date().toISOString(),
      });
      saveState("modgarage_savedBuilds", state.savedBuilds);
    },
    
    deleteSavedBuild: (state, action) => {
      const buildId = action.payload;
      state.savedBuilds = state.savedBuilds.filter((b) => b.id !== buildId);
      saveState("modgarage_savedBuilds", state.savedBuilds);
    },

    toggleFavorite: (state, action) => {
      const carId = String(action.payload);
      const index = state.favorites.indexOf(carId);
      if (index > -1) {
        state.favorites.splice(index, 1);
      } else {
        state.favorites.push(carId);
      }
      saveState("modgarage_favorites", state.favorites);
    },

    addToCompare: (state, action) => {
      const item = action.payload; // can be { id, carId, isCustomBuild, ... } or just carId
      const exists = state.compareList.some(
        (c) => String(c.id) === String(item.id)
      );
      if (!exists && state.compareList.length < 3) {
        state.compareList.push(item);
        saveState("modgarage_compareList", state.compareList);
      }
    },

    removeFromCompare: (state, action) => {
      const itemId = String(action.payload);
      state.compareList = state.compareList.filter((c) => String(c.id) !== itemId);
      saveState("modgarage_compareList", state.compareList);
    },

    clearCompare: (state) => {
      state.compareList = [];
      saveState("modgarage_compareList", state.compareList);
    },
  },
});

export const {
  toggleModForCar,
  clearModsForCar,
  saveBuild,
  deleteSavedBuild,
  toggleFavorite,
  addToCompare,
  removeFromCompare,
  clearCompare,
} = customizationSlice.actions;

export default customizationSlice.reducer;

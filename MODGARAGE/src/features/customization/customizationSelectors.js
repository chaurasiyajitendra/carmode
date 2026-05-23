import { createSelector } from "@reduxjs/toolkit";
import { MOD_TREES, FALLBACK_MODS } from "../../constants/modTrees";

export const selectCustomizationState = (state) => state.customization;

export const selectBuildsByCarId = createSelector(
  [selectCustomizationState],
  (cust) => cust.buildsByCarId
);

export const selectSavedBuilds = createSelector(
  [selectCustomizationState],
  (cust) => cust.savedBuilds
);

export const selectFavorites = createSelector(
  [selectCustomizationState],
  (cust) => cust.favorites || []
);

export const selectCompareList = createSelector(
  [selectCustomizationState],
  (cust) => cust.compareList || []
);

// Standard parameterized selector lookup ( O(1) key check )
export const selectSelectedModIdsForCar = (state, carId) => {
  const builds = selectBuildsByCarId(state);
  return builds[carId] || [];
};

// Parameterized selector to calculate cumulative performance stats for a vehicle
export const selectComputedStatsForCar = (state, car, extraMod = null) => {
  if (!car) return null;
  const selectedModIds = selectSelectedModIdsForCar(state, car.id);
  const modTree = MOD_TREES[car.category] || FALLBACK_MODS;
  const allMods = modTree.flatMap((c) => c.mods);

  const baseNums = {
    hp: car.specs.hp,
    torque: parseInt(car.specs.torque) || 0,
    topSpeed: parseInt(car.specs.topSpeed) || 0,
    handling: car.stats.handling,
    comfort: car.stats.comfort,
  };

  const selectedSet = new Set(selectedModIds);
  
  const stats = { ...baseNums };
  const applyFx = (fx) => {
    stats.hp += fx.hp ?? 0;
    stats.torque += fx.torque ?? 0;
    stats.topSpeed += fx.topSpeed ?? 0;
    stats.handling = Math.min(100, Math.max(0, stats.handling + (fx.handling ?? 0)));
    stats.comfort = Math.min(100, Math.max(0, stats.comfort + (fx.comfort ?? 0)));
  };

  // Apply selected mods
  selectedModIds.forEach((mid) => {
    const m = allMods.find((x) => x.id === mid);
    if (m) applyFx(m.fx);
  });

  // Apply extra preview mod if specified and not already active
  if (extraMod && !selectedSet.has(extraMod.id)) {
    applyFx(extraMod.fx);
  }

  return stats;
};

// Parameterized selector to calculate total modification cost for a car
export const selectTotalModCostForCar = (state, car) => {
  if (!car) return 0;
  const selectedModIds = selectSelectedModIdsForCar(state, car.id);
  const modTree = MOD_TREES[car.category] || FALLBACK_MODS;
  const allMods = modTree.flatMap((c) => c.mods);
  
  return selectedModIds.reduce((sum, mid) => {
    const m = allMods.find((x) => x.id === mid);
    return sum + (m ? m.cost : 0);
  }, 0);
};

// Parameterized selector to get fully detailed active mods for a car
export const selectActiveModsDetailsForCar = (state, car) => {
  if (!car) return [];
  const selectedModIds = selectSelectedModIdsForCar(state, car.id);
  const modTree = MOD_TREES[car.category] || FALLBACK_MODS;
  const allMods = modTree.flatMap((c) => c.mods);
  return allMods.filter((m) => selectedModIds.includes(m.id));
};

// Parameterized selector to check if a car is favorite
export const selectIsCarFavorite = (state, carId) => {
  const favorites = selectFavorites(state);
  return favorites.includes(String(carId));
};



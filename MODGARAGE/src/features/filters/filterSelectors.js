import { createSelector } from "@reduxjs/toolkit";
import { selectAllCars } from "../cars/carSelectors";

export const selectFiltersState = (state) => state.filters;

export const selectActiveCategory = createSelector(
  [selectFiltersState],
  (filters) => filters.activeCategory
);

export const selectSearchQuery = createSelector(
  [selectFiltersState],
  (filters) => filters.searchQuery
);

export const selectSortBy = createSelector(
  [selectFiltersState],
  (filters) => filters.sortBy
);

export const selectDriveFilter = createSelector(
  [selectFiltersState],
  (filters) => filters.driveFilter
);

export const selectShowFilters = createSelector(
  [selectFiltersState],
  (filters) => filters.showFilters
);

// Memoized filtered & sorted cars list
export const selectFilteredCars = createSelector(
  [selectAllCars, selectActiveCategory, selectSearchQuery, selectSortBy, selectDriveFilter],
  (cars, activeCategory, searchQuery, sortBy, driveFilter) => {
    let result = [...cars];

    // Filter by Category
    if (activeCategory !== "ALL") {
      result = result.filter((c) => c.category === activeCategory);
    }

    // Filter by Search Query
    if (searchQuery && searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (c) =>
          c.model.toLowerCase().includes(query) ||
          c.brand.toLowerCase().includes(query)
      );
    }

    // Filter by Drivetrain
    if (driveFilter !== "ALL") {
      result = result.filter((c) => c.specs.driveTrain === driveFilter);
    }

    // Sort Results
    switch (sortBy) {
      case "hp_desc":
        result.sort((a, b) => b.specs.hp - a.specs.hp);
        break;
      case "price_asc":
        result.sort((a, b) => a.basePrice - b.basePrice);
        break;
      case "price_desc":
        result.sort((a, b) => b.basePrice - a.basePrice);
        break;
      case "speed_desc":
        // topSpeed is currently a string like "250 km/h" or "480 km/h+". Let's parse it safely if comparing numeric top speed, or compare raw stats.speed.
        // The original code was: cars.sort((a, b) => b.stats.speed - a.stats.speed) which uses stats.speed.
        result.sort((a, b) => b.stats.speed - a.stats.speed);
        break;
      default:
        // default / featured (id order)
        break;
    }

    return result;
  }
);

// Category counts selector
export const selectCategoryCounts = createSelector(
  [selectAllCars],
  (cars) => {
    const counts = {};
    cars.forEach((c) => {
      counts[c.category] = (counts[c.category] ?? 0) + 1;
    });
    return counts;
  }
);

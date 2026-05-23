import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  activeCategory: "ALL",
  searchQuery: "",
  sortBy: "default",
  driveFilter: "ALL",
  showFilters: false,
};

const filterSlice = createSlice({
  name: "filters",
  initialState,
  reducers: {
    setActiveCategory: (state, action) => {
      state.activeCategory = action.payload;
    },
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload;
    },
    setSortBy: (state, action) => {
      state.sortBy = action.payload;
    },
    setDriveFilter: (state, action) => {
      state.driveFilter = action.payload;
    },
    toggleShowFilters: (state) => {
      state.showFilters = !state.showFilters;
    },
    setShowFilters: (state, action) => {
      state.showFilters = action.payload;
    },
    clearAllFilters: (state) => {
      state.searchQuery = "";
      state.driveFilter = "ALL";
    },
    resetFilters: () => initialState,
  },
});

export const {
  setActiveCategory,
  setSearchQuery,
  setSortBy,
  setDriveFilter,
  toggleShowFilters,
  setShowFilters,
  clearAllFilters,
  resetFilters,
} = filterSlice.actions;

export default filterSlice.reducer;

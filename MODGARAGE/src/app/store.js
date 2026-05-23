import { configureStore } from "@reduxjs/toolkit";
import carsReducer from "../features/cars/carSlice";
import customizationReducer from "../features/customization/customizationSlice";
import filtersReducer from "../features/filters/filterSlice";

export const store = configureStore({
  reducer: {
    cars: carsReducer,
    customization: customizationReducer,
    filters: filtersReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, 
    }),
});

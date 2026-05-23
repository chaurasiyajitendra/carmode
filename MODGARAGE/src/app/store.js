import { configureStore } from "@reduxjs/toolkit";
import carsReducer from "../features/cars/carSlice";
import customizationReducer from "../features/customization/customizationSlice";
import filtersReducer from "../features/filters/filterSlice";
import authReducer from "../features/auth/authSlice";
import { authMiddleware } from "../features/auth/authMiddleware";

export const store = configureStore({
  reducer: {
    cars: carsReducer,
    customization: customizationReducer,
    filters: filtersReducer,
    auth: authReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, 
    }).concat(authMiddleware),
});

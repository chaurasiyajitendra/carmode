import { createSelector } from "@reduxjs/toolkit";

const selectCarsState = (state) => state.cars;

export const selectAllCars = createSelector(
  [selectCarsState],
  (carsState) => carsState.list
);

export const selectSelectedCarId = createSelector(
  [selectCarsState],
  (carsState) => carsState.selectedCarId
);

export const selectCarById = (state, carId) => {
  const cars = selectAllCars(state);
  return cars.find((c) => String(c.id) === String(carId));
};


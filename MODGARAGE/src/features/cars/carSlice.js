import { createSlice } from "@reduxjs/toolkit";
import { carsData } from "../../utils/vehiclesData";

const initialState = {
  list: carsData,
  selectedCarId: null,
};

const carSlice = createSlice({
  name: "cars",
  initialState,
  reducers: {
    setSelectedCarId: (state, action) => {
      state.selectedCarId = action.payload;
    },
  },
});

export const { setSelectedCarId } = carSlice.actions;
export default carSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  tempUnits: "imperial",
  windSpeedUnits: "imperial",
};

const measuresSlice = createSlice({
  name: "@@measures",
  initialState,
  reducers: {
    changeTempMeasure: (state, action) => {
      state.tempUnits = action.payload;
    },
    changeWindMeasure: (state, action) => {
      state.windSpeedUnits = action.payload;
    },
  },
});

// actions
export const { changeTempMeasure, changeWindMeasure } = measuresSlice.actions;

// reducer
export const measuresReducer = measuresSlice.reducer;

// selectors
export const selectAllMeasures = (state) => {
  return state.measures;
};

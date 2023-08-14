import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getCurrentLocation } from "../../utls/getCurrentLocation";

export const getGeolocationCoords = createAsyncThunk(
  "@@geolocation/get-geolocation-coords",
  async () => {
    const data = await getCurrentLocation();
    console.log(data);
    return await data;
  }
);

const initialState = {
  error: null,
  status: "idle",
  coords: null,
};

export const geolocationSlice = createSlice({
  name: "@@geolocation",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getGeolocationCoords.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(getGeolocationCoords.rejected, (state, action) => {
        state.status = "rejected";
        state.error = action.error.message;
      })
      .addCase(getGeolocationCoords.fulfilled, (state, action) => {
        state.coords = { ...action.payload };
        state.status = "received";
      });
  },
});

// reducer
export const geolocationReducer = geolocationSlice.reducer;

// selectors
export const selectGeoCoords = (state) => state.geolocation;

// actions
export const { setGeoCoords } = geolocationSlice.actions;

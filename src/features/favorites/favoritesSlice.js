import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getWeatherById } from "../../api";

export const loadFavorites = createAsyncThunk(
  "@@favorites/load-favorites",
  async (idArray) => {
    return await Promise.all(idArray.map((id) => getWeatherById(id)));
  }
);

const initialState = {
  isOpen: false,
  status: "idle",
  error: null,
  favoritesData: null,
  favoritesIds: [],
};

export const favoritesSlice = createSlice({
  name: "@@favorites",
  initialState,
  reducers: {
    toggleFavorites: (state, action) => {
      state.isOpen = action.payload;
    },
    addToFavorites: (state, action) => {
      state.favoritesIds.push(action.payload);
    },
    removeFromFavorites: (state, action) => {
      state.favoritesIds = state.favoritesIds.filter(
        (item) => item !== action.payload
      );
      state.favoritesData = state.favoritesData.filter(
        (item) => item.currentData.id !== action.payload
      );
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadFavorites.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(loadFavorites.rejected, (state, action) => {
        state.status = "rejected";
        state.error = action.payload || action.meta.error;
      })
      .addCase(loadFavorites.fulfilled, (state, action) => {
        state.status = "received";
        state.favoritesData = [...action.payload];
      });
  },
});

// selectors
export const selectFavorites = (state) => state.favorites;
// actions
export const { toggleFavorites, addToFavorites, removeFromFavorites } =
  favoritesSlice.actions;
// reducer
export const favoritesReducer = favoritesSlice.reducer;

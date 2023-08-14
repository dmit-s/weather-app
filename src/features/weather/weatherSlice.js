import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  getWeatherByCityName,
  getWeatherByCoords,
  getWeatherById,
} from "../../api";

export const loadWeatherByCity = createAsyncThunk(
  "@@weather/load-weather-by-city",
  async (city) => {
    return await getWeatherByCityName(city);
  }
);

export const loadWeatherByCoords = createAsyncThunk(
  "@@weather/load-weather-by-coords",
  async (coords) => {
    return await getWeatherByCoords(coords);
  }
);

export const loadWeatherById = createAsyncThunk(
  "@@weather/load-weather-by-id",
  async (id) => {
    return await getWeatherById(id);
  }
);

const initialState = {
  status: "idle",
  error: null,
  currentData: null,
  hoursData: null,
  daysData: null,
};

const weatherSlice = createSlice({
  name: "@@weather",
  initialState,
  reducers: {
    printInfoByDay: (state, action) => {
      state.currentData = action.payload.data;
      state.hoursData.activeIndex = action.payload.index;
    },
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(
        (action) =>
          action.type.includes("weather") && action.type.endsWith("/pending"),
        (state) => {
          state.status = "loading";
          state.error = null;
        }
      )
      .addMatcher(
        (action) =>
          action.type.includes("weather") && action.type.endsWith("/rejected"),
        (state, action) => {
          state.status = "rejected";
          state.error = action.error.message;
        }
      )

      .addMatcher(
        (action) =>
          action.type.includes("weather") && action.type.endsWith("/fulfilled"),
        (state, action) => {
          const {
            currentData,
            forecastData: { forecastHours, forecastDays },
          } = action.payload;
          state.status = "received";
          state.currentData = currentData;
          state.hoursData = forecastHours;
          state.daysData = forecastDays;
        }
      );
  },
});

// actions
export const { printInfoByDay } = weatherSlice.actions;

// reducer
export const weatherReducer = weatherSlice.reducer;

// selectors
export const selectWeather = (state) => {
  return state.weather;
};

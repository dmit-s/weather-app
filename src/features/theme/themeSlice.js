import { createSlice } from "@reduxjs/toolkit";

const themeSlice = createSlice({
  name: "@@theme",
  initialState: true,
  reducers: {
    setTheme: (_, action) => action.payload,
  },
});

// actions
export const { setTheme } = themeSlice.actions;

// reducer
export const themeReducer = themeSlice.reducer;

// selectors
export const selectTheme = (state) => state.theme;

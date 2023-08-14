import { createSlice } from "@reduxjs/toolkit";

const notificationsSlice = createSlice({
  name: "@@notification",
  initialState: [],
  reducers: {
    addNotify: {
      reducer: (state, action) => {
        state.push(action.payload);
      },
      prepare: (obj) => {
        return {
          payload: { id: crypto.randomUUID(), ...obj },
        };
      },
    },
    removeNotify: (state, action) => {
      return state.filter((item) => item.id !== action.payload);
    },
  },
});

// reducers
export const notificationsReducer = notificationsSlice.reducer;
// selectors
export const selectNotifications = (state) => state.notifications;
// actions
export const { addNotify, removeNotify } = notificationsSlice.actions;

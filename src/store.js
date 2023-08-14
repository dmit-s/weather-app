import { combineReducers, configureStore } from "@reduxjs/toolkit";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import { favoritesReducer } from "./features/favorites/favoritesSlice";
import { geolocationReducer } from "./features/geolocation/geolocationSlice";
import { measuresReducer } from "./features/measures/measuresSlice";
import { notificationsReducer } from "./features/notifications/notificationsSlice";
import { themeReducer } from "./features/theme/themeSlice";
import { weatherReducer } from "./features/weather/weatherSlice";

const rootReducer = combineReducers({
  weather: weatherReducer,
  measures: measuresReducer,
  theme: themeReducer,
  notifications: notificationsReducer,
  favorites: favoritesReducer,
  geolocation: geolocationReducer,
});

const persistConfig = {
  key: "root",
  storage,
  blacklist: ["weather", "notifications"],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  devTools: true,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);

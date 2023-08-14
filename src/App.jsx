import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Header } from "./components/Header";
import { Main } from "./components/Main";
import {
  loadFavorites,
  selectFavorites,
} from "./features/favorites/favoritesSlice";
import {
  getGeolocationCoords,
  selectGeoCoords,
} from "./features/geolocation/geolocationSlice";
import { NotifyContainer } from "./features/notifications/NotifyContainer";
import {
  loadWeatherByCity,
  loadWeatherByCoords,
} from "./features/weather/weatherSlice";
import { getCurrentLocation } from "./utls/getCurrentLocation";

export const App = () => {
  const dispatch = useDispatch();
  const { coords } = useSelector(selectGeoCoords);
  const { favoritesIds } = useSelector(selectFavorites);

  useEffect(() => {
    if (!coords) {
      getCurrentLocation().then(() => {
        dispatch(getGeolocationCoords());
        return;
      });
    }

    if (coords) {
      dispatch(loadWeatherByCoords(coords));
    } else {
      dispatch(loadWeatherByCity("Moscow"));
    }
  }, [coords]);

  useEffect(() => {
    favoritesIds && dispatch(loadFavorites(favoritesIds));
  }, []);

  return (
    <>
      <Header />
      <Main />
      <NotifyContainer />
    </>
  );
};

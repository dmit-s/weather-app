export const getCurrentLocation = () => {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      return reject({ error: "Browser does not support geolocation" });
    }

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;
        return resolve({ lat: latitude, lon: longitude });
      },
      (error) => {
        const { code } = error;

        switch (code) {
          case GeolocationPositionError.PERMISSION_DENIED:
            return reject({ error: "PERMISSION_DENIED" });
          case GeolocationPositionError.POSITION_UNAVAILABLE:
            return reject({ error: "POSITION_UNAVAILABLE" });
          case GeolocationPositionError.TIMEOUT:
            return reject({ error: "TIMEOUT" });
        }
      }
    );
  }).catch((err) => {
    throw err.error;
  });
};

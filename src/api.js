import axios from "axios";

const getUrl = (type) => {
  switch (type) {
    case "current":
      return `${import.meta.env.VITE_WEATHER_URL}/weather?`;
    case "forecast":
      return `${import.meta.env.VITE_WEATHER_URL}/forecast?`;
  }
};

const getForecastHours = (dataImperial, dataMetric) => {
  const { id, name, country, timezone } = dataImperial.city;
  let currentDate = null;
  const forecastHours = [];

  dataImperial.list.forEach((imperialItem) => {
    let obj = {};
    const date = new Date(imperialItem.dt_txt).getDate();

    const findMetricItem = dataMetric.list.find(
      (metricItem) => metricItem.dt === imperialItem.dt
    );

    if (findMetricItem) {
      const { icon } = findMetricItem.weather[0];

      const {
        main: { temp: tempImperial },
      } = imperialItem;

      const {
        dt,
        dt_txt,
        main: { temp: tempMetric },
      } = findMetricItem;

      obj = {
        dt,
        dt_txt,
        timezone,
        temp: {
          metric: tempMetric,
          imperial: tempImperial,
        },
        icon,
      };
    }

    if (currentDate !== date) {
      forecastHours.push([obj]);
      currentDate = date;
    } else {
      forecastHours[forecastHours.length - 1].push(obj);
    }
  });

  return {
    activeIndex: 0,
    forecastHours,
  };
};

const getForecastDays = (dataImperial, dataMetric) => {
  const { id, name, country, timezone } = dataImperial.city;

  const filteredDays = dataImperial.list.filter((item) => {
    const hours = new Date(item.dt_txt).getHours();
    if (hours === 15) return item;
  });

  const forecastDays = filteredDays.map((item) => {
    const findItem = dataMetric.list.find(
      (metricItem) => metricItem.dt === item.dt
    );

    if (findItem) {
      const { icon, description } = findItem.weather[0];

      const {
        main: {
          temp: tempImperial,
          temp_max: maxtempImperial,
          temp_min: mintempImperial,
        },
        wind: { speed: speedImperial },
      } = item;

      const {
        dt,
        dt_txt,
        wind: { speed: speedMetric },
        main: {
          temp: tempMetric,
          temp_max: maxtempMetric,
          temp_min: mintempMetric,
          humidity,
        },
      } = findItem;

      return {
        id,
        city: name,
        country,
        dt,
        dt_txt,
        timezone,
        temp: {
          metric: tempMetric,
          imperial: tempImperial,
        },
        maxtemp: {
          metric: maxtempMetric,
          imperial: maxtempImperial,
        },
        mintemp: {
          metric: mintempMetric,
          imperial: mintempImperial,
        },
        desc: description,
        windSpeed: {
          metric: speedMetric,
          imperial: speedImperial,
        },
        humidity,
        icon,
      };
    }
  });

  return forecastDays;
};

const organizeData = (data, type) => {
  const dataImperial = data[0];
  const dataMetric = data[1];

  if (type === "current") {
    const {
      id,
      name,
      dt,
      timezone,
      sys: { country },
      main: { temp: tempImperial, humidity },
      wind: { speed: speedImperial },
    } = dataImperial;

    const { icon, description } = dataImperial.weather[0];

    const {
      main: { temp: tempMetric },
      wind: { speed: speedMetric },
    } = dataMetric;

    return {
      id,
      city: name,
      country,
      dt,
      timezone,
      temp: {
        metric: tempMetric,
        imperial: tempImperial,
      },
      desc: description,
      windSpeed: {
        metric: speedMetric,
        imperial: speedImperial,
      },
      humidity,
      icon,
    };
  } else {
    const forecastHours = getForecastHours(dataImperial, dataMetric);
    const forecastDays = getForecastDays(dataImperial, dataMetric);
    return { forecastDays, forecastHours };
  }
};

export const getWeatherByCityName = async (city) => {
  const getImperialWeather = async (url) => {
    const res = await axios.get(
      `${url}q=${city}&appid=${import.meta.env.VITE_WEATHER_KEY}&units=imperial`
    );
    return res.data;
  };

  const getMetricWeather = async (url) => {
    const res = await axios.get(
      `${url}q=${city}&appid=${import.meta.env.VITE_WEATHER_KEY}&units=metric`
    );
    return res.data;
  };

  const getCurrentWeather = async () => {
    const url = getUrl("current");

    const data = await Promise.all([
      getImperialWeather(url),
      getMetricWeather(url),
    ]);
    return organizeData(data, "current");
  };

  const getForecastWeather = async () => {
    const url = getUrl("forecast");

    const data = await Promise.all([
      getImperialWeather(url),
      getMetricWeather(url),
    ]);
    return organizeData(data, "forecast");
  };

  try {
    const result = await Promise.all([
      getCurrentWeather(),
      getForecastWeather(),
    ]);

    return { currentData: result[0], forecastData: result[1] };
  } catch (error) {
    const { message } = error.response.data;
    throw message;
  }
};

export const getWeatherByCoords = async ({ lat, lon }) => {
  const getImperialWeather = async (url) => {
    const res = await axios.get(
      `${url}lat=${lat}&lon=${lon}&appid=${
        import.meta.env.VITE_WEATHER_KEY
      }&units=imperial`
    );

    return res.data;
  };

  const getMetricWeather = async (url) => {
    const res = await axios.get(
      `${url}lat=${lat}&lon=${lon}&appid=${
        import.meta.env.VITE_WEATHER_KEY
      }&units=metric`
    );
    return res.data;
  };

  const getCurrentWeather = async () => {
    const url = getUrl("current");

    const data = await Promise.all([
      getImperialWeather(url),
      getMetricWeather(url),
    ]);
    return organizeData(data, "current");
  };

  const getForecastWeather = async () => {
    const url = getUrl("forecast");

    const data = await Promise.all([
      getImperialWeather(url),
      getMetricWeather(url),
    ]);
    return organizeData(data, "forecast");
  };

  try {
    const result = await Promise.all([
      getCurrentWeather(),
      getForecastWeather(),
    ]);

    return { currentData: result[0], forecastData: result[1] };
  } catch (error) {
    const { message } = error.response.data;
    throw message;
  }
};

export const getWeatherById = async (id) => {
  const getImperialWeather = async (url) => {
    const res = await axios.get(
      `${url}id=${id}&appid=${import.meta.env.VITE_WEATHER_KEY}&units=imperial`
    );
    return res.data;
  };

  const getMetricWeather = async (url) => {
    const res = await axios.get(
      `${url}id=${id}&appid=${import.meta.env.VITE_WEATHER_KEY}&units=metric`
    );
    return res.data;
  };

  const getCurrentWeather = async () => {
    const url = getUrl("current");

    const data = await Promise.all([
      getImperialWeather(url),
      getMetricWeather(url),
    ]);
    return organizeData(data, "current");
  };

  const getForecastWeather = async () => {
    const url = getUrl("forecast");

    const data = await Promise.all([
      getImperialWeather(url),
      getMetricWeather(url),
    ]);
    return organizeData(data, "forecast");
  };

  try {
    const result = await Promise.all([
      getCurrentWeather(),
      getForecastWeather(),
    ]);

    return { currentData: result[0], forecastData: result[1] };
  } catch (error) {
    const { message } = error.response.data;
    throw message;
  }
};

export const getCities = async (str) => {
  const options = {
    method: "GET",
    url: `${import.meta.env.VITE_GEO_URL}/cities`,
    params: {
      namePrefix: str,
      minPopulation: 10000,
    },
    headers: {
      "X-RapidAPI-Key": `${import.meta.env.VITE_GEO_KEY}`,
      "X-RapidAPI-Host": "wft-geo-db.p.rapidapi.com",
    },
  };

  const res = await axios.request(options);
  return res.data.data;
};

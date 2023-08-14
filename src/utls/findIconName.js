export const findIconName = (apiIconName) => {
  if (!apiIconName) return;

  const slicedStr = apiIconName.split(".")[0];

  switch (slicedStr) {
    case "01d":
      return "day";

    case "01n":
      return "night";

    case "02d":
      return "few-clouds-day";

    case "02n":
      return "few-clouds-night";

    case "03d":
    case "03n":
    case "04d":
    case "04n":
      return "cloudy";

    case "09d":
    case "09n":
      return "shower-rain";

    case "10d":
      return "rainy-day";

    case "10n":
      return "rainy-night";

    case "11d":
    case "11n":
      return "thunder";

    case "13d":
    case "13n":
      return "snowy";

    case "50d":
    case "50n":
      return "mist";
  }
};

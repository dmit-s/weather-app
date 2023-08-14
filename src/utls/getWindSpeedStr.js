export const getWindSpeedStr = (windSpeedObj, windSpeedUnits) => {
  const str =
    windSpeedUnits === "imperial"
      ? `${windSpeedObj.imperial.toFixed(0)}  m/h`
      : `${windSpeedObj.metric.toFixed(0)} m/s`;

  return str;
};

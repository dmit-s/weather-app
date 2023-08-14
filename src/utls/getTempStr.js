export const getTempStr = (tempObj, tempUnits, name = false) => {
  let str;

  if (name) {
    str =
      tempUnits === "imperial"
        ? `${tempObj.imperial.toFixed(0)} °F`
        : `${tempObj.metric.toFixed(0)} °C`;
  } else {
    str =
      tempUnits === "imperial"
        ? `${tempObj.imperial.toFixed(0)} °`
        : `${tempObj.metric.toFixed(0)} °`;
  }
  return str;
};

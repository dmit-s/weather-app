import moment from "moment";

export const formatDate = (unixTime, timezone, formatAs) => {
  if (Number.isInteger(unixTime)) {
    return moment(unixTime * 1000)
      .utcOffset(timezone / 60)
      .format(formatAs);
  } else {
    return moment(unixTime).format(formatAs);
  }
};

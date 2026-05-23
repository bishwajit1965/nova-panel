export const convertToMs = (timeStr) => {
  const unit = timeStr.slice(-1);
  const value = parseInt(timeStr);

  switch (unit) {
    case "d":
      return value * 24 * 60 * 60 * 1000;
    case "h":
      return value * 60 * 60 * 1000;
    case "m":
      return value * 60 * 1000;
    default:
      return value;
  }
};

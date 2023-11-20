export const imageFilter = (icon) => {
  if (icon.includes("?")) {
    const index = icon.indexOf("?");
    return icon.slice(0, index);
  }
  return icon;
};

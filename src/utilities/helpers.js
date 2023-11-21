export const imageFilter = (icon) => {
  if (icon.includes("?")) {
    const index = icon.indexOf("?");
    return icon.slice(0, index);
  }
  return icon;
};

export const randomColor = () => {
  const hex = [
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "A",
    "B",
    "C",
    "D",
    "E",
    "F",
  ];
  let hexColor = "#";
  for (let i = 0; i < 6; i++) {
    hexColor += hex[Math.floor(Math.random() * hex.length + 1)];
  }
  return hexColor;
};

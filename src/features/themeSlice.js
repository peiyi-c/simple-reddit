import { createSlice } from "@reduxjs/toolkit";

const getLocalStorage = () => {
  let colorMode = localStorage.getItem("colorMode");
  if (colorMode) {
    colorMode = JSON.parse(colorMode);
    if (colorMode === "light" || colorMode === "dark") {
      return colorMode;
    } else {
      return "";
    }
  } else {
    return "";
  }
};
const getThemePreference = () => {
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
};

const initialState = {
  theme: getLocalStorage() || getThemePreference(),
};

export const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    setTheme(state, action) {
      state.theme = action.payload;
    },
  },
});

export const selectTheme = (state) => state.theme.theme;
export const { setTheme } = themeSlice.actions;
export default themeSlice.reducer;

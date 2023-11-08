/* eslint-disable react/prop-types */
import { createContext } from "react";
import { useSelector } from "react-redux";
import { setTheme, selectTheme } from "../features/themeSlice";

export const ThemeContext = createContext();

export const ThemeMessage = ({ children }) => {
  const theme = useSelector(selectTheme);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

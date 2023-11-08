import "./index.scss";
import logo from "../../assets/logo.png";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectTheme, setTheme } from "../../features/themeSlice";
export const Header = () => {
  const dispatch = useDispatch();
  const theme = useSelector(selectTheme);

  useEffect(() => {
    document.body.className = theme;
    localStorage.setItem("colorMode", JSON.stringify(theme));
  }, [theme]);

  const toggleTheme = () => {
    dispatch(setTheme(theme === "light" ? "dark" : "light"));
  };
  return (
    <header className="center">
      <div className="header container container-sm center">
        <img className="header__logo" src={logo} alt="awesome-hamster" />

        <fieldset>
          <ion-icon name="search" title="search"></ion-icon>
          <label htmlFor="search" />
          <input id="search" type="search" name="search" />
        </fieldset>

        <ion-icon class="header__icon" name="heart" title="popular"></ion-icon>

        <ion-icon class="header__icon" name="balloon" title="all"></ion-icon>

        <ion-icon
          class="header__icon"
          name="moon-outline"
          title="toggle mode"
          onClick={toggleTheme}
        ></ion-icon>
      </div>
    </header>
  );
};

export default Header;

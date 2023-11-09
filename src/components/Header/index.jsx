import "./index.scss";
import logo from "../../assets/logo.png";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectTheme, setTheme } from "../../features/themeSlice";
import { Outlet, useNavigate } from "react-router-dom";

import { setSelectedSubreddit } from "../../features/subredditSlice";
import { setSearchTerm } from "../../features/searchTermSlice";

export const Header = () => {
  // Toggle Theme
  const theme = useSelector(selectTheme);

  useEffect(() => {
    document.body.className = theme;
    localStorage.setItem("colorMode", JSON.stringify(theme));
  }, [theme]);

  const toggleTheme = () => {
    dispatch(setTheme(theme === "light" ? "dark" : "light"));
  };

  // Change Subreddit to all or popular
  const dispatch = useDispatch();

  const handleRedditChange = (e) => {
    const title = e.target.title;
    dispatch(setSelectedSubreddit(title));
    navigate(`${title}`);
  };

  // Search Content
  const navigate = useNavigate();
  const handleSearch = (e) => {
    if (e.key !== "Enter") {
      return;
    }
    const value = e.target.value;
    if (value.trim() == "") {
      return;
    }
    dispatch(setSearchTerm(value));
    navigate(`/search?${value}`);
  };
  return (
    <>
      <header className="center">
        <div className="header container container-sm center">
          <img
            className="header__logo"
            src={logo}
            alt="awesome-hamster"
            title="/r/hamster"
            onClick={handleRedditChange}
          />

          <fieldset>
            <ion-icon name="search" title="search"></ion-icon>
            <label htmlFor="search" />
            <input
              id="search"
              type="search"
              name="search"
              onKeyUp={handleSearch}
            />
          </fieldset>

          <ion-icon
            class="header__icon"
            name="heart"
            title="/r/popular"
            onClick={handleRedditChange}
          ></ion-icon>

          <ion-icon
            class="header__icon"
            name="balloon"
            title="/r/all"
            onClick={handleRedditChange}
          ></ion-icon>

          <ion-icon
            class="header__icon"
            name="moon-outline"
            title="toggle mode"
            onClick={toggleTheme}
          ></ion-icon>
        </div>
      </header>
      <Outlet />
    </>
  );
};

export default Header;

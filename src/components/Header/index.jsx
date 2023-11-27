/* eslint-disable no-unused-vars */
import "./index.scss";
import logo from "../../assets/logo.png";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectTheme, setTheme } from "../../features/themeSlice";
import { Outlet, useNavigate, useSearchParams } from "react-router-dom";

import { setSelectedSubreddit } from "../../features/subredditSlice";
import { setSearchTerm, setType } from "../../features/searchTermSlice";
import { viewContents, viewPosts } from "../../features/visibilitySlice";

export const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

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
  const handleRedditChange = (e) => {
    const title = e.target.title;
    dispatch(setSelectedSubreddit(title));
    dispatch(viewPosts());
    navigate(`${title}`);
  };

  // Search Content
  const [search, setSearch] = useSearchParams();

  const handleSearch = (e) => {
    if (e.key !== "Enter") {
      return;
    }
    const value = e.target.value;
    if (value.trim() == "") {
      return;
    }

    setSearch((search) => ({ ...search, q: e.target.value, type: "link" }));

    dispatch(setSearchTerm(value));
    dispatch(setType("link"));
    dispatch(viewContents());
    navigate(`/search?q=${value}&type=link`);
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

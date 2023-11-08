import "./index.scss";
import logo from "../../assets/logo.png";

export const Header = () => {
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
          title="dark mode"
        ></ion-icon>
      </div>
    </header>
  );
};

export default Header;

import "./index.scss";
import logo from "../../assets/logo-no-background.svg";

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

        <ion-icon name="heart" title="popular"></ion-icon>

        <ion-icon name="balloon" title="all"></ion-icon>

        <button role="switch">Dark Mode</button>
      </div>
    </header>
  );
};

export default Header;

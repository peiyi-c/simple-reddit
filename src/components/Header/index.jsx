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
          <input id="search-outline" type="search" name="search" />
        </fieldset>

        <ion-icon name="heart-outline" title="popular"></ion-icon>

        <ion-icon name="balloon-outline" title="all"></ion-icon>

        <ion-icon name="moon-outline" title></ion-icon>
      </div>
    </header>
  );
};

export default Header;

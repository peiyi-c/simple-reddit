import "./App.scss";
import { ThemeMessage } from "./containers/themeContext";
import Header from "./components/Header";
import Navigation from "./components/Navigation";
import Main from "./components/Main";
import Aside from "./components/Aside";
const App = () => {
  return (
    <>
      <ThemeMessage>
        <Header />
        <Navigation />
        <div className="wrapper">
          <Main />
          <Aside />
        </div>
      </ThemeMessage>
    </>
  );
};

export default App;

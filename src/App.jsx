import "./App.scss";
import Header from "./components/Header";
import Navigation from "./components/Navigation";
import Main from "./components/Main";
import Aside from "./components/Aside";
const App = () => {
  return (
    <>
      <Header />
      <Navigation />
      <div className="wrapper">
        <Main />
        <Aside />
      </div>
    </>
  );
};

export default App;

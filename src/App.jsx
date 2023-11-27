import "./App.scss";
import { ThemeMessage } from "./containers/themeContext";
import Header from "./components/Header";
import { HomePage } from "./components/HomePage";
import { Search } from "./components/Search";
import { NotFound } from "./components/NotFound";
import {
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";

const appRouter = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/simple-reddit" element={<Header />}>
      <Route index element={<HomePage />} />
      <Route path="/r/:subreddit" element={<HomePage />} />
      <Route path="/search" element={<Search />} />
      <Route path="*" element={<NotFound />} />
    </Route>
  )
);
const App = () => {
  return (
    <>
      <ThemeMessage>
        <RouterProvider router={appRouter} />
      </ThemeMessage>
    </>
  );
};

export default App;

import "./index.scss";
import { setType } from "../../features/searchTermSlice";
import { useDispatch } from "react-redux";
import { useSearchParams } from "react-router-dom";

export const Navigation = () => {
  const dispatch = useDispatch();
  const [search, setSearch] = useSearchParams();

  const handleClick = (e) => {
    const type = e.target.title;
    dispatch(setType(type));
    setSearch((search) => {
      search.set("type", e.target.title);
      return search;
    });
  };

  return (
    <nav className="container container-lg">
      <ul className="navi" role="list">
        <li>
          <button onClick={handleClick} title="link">
            POSTS
          </button>
        </li>
        <li>
          <button onClick={handleClick} title="sr">
            COMMUNITIES
          </button>
        </li>
        <li>
          <button onClick={handleClick} title="user">
            PEOPLE
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Navigation;

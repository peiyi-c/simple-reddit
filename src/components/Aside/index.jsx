import "./index.scss";
import logo from "../../assets/awesome-hamster.png";
import { Subreddit } from "../Subreddit";
export const Aside = () => {
  return (
    <aside className="center container-sm">
      <div className="aside">
        <img className="aside__logo" src={logo} alt="awesome-hamster" />
        <ul className="aside__subreddits" role="list">
          <Subreddit />
        </ul>
      </div>
    </aside>
  );
};

export default Aside;

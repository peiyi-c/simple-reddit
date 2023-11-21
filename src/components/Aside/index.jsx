import "./index.scss";
import logo from "../../assets/awesome-hamster.png";
import { Subreddit } from "../Subreddit";
import {
  fetchHamsterReddits,
  selectCommunities,
} from "../../features/hamsterRedditsSlice";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

export const Aside = () => {
  const dispatch = useDispatch();
  const communities = useSelector(selectCommunities);

  useEffect(() => {
    dispatch(fetchHamsterReddits());
  }, [dispatch]);

  return (
    <aside className="center">
      <div className="aside">
        <div className="aside__heading">
          <img
            className="aside__heading-logo"
            src={logo}
            alt="awesome-hamster"
          />
          <h2>Say heke</h2>
        </div>

        <ul className="aside__subreddits" role="list">
          {communities.map((community, index) => (
            <Subreddit community={community} key={index} />
          ))}
        </ul>
      </div>
    </aside>
  );
};

export default Aside;

import "./index.scss";
import logoLight from "../../assets/awesome-hamster.png";
import logoDark from "../../assets/awesome-hamster-yellow.png";

import { Subreddit } from "../Subreddit";
import { fetchHamsterReddits } from "../../features/hamsterRedditsSlice";
import { selectTheme } from "../../features/themeSlice";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { SubredditLoading } from "../SubredditLoading";
import { randomNumber } from "../../utilities/helpers";
import { DummyImage } from "../DummyImage";

export const Aside = () => {
  const dispatch = useDispatch();

  const { communities, hasError, isLoading } = useSelector(
    (state) => state.hamsterReddits
  );
  const theme = useSelector(selectTheme);

  useEffect(() => {
    dispatch(fetchHamsterReddits());
  }, [dispatch]);

  return (
    <aside className="center">
      <div className="aside">
        <div className="aside__heading">
          <img
            className="aside__heading-logo"
            src={theme === "light" ? `${logoLight}` : `${logoDark}`}
            alt="awesome-hamster"
          />

          <h2>Say heke</h2>
          <img
            className="aside__heading-logo"
            src={theme === "light" ? `${logoLight}` : `${logoDark}`}
            alt="awesome-hamster"
          />
        </div>

        <ul className="aside__subreddits" role="list">
          {isLoading &&
            Array(randomNumber(10))
              .fill(0)
              .map((num, index) => <SubredditLoading key={index} />)}
          {hasError && (
            <>
              <li>
                <DummyImage size="1.85rem" />
                <span>Unexpected error happens</span>
              </li>
              <li>
                <DummyImage size="1.85rem" /> <span>, please try it later</span>
              </li>
            </>
          )}
          {!isLoading &&
            communities &&
            communities.map((community, index) => (
              <Subreddit community={community} key={index} />
            ))}
        </ul>
      </div>
    </aside>
  );
};

export default Aside;

/* eslint-disable react/prop-types */
import "./index.scss";
import { imageFilter } from "../../utilities/helpers";
import { DummyImage } from "../DummyImage";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setSelectedSubreddit } from "../../features/subredditSlice";
import { viewPosts } from "../../features/visibilitySlice";

export const Subreddit = ({ community }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { display_name_prefixed, community_icon, name } = community.data;

  // Change Subreddit
  const handleRedditChange = (e) => {
    const subreddit = "/" + e.target.innerText;
    dispatch(setSelectedSubreddit(subreddit));
    dispatch(viewPosts());
    navigate(`${subreddit}`);
  };

  return (
    <li onClick={handleRedditChange}>
      {community_icon ? (
        <img src={imageFilter(community_icon)} alt={name} />
      ) : (
        <DummyImage size="1.85rem" />
      )}
      <span>{display_name_prefixed}</span>
    </li>
  );
};

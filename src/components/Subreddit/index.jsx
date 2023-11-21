/* eslint-disable react/prop-types */
import "./index.scss";
import { imageFilter } from "../../utilities/helpers";
import { DummyImage } from "../DummyImage";
export const Subreddit = ({ community }) => {
  const { display_name_prefixed, community_icon, name } = community.data;
  return (
    <li>
      {community_icon ? (
        <img src={imageFilter(community_icon)} alt={name} />
      ) : (
        <DummyImage size="1.85rem" />
      )}
      <span>{display_name_prefixed}</span>
    </li>
  );
};

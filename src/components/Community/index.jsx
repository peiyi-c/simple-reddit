/* eslint-disable react/prop-types */
import "./index.scss";
import moment from "moment";
import { imageFilter } from "../../utilities/helpers";
import { DummyImage } from "../DummyImage";

export const Community = ({ community }) => {
  const {
    subscribers,
    display_name_prefixed,
    public_description,
    created,
    community_icon,
    name,
  } = community.data;

  return (
    <div className="community-wrapper">
      <div className="community-top">
        <div>
          {community_icon ? (
            <img
              className="community-image"
              src={imageFilter(community_icon)}
              alt={name}
            />
          ) : (
            <DummyImage size="2rem" />
          )}
          <h1>{display_name_prefixed}</h1>
        </div>
        <small>Created {moment.unix(created).fromNow()}</small>
      </div>
      <div className="community-bottom">
        <span className="description">{public_description}</span>
        <br />
        <span className="subscribers">subscribers: {subscribers}</span>
      </div>
    </div>
  );
};

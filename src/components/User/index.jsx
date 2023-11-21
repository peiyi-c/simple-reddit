/* eslint-disable react/prop-types */
import "./index.scss";
import { imageFilter } from "../../utilities/helpers";
import { DummyImage } from "../DummyImage";

export const User = ({ user }) => {
  const { icon_img, comment_karma, name } = user.data;

  return (
    <div className="user-wrapper">
      {icon_img ? (
        <img
          className="left user-image"
          src={imageFilter(icon_img)}
          alt={name}
        />
      ) : (
        <DummyImage size="1.85rem" />
      )}
      <div className="right">
        <h3 className="user-name">{name}</h3>
        <small className="user-comment">Comments Karmar {comment_karma}</small>
      </div>
    </div>
  );
};

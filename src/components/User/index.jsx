/* eslint-disable react/prop-types */
import "./index.scss";

export const User = ({ user }) => {
  const { icon_img, comment_karma, name } = user.data;
  const imageFilter = (icon) => {
    const index = icon.indexOf("?");
    return icon.slice(0, index + 1);
  };
  return (
    <div className="user-wrapper">
      <img className="user-image" src={imageFilter(icon_img)} alt={name} />
      <div>
        <h3 className="user-name">{name}</h3>
        <small className="user-comment">Comments Karmar {comment_karma}</small>
      </div>
    </div>
  );
};

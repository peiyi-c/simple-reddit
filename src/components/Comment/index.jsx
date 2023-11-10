/* eslint-disable react/prop-types */
import "./index.scss";
import moment from "moment";

export const Comment = ({ comment }) => {
  const { author, created_utc, body } = comment;
  return (
    <div className="comment">
      <div className="comment-wrapper">
        <div className="comment-heading">
          <span className="comment__author"> {author} </span>
          <span className="comment__time">
            {moment.unix(created_utc).fromNow()}
          </span>
        </div>
        <span className="comment-body">{body}</span>
      </div>
    </div>
  );
};

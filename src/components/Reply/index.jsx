/* eslint-disable react/prop-types */
import "./index.scss";
import moment from "moment";

export const Reply = ({ reply }) => {
  return (
    <div className="reply">
      {reply?.author_fullname ? (
        <div className="reply-wrapper">
          <div className="reply-heading">
            <span className="reply__author">
              {reply?.author_fullname ? reply.author_fullname : ""}
            </span>
            <span className="reply__time">
              {reply?.created && moment.unix(reply.created).fromNow()}
            </span>
          </div>
          <span className="reply-body">{reply?.body && reply.body}</span>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

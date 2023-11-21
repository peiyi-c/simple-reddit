/* eslint-disable react/prop-types */
import "./index.scss";
import moment from "moment";
import { Reply } from "../Reply";
export const Comment = ({ comment }) => {
  const { author, created_utc, body } = comment;
  const commentReplies = comment.replies?.data?.children[0] || {};

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
        {commentReplies && <Reply reply={commentReplies.data} />}
      </div>
    </div>
  );
};

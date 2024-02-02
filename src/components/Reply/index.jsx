/* eslint-disable react/prop-types */
import { useState } from "react";
import "./index.scss";
import moment from "moment";

export const Reply = ({ reply }) => {
  const [toggleOpen, setToggleOpen] = useState(false);
  const replyReplies = reply?.replies?.data?.children[0] || "";

  return (
    <div className="reply">
      {reply?.author_fullname && reply?.author_fullname !== "[deleted]" ? (
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
          {replyReplies && replyReplies !== "" && (
            <>
              <div
                className="reply-reply"
                onClick={() => setToggleOpen((prev) => !prev)}
              >
                <ion-icon name="chatbubbles"></ion-icon>
              </div>
              {toggleOpen && <Reply reply={replyReplies.data} />}
            </>
          )}
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

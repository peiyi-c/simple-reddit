/* eslint-disable react/prop-types */
import "./index.scss";
import moment from "moment";
import { Comment } from "../Comment";
import { useDispatch, useSelector } from "react-redux";
import { fetchPostComments } from "../../features/subredditSlice";
import { selectVisibility } from "../../features/visibilitySlice";
import { fetchContentComments } from "../../features/searchTermSlice";
import { useState } from "react";
import { CommentLoading } from "../CommentLoading";

export const Card = ({ index, card }) => {
  const dispatch = useDispatch();
  const visibility = useSelector(selectVisibility);
  const { showingComments, comments, isLoadingComments, hasErrorComments } =
    card;
  const {
    id,
    ups,
    downs,
    title,
    selftext,
    url,
    author,
    subreddit_name_prefixed,
    created_utc,
    permalink,
    num_comments,
    media,
    thumbnail,
  } = card.data;

  const hasImage = url?.includes(".jpg");
  const hasVideo = media?.reddit_video?.fallback_url;
  const [readmore, setReadmore] = useState(false);
  const toggleReadmore = () => {
    setReadmore((readmore) => !readmore);
  };
  const handleCommentClick = () => {
    visibility === "posts"
      ? dispatch(fetchPostComments(index, permalink))
      : dispatch(fetchContentComments(index, permalink));
  };

  return (
    <article className="card" key={id}>
      {/* votes */}
      <div className="card-left">
        <ion-icon name="arrow-up-outline"></ion-icon>
        <span className="card__ups">{ups}</span>
        <ion-icon name="arrow-down-outline"></ion-icon>
        <span className="card__downs">{downs}</span>
      </div>
      {/* content */}
      <div className="card-right">
        <span className="card__subreddit-name">{subreddit_name_prefixed}</span>
        <div className="card-top">
          <span className="card__author"> Posted by {author}</span>
          <span className="card__time">
            {moment.unix(created_utc).fromNow()}
          </span>
        </div>

        <h1 className="card__title">{title}</h1>

        {selftext?.length === 0 ? (
          ""
        ) : selftext?.length <= 200 ? (
          <span>{selftext}</span>
        ) : (
          <>
            <span>
              {selftext?.slice(0, 200)}
              <span className={`${readmore ? "inactive" : "active"}`}>
                ...{" "}
              </span>
              <span
                className={`more ${readmore ? "inactive" : "active"}`}
                onClick={() => toggleReadmore()}
              >
                read more
              </span>
              <span className={`${readmore ? "active" : "inactive"}`}>
                {selftext?.slice(200)}
              </span>{" "}
              <span
                className={`more ${readmore ? "active" : "inactive"}`}
                onClick={() => toggleReadmore()}
              >
                read less
              </span>
            </span>
          </>
        )}
        {url && url.includes(".jpg") && (
          <img className="card__image" src={url} alt="card" />
        )}

        {media?.reddit_video?.fallback_url && (
          <video className="card__video" controls muted>
            <source src={media.reddit_video.fallback_url} type="video/mp4" />
          </video>
        )}
        {!hasImage && !hasVideo && thumbnail && thumbnail.includes(".jpg") && (
          <img className="card__image-sm" src={thumbnail} alt="card" />
        )}

        {/* comment */}
        {num_comments > 0 ? (
          <div className="card-bottom">
            <div className="card__comment-icon" onClick={handleCommentClick}>
              <ion-icon name="chatbubbles"></ion-icon>
              <span>{num_comments}</span>
            </div>
            <div className="card__comment">
              {isLoadingComments &&
                showingComments &&
                Array(num_comments)
                  .fill(0)
                  .map((_, index) => <CommentLoading key={index} />)}
              {hasErrorComments && (
                <h3>Error loading Comments, please try it later...</h3>
              )}
              {showingComments &&
                !isLoadingComments &&
                comments.map((comment, index) => {
                  return <Comment key={index} comment={comment} />;
                })}
            </div>
          </div>
        ) : (
          ""
        )}
      </div>
    </article>
  );
};

export default Card;

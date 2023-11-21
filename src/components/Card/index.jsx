/* eslint-disable react/prop-types */
import "./index.scss";
import moment from "moment";
import { Comment } from "../Comment";
import { useDispatch, useSelector } from "react-redux";
import { fetchPostComments } from "../../features/subredditSlice";
import { selectVisibility } from "../../features/visibilitySlice";
import { fetchContentComments } from "../../features/searchTermSlice";

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

  const hasImage = url.includes(".jpg");

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
        <span>{selftext}</span>

        {url && url.includes(".jpg") && (
          <img className="card__image" src={url} alt="card" />
        )}
        {!hasImage && thumbnail && thumbnail.includes(".jpg") && (
          <img className="card__image-sm" src={thumbnail} alt="card" />
        )}

        {media?.reddit_video?.fallback_url && (
          <video className="card__video" controls muted>
            <source src={media.reddit_video.fallback_url} type="video/mp4" />
          </video>
        )}
        {/* {media?.oembed?.html && (media.oembed.html)} */}
        {/* comment */}
        <div className="card-bottom">
          <div className="card__comment-icon" onClick={handleCommentClick}>
            <ion-icon name="chatbubbles"></ion-icon>
            <span>{num_comments}</span>
          </div>
          <div className="card__comment">
            {isLoadingComments && <h3>Loading Comments</h3>}
            {hasErrorComments && <h3>Error loading Comments</h3>}
            {showingComments &&
              comments.map((comment, index) => {
                return <Comment key={index} comment={comment} />;
              })}
          </div>
        </div>
      </div>
    </article>
  );
};

export default Card;

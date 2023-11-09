/* eslint-disable react/prop-types */
import "./index.scss";
import moment from "moment";
export const Post = ({ post }) => {
  const {
    id,
    ups,
    downs,
    title,
    url,
    author,
    subreddit_name_prefixed,
    created_utc,
    showingComments,
    permlink,
    num_comments,
  } = post.data;
  return (
    <article className="post" key={id}>
      <div className="post-left">
        <ion-icon name="arrow-up-outline"></ion-icon>
        <span>{ups}</span>
        <ion-icon name="arrow-down-outline"></ion-icon>
        <span>{downs}</span>
      </div>
      <div className="post-right">
        <span className="post__subreddit-name">{subreddit_name_prefixed}</span>
        <span className="post__author">
          Posted by {author} {moment.unix(created_utc).fromNow()}
        </span>

        <h1 className="post__title">{title}</h1>
        {url.includes(".jpg") && (
          <img className="post__image" src={url} alt="post" />
        )}
        <div className="post-bottom">
          <ion-icon name="chatbubbles"></ion-icon>
          <span>{num_comments}</span>
        </div>
      </div>
    </article>
  );
};

export default Post;

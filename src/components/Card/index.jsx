/* eslint-disable react/prop-types */
import "./index.scss";
import moment from "moment";
export const Card = ({ card }) => {
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
  } = card.data;
  return (
    <article className="card" key={id}>
      <div className="card-left">
        <ion-icon name="arrow-up-outline"></ion-icon>
        <span>{ups}</span>
        <ion-icon name="arrow-down-outline"></ion-icon>
        <span>{downs}</span>
      </div>
      <div className="card-right">
        <span className="card__subreddit-name">{subreddit_name_prefixed}</span>
        <span className="card__author">
          Posted by {author} {moment.unix(created_utc).fromNow()}
        </span>

        <h1 className="card__title">{title}</h1>
        {url.includes(".jpg") && (
          <img className="card__image" src={url} alt="card" />
        )}
        <div className="card-bottom">
          <ion-icon name="chatbubbles"></ion-icon>
          <span>{num_comments}</span>
        </div>
      </div>
    </article>
  );
};

export default Card;

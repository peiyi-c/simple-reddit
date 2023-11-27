export const CardLoading = () => {
  return (
    <article className="card">
      {/* votes */}
      <div className="card-left">
        <span className="card__ups"></span>
        <span className="card__downs"></span>
      </div>
      {/* content */}
      <div className="card-right">
        <div className="card__subreddit-name skeleton-name"></div>
        <div className="card-top">
          <div className="card__author skeleton-name-lg"></div>
          <div className="card__time skeleton-time"></div>
        </div>

        <h1 className="card__title skeleton-title"></h1>
        <div className="skeleton-text-1"></div>
        <div className="skeleton-text-2"></div>
        <div className="skeleton-text-3"></div>
      </div>
    </article>
  );
};

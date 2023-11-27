export const CommentLoading = () => {
  return (
    <div className="comment">
      <div className="comment-wrapper">
        <div className="comment-heading">
          <span className="comment__author skeleton-title"> </span>
          <span className="comment__time skeleton-time"></span>
        </div>
        <span className="comment-body skeleton-description"></span>
        <span className="skeleton-description"></span>
      </div>
    </div>
  );
};

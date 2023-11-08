import "./index.scss";

export const Post = () => {
  return (
    <div className="post">
      <div className="post-left">vote</div>
      <div className="post-right">
        <h1 className="post__title">Title</h1>
        <img className="post__image" src="" alt="post" />
        <div className="post-bottom">
          <span className="post__time">time</span>
          <ion-icon name="chatbubbles"></ion-icon>
        </div>
      </div>
    </div>
  );
};

export default Post;

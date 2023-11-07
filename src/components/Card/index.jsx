import "./index.scss";

export const Card = () => {
  return (
    <div className="card">
      <div className="card-left">vote</div>
      <div className="card-right">
        <h1 className="card__title">Title</h1>
        <img className="card__image" src="" alt="card" />
        <div className="card-bottom">
          <span className="card__time">time</span>
          <ion-icon name="chatbubbles"></ion-icon>
        </div>
      </div>
    </div>
  );
};

export default Card;

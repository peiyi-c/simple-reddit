import "./index.scss";
import Card from "../Card";

export const Main = () => {
  return (
    <main className="center container-sm">
      <section className="filter container-sm">
        <ion-icon name="star"></ion-icon>
        <ion-icon name="flame"></ion-icon>
        <ion-icon name="trending-up"></ion-icon>
      </section>
      <section className="cards">
        <Card />
        <Card />
        <Card />
      </section>
    </main>
  );
};

export default Main;

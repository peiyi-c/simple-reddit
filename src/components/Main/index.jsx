import "./index.scss";
import Post from "../Post";

export const Main = () => {
  return (
    <main className="center container-sm">
      <section className="cards">
        <Post />
        <Post />
        <Post />
      </section>
    </main>
  );
};

export default Main;

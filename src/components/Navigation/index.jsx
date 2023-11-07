import "./index.scss";

export const Navigation = () => {
  return (
    <nav>
      <ul role="list" className="navi">
        <li>
          <button>POSTS</button>
        </li>
        <li>
          <button>COMMENTS</button>
        </li>
        <li>
          <button>COMMUNITIES</button>
        </li>
        <li>
          <button>PEOPLE</button>
        </li>
      </ul>
    </nav>
  );
};

export default Navigation;

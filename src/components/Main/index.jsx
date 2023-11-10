/* eslint-disable no-unused-vars */
import "./index.scss";
import Card from "../Card";
import { useEffect } from "react";
import { selectPosts, fetchPosts } from "../../features/subredditSlice";
import {
  fetchContents,
  selectSearchTerm,
  selectContents,
  selectType,
  setSearchTerm,
  setType,
} from "../../features/searchTermSlice";
import {
  selectVisibility,
  setVisibility,
  viewContents,
} from "../../features/visibilitySlice";
import { useDispatch, useSelector } from "react-redux";
import {
  useSearchParams,
  useLocation,
  Navigate,
  useNavigate,
} from "react-router-dom";
import { User } from "../User";
import { Community } from "../Community";

export const Main = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  // Visibility
  const visibility = useSelector(selectVisibility);
  useEffect(() => {
    if (location.pathname === "/search") {
      dispatch(setVisibility("contents"));
    } else {
      dispatch(setVisibility("posts"));
    }
  }, [dispatch, location]);

  // Posts
  const redditPosts = useSelector((state) => state.subreddit);
  const { hasError, isLoading, selectedSubreddit } = redditPosts;
  const posts = useSelector(selectPosts);

  useEffect(() => {
    if (visibility === "posts") {
      dispatch(fetchPosts(selectedSubreddit));
    }
  }, [dispatch, selectedSubreddit, visibility, location]);

  // Contents
  const type = useSelector(selectType);
  const searchTerm = useSelector(selectSearchTerm);
  const [search, setSearch] = useSearchParams();
  const contents = useSelector(selectContents);

  useEffect(() => {
    if (visibility === "posts" && location.pathname === "/search") {
      const q = search.get("q");
      const type = search.get("type");
      if (!q) {
        navigate("/");
      } else if (q && !type) {
        dispatch(setSearchTerm(q));
        dispatch(setType("link"));
        dispatch(viewContents());
      } else if (q && type) {
        dispatch(setSearchTerm(search.get("q")));
        dispatch(setType(search.get("type")));
        dispatch(viewContents());
      }
    } else if (visibility === "contents") {
      dispatch(fetchContents(searchTerm, type));
    }
  }, [dispatch, searchTerm, type, visibility, location, search, navigate]);

  return (
    <main className="center container-sm">
      <section className="cards">
        {visibility === "posts" &&
          posts.map((post, index) => (
            <Card key={index} index={index} card={post} />
          ))}
        {visibility === "contents" &&
          type === "link" &&
          contents.map((content, index) => (
            <Card key={index} index={index} card={content} />
          ))}
        {visibility === "contents" &&
          type === "user" &&
          contents.map((content, index) => <User user={content} key={index} />)}
        {visibility === "contents" &&
          type === "sr" &&
          contents.map((content, index) => (
            <Community community={content} key={index} />
          ))}
      </section>
    </main>
  );
};

export default Main;

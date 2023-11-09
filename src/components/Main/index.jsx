/* eslint-disable no-unused-vars */
import "./index.scss";
import Card from "../Card";
import { useEffect } from "react";
import {
  selectPosts,
  fetchPosts,
  fetchComments,
} from "../../features/subredditSlice";
import {
  fetchContents,
  selectSearchTerm,
  selectContents,
  selectType,
  setSearchTerm,
} from "../../features/searchTermSlice";
import {
  selectVisibility,
  setVisibility,
  viewContents,
} from "../../features/visibilitySlice";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams, useLocation } from "react-router-dom";

export const Main = () => {
  const dispatch = useDispatch();
  const location = useLocation();

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
  }, [dispatch, selectedSubreddit, visibility]);

  // Contents
  const type = useSelector(selectType);
  const searchTerm = useSelector(selectSearchTerm);
  const [search, setSearch] = useSearchParams();
  const contents = useSelector(selectContents);

  useEffect(() => {
    if (visibility === "contents") {
      dispatch(fetchContents(searchTerm, type));
    } else if (visibility === "posts" && location.pathname === "/search") {
      dispatch(setSearchTerm(search.get("q")));
      dispatch(viewContents());
    }
  }, [dispatch, searchTerm, type, visibility, location, search]);

  return (
    <main className="center container-sm">
      <section className="cards">
        {visibility === "posts" &&
          posts.map((post, index) => <Card key={index} card={post} />)}
        {visibility === "contents" &&
          contents.map((content, index) => <Card key={index} card={content} />)}
      </section>
    </main>
  );
};

export default Main;

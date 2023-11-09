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
} from "../../features/searchTermSlice";
import { selectVisibility } from "../../features/visibilitySlice";
import { useDispatch, useSelector } from "react-redux";

export const Main = () => {
  // Posts
  const redditPosts = useSelector((state) => state.subreddit);
  const { hasError, isLoading, selectedSubreddit } = redditPosts;
  const posts = useSelector(selectPosts);
  const dispatch = useDispatch();
  const visibility = useSelector(selectVisibility);

  useEffect(() => {
    dispatch(fetchPosts(selectedSubreddit));
  }, [dispatch, selectedSubreddit]);

  // Contents
  const search = useSelector((state) => state.search);
  const { type } = search;
  const searchTerm = useSelector(selectSearchTerm);
  const contents = useSelector(selectContents);

  useEffect(() => {
    dispatch(fetchContents(searchTerm, type));
  }, [dispatch, searchTerm, type]);

  return (
    <main className="center container-sm">
      <section className="cards">
        {visibility === "posts" &&
          posts.map((post, index) => <Post key={index} card={post} />)}
        {visibility === "contents" &&
          contents.map((content, index) => <Post key={index} card={content} />)}
      </section>
    </main>
  );
};

export default Main;

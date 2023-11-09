/* eslint-disable no-unused-vars */
import "./index.scss";
import Post from "../Post";
import { useDispatch, useSelector } from "react-redux";
import {
  selectPosts,
  fetchPosts,
  fetchComments,
} from "../../features/subredditSlice";
import { useEffect } from "react";

export const Main = () => {
  const redditPosts = useSelector((state) => state.subreddit);
  const { hasError, isLoading, selectedSubreddit } = redditPosts;
  const posts = useSelector(selectPosts);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchPosts(selectedSubreddit));
  }, [dispatch, selectedSubreddit]);

  console.log(posts);

  return (
    <main className="center container-sm">
      <section className="cards">
        {posts.map((post, index) => (
          <Post key={post.id} post={post} />
        ))}
      </section>
    </main>
  );
};

export default Main;

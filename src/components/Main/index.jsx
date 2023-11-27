/* eslint-disable no-unused-vars */
import "./index.scss";
import Card from "../Card";
import { CardLoading } from "../CardLoading";
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
import { useSearchParams, useLocation, useNavigate } from "react-router-dom";
import { User } from "../User";
import { Community } from "../Community";
import { randomNumber } from "../../utilities/helpers";
import { UserLoading } from "../UserLoading";
import { CommunityLoading } from "../CommunityLoading";

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
  const { selectedSubreddit } = redditPosts;
  const postHasError = redditPosts.hasError;
  const postIsLoading = redditPosts.isLoading;
  const posts = useSelector(selectPosts);

  useEffect(() => {
    if (visibility === "posts") {
      dispatch(fetchPosts(selectedSubreddit));
    }
  }, [dispatch, selectedSubreddit, visibility, location]);

  // Contents
  const searchContent = useSelector((state) => state.search);
  const contentHasError = searchContent.hasError;
  const contentIsLoading = searchContent.isLoading;
  const searchTerm = useSelector(selectSearchTerm);
  const type = useSelector(selectType);
  const contents = useSelector(selectContents);

  const [search, setSearch] = useSearchParams();

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
        {/* loading skeleton */}
        {visibility === "posts" &&
          postIsLoading &&
          Array(randomNumber(20))
            .fill(0)
            .map((num, index) => <CardLoading key={index} />)}
        {visibility === "contents" &&
          contentIsLoading &&
          type === "link" &&
          Array(randomNumber(20))
            .fill(0)
            .map((num, index) => <CardLoading key={index} />)}
        {visibility === "contents" &&
          contentIsLoading &&
          type === "user" &&
          Array(randomNumber(10))
            .fill(0)
            .map((num, index) => <UserLoading key={index} />)}
        {visibility === "contents" &&
          contentIsLoading &&
          type === "sr" &&
          Array(randomNumber(10))
            .fill(0)
            .map((num, index) => <CommunityLoading key={index} />)}

        {/* posts */}
        {visibility === "posts" &&
          !postIsLoading &&
          posts.map((post, index) => (
            <Card key={index} index={index} card={post} />
          ))}
        {/* contents */}
        {visibility === "contents" &&
          !contentIsLoading &&
          type === "link" &&
          contents.map((content, index) => (
            <Card key={index} index={index} card={content} />
          ))}
        {visibility === "contents" &&
          !contentIsLoading &&
          type === "user" &&
          contents.map((content, index) => <User user={content} key={index} />)}
        {visibility === "contents" &&
          !contentIsLoading &&
          type === "sr" &&
          contents.map((content, index) => (
            <Community community={content} key={index} />
          ))}
      </section>
    </main>
  );
};

export default Main;

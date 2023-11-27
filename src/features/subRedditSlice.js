import { createSlice } from "@reduxjs/toolkit";
import { getSubreddit, getLinkComments } from "../api/reddit";

export const subredditSlice = createSlice({
  name: "subreddit",
  initialState: {
    posts: [],
    hasError: false,
    isLoading: false,
    selectedSubreddit: "/r/hamster/",
  },
  reducers: {
    setPost(state, action) {
      state.posts = action.payload;
    },
    setSelectedSubreddit(state, action) {
      state.selectedSubreddit = action.payload;
    },

    getPostPending(state) {
      state.isLoading = true;
      state.hasError = false;
    },
    getPostSuccess(state) {
      state.isLoading = false;
      state.hasError = false;
    },
    getPostFailed(state) {
      state.isLoading = false;
      state.hasError = true;
    },
    setPostComment(state, action) {
      const { index, comments } = action.payload;
      state.posts[index].comments = comments;
    },
    toggleShowingPostComments(state, action) {
      state.posts[action.payload].showingComments =
        !state.posts[action.payload].showingComments;
    },
    getPostCommentPending(state, action) {
      state.posts[action.payload].isLoadingComments = true;
      state.posts[action.payload].hasErrorComments = false;
    },
    getPostCommentSuccess(state, action) {
      state.posts[action.payload].isLoadingComments = false;
      state.posts[action.payload].hasErrorComments = false;
    },
    getPostCommentFailed(state, action) {
      state.posts[action.payload].isLoadingComments = false;
      state.posts[action.payload].hasErrorComments = true;
    },
  },
});

export const selectPosts = (state) => state.subreddit.posts;
export const selectSelectedSubreddit = (state) =>
  state.subreddit.selectedSubreddit;
export const {
  setPost,
  setSelectedSubreddit,
  toggleShowingPostComments,
  setPostComment,
  getPostPending,
  getPostSuccess,
  getPostFailed,
  getPostCommentPending,
  getPostCommentSuccess,
  getPostCommentFailed,
} = subredditSlice.actions;
export default subredditSlice.reducer;

export const fetchPosts = (subreddit) => async (dispatch) => {
  dispatch(getPostPending());
  try {
    const posts = await getSubreddit(subreddit);
    const postsWithComments = posts.map((post) => ({
      ...post,
      showingComments: false,
      comments: [],
      isLoadingComments: false,
      hasErrorComments: false,
    }));
    dispatch(setPost(postsWithComments));
    dispatch(getPostSuccess());
  } catch (err) {
    console.warn(err);
    dispatch(getPostFailed());
  }
};

export const fetchPostComments = (index, permalink) => async (dispatch) => {
  dispatch(getPostCommentPending(index));
  dispatch(toggleShowingPostComments(index));
  try {
    const comments = await getLinkComments(index, permalink);
    dispatch(setPostComment({ index: index, comments: comments }));
    dispatch(getPostCommentSuccess(index));
  } catch (err) {
    console.warn(err);
    dispatch(getPostCommentFailed(index));
  }
};

/* eslint-disable no-unused-vars */
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getSubreddit, getPostComments } from "../api/reddit";

export const loadPosts = createAsyncThunk("subReddit/getPosts", getSubreddit);

export const subRedditSlice = createSlice({
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
    toggleShowingComments(state, action) {
      state.posts[action.payload].showingComments =
        !state.posts[action.payload].showingComments;
    },
    startGetComments(state, action) {
      // If we're hiding comment, don't fetch the comments.
      state.comments[action.payload].showingComments =
        !state.comments[action.payload].showingComments;
      if (!state.comments[action.payload].showingComments) {
        return;
      }
      state.comments[action.payload].isLoadingComments = true;
      state.comments[action.payload].hasErrorComments = false;
    },
    getCommentsFailed(state, action) {
      state.comments[action.payload].isLoadingComments = false;
      state.comments[action.payload].hasErrorComments = true;
    },
    getCommentsSuccess(state, action) {
      state.comments[action.payload.index].isLoadingComments = false;
      state.comments[action.payload.index].comments = action.payload.comments;
    },
  },
  extraReducers: {
    [loadPosts.pending]: (state, action) => {
      state.isLoading = true;
      state.hasError = false;
    },
    [loadPosts.rejected]: (state, action) => {
      state.isLoading = false;
      state.hasError = true;
    },
    [loadPosts.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.hasError = false;
      state.posts = action.payload;
    },
  },
});

export const selectPosts = (state) => state.subreddit.posts;
export const selectSelectedSubreddit = (state) =>
  state.subreddit.selectedSubreddit;
export const {
  setPost,
  setSelectedSubreddit,
  toggleShowingComments,
  startGetComments,
  getCommentsFailed,
  getCommentsSuccess,
} = subRedditSlice.actions;
export default subRedditSlice.reducer;

export const fetchPosts = (subReddit) => async (dispatch) => {
  try {
    const posts = await getSubreddit(subReddit);
    const postsWithComments = posts.map((post) => ({
      ...post,
      showingComments: false,
      comments: [],
      isLoadingComments: false,
      hasErrorComments: false,
    }));
    dispatch(setPost(postsWithComments));
  } catch (err) {
    console.warn(err);
  }
};

export const fetchComments = (index, permlink) => async (dispatch) => {
  try {
    dispatch(startGetComments(index));
    const comments = await getPostComments(permlink);
    dispatch(getCommentsSuccess({ index, comments }));
  } catch (err) {
    dispatch(getCommentsFailed(index));
  }
};

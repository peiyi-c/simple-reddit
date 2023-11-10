import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getSubreddit, getLinkComments } from "../api/reddit";

export const loadPosts = createAsyncThunk("subreddit/getPosts", getSubreddit);
export const loadPostComments = createAsyncThunk(
  "subreddit/getComments",
  getLinkComments
);

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
    toggleShowingPostComments(state, action) {
      state.posts[action.payload].showingComments =
        !state.posts[action.payload].showingComments;
    },
    setPostComment(state, action) {
      const { index, comments } = action.payload;
      state.posts[index].comments = comments;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadPosts.pending, (state) => {
        state.isLoading = true;
        state.hasError = false;
      })
      .addCase(loadPosts.rejected, (state) => {
        state.isLoading = false;
        state.hasError = true;
      })
      .addCase(loadPosts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.hasError = false;
        state.posts = action.payload;
      })
      .addCase(loadPostComments.pending, (state, action) => {
        state.posts[action.payload].showingComments =
          !state.posts[action.payload].showingComments;
        if (!state.posts[action.payload.index].showingComments) {
          return;
        }
        state.posts[action.payload.index].isLoadingComments = true;
        state.posts[action.payload.index].hasErrorComments = false;
      })
      .addCase(loadPostComments.rejected, (state, action) => {
        state.posts[action.payload.index].isLoadingComments = false;
        state.posts[action.payload.index].hasErrorComments = true;
      })
      .addCase(loadPostComments.fulfilled, (state, action) => {
        state.posts[action.payload.index].isLoadingComments = false;
        state.posts[action.payload.index].comments = action.payload.comments;
      });
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
} = subredditSlice.actions;
export default subredditSlice.reducer;

export const fetchPosts = (subreddit) => async (dispatch) => {
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
  } catch (err) {
    console.warn(err);
  }
};

export const fetchPostComments = (index, permalink) => async (dispatch) => {
  dispatch(toggleShowingPostComments(index));
  try {
    const comments = await getLinkComments(index, permalink);
    dispatch(setPostComment({ index: index, comments: comments }));
  } catch (err) {
    console.warn(err);
  }
};

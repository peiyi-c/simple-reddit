/* eslint-disable no-unused-vars */
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getSubreddit, getPostComments } from "../api/reddit";

export const loadContents = createAsyncThunk(
  "subReddit/getCotents",
  getSubreddit
);

export const loadComments = createAsyncThunk(
  "subReddit/getComments",
  getPostComments
);

const initialState = {
  contents: [],
  hasError: false,
  isLoading: false,
  selectedSubreddit: "/r/hamster/",
};

export const subRedditSlice = createSlice({
  name: "subReddit",
  initialState,
  reducers: {
    setContent(state, action) {
      state.contents = action.payload;
    },
    setSelectedSubreddit(state, action) {
      state.selectedSubreddit = action.payload;
    },
    toggleShowingComments(state, action) {
      state.contents[action.payload].showingComments =
        !state.contents[action.payload].showingComments;
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
    [loadContents.pending]: (state, action) => {
      state.isLoading = true;
      state.hasError = false;
    },
    [loadContents.rejected]: (state, action) => {
      state.isLoading = false;
      state.hasError = true;
    },
    [loadContents.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.hasError = false;
      state.contents = action.payload;
    },
  },
});

export const selectContents = (state) => state.subReddit.contents;
export const {
  setContent,
  setSelectedSubreddit,
  toggleShowingComments,
  startGetComments,
  getCommentsFailed,
  getCommentsSuccess,
} = subRedditSlice.actions;
export default subRedditSlice.reducer;

export const fetchContents = (subReddit) => async (dispatch) => {
  try {
    const contents = await getSubreddit(subReddit);
    const contentsWithComments = contents.map((content) => ({
      ...content,
      showingComments: false,
      comments: [],
      isLoadingComments: false,
      hasErrorComments: false,
    }));
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

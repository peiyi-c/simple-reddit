import { createSlice } from "@reduxjs/toolkit";
import { getSearchContent, getLinkComments } from "../api/reddit";

export const searchTermSlice = createSlice({
  name: "search",
  initialState: {
    searchTerm: "",
    contents: [],
    hasError: false,
    isLoading: false,
    type: "link",
  },
  reducers: {
    setSearchTerm(state, action) {
      state.searchTerm = action.payload;
    },
    clearSearchTerm(state) {
      state.searchTerm = "";
    },
    setContent(state, action) {
      state.contents = action.payload;
    },
    getContentPending(state) {
      state.isLoading = true;
      state.hasError = false;
    },
    getContentSuccess(state) {
      state.isLoading = false;
      state.hasError = false;
    },
    getContentFailed(state) {
      state.isLoading = false;
      state.hasError = true;
    },
    setType(state, action) {
      state.type = action.payload;
    },
    toggleShowingContentComments(state, action) {
      state.contents[action.payload].showingComments =
        !state.contents[action.payload].showingComments;
    },
    setContentComment(state, action) {
      const { index, comments } = action.payload;
      state.contents[index].comments = comments;
    },
    getContentCommentPending(state, action) {
      state.contents[action.payload].isLoadingComments = true;
      state.contents[action.payload].hasErrorComments = false;
    },
    getContentCommentSuccess(state, action) {
      state.contents[action.payload].isLoadingComments = false;
      state.contents[action.payload].hasErrorComments = false;
    },
    getContentCommentFailed(state, action) {
      state.contents[action.payload].isLoadingComments = false;
      state.contents[action.payload].hasErrorComments = true;
    },
  },
});

export const {
  setSearchTerm,
  clearSearchTerm,
  setContent,
  getContentPending,
  getContentSuccess,
  getContentFailed,
  setType,
  setContentComment,
  toggleShowingContentComments,
  getContentCommentPending,
  getContentCommentSuccess,
  getContentCommentFailed,
} = searchTermSlice.actions;
export const selectSearchTerm = (state) => state.search.searchTerm;
export const selectType = (state) => state.search.type;
export const selectContents = (state) => state.search.contents;

export default searchTermSlice.reducer;

export const fetchContents =
  (searchTerm, type = "link") =>
  async (dispatch) => {
    dispatch(getContentPending());
    if (type == null) {
      type = "link";
    }
    try {
      const contents = await getSearchContent(searchTerm, type);
      if (type === "link") {
        const contentsWithComments = contents.map((content) => ({
          ...content,
          showingComments: false,
          comments: [],
          isLoadingComments: false,
          hasErrorComments: false,
        }));
        dispatch(setContent(contentsWithComments));
        dispatch(getContentSuccess());
      } else {
        dispatch(setContent(contents));
        dispatch(getContentSuccess());
      }
    } catch (err) {
      console.warn(err);
      dispatch(getContentFailed());
    }
  };

export const fetchContentComments = (index, permalink) => async (dispatch) => {
  dispatch(getContentCommentPending(index));
  dispatch(toggleShowingContentComments(index));
  try {
    const comments = await getLinkComments(index, permalink);
    dispatch(setContentComment({ index: index, comments: comments }));
    dispatch(getContentCommentSuccess(index));
  } catch (err) {
    console.warn(err);
    dispatch(getContentCommentFailed(index));
  }
};

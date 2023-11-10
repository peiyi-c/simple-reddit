import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getSearchContent, getLinkComments } from "../api/reddit";

export const loadContents = createAsyncThunk(
  "search/getContents",
  getSearchContent
);

export const loadContentComments = createAsyncThunk(
  "search/getComments",
  getLinkComments
);

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
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadContents.pending, (state) => {
        state.isLoading = true;
        state.hasError = false;
      })
      .addCase(loadContents.rejected, (state) => {
        state.isLoading = false;
        state.hasError = true;
      })
      .addCase(loadContents.fulfilled, (state, action) => {
        state.isLoading = false;
        state.hasError = false;
        state.posts = action.payload;
      });
  },
});

export const {
  setSearchTerm,
  clearSearchTerm,
  setContent,
  setType,
  setContentComment,
  toggleShowingContentComments,
} = searchTermSlice.actions;
export const selectSearchTerm = (state) => state.search.searchTerm;
export const selectType = (state) => state.search.type;
export const selectContents = (state) => state.search.contents;

export default searchTermSlice.reducer;

export const fetchContents =
  (searchTerm, type = "link") =>
  async (dispatch) => {
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
      } else {
        dispatch(setContent(contents));
      }
    } catch (err) {
      console.warn(err);
    }
  };

export const fetchContentComments = (index, permalink) => async (dispatch) => {
  dispatch(toggleShowingContentComments(index));
  try {
    const comments = await getLinkComments(index, permalink);
    dispatch(setContentComment({ index: index, comments: comments }));
  } catch (err) {
    console.warn(err);
  }
};

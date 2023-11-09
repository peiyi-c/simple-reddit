/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getSearchContent } from "../api/reddit";

export const loadContents = createAsyncThunk(
  "search/getContents",
  getSearchContent
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

export const { setSearchTerm, clearSearchTerm, setContent, setType } =
  searchTermSlice.actions;
export const selectSearchTerm = (state) => state.search.searchTerm;
export const selectContents = (state) => state.search.contents;

export default searchTermSlice.reducer;

export const fetchContents = (searchTerm, type) => async (dispatch) => {
  try {
    const contents = await getSearchContent(searchTerm, type);
    dispatch(setContent(contents));
  } catch (err) {
    console.warn(err);
  }
};

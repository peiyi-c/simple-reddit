import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getSearchContent } from "../api/reddit";

export const loadHamsterCommunities = createAsyncThunk(
  "hamsterReddits/getReddits",
  getSearchContent
);

export const hamsterRedditsSlice = createSlice({
  name: "hamsterReddits",
  initialState: {
    communities: [],
    hasError: false,
    isLoading: false,
  },
  reducers: {
    setCommunities(state, action) {
      state.communities = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadHamsterCommunities.pending, (state) => {
        state.isLoading = true;
        state.hasError = false;
      })
      .addCase(loadHamsterCommunities.rejected, (state) => {
        state.isLoading = false;
        state.hasError = true;
      })
      .addCase(loadHamsterCommunities.fulfilled, (state, action) => {
        state.isLoading = false;
        state.hasError = false;
        state.communities = action.payload;
      });
  },
});

export const selectCommunities = (state) => state.hamsterReddits.communities;
export const selectPosts = (state) => state.subreddit.posts;

export const { setCommunities } = hamsterRedditsSlice.actions;

export default hamsterRedditsSlice.reducer;

export const fetchHamsterReddits = () => async (dispatch) => {
  try {
    const communities = await getSearchContent("hamster", "sr");
    dispatch(setCommunities(communities));
  } catch (err) {
    console.warn(err);
  }
};

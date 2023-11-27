import { createSlice } from "@reduxjs/toolkit";
import { getSearchContent } from "../api/reddit";

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
    getCommunitiesPending(state) {
      state.isLoading = true;
      state.hasError = false;
    },
    getCommunitiesSuccess(state) {
      state.isLoading = false;
      state.hasError = false;
    },
    getCommunitiesFailed(state) {
      state.isLoading = false;
      state.hasError = true;
    },
  },
});

export const selectCommunities = (state) => state.hamsterReddits.communities;
export const selectPosts = (state) => state.subreddit.posts;

export const {
  setCommunities,
  getCommunitiesPending,
  getCommunitiesSuccess,
  getCommunitiesFailed,
} = hamsterRedditsSlice.actions;

export default hamsterRedditsSlice.reducer;

export const fetchHamsterReddits = () => async (dispatch) => {
  try {
    dispatch(getCommunitiesPending());

    const communities = await getSearchContent("hamster", "sr");
    dispatch(setCommunities(communities));
    dispatch(getCommunitiesSuccess());
  } catch (err) {
    dispatch(getCommunitiesFailed());
    console.warn(err);
  }
};

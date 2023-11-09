import { createSlice } from "@reduxjs/toolkit";

export const visibilitySlice = createSlice({
  name: "visibility",
  initialState: {
    visibility: "posts",
  },
  reducers: {
    toggleVisibility(state) {
      state.visibility === "posts"
        ? (state.visibility = "contents")
        : (state.visibility = "posts");
    },
    viewPosts(state) {
      state.visibility = "posts";
    },
    viewContents(state) {
      state.visibility = "contents";
    },
  },
});

export const selectVisibility = (state) => state.visibility.visibility;
export const { toggleVisibility, viewPosts, viewContents } =
  visibilitySlice.actions;
export default visibilitySlice.reducer;

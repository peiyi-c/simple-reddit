import { configureStore, combineReducers } from "@reduxjs/toolkit";
import themeReducer from "../features/themeSlice.js";
import searchReducer from "../features/searchTermSlice.js";
import subredditReducer from "../features/subredditSlice.js";

export default configureStore({
  reducer: combineReducers({
    theme: themeReducer,
    search: searchReducer,
    subreddit: subredditReducer,
  }),
});

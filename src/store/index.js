import { configureStore, combineReducers } from "@reduxjs/toolkit";
import themeReducer from "../features/themeSlice.js";

export default configureStore({
  reducer: combineReducers({
    theme: themeReducer,
  }),
});

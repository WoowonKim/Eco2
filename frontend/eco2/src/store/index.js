import { configureStore } from "@reduxjs/toolkit";
import { authSlice } from "./user/userSlice";
import { feedSlice } from "./mainFeed/feedSlice";

export const store = configureStore({
  reducer: {
    user: authSlice.reducer,
    feed: feedSlice.reducer,
  },
});

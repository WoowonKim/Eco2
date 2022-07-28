import { configureStore } from "@reduxjs/toolkit";
import { authSlice } from "./user/userSlice";
import { feedSlice } from "./mainFeed/feedSlice";
import { commentSlice } from "./mainFeed/commentSlice";
import { leavesSlice } from "./mainTree/leavesSlice";
import { dailymissionSlice } from "./mission/dailymissionSlice";

export const store = configureStore({
  reducer: {
    user: authSlice.reducer,
    feed: feedSlice.reducer,
    comment: commentSlice.reducer,
    leaves: leavesSlice.reducer,
    dailyMission: dailymissionSlice.reducer,
  },
});

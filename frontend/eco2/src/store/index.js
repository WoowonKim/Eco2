import { configureStore } from "@reduxjs/toolkit";
import { authSlice } from "./user/userSlice";
import { feedSlice } from "./mainFeed/feedSlice";
import { commentSlice } from "./mainFeed/commentSlice";
import { leavesSlice } from "./mainTree/leavesSlice";
import { userInformationSlice } from "./user/userSettingSlice";
import { accountSlice } from "./user/accountSlice";
import { dailymissionSlice } from "./mission/dailymissionSlice";
import { myEcoMissionSlice } from "./mission/missionMainSlice";
import { cumtomSlice } from "./mission/customMissionSlice";
import { postSlice } from "./post/postSlice";

export const store = configureStore({
  reducer: {
    user: authSlice.reducer,
    userInformation: userInformationSlice.reducer,
    account: accountSlice.reducer,
    feed: feedSlice.reducer,
    comment: commentSlice.reducer,
    leaves: leavesSlice.reducer,
    dailyMission: dailymissionSlice.reducer,
    missionMain: myEcoMissionSlice.reducer,
    custom: cumtomSlice.reducer,
    post: postSlice.reducer,
  },
});

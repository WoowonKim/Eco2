import { configureStore } from "@reduxjs/toolkit";
import { authSlice } from "./user/userSlice";

export const store = configureStore({
  reducer: {
    user: authSlice.reducer,
  },
});

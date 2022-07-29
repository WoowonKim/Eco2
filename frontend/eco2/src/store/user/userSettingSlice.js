import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const login = createAsyncThunk("user/login", async (args, thunkAPI) => {
  const token = getToken();
  const response = await axios({
    url: "/user/login",
    method: "post",
    data: {
      email: args.email,
      password: args.password,
      socialType: args.socialType,
    },
    headers: {
      Authorization: "Authorization " + token,
    },
  });
  return response.data;
});

export const authSlice = createSlice({
  name: "auth",
  initialState: authState,
  reducers: {
    logout(state) {
      state.isLoggedIn = 0;
      state.token = null;
      removeUserSession();
      console.log(state.isLoggedIn, state.token);
    },
    loginStateReferesh(state) {
      console.log("login state referesh");
      state.isLoggedIn = 1;
      state.token = getToken();
      setUserSession(getToken());
    },
  },
  extraReducers: {
    [login.fulfilled]: (state, action) => {
      console.log("login fulfilled", action.payload);
      state.isLoggedIn = 1;
      state.token = action.payload.key;
      setUserSession(action.payload.key);
    },
    [login.rejected]: (state, action) => {
      console.log("login rejected", action.payload);
      state.isLoggedIn = 0;
      state.token = null;
      removeUserSession();
    },
  },
});

export const authActions = authSlice.actions;

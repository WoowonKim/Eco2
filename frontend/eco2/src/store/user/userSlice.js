import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { getToken, removeUserSession, setUserSession } from "./common";

// login 요청
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

// 회원가입 요청
export const signUp = createAsyncThunk(
  "user/signup",
  // rejectWithValue -> 오류가 발생한 이유가 더 자세히 나오는 듯
  async (args, { rejectWithValue }) => {
    try {
      const token = getToken();
      const response = await axios({
        url: "/user",
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
      console.log(args.socialType);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response);
    }
  }
);

// 이메일 요청
export const emailVerify = createAsyncThunk(
  "user/email/verify",
  async (args, { rejectWithValue }) => {
    try {
      const token = getToken();
      const response = await axios({
        url: `/user/email/verify/${args.email}`,
        method: "get",
        headers: {
          Authorization: "Authorization " + token,
        },
      });
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response);
    }
  }
);

// 이메일 인증번호 확인
export const emailVerifyCode = createAsyncThunk(
  "user/email/verify/code",
  async (args, { rejectWithValue }) => {
    try {
      const token = getToken();
      const response = await axios({
        url: `/user/email/verify/${args.email}`,
        method: "post",
        data: {
          code: args.code,
        },
        headers: {
          Authorization: "Authorization " + token,
        },
      });
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response);
    }
  }
);

const authState = {
  isLoggedIn: 0,
  token: null,
  isEmailValid: false,
  isEmailVerified: false,
};
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
    [signUp.fulfilled]: (state, action) => {
      console.log("signup fulfilled", action.payload);
      state.isLoggedIn = 1;
      state.token = action.payload.key;
      setUserSession(action.payload.key);
    },
    [signUp.rejected]: (state, action) => {
      console.log("signup rejected", action.payload);
      state.isLoggedIn = 0;
      state.token = null;
      removeUserSession();
    },
    [emailVerify.fulfilled]: (state, action) => {
      console.log("emailVerify fulfilled", action.payload);
      state.isEmailValid = true;
    },
    [emailVerify.rejected]: (state, action) => {
      console.log("emailVerify rejected", action.payload);
      state.isEmailValid = false;
    },
    [emailVerifyCode.fulfilled]: (state, action) => {
      console.log("emailVerifyCode fulfilled", action.payload);
      state.isEmailVerified = true;
    },
    [emailVerifyCode.rejected]: (state, action) => {
      console.log("emailVerifyCode rejected", action.payload);

      state.isEmailVerified = false;
    },
  },
});

export const authActions = authSlice.actions;

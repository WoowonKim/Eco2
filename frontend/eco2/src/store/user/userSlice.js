import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import {
  getCookie,
  getToken,
  removeUserSession,
  setUserSession,
} from "./common";

// login 요청
export const login = createAsyncThunk(
  "user/login",
  async (args, rejectWithValue) => {
    try {
      const response = await axios({
        url: "/user/login",
        method: "post",
        data: {
          email: args.email,
          password: args.password,
          socialType: args.socialType,
        },
      });
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response);
    }
  }
);

// 회원가입 요청
export const signUp = createAsyncThunk(
  "user/signup",
  // rejectWithValue -> 오류가 발생한 이유가 더 자세히 나오는 듯
  async (args, { rejectWithValue }) => {
    try {
      const response = await axios({
        url: "/user",
        method: "post",
        data: {
          email: args.email,
          password: args.password,
          socialType: args.socialType,
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
      const response = await axios({
        url: `/user/email/verify/${args.email}`,
        method: "get",
      });
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response);
    }
  }
);

// 이메일 중복 확인
export const emailCheck = createAsyncThunk(
  "user/email/check/",
  async (args, { rejectWithValue }) => {
    try {
      const response = await axios({
        url: `/user/email/${args.email}`,
        method: "get",
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
      const response = await axios({
        url: `/user/email/verify/${args.email}`,
        method: "post",
        data: {
          code: args.code,
        },
      });
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response);
    }
  }
);

// EcoName 중복 확인
export const ecoNameVerify = createAsyncThunk(
  "user/ecoName/verify",
  async (args, { rejectWithValue }) => {
    try {
      const response = await axios({
        url: `/user/econame/${args.econame}`,
        method: "get",
      });
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response);
    }
  }
);

// 비밀번호 재설정
export const newPassword = createAsyncThunk(
  "user/newPassword",
  async (args, { rejectWithValue }) => {
    try {
      const response = await axios({
        url: "/user/newpassword",
        method: "put",
        data: {
          email: args.email,
          password: args.password,
        },
      });
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response);
    }
  }
);

// EcoName 생성 및 수정
export const ecoName = createAsyncThunk(
  "user/ecoName",
  async (args, { rejectWithValue }) => {
    try {
      const response = await axios({
        url: `/user/econame`,
        method: "put",
        data: {
          email: args.email,
          name: args.econame,
        },
      });
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response);
    }
  }
);

// Google 로그인
export const googleLogin = createAsyncThunk(
  "user/googleLogin",
  async (args, { rejectWithValue }) => {
    try {
      const response = await axios({
        url: `/user/auth/${args.socialType}`,
        method: "post",
        data: args.idToken,
      });
      console.log(args);
      return response.data;
    } catch (err) {
      console.log(args);
      return rejectWithValue(err.response);
    }
  }
);

const authState = {
  isLoggedIn: 0,
  token: null,
  isEmailValid: false,
  isEmailVerified: false,
  isEmailOnly: false,
  isEcoNameValid: false,
  isEcoNameVerified: false,
  isPasswordValid: false,
};

export const authSlice = createSlice({
  name: "auth",
  initialState: authState,
  reducers: {},
  extraReducers: {
    [login.fulfilled]: (state, action) => {
      console.log("login fulfilled", action.payload);
      if (action.payload.status === 200) {
        state.isLoggedIn = 1;
        state.token = action.payload.accessToken;
      }
      setUserSession(action.payload.accessToken);
    },
    [login.rejected]: (state, action) => {
      console.log("login rejected", action.payload);
      state.isLoggedIn = 0;
      state.token = null;
      removeUserSession();
    },
    [signUp.fulfilled]: (state, action) => {
      console.log("signup fulfilled", action.payload);
      if (action.payload.status === 200) {
        state.isLoggedIn = 1;
        state.token = action.payload.accessToken;
      }
      setUserSession(action.payload.accessToken);
    },
    [signUp.rejected]: (state, action) => {
      console.log("signup rejected", action.payload);
      state.isLoggedIn = 0;
    },
    [emailVerify.fulfilled]: (state, action) => {
      console.log("emailVerify fulfilled", action.payload);
      if (action.payload.status === 200) {
        state.isEmailValid = true;
      }
    },
    [emailVerify.rejected]: (state, action) => {
      console.log("emailVerify rejected", action.payload);
      state.isEmailValid = false;
    },
    [emailVerifyCode.fulfilled]: (state, action) => {
      console.log("emailVerifyCode fulfilled", action.payload);
      if (action.payload.statue === 200) {
        state.isEmailVerified = true;
      }
    },
    [emailVerifyCode.rejected]: (state, action) => {
      console.log("emailVerifyCode rejected", action.payload);
      state.isEmailVerified = false;
    },
    [emailCheck.fulfilled]: (state, action) => {
      console.log("emailCheck fulfilled", action.payload);
      if (action.payload.status === 200) {
        state.isEmailOnly = true;
      }
    },
    [emailCheck.rejected]: (state, action) => {
      console.log("emailCheck rejected", action.payload);
      state.isEmailOnly = false;
    },
    [ecoNameVerify.fulfilled]: (state, action) => {
      console.log("ecoNameVerify fulfilled", action.payload);
      if (action.payload.status === 200) {
        state.isEcoNameValid = true;
      }
    },
    [ecoNameVerify.rejected]: (state, action) => {
      console.log("ecoNameVerify rejected", action.payload);
      state.isEcoNameValid = false;
    },
    [ecoName.fulfilled]: (state, action) => {
      console.log("ecoName fulfilled", action.payload);
      if (action.payload.status === 200) {
        state.isEcoNameVerified = true;
      }
    },
    [ecoName.rejected]: (state, action) => {
      console.log("ecoName rejected", action.payload);
      state.isEcoNameVerified = false;
    },
    [newPassword.fulfilled]: (state, action) => {
      console.log("newPassword fulfilled", action.payload);
      if (action.payload.status === 200) {
        state.isPasswordValid = true;
      }
    },
    [newPassword.rejected]: (state, action) => {
      console.log("newPassword rejected", action.payload);
      state.isPasswordValid = false;
    },
    [googleLogin.fulfilled]: (state, action) => {
      console.log("googleLogin fulfilled", action.payload);
      if (action.payload.status === 200) {
        state.isLoggedIn = 1;
        state.token = action.payload.accessToken;
      }
    },
    [googleLogin.rejected]: (state, action) => {
      console.log("googleLogin rejected", action.payload);
      // state.isPasswordValid = false;
    },
  },
});

export const authActions = authSlice.actions;

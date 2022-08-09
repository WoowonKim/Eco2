import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  getCookie,
  getToken,
  getUserEmail,
  removeUserSession,
  setAccessToken,
  setEmail,
} from "./common";

import { axiosService } from "../axiosService";

// login 요청
export const login = createAsyncThunk(
  "userSlice/login",
  async (args, { rejectWithValue }) => {
    try {
      const response = await axiosService.post("user/login", {
        email: args.email,
        password: args.password,
        socialType: args.socialType,
      });
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response);
    }
  }
);

// 회원가입 요청
export const signUp = createAsyncThunk(
  "userSlice/signup",
  async (args, { rejectWithValue }) => {
    try {
      const response = await axiosService.post("/user", {
        email: args.email,
        password: args.password,
        socialType: args.socialType,
      });
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response);
    }
  }
);

// 이메일 요청
export const emailVerify = createAsyncThunk(
  "userSlice/emailVerify",
  async (args, { rejectWithValue }) => {
    try {
      const response = await axiosService.get(
        `/user/email/verify/${args.email}`
      );
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response);
    }
  }
);

// 이메일 중복 확인
export const emailCheck = createAsyncThunk(
  "userSlice/emailCheck",
  async (args, { rejectWithValue }) => {
    try {
      const response = await axiosService.get(
        `/user/email?email=${args.email}`
      );
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response);
    }
  }
);

// 이메일 인증번호 확인
export const emailVerifyCode = createAsyncThunk(
  "userSlice/emailVerifyCode",
  async (args, { rejectWithValue }) => {
    try {
      const response = await axiosService.post(
        `/user/email/verify/${args.email}`,
        {
          code: args.code,
        }
      );
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response);
    }
  }
);

// EcoName 중복 확인
export const ecoNameVerify = createAsyncThunk(
  "userSlice/ecoNameVerify",
  async (args, { rejectWithValue }) => {
    try {
      const response = await axiosService.get(`/user/econame/${args.econame}`);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response);
    }
  }
);

// EcoName 생성 및 수정
export const ecoName = createAsyncThunk(
  "userSlice/ecoName",
  async (args, { rejectWithValue }) => {
    try {
      console.log(args.email, args.econame);
      const response = await axiosService.put("/user/econame", {
        email: args.email,
        name: args.econame,
      });
      return response.data;
    } catch (err) {
      console.log(err);
      return rejectWithValue(err.response);
    }
  }
);

// 비밀번호 재설정
export const newPassword = createAsyncThunk(
  "userSlice/newPassword",
  async (args, { rejectWithValue }) => {
    try {
      const response = await axiosService.put("/user/newpassword", {
        email: args.email,
        password: args.password,
      });
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response);
    }
  }
);

// Google 로그인
export const googleLogin = createAsyncThunk(
  "userSlice/googleLogin",
  async (args, { rejectWithValue }) => {
    try {
      console.log(args.idToken);
      const response = await axiosService.post(
        `/user/auth/${args.socialType}`,
        { idToken: args.idToken }
      );
      console.log(response);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response);
    }
  }
);

// kakao 로그인
export const kakaoLogin = createAsyncThunk(
  "userSlice/kakaoLogin",
  async (args, { rejectWithValue }) => {
    try {
      const response = await axiosService.post(`/user/auth/2`, {
        idToken: args.idToken,
      });
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response);
    }
  }
);

// accesstoken 재발급
export const newAccessToken = createAsyncThunk(
  "userSlice/newAccessToken",
  async (args, { rejectWithValue }) => {
    try {
      const response = await axiosService.post(
        "/user/userinformation",
        { email: getUserEmail() },
        { withCredentials: true }
      );
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response);
    }
  }
);

const userState = {
  isLoggedIn: 0,
  token: null,
  isEmailValid: false,
  isEmailVerified: false,
  isEmailOnly: false,
  isEcoNameValid: false,
  isEcoNameVerified: false,
  isPasswordValid: false,
  email: "",
  user: {},
};

export const userSlice = createSlice({
  name: "user",
  initialState: userState,
  reducers: {
    logout: (state, action) => {
      removeUserSession();
    },
  },
  extraReducers: {
    [login.fulfilled]: (state, action) => {
      console.log("login fulfilled", action.payload);
      if (action.payload.status === 200) {
        state.user = action.payload.user;
      }
    },
    [login.rejected]: (state, action) => {
      console.log("login rejected", action.payload);
      removeUserSession();
    },
    [signUp.fulfilled]: (state, action) => {
      console.log("signup fulfilled", action.payload);
      if (action.payload.status === 200) {
      }
    },
    [signUp.rejected]: (state, action) => {
      console.log("signup rejected", action.payload);
      removeUserSession();
    },
    [emailVerify.fulfilled]: (state, action) => {
      console.log("emailVerify fulfilled", action.payload);
      if (action.payload.status === 200) {
      }
    },
    [emailVerify.rejected]: (state, action) => {
      console.log("emailVerify rejected", action.payload);
    },
    [emailVerifyCode.fulfilled]: (state, action) => {
      console.log("emailVerifyCode fulfilled", action.payload);
      if (action.payload.statue === 200) {
      }
    },
    [emailVerifyCode.rejected]: (state, action) => {
      console.log("emailVerifyCode rejected", action.payload);
    },
    [emailCheck.fulfilled]: (state, action) => {
      console.log("emailCheck fulfilled", action.payload);
      if (action.payload.status === 200) {
      }
    },
    [emailCheck.rejected]: (state, action) => {
      console.log("emailCheck rejected", action.payload);
    },
    [ecoNameVerify.fulfilled]: (state, action) => {
      console.log("ecoNameVerify fulfilled", action.payload);
      if (action.payload.status === 200) {
      }
    },
    [ecoNameVerify.rejected]: (state, action) => {
      console.log("ecoNameVerify rejected", action.payload);
    },
    [ecoName.fulfilled]: (state, action) => {
      console.log("ecoName fulfilled", action.payload);
      if (action.payload.status === 200) {
      }
    },
    [ecoName.rejected]: (state, action) => {
      console.log("ecoName rejected", action.payload);
    },
    [newPassword.fulfilled]: (state, action) => {
      console.log("newPassword fulfilled", action.payload);
      if (action.payload.status === 200) {
      }
    },
    [newPassword.rejected]: (state, action) => {
      console.log("newPassword rejected", action.payload);
    },
    [googleLogin.fulfilled]: (state, action) => {
      console.log("googleLogin fulfilled", action.payload);
      if (action.payload.status === 200) {
      }
    },
    [googleLogin.rejected]: (state, action) => {
      console.log("googleLogin rejected", action.payload);
      removeUserSession();
    },
    [kakaoLogin.fulfilled]: (state, action) => {
      console.log("kakaoLogin fulfilled", action.payload);
      if (action.payload.status === 200) {
      }
    },
    [kakaoLogin.rejected]: (state, action) => {
      console.log("kakaoLogin rejected", action.payload);
      removeUserSession();
    },
    [newAccessToken.fulfilled]: (state, action) => {
      console.log("newAccessToken fulfilled", action.payload);
      if (action.payload.status === 200) {
      }
    },
    [newAccessToken.rejected]: (state, action) => {
      console.log("newAccessToken rejected", action.payload);
      removeUserSession();
    },
  },
});

export const userActions = userSlice.actions;

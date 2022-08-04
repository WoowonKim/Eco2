import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { axiosService } from "../axiosService";
import { getToken } from "./common";

// 소셜 로그인한 회원 정보는 조회가 안되는 것 같음 -> 확인 필요
// 유저 정보 조회
export const userInformation = createAsyncThunk(
  "userInformationSlice/userInformation",
  async (args, { rejectWithValue }) => {
    try {
      const response = await axiosService.get(`/userinformation/${args.email}`);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response);
    }
  }
);

// 비밀번호 확인
export const passwordCheck = createAsyncThunk(
  "userInformationSlice/passwordCheck",
  async (args, { rejectWithValue }) => {
    try {
      const response = await axiosService.post("/userinformation/password", {
        email: args.email,
        password: args.password,
      });
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response);
    }
  }
);

// 안됨
// 비밀번호 수정
export const passwordChange = createAsyncThunk(
  "userInformationSlice/passwordChange",
  async (args, { rejectWithValue }) => {
    try {
      const response = await axiosService.put("/userinformation/password", {
        email: args.email,
        password: args.password,
      });
      return response.data;
    } catch (err) {
      console.log(err);
    }
  }
);

// 에러 발생
// 회원 탈퇴
export const deleteUser = createAsyncThunk(
  "userInformationSlice/deleteUser",
  async (args, { rejectWithValue }) => {
    try {
      const response = await axiosService.delete("/userinformation", {
        email: args.email,
        // password: args.password,
      });
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response);
    }
  }
);

export const userInformationSlice = createSlice({
  name: "userInformation",
  initialState: [],
  reducers: {},
  extraReducers: {
    [userInformation.fulfilled]: (state, action) => {
      console.log("userInformation fulfilled", action.payload);
    },
    [userInformation.rejected]: (state, action) => {
      console.log("userInformation rejected", action.payload);
    },
    [passwordCheck.fulfilled]: (state, action) => {
      console.log("passwordCheck fulfilled", action.payload);
    },
    [passwordCheck.rejected]: (state, action) => {
      console.log("passwordCheck rejected", action.payload);
    },
    [passwordChange.fulfilled]: (state, action) => {
      console.log("passwordChange fulfilled", action.payload);
    },
    [passwordChange.rejected]: (state, action) => {
      console.log("passwordChange rejected", action.payload);
    },
    [deleteUser.fulfilled]: (state, action) => {
      console.log("deleteUser fulfilled", action.payload);
    },
    [deleteUser.rejected]: (state, action) => {
      console.log("deleteUser rejected", action.payload);
    },
  },
});

export const userInformationActions = userInformationSlice.actions;

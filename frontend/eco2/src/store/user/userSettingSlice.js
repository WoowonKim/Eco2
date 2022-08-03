import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { getToken } from "./common";

// 유저 정보 조회
export const userInformation = createAsyncThunk(
  "userInformationSlice/userInformation",
  async (args, { rejectWithValue }) => {
    const accessToken = getToken();
    const response = await axios({
      url: `/userinformation/${args.email}`,
      method: "get",
      headers: {
        "Auth-accessToken": accessToken,
      },
    });
    return response.data;
  }
);

// 비밀번호 확인
export const passwordCheck = createAsyncThunk(
  "userInformationSlice/passwordCheck",
  async (args, { rejectWithValue }) => {
    const accessToken = getToken();
    const response = await axios({
      url: "/userinformation/password",
      method: "post",
      data: {
        email: args.email,
        password: args.password,
      },
      headers: {
        "Auth-accessToken": accessToken,
      },
    });
    return response.data;
  }
);

// 비밀번호 수정
export const passwordChange = createAsyncThunk(
  "userInformationSlice/passwordChange",
  async (args, { rejectWithValue }) => {
    try {
      const accessToken = getToken();
      const response = await axios({
        url: "/userinformation/password",
        method: "put",
        data: {
          email: args.email,
          password: args.password,
        },
        headers: {
          "Auth-accessToken": accessToken,
        },
      });
      return response.data;
    } catch (err) {
      console.log(err, args.email, args.password);
    }
  }
);

// 회원 탈퇴
// 백엔드 코드 확정 시 수정 필요
export const deleteUser = createAsyncThunk(
  "userInformationSlice/deleteUser",
  async (args, { rejectWithValue }) => {
    const accessToken = getToken();
    const response = await axios({
      url: `/userinformation`,
      method: "delete",
      data: {
        email: args.email,
        // password: args.password,
      },
      headers: {
        "Auth-accessToken": accessToken,
      },
    });
    return response.data;
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

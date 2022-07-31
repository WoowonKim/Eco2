import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { getToken } from "./common";

// 친구 조회 => 현재 안됨
export const friends = createAsyncThunk(
  "account/friend/list",
  async (args, { rejectWithValue }) => {
    const response = await axios({
      url: "/account/friend",
      method: "get",
      data: {
        email: args.email,
        password: args.password,
        socialType: args.socialType,
      },
      headers: {
        Authorization: "Authorization ",
      },
    });
    return response.data;
  }
);

// 계정 설정 수정
export const accountSetting = createAsyncThunk(
  "account/setting",
  async (args, { rejectWithValue }) => {
    const accessToken = getToken();
    const response = await axios({
      url: "/account",
      method: "put",
      data: {
        // 이메일 정보 추가해야함
        email: args.email,
        publicFlag: args.publicFlag,
        commentAlarmFlag: args.commentAlarmFlag,
        chatAlarmFlag: args.chatAlarmFlag,
        darkmodeFlag: args.darkmodeFlag,
      },
      headers: {
        "Auth-accessToken": accessToken,
      },
    });
    return response.data;
  }
);

export const accountSlice = createSlice({
  name: "account",
  initialState: [],
  reducers: {},
  extraReducers: {
    [friends.fulfilled]: (state, action) => {},
    [friends.rejected]: (state, action) => {},
    [accountSetting.fulfilled]: (state, action) => {
      console.log("accountSetting rejected", action.payload);
    },
    [accountSetting.rejected]: (state, action) => {
      console.log("accountSetting rejected", action.payload);
    },
  },
});

export const accountActions = accountSlice.actions;

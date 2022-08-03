import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { getToken } from "./common";

// 친구 조회 => 현재 안됨
export const friends = createAsyncThunk(
  "accountSlice/friends",
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

// 계정 설정 조회
export const accountSetting = createAsyncThunk(
  "accountSlice/accountSetting",
  async (args, { rejectWithValue }) => {
    const accessToken = getToken();
    const response = await axios({
      url: `/account/${args.email}`,
      method: "get",
      data: {
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

// 계정 설정 수정
export const accountSettingChange = createAsyncThunk(
  "accountSlice/accountSettingChange",
  async (args, { rejectWithValue }) => {
    const accessToken = getToken();
    const response = await axios({
      url: "/account",
      method: "put",
      data: {
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
  initialState: {
    loading: false,
    data: [],
  },
  reducers: {
    // updateAccountSetting: (state, action) => {
    //   state.data = action.payload.data;
    // },
  },
  extraReducers: {
    [friends.fulfilled]: (state, action) => {},
    [friends.rejected]: (state, action) => {},
    [accountSetting.pending]: (state, action) => {
      console.log("accountSetting pending", action.payload);
      state.loading = true;
    },
    [accountSetting.fulfilled]: (state, action) => {
      console.log("accountSetting fulfilled", action.payload);
      state.loading = false;
      state.data = action.payload.userSetting;
      // console.log(state.data);
    },
    [accountSetting.rejected]: (state, action) => {
      console.log("accountSetting rejected", action.payload);
    },
    [accountSettingChange.fulfilled]: (state, action) => {
      console.log("accountSettingChange fulfilled", action.payload);
    },
    [accountSettingChange.rejected]: (state, action) => {
      console.log("accountSettingChange rejected", action.payload);
    },
  },
});

export const accountActions = accountSlice.actions;

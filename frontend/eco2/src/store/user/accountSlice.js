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
        id: args.id,
      },
      headers: {
        Authorization: "Authorization ",
      },
    });
    return response.data;
  }
);

// 친구 신청
export const friendRequest = createAsyncThunk(
  "accountSlice/friendRequest",
  async (args, { rejectWithValue }) => {
    const response = await axios({
      url: "/account/friend",
      method: "post",
      params: {
        fromId: args.fromId,
        toId: args.toId,
      },
      headers: {
        Authorization: "Authorization ",
      },
    });
    return response.data;
  }
);

// 친구 수락
export const friendResponse = createAsyncThunk(
  "accountSlice/friendResponse",
  async (args, { rejectWithValue }) => {
    const response = await axios({
      url: "/account/friend",
      method: "put",
      data: {
        id: args.id,
        response: true,
        alarmId: args.alarmId,
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
    [friends.fulfilled]: (state, action) => {
      console.log("friends fulfilled", action.payload);
    },
    [friends.rejected]: (state, action) => {
      console.log("friends rejected", action.payload);
    },
    [friendRequest.fulfilled]: (state, action) => {
      console.log("friendRequest fulfilled", action.payload);
    },
    [friendRequest.rejected]: (state, action) => {
      console.log("friendRequest rejected", action.payload);
    },
    [friendResponse.fulfilled]: (state, action) => {
      console.log("friendResponse fulfilled", action.payload);
    },
    [friendResponse.rejected]: (state, action) => {
      console.log("friendResponse rejected", action.payload);
    },
    [accountSetting.fulfilled]: (state, action) => {
      console.log("accountSetting fulfilled", action.payload);
      // state.loading = false;
      // state.data = action.payload.userSetting;
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

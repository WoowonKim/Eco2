import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosService from "../axiosService";
import { getUserId } from "./common";

// 친구 조회
export const friends = createAsyncThunk(
  "accountSlice/friends",
  async (args, { rejectWithValue }) => {
    try {
      const response = await axiosService.get(`/account/friend?id=${args.id}`);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response);
    }
  }
);

// 친구 신청
export const friendRequest = createAsyncThunk(
  "accountSlice/friendRequest",
  async (args, { rejectWithValue }) => {
    try {
      const response = await axiosService.post(
        `/account/friend?fromId=${args.fromId}&toId=${args.toId}`
      );
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response);
    }
  }
);

// 친구 삭제
export const friendDelete = createAsyncThunk(
  "accountSlice/friendDelete",
  async (args, { rejectWithValue }) => {
    try {
      const response = await axiosService.put("/account/friend", {
        id: args.id,
        friendId: args.friendId,
      });
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response);
    }
  }
);

// 계정 설정 조회
export const accountSetting = createAsyncThunk(
  "accountSlice/accountSetting",
  async (args, { rejectWithValue }) => {
    try {
      const response = await axiosService.get(`/account/${args.email}`, {
        email: args.email,
        publicFlag: args.publicFlag,
        commentAlarmFlag: args.commentAlarmFlag,
        chatAlarmFlag: args.chatAlarmFlag,
        darkmodeFlag: args.darkmodeFlag,
      });
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response);
    }
  }
);

// 계정 설정 수정
export const accountSettingChange = createAsyncThunk(
  "accountSlice/accountSettingChange",
  async (args, { rejectWithValue }) => {
    try {
      const response = await axiosService.put("/account", {
        email: args.email,
        publicFlag: args.publicFlag,
        commentAlarmFlag: args.commentAlarmFlag,
        chatAlarmFlag: args.chatAlarmFlag,
        darkmodeFlag: args.darkmodeFlag,
      });
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response);
    }
  }
);

// 캘린더 조회
export const calendar = createAsyncThunk(
  "accountSlice/calendar",
  async (args, { rejectWithValue }) => {
    try {
      const response = await axiosService.get(`/daily/calendar/${getUserId()}`);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response);
    }
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
    [friendDelete.fulfilled]: (state, action) => {
      console.log("friendDelete fulfilled", action.payload);
    },
    [friendDelete.rejected]: (state, action) => {
      console.log("friendDelete rejected", action.payload);
    },
    [accountSetting.fulfilled]: (state, action) => {
      console.log("accountSetting fulfilled", action.payload);
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
    [calendar.fulfilled]: (state, action) => {
      console.log("calendar fulfilled", action.payload);
    },
    [calendar.rejected]: (state, action) => {
      console.log("calendar rejected", action.payload);
    },
  },
});

export const accountActions = accountSlice.actions;

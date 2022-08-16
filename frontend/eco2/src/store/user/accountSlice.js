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
      const response = await axiosService.delete("/account/friend", {
        data: {
          id: args.id,
          friendId: args.friendId,
        },
      });
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response);
    }
  }
);

// 친구 여부 조회
export const isFriend = createAsyncThunk(
  "accountSlice/isFriend",
  async (args, { rejectWithValue }) => {
    try {
      const response = await axiosService.get(
        `/account/friend/${args.id}/${args.friendId}`
      );
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
      const response = await axiosService.get(`/account/${args.email}`);
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
    isPending: false,
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
    [friendRequest.pending]: (state, action) => {
      console.log("friendRequest pending", action.payload);
      state.isPending = true;
    },
    [friendRequest.fulfilled]: (state, action) => {
      console.log("friendRequest fulfilled", action.payload);
      state.isPending = false;
    },
    [friendRequest.rejected]: (state, action) => {
      console.log("friendRequest rejected", action.payload);
      state.isPending = false;
    },
    [friendDelete.fulfilled]: (state, action) => {
      console.log("friendDelete fulfilled", action.payload);
    },
    [friendDelete.rejected]: (state, action) => {
      console.log("friendDelete rejected", action.payload);
    },
    [isFriend.fulfilled]: (state, action) => {
      console.log("isFriend fulfilled", action.payload);
    },
    [isFriend.rejected]: (state, action) => {
      console.log("isFriend rejected", action.payload);
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

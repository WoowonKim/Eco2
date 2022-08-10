import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosService from "../axiosService";
import { getUserId } from "./common";

// 친구 조회
export const friends = createAsyncThunk(
  "accountSlice/friends",
  async (args, { rejectWithValue }) => {
    try {
      const response = await axiosService.get("/account/friend", {
        id: args.id,
      });
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

// 친구 수락
export const friendResponse = createAsyncThunk(
  "accountSlice/friendResponse",
  async (args, { rejectWithValue }) => {
    try {
      const response = await axiosService.put("/account/friend", {
        id: args.id,
        response: true,
        alarmId: args.alarmId,
      });
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response);
    }
  }
);

// 조회는 되는 것 같은데 설정 저장이 안되고 있음 -> 확인 필요
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

// 수정 안됨 rejected
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

// 공지사항 테스트 요청
// export const test = createAsyncThunk(
//   "accountSlice/test",
//   async (args, { rejectWithValue }) => {
//     const accessToken = getToken();
//     const response = await axios({
//       url: `/admin/notice/${args.id}`,
//       method: "post",
//       data: {},
//       headers: {
//         "Auth-accessToken": accessToken,
//       },
//     });
//     return response.data;
//   }
// );

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
    // [test.fulfilled]: (state, action) => {
    //   console.log("test fulfilled", action.payload);
    // },
    // [test.rejected]: (state, action) => {
    //   console.log("test rejected", action.payload);
    // },
  },
});

export const accountActions = accountSlice.actions;

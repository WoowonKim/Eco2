import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosService from "../axiosService";
import { firestore, dbService } from "../../store/firebase";

const alarmState = {
  commonAlarms: [],
  friendRequestAlarms: [],
};

export const deleteAlarm = createAsyncThunk(
  "alarmSlice/deleteAlarm",
  async (args, { rejectWithValue }) => {
    try {
      const response = await firestore.deleteDoc(
        firestore.doc(dbService, `alarm/${args.userId}/common`, args.id)
      );
      return response;
    } catch (err) {
      return rejectWithValue(err.response);
    }
  }
);

export const responseFriendRequest = createAsyncThunk(
  "alarmSlice/responseFriendRequest",
  async (args, { rejectWithValue }) => {
    try {
      const response = await axiosService.put("account/friend", {
        id: args.id,
        friendId: args.friendId,
        response: args.response,
      });
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response);
    }
  }
);

export const alarmSlice = createSlice({
  name: "alarm",
  initialState: alarmState,
  reducers: {
    setAlarms: (state, action) => {
      if (action.payload.name === "common") {
        state.commonAlarms = action.payload.data;
      } else if (action.payload.name === "friendRequest") {
        state.friendRequestAlarms = action.payload.data;
      }
    },
    putAlarm: (state, action) => {
      if (action.payload.name === "common") {
        state.commonAlarms.push(action.payload.data);
      } else if (action.payload.name === "friendRequest") {
        state.friendRequestAlarms.push(action.payload.data);
      }
    },
  },
  extraReducers: {
    [responseFriendRequest.fulfilled]: (state, action) => {
      console.log("responseFriendRequest fulfilled", action.payload);
      if (action.payload.status === 200) {
      }
    },
    [responseFriendRequest.rejected]: (state, action) => {
      console.log("responseFriendRequest rejected", action.payload);
    },
  },
});

export const selectCommonAlarms = (state) => state.alarm.commonAlarms;
export const selectFriendRequestAlarms = (state) =>
  state.alarm.friendRequestAlarms;
export const selectIsNew = (state) =>
  state.alarm.commonAlarms.length + state.alarm.friendRequestAlarms.length > 0;
export const { setAlarms, putAlarm } = alarmSlice.actions;
export default alarmSlice.reducer;

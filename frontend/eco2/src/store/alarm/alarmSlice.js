import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosService from "../axiosService";
import { firestore, dbService } from "../../store/firebase";

const alarmState = {
  commonAlarms: [],
  friendRequestAlarms: [],
  commonRecentTime: null,
  friendRecentTime: null,
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

export const getRecentLookup = createAsyncThunk(
  "alarmSlice/getRecentLookup",
  async (args, { rejectWithValue }) => {
    // const q = firestore.query(firestore.doc(dbService, `alarm/${args.userId}`));
    const docSnap = await firestore.getDoc(
      firestore.doc(dbService, `alarm/${args.userId}`)
    );
    const time = docSnap.data()[args.type + "RecentLookup"];

    if (docSnap.exists()) return time;
    else return rejectWithValue(0);
  }
);

export const addRecentLookup = createAsyncThunk(
  "alarmSlice/addRecentLookup",
  async (args, { rejectWithValue }) => {
    const docRef = firestore.doc(dbService, "alarm", args.userId);
    const data = {};
    data[args.type + "RecentLookup"] = args.time;

    try {
      await firestore.addDoc(docRef, data);
    } catch (err) {
      console.log("err", err);
    }
  }
);

export const updateCommonRecentLookup = createAsyncThunk(
  "alarmSlice/updateCommonRecentLookup",
  async (args, { rejectWithValue }) => {
    const docRef = firestore.doc(dbService, "alarm", args.userId);

    try {
      await firestore.setDoc(docRef, { commonRecentLookup: args.time });
    } catch (err) {
      console.log("err", err);
    }
  }
);

export const updateRecentLookup = createAsyncThunk(
  "alarmSlice/updateRecentLookup",
  async (args, { rejectWithValue }) => {
    const docRef = firestore.doc(dbService, "alarm", args.userId);
    const data = {};
    data[args.type + "RecentLookup"] = args.time;

    try {
      await firestore.setDoc(docRef, data, { merge: true });
    } catch (err) {
      console.log("err", err);
    }
  }
);

export const updateFriendRecentLookup = createAsyncThunk(
  "alarmSlice/updateFriendRecentLookup",
  async (args, { rejectWithValue }) => {
    const docRef = firestore.doc(dbService, "alarm", args.userId);

    try {
      await firestore.setDoc(docRef, { commonRecentLookup: args.time });
    } catch (err) {
      console.log("err", err);
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
    [getRecentLookup.fulfilled]: (state, action) => {
      console.log("getRecentLookup fulfilled", action.payload);
    },
    [getRecentLookup.rejected]: (state, action) => {
      console.log("getRecentLookup rejected", action.payload);
    },
    [updateRecentLookup.fulfilled]: (state, action) => {
      console.log("updateRecentLookup fulfilled", action.payload);
    },
    [updateRecentLookup.rejected]: (state, action) => {
      console.log("updateRecentLookup rejected", action.payload);
    },
  },
});

export const selectCommonAlarms = (state) => state.alarm.commonAlarms;
export const selectFriendRequestAlarms = (state) =>
  state.alarm.friendRequestAlarms;
export const selectFriendRecentTime = (state) => state.alarm.friendRecentTime;
export const selectCommonRecentTime = (state) => state.alarm.commonRecentTime;
export const selectRecentTime = (state) => state.alarm.recentTime;
export const { setAlarms, putAlarm } = alarmSlice.actions;
export default alarmSlice.reducer;

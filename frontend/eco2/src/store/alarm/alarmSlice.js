import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosService from "../axiosService";
import { firestore, dbService } from "../../store/firebase";

const alarmState = {
  alarmList: [],
};

export const getAlarms = createAsyncThunk(
  "alarmSlice/getAlarms",
  async (args, { rejectWithValue }) => {
    try {
      // const dbAlarms = await firestore.getDocs(
      //   firestore.collection(dbService, `alarm/${args.userId}/common`)
      // );
      // const response = [];
      // dbAlarms.forEach((document) => {
      //   const alarmObject = {
      //     ...document.data(),
      //     id: document.id,
      //   };
      //   response.push(alarmObject);
      // });
      // return response;
    } catch (err) {
      console.log(err);
      return rejectWithValue(err.response);
    }
  }
);

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
    getAlarms: (state, action) => {},
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

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
      console.log("alarmSlice::deleteAlarm:", err);
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
  extraReducers: {},
});
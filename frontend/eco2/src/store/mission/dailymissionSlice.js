import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import axios from "axios";

export const dMission = createAsyncThunk("dailymission/list", async (args, { rejectWithValue }) => {
  const response = await axios({
    url: "/mission",
    method: "get",
    data: {},
    headers: {
      Authorization: "Authorization ",
    },
  });
  return response.data;
});

const DummyMissionState = {
  dailyMissionList: [
    { id: 81, content: "쓰레기 줍기", category: 3, find: 0 },
    { id: 82, content: "분리수거 해보기", category: 1, find: 0 },
    { id: 83, content: "에어컨 끄기", category: 2, find: 0 },
    { id: 84, content: "절약하기", category: 5, find: 0 },
    { id: 85, content: "재활용 해보기", category: 4, find: 0 },
  ],
};

export const dailymissionSlice = createSlice({
  name: "dailyMission",
  initialState: DummyMissionState,
  reducers: {},
  extraReducers: {
    [dMission.fulfilled]: (state, action) => {
      console.log(action.payload);
    },
    [dMission.rejected]: (state, action) => {},
  },
});

export const dailymissionActions = dailymissionSlice.actions;

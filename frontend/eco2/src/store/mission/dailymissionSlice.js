import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import axios from "axios";

export const dMission = createAsyncThunk("dailymission/list", async (args, { rejectWithValue }) => {
  const response = await axios({
    url: `/mission/${args.id}`,
    method: "get",
    data: {},
    headers: {
      Authorization: "Authorization ",
    },
  });
  return response.data;
});

export const dailymissionSlice = createSlice({
  name: "dailyMission",
  initialState: [],
  reducers: {},
  extraReducers: {
    [dMission.fulfilled]: (state, action) => {
      console.log(action.payload);
    },
    [dMission.rejected]: (state, action) => {},
  },
});

export const dailymissionActions = dailymissionSlice.actions;

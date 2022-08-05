import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import axios from "axios";
import { axiosService } from "../axiosService";

// export const dMission = createAsyncThunk("dailymission/list", async (args, { rejectWithValue }) => {
//   const response = await axios({
//     url: `/mission/${args.id}`,
//     method: "get",
//     data: {},
//     headers: {
//       Authorization: "Authorization ",
//     },
//   });
//   return response.data;
// });

export const dMission = createAsyncThunk("dailymissionSlice/dmission", async (args, { rejectWithValue }) => {
  try {
    const response = await axiosService.get(`/mission/${args.id}`);
    return response.data;
  } catch (err) {
    return rejectWithValue(err.response);
  }
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

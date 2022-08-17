import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosService from "../axiosService";

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
    [dMission.fulfilled]: (state, action) => {},
    [dMission.rejected]: (state, action) => {
      console.log("dmission.rejected ===> ", action.payload);
    },
  },
});

export const dailymissionActions = dailymissionSlice.actions;

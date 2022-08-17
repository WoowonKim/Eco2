import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosService from "../axiosService";

export const customMission = createAsyncThunk("customMissionSlice/customMission", async (args, { rejectWithValue }) => {
  try {
    const response = await axiosService.get(`/mission/custom/${args.id}`);
    return response.data;
  } catch (err) {
    return rejectWithValue(err.response);
  }
});

export const customPostMission = createAsyncThunk("customMissionSlice/customPostMission", async (args, { rejectWithValue }) => {
  try {
    const response = await axiosService.post(`/mission/custom/${args.id}`, {
      category: args.category,
      title: args.title,
      content: args.content,
    });
    return response.data;
  } catch (err) {
    return rejectWithValue(err.response);
  }
});

export const customDeleteMission = createAsyncThunk("customMissionSlice/customDeleteMission", async (args, { rejectWithValue }) => {
  try {
    const response = await axiosService.delete(`/mission/custom/${args.id}`);
    return response.data;
  } catch (err) {
    return rejectWithValue(err.response);
  }
});

export const cumtomSlice = createSlice({
  name: "custom",
  initialState: [{}],
  reducers: {},
  extraReducers: {
    [customMission.fulfilled]: (state, action) => {},
    [customPostMission.fulfilled]: (state, action) => {
      console.log(action.payload);
    },
  },
});

export const cumtomActions = cumtomSlice.actions;

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const customMission = createAsyncThunk("customMission", async (args, { rejectWithValue }) => {
  const response = await axios({
    url: `/mission/custom/${args.id}`,
    method: "get",
    data: {},
    headers: {
      Authorization: "Authorization",
    },
  });
  return response.data;
});

export const customPostMission = createAsyncThunk("customMission/post", async (args, { rejectWithValue }) => {
  const response = await axios({
    url: `/mission/custom/${args.id}`,
    method: "post",
    data: {
      category: args.category,
      title: args.title,
      content: args.content,
    },
    headers: {
      Authorization: "Authorization",
    },
  });
  return response.data;
});

export const customDeleteMission = createAsyncThunk("customMission/post", async (args, { rejectWithValue }) => {
  const response = await axios({
    url: `/mission/custom/${args.id}`,
    method: "delete",
    data: {},
    headers: {
      Authorization: "Authorization",
    },
  });
  return response.data;
});

export const cumtomSlice = createSlice({
  name: "custom",
  initialState: [{}],
  reducers: {},
  extraReducers: {
    [customMission.fulfilled]: (state, action) => {
      console.log(action.payload);
    },
    [customPostMission.fulfilled]: (state, action) => {
      console.log(action.payload);
    },
  },
});

export const cumtomActions = cumtomSlice.actions;

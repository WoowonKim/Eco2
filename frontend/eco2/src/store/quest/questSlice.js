import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosService from "../axiosService";

export const createQuest = createAsyncThunk(
  "questSlice/createQuest",
  async (args, { rejectWithValue }) => {
    try {
      const response = await axiosService.post("/quest", args);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response);
    }
  }
);
export const questSlice = createSlice({
  name: "quest",
  initialState: {
    loading: false,
    data: [],
  },
  reducers: {},
  extraReducers: {
    [createQuest.pending]: (state, action) => {
      state.loading = true;
    },
    [createQuest.fulfilled]: (state, action) => {
      console.log(action.payload);
    },
    [createQuest.rejected]: (state, action) => {
      console.log("createQuest rejected");
    },
  },
});

export const {} = questSlice.actions;

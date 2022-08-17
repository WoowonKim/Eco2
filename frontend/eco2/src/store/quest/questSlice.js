import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosService from "../axiosService";

export const createQuest = createAsyncThunk("questSlice/createQuest", async (args, { rejectWithValue }) => {
  try {
    const post = await axiosService.post("/quest", args);
    const response = await axiosService.get("/quest");
    response.data.status = post.data.status;
    return response.data;
  } catch (err) {
    return rejectWithValue(err.response);
  }
});
export const getQuestList = createAsyncThunk("questSlice/getQuestList", async (args, { rejectWithValue }) => {
  try {
    const response = await axiosService.get("/quest");
    return response.data;
  } catch (err) {
    return rejectWithValue(err.response);
  }
});
export const deleteQuest = createAsyncThunk("questSlice/deleteQuest", async (args, { rejectWithValue }) => {
  try {
    await axiosService.delete(`/quest/${args}`);
    const response = await axiosService.get("/quest");
    return response.data;
  } catch (err) {
    return rejectWithValue(err.response);
  }
});

export const questSlice = createSlice({
  name: "quest",
  initialState: {
    loading: false,
    data: [],
    status: null,
  },
  reducers: {
    setStatus(state, args) {
      state.status = args;
    },
  },
  extraReducers: {
    [createQuest.pending]: (state, action) => {
      state.loading = true;
    },
    [createQuest.fulfilled]: (state, action) => {
      state.data = action.payload.questList;
      state.status = action.payload.status;
      if (action.payload.status === 202) {
        state.status = 202;
      }
      state.loading = false;
    },
    [createQuest.rejected]: (state, action) => {
      console.log("createQuest rejected");
      getQuestList();
      state.loading = false;
    },
    [getQuestList.pending]: (state, action) => {
      state.loading = true;
    },
    [getQuestList.fulfilled]: (state, action) => {
      state.loading = false;
      state.data = action.payload.questList;
    },
    [getQuestList.rejected]: (state, action) => {
      console.log("createQuest rejected");
      state.loading = false;
    },
    [deleteQuest.fulfilled]: (state, action) => {
      state.data = action.payload.questList;
      state.status = 200;
    },
  },
});

export const { setStatus } = questSlice.actions;

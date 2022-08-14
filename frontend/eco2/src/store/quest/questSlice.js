import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosService from "../axiosService";

export const createQuest = createAsyncThunk(
  "questSlice/createQuest",
  async (args, { rejectWithValue }) => {
    try {
      await axiosService.post("/quest", args);
      const response = await axiosService.get("/quest");
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response);
    }
  }
);
export const getQuestList = createAsyncThunk(
  "questSlice/getQuestList",
  async (args, { rejectWithValue }) => {
    try {
      const response = await axiosService.get("/quest");
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response);
    }
  }
);
export const createPost = createAsyncThunk(
  "questSlice/createPost",
  async (args, { rejectWithValue }) => {
    try {
      const response = await axiosService.post("/post", args.formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
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
      state.data = action.payload.questList;
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
      console.log(action.payload);
      state.loading = false;
      state.data = action.payload.questList;
    },
    [getQuestList.rejected]: (state, action) => {
      console.log("createQuest rejected");
      state.loading = false;
    },
    [createPost.fulfilled]: (state, payload) => {
      console.log("createPost fullfilled", payload);
    },
    [createPost.rejected]: (state, payload) => {
      console.log("createPost rejected", payload);
    },
  },
});

export const {} = questSlice.actions;

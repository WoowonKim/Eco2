import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// 전체 게시물 조회
export const postList = createAsyncThunk(
  "post/postList",
  async (args, rejectWithValue) => {
    try {
      const response = await axios({
        url: "/post",
        method: "get",
        data: {},
      });
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response);
    }
  }
);

export const postSlice = createSlice({
  name: "post",
  initialState: [],
  reducers: {},
  extraReducers: {
    [postList.fulfilled]: (state, action) => {
      console.log("postList fulfilled", action.payload);
      if (action.payload.status === 200) {
      }
    },
    [postList.rejected]: (state, action) => {
      console.log("postList rejected", action.payload);
    },
  },
});

export const postActions = postSlice.actions;

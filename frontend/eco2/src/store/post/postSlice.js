import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { axiosService } from "../axiosService";

// 전체 게시물 조회
export const postList = createAsyncThunk(
  "postSlice/postList",
  async (args, rejectWithValue) => {
    try {
      const response = await axiosService.get("/post");
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response);
    }
  }
);

// 게시물 작성
export const postCreate = createAsyncThunk(
  "postSlice/postCreate",
  async (args, rejectWithValue) => {
    for (let [key, value] of args.formData) {
      console.log(key, value);
    }
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
    [postCreate.fulfilled]: (state, action) => {
      console.log("postCreate fulfilled", action.payload);
      if (action.payload.status === 200) {
      }
    },
    [postCreate.rejected]: (state, action) => {
      console.log("postCreate rejected", action.payload);
    },
  },
});

export const postActions = postSlice.actions;

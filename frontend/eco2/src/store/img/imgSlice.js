import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosService from "../axiosService";

// 프로필 이미지 조회
export const profileImg = createAsyncThunk("imgSlice/profileImg", async (args, rejectWithValue) => {
  try {
    const response = await axiosService.get(`/img/profile/${args.userId}`);
    return response.data;
  } catch (err) {
    return rejectWithValue(err.response);
  }
});

export const imgSlice = createSlice({
  name: "img",
  initialState: [],
  reducers: {},
  extraReducers: {
    [profileImg.fulfilled]: (state, action) => {
      if (action.payload.status === 200) {
      }
    },
    [profileImg.rejected]: (state, action) => {
      console.log("profileImg rejected", action.payload);
    },
  },
});

export const imgActions = imgSlice.actions;

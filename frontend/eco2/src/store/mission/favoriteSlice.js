import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosService from "../axiosService";

export const putFavorite = createAsyncThunk("favoriteSlice/putFavorite", async (args, { rejectWithValue }) => {
  try {
    const response = await axiosService.put(`/mission/favorite/${args.id}`, {
      likeFlag: args.likeFlag,
      missionId: args.missionId,
      missionType: args.missionType,
    });
    return response.data;
  } catch (err) {
    return rejectWithValue(err.response);
  }
});

export const getFavorite = createAsyncThunk("favoriteSlice/getFavorite", async (args, rejectWithValue) => {
  try {
    const response = await axiosService.get(`/mission/favorite/${args.id}`);
    return response.data;
  } catch (err) {
    return rejectWithValue(err.response);
  }
});

export const favoriteSlice = createSlice({
  name: "favorite",
  initialState: [],
  reducers: {},
  extraReducers: {},
});

export const favoriteActions = favoriteSlice.actions;

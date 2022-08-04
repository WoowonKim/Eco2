import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const putFavorite = createAsyncThunk("favorite/put", async (args, { rejectWithValue }) => {
  // console.log("ID => ", args.id);
  // console.log("favorites =>", args.likeFlag);
  // console.log("ecoID  => ", args.missionId);
  // console.log("favoriteTrue => ", args.missionType);
  const response = await axios({
    url: `/mission/favorite/${args.id}`,
    method: "put",
    data: {
      likeFlag: args.likeFlag,
      missionId: args.missionId,
      missionType: args.missionType,
    },
    headers: {},
  });
  return response.data;
});

export const getFavorite = createAsyncThunk("favorite/get", async (args, { rejectWithValue }) => {
  const response = await axios({
    url: `/mission/favorite/${args.id}`,
    method: "get",
    data: {},
    headers: {},
  });
  return response.data;
});

export const favoriteSlice = createSlice({
  name: "favorite",
  initialState: [],
  reducers: {},
  extraReducers: {},
});

export const favoriteActions = favoriteSlice.actions;

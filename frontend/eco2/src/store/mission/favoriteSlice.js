import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosService from "../axiosService";

// export const putFavorite = createAsyncThunk("favorite/put", async (args, { rejectWithValue }) => {
//   const response = await axios({
//     url: `/mission/favorite/${args.id}`,
//     method: "put",
//     data: {
//       likeFlag: args.likeFlag,
//       missionId: args.missionId,
//       missionType: args.missionType,
//     },
//     headers: {},
//   });
//   return response.data;
// });

export const putFavorite = createAsyncThunk(
  "favoriteSlice/putFavorite",
  async (args, { rejectWithValue }) => {
    try {
      // console.log("args.likeFlag는 true가 와야된다 ====> ", args.likeFlag);
      // console.log("args.missionId는 18번이 와야 된다 ===> ", args.missionId);
      // console.log("args.missionType은 true가 와야된다 ===>", args.missionType);
      const response = await axiosService.put(`/mission/favorite/${args.id}`, {
        likeFlag: args.likeFlag,
        missionId: args.missionId,
        missionType: args.missionType,
      });
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response);
    }
  }
);

// export const getFavorite = createAsyncThunk("favorite/get", async (args, { rejectWithValue }) => {
//   const response = await axios({
//     url: `/mission/favorite/${args.id}`,
//     method: "get",
//     data: {},
//     headers: {},
//   });
//   return response.data;
// });

export const getFavorite = createAsyncThunk(
  "favoriteSlice/getFavorite",
  async (args, rejectWithValue) => {
    try {
      //wconsole.log("GetFavorite ID이다 ===>", args.id);
      const response = await axiosService.get(`/mission/favorite/${args.id}`);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response);
    }
  }
);

export const favoriteSlice = createSlice({
  name: "favorite",
  initialState: [],
  reducers: {},
  extraReducers: {},
});

export const favoriteActions = favoriteSlice.actions;

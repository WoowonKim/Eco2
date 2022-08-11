import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosService from "../axiosService";

export const getLeaves = createAsyncThunk(
  "leavesSlice/getLeaves",
  async (args, { rejectWithValue }) => {
    try {
      const response = await axiosService.get(`/tree/${args}`);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response);
    }
  }
);

export const updateLeaf = createAsyncThunk(
  "leavesSlice/updateLeaf",
  async (args, { rejectWithValue }) => {
    console.log(args);
    try {
      //   const token = getToken();
      //   const response = await axios({
      //     url: `/tree/1`,
      //     method: "put",
      //     Headers: {
      //       Authorization: "Authorization" + token,
      //     },
      //     data: args,
      //   });
      const response = await axiosService.put(`/tree/${args.userId}`, {
        ...args.leaf,
      });
      return response.data;
    } catch (err) {
      return rejectWithValue;
    }
  }
);

export const statisticLeaves = createAsyncThunk(
  "leavesSlice/statisticLeaves",
  async (args, { rejectWithValue }) => {
    try {
      const response = await axiosService.get(`/tree/statistic/${args.userId}`);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response);
    }
  }
);

export let leavesSlice = createSlice({
  name: "leaves",
  initialState: {
    loading: false,
    data: [],
  },
  reducers: {
    changePos(state, action) {
      let leaf = action.payload;
      let index = state.data.findIndex((x) => x.id === leaf.id);
      state.data[index] = {
        ...state.data[index],
        left: leaf.left,
        top: leaf.top,
      };
    },
  },
  extraReducers: {
    [getLeaves.pending]: (state, action) => {
      state.loading = true;
    },
    [getLeaves.fulfilled]: (state, action) => {
      state.loading = false;
      state.data = action.payload.itemList;
    },
    [getLeaves.rejected]: (state, action) => {},
    [updateLeaf.rejected]: (state, action) => {
      console.log("updateLeaf rejected");
    },
    [updateLeaf.fulfilled]: (state, action) => {
      console.log("updateLeaf fullfilled");
    },
    [updateLeaf.pending]: (state, action) => {
      console.log("updateLeaf pendeing");
    },
    [statisticLeaves.fulfilled]: (state, action) => {
      console.log("statisticLeaves fullfilled");
    },
    [statisticLeaves.rejected]: (state, action) => {
      console.log("statisticLeaves rejected");
    },
  },
});

export const { changePos } = leavesSlice.actions;

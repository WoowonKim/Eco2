import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { getToken } from "../user/common";

export const getLeaves = createAsyncThunk(
  "leavesSlice/getLeaves",
  async (args, { rejectWithValue }) => {
    try {
      const token = getToken();
      const response = await axios({
        url: `/tree/${args.userId}`,
        method: "get",
        Headers: {
          Authorization: "Authorization" + token,
        },
      });
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response);
    }
  }
);

export let leavesSlice = createSlice({
  name: "leaves",
  initialState: [
    { id: 1, left: 400, top: 300, category: 1 },
    { id: 2, left: 420, top: 300, category: 2 },
    { id: 3, left: 440, top: 300, category: 3 },
    { id: 4, left: 460, top: 300, category: 4 },
    { id: 5, left: 480, top: 300, category: 5 },
    { id: 6, left: 500, top: 300, category: 6 },
  ],
  reducers: {
    changePos(state, action) {
      let leaf = action.payload;
      let index = state.findIndex((x) => x.id === leaf.id);
      state[index] = { ...state[index], left: leaf.left, top: leaf.top };
    },
  },
  extraReducers: {
    [getLeaves.pending]: (state, action) => {
      console.log("getLeaves pending", action.payload);
    },
    [getLeaves.fulfilled]: (state, action) => {
      state = action.payload;
    },
    [getLeaves.rejected]: (state, action) => {},
  },
});

export const { changePos } = leavesSlice.actions;

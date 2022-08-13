import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const postMission = createAsyncThunk("dailymission/getlist", async (args, { rejectWithValue }) => {
  const response = await axios({
    url: `/daily/${args.id}`,
    method: "post",
    data: {
      dailyMissionList: args.ecoId,
      dailyCustomMissionList: [],
    },
    headers: {
      Authorization: "Authorization ",
    },
  });
  return response.data;
});

export const myEcoMissionSlice = createSlice({
  name: "missionMain",
  initialState: {
    ecoMissionList: [],
  },
  reducers: {
    onEcoArr: (state, actions) => {
      const newEcoArr = {
        color: actions.payload.color,
        id: actions.payload.id,
        content: actions.payload.content,
      };
      state.ecoMissionList.push(newEcoArr);
    },
  },
  extraReducers: {
    [postMission.fulfilled]: (state, action) => {
      console.log(action.payload);
    },
    [postMission.rejected]: (state, action) => {
      console.log(action.payload);
    },
  },
});

export const { onEcoArr } = myEcoMissionSlice.actions;
export const myEcoMissionActions = myEcoMissionSlice.actions;

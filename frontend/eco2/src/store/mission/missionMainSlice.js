import { createSlice } from "@reduxjs/toolkit";

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
  extraReducers: {},
});

export const { onEcoArr } = myEcoMissionSlice.actions;

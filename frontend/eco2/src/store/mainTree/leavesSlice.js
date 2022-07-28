import { createSlice } from "@reduxjs/toolkit";

export let leavesSlice = createSlice({
  name: "leaves",
  initialState: [
    { id: 1, left: "30px", top: "300px" },
    {
      id: 2,
      left: "40px",
      top: "300px",
    },
    {
      id: 3,
      left: "300px",
      top: "300px",
    },
    {
      id: 4,
      left: "60px",
      top: "200px",
    },
    {
      id: 5,
      left: "150px",
      top: "300px",
    },
    {
      id: 6,
      left: "80px",
      top: "300px",
    },
  ],
  reducers: {
    changePos(state, action) {
      console.log(action.payload);
      state = action.payload;
    },
  },
});

export const leavesAction = leavesSlice.actions;

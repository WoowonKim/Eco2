import { createSlice } from "@reduxjs/toolkit";

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
      let index = state.findIndex((x) => x.id == leaf.id);
      state.splice(index, 1);
      state.push(leaf);
    },
  },
});

export const leavesAction = leavesSlice.actions;

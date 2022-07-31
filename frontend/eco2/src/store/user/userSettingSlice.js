import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const userInformation = createAsyncThunk(
  "userInformation",
  async (args, { rejectWithValue }) => {
    const response = await axios({
      url: `/userinformation/${args.email}`,
      method: "get",
      data: {
        email: args.email,
        password: args.password,
        socialType: args.socialType,
      },
      headers: {
        Authorization: "Authorization ",
      },
    });
    return response.data;
  }
);

export const userInformationSlice = createSlice({
  name: "userInformation",
  initialState: [],
  reducers: {},
  extraReducers: {
    [userInformation.fulfilled]: (state, action) => {},
    [userInformation.rejected]: (state, action) => {},
  },
});

export const userInformationActions = userInformationSlice.actions;

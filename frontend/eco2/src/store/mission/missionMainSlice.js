import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { useEffect } from "react";
import axiosService from "../axiosService";

export const postMission = createAsyncThunk("missionMainSlice/postMission", async (args, rejectWithValue) => {
  try {
    const response = await axiosService.post(`/daily/${args.id}`, {
      dailyMissionList: args.dailyMissionList,
      customMissionList: args.customMissionList,
    });
    return response.data;
  } catch (err) {
    return rejectWithValue(err.response);
  }
});

export const postTodayMission = createAsyncThunk("missionMainSlice/postTodayMission", async (args, rejectWithValue) => {
  try {
    const now = new Date().toISOString().substring(0, 16);
    const response = await axiosService.post(`daily/recommend/${args.id}`, {
      lat: args.lat,
      lng: args.lng,
      date: now,
    });
    return response.data;
  } catch (err) {
    return rejectWithValue(err.response);
  }
});

export const getMission = createAsyncThunk("missionMainSlice/getMission", async (args, { rejectWithValue }) => {
  try {
    const response = await axiosService.get(`/daily/${args.id}`);
    return response.data;
  } catch (err) {
    return rejectWithValue(err.response);
  }
});

export const deleteMission = createAsyncThunk("missionMainSlice/deleteMission", async (args, { rejectWithValue }) => {
  try {
    const response = await axiosService.delete(`/daily/${args.id}`, {
      data: {
        missionId: args.missionId,
      },
    });
    return response.data;
  } catch (err) {
    return rejectWithValue(err.response);
  }
});

export const clearMission = createAsyncThunk("missionMainSlice/clearMission", async (args, { rejectWithValue }) => {
  try {
    const response = await axiosService.put(`/daily/${args.id}`, {
      missionId: args.missionId,
    });
    return response.data;
  } catch (err) {
    return rejectWithValue(err.response);
  }
});

export const missionPost = createAsyncThunk("missionMainSlice/missionPost", async (args, { rejectWithValue }) => {
  try {
    const response = await axiosService.post(`/daily/reward/${args.id}`);
    return response.data;
  } catch (err) {
    return rejectWithValue(err.response);
  }
});

export const missionItem = createAsyncThunk("missionMainSlice/missionItem", async (args, { rejectWithValue }) => {
  try {
    const response = await axiosService.post(`/daily/reward/check/${args.id}`, {
      date: args.date,
    });
    return response.data;
  } catch (err) {
    return rejectWithValue(err.response);
  }
});

export const calendarImg = createAsyncThunk("missionMainSlice/calendarImg", async (args, { rejectWithValue }) => {
  try {
    const response = await axiosService.get(`img/reward/${args.calendarId}`);
    return response.data;
  } catch (err) {
    return rejectWithValue(err.response);
  }
});

export const trending = createAsyncThunk("missionMainSlice/trending", async (args, { rejectWithValue }) => {
  try {
    const response = await axiosService.get(`/daily/trending`);
    return response.data;
  } catch (err) {
    return rejectWithValue(err.response);
  }
});

export const myEcoMissionSlice = createSlice({
  name: "myEcoMission",
  initialState: {
    successBtn: false,
    isPending: false,
    data: null,
    open: true,
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
    btnSuccess: (state, actions) => {},
  },
  extraReducers: {
    [postMission.fulfilled]: (state, action) => {},
    [postMission.rejected]: (state, action) => {
      console.log("rejected", action.payload);
    },
    [getMission.fulfilled]: (state, action) => {},
    [getMission.rejected]: (state, action) => {
      console.log("getMissionRejected ==> ", action.payload);
    },
    [clearMission.fulfilled]: (state, action) => {},
    [clearMission.rejected]: (state, action) => {
      console.log("clearMission Rejected", action.payload);
    },
    [missionPost.fulfilled]: (state, action) => {},
    [missionPost.rejected]: (state, action) => {
      console.log("missionPost Rejected ===>", action.payload);
    },
    [missionItem.fulfilled]: (state, action) => {
      state.successBtn = action.payload.rewardFlag;
    },
    [missionItem.rejected]: (state, action) => {
      console.log("missionItem Rejected===>", action.payload);
    },
    [trending.fulfilled]: (state, action) => {},
    [trending.rejected]: (state, action) => {
      console.log("Trending Rejected ===>", action.payload);
    },
    [postTodayMission.pending]: (state, action) => {
      state.isPending = true;
    },
    [postTodayMission.fulfilled]: (state, action) => {
      state.data = action.payload;
      state.isPending = false;
      state.open = false;
    },
    [postTodayMission.rejected]: (state, action) => {
      console.log("postTodayMission Rejected===>", action.payload);
      state.isPending = false;
    },
    [calendarImg.fulfilled]: (state, action) => {},
    [calendarImg.rejected]: (state, action) => {
      console.log("calendarImgRejected===>");
    },
  },
});

export const { onEcoArr, changeOpenFlag } = myEcoMissionSlice.actions;
export const myEcoMissionActions = myEcoMissionSlice.actions;

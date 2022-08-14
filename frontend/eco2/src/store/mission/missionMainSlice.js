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
    //console.log("TRY서버연결 날짜 ====>", args);
    // console.log("TRY내부 now ===>", now);
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
    console.log(" TRY 서버 받은 missionId ===> ", args.missionId);
    return response.data;
  } catch (err) {
    console.log("CATCH 서버 받은 missionId ===> ", args.missionId);
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
    console.log("missionPost ARGS===>", args);
    const response = await axiosService.post(`/daily/reward/${args.id}`);
    return response.data;
  } catch (err) {
    return rejectWithValue(err.response);
  }
});

export const missionItem = createAsyncThunk("missionMainSlice/missionItem", async (args, { rejectWithValue }) => {
  try {
    console.log("missionItem ARGS===>", args);
    const response = await axiosService.post(`/daily/reward/check/${args.id}`, {
      date: args.date,
    });
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
    [postMission.fulfilled]: (state, action) => {
      console.log("fulfilled", action.payload);
    },
    [postMission.rejected]: (state, action) => {
      console.log("rejected", action.payload);
    },
    [getMission.fulfilled]: (state, action) => {
      //console.log("getMissionFulfilled ==> ", action.payload);
    },
    [getMission.rejected]: (state, action) => {
      console.log("getMissionRejected ==> ", action.payload);
    },
    [clearMission.fulfilled]: (state, action) => {
      console.log("clearMission Fulfilled ===> ", action.payload);
    },
    [clearMission.rejected]: (state, action) => {
      console.log("clearMission Rejected", action.payload);
    },
    [missionPost.fulfilled]: (state, action) => {
      console.log("missionPost Fulfilled ===>");
    },
    [missionPost.rejected]: (state, action) => {
      console.log("missionPost Rejected ===>", action.payload);
    },
    [missionItem.fulfilled]: (state, action) => {
      console.log("missionItem Fulfiled ===>", action.payload.rewardFlag);
      state.successBtn = action.payload.rewardFlag;
    },
    [missionItem.rejected]: (state, action) => {
      console.log("missionItem Rejected===>", action.payload);
    },
    [trending.fulfilled]: (state, action) => {
      console.log("Trending Fulfilled ===>", action.payload);
    },
    [trending.rejected]: (state, action) => {
      console.log("Trending Rejected ===>", action.payload);
    },
  },
});

export const { onEcoArr } = myEcoMissionSlice.actions;
export const myEcoMissionActions = myEcoMissionSlice.actions;

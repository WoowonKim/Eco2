import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosService from "../axiosService";

// export const postMission = createAsyncThunk("dailymission/Apostlist", async (args, { rejectWithValue }) => {
//   const response = await axios({
//     url: `/daily/${args.id}`,
//     method: "post",
//     data: {
//       dailyMissionList: args.ecoId,
//       dailyCustomMissionList: [],
//     },
//     headers: {
//       Authorization: "Authorization ",
//     },
//   });
//   return response.data;
// });

export const postMission = createAsyncThunk("missionMainSlice/postMission", async (args, rejectWithValue) => {
  try {
    // console.log("ARGS ====> ", args);
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
    const response = await axiosService.post(`daily/recommend/${args.id}`, {
      lat: args.lat,
      lng: args.lng,
      date: args.date,
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
  //console.log("서버 받은 ID ===> ", args.id);
  //console.log("서버 받은 missionId ===> ", args.missionId);
  //const data = JSON.stringify({args.missio})
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
      console.log("fulfilled", action.payload);
    },
    [postMission.rejected]: (state, action) => {
      console.log("rejected", action.payload);
    },
    [getMission.fulfilled]: (state, action) => {
      console.log("getMissionFulfilled ==> ", action.payload);
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
  },
});

export const { onEcoArr } = myEcoMissionSlice.actions;
export const myEcoMissionActions = myEcoMissionSlice.actions;

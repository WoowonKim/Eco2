import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosService from "../axiosService";

// 신고글 조회
export const reportList = createAsyncThunk(
  "reportSlice/reportList",
  async (args, rejectWithValue) => {
    try {
      const response = await axiosService.get(`/admin/report`);
      console.log(response.data);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response);
    }
  }
);

//신고 상세 내역 조회
export const reportDetailList = createAsyncThunk(
  "reportSlice/reportDetailList",
  async (args, rejectWithValue) => {
    try {
      const response = await axiosService.get(
        `/admin/report/${args.id}?type=${args.type}`
      );
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response);
    }
  }
);

//신고승인
export const reportAccept = createAsyncThunk(
  "reportSlice/reportAccept",
  async (args, rejectWithValue) => {
    try {
      const response = await axiosService.post(
        `/admin/report/${args.id}?type=${args.type}`
      );
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response);
    }
  }
);

//신고반려
export const reportCancle = createAsyncThunk(
  "reportSlice/reportCancle",
  async (args, rejectWithValue) => {
    try {
      const response = await axiosService.delete(
        `/admin/report/${args.id}?type=${args.type}`
      );
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response);
    }
  }
);

export const reportSlice = createSlice({
  name: "report",
  initialState: {
    data: [],
    detail: [],
  },
  reducers: {},
  extraReducers: {
    [reportList.fulfilled]: (state, action) => {
      console.log("reportList fulfilled", action.payload);
      state.data = action.payload.reportList;
    },
    [reportList.rejected]: (state, action) => {
      console.log("reportList rejected", action.payload);
    },
    [reportDetailList.fulfilled]: (state, action) => {
      console.log("reportDetailList fulfilled", action.payload);
      if (action.payload.status === 200) {
        state.detail = action.payload.reportDetailList;
      }
    },
    [reportDetailList.rejected]: (state, action) => {
      console.log("reportDetailList rejected", action.payload);
    },
    [reportAccept.fulfilled]: (state, action) => {
      console.log("reportAccept fulfilled", action.payload);
      if (action.payload.status === 200) {
      }
    },
    [reportAccept.rejected]: (state, action) => {
      console.log("reportAccept rejected", action.payload);
    },
    [reportCancle.fulfilled]: (state, action) => {
      console.log("reportCancle fulfilled", action.payload);
      if (action.payload.status === 200) {
      }
    },
    [reportCancle.rejected]: (state, action) => {
      console.log("reportCancle rejected", action.payload);
    },
  },
});

export const reportActions = reportSlice.actions;

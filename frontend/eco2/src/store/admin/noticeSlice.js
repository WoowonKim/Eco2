import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { axiosService } from "../axiosService";

// 공지사항 작성
export const noticeCreate = createAsyncThunk(
  "noticeSlice/noticeCreate",
  async (args, rejectWithValue) => {
    try {
      const response = await axiosService.post(`/admin/notice/${args.userId}`, {
        title: args.title,
        content: args.content,
        urgentFlag: args.urgentFlag,
      });
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response);
    }
  }
);

// 공지사항 수정
export const noticeUpdate = createAsyncThunk(
  "noticeSlice/noticeUpdate",
  async (args, rejectWithValue) => {
    try {
      const response = await axiosService.put(
        `/admin/notice/${args.noticeId}`,
        {
          title: args.title,
          content: args.content,
          urgentFlag: args.urgentFlag,
        }
      );
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response);
    }
  }
);

// 공지사항 삭제
export const noticeDelete = createAsyncThunk(
  "noticeSlice/noticeDelete",
  async (args, rejectWithValue) => {
    try {
      const response = await axiosService.delete(
        `/admin/notice/${args.userId}`
      );
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response);
    }
  }
);

// 공지사항 조회 / 검색
export const noticeList = createAsyncThunk(
  "noticeSlice/noticeCreate",
  async (args, rejectWithValue) => {
    try {
      const response = await axiosService.get("/notice");
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response);
    }
  }
);

// 공지사항 상세 조회
export const noticeDetail = createAsyncThunk(
  "noticeSlice/noticeCreate",
  async (args, rejectWithValue) => {
    try {
      const response = await axiosService.get(`/notice/${args.noticeId}`);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response);
    }
  }
);

export const noticeSlice = createSlice({
  name: "notice",
  initialState: [],
  reducers: {},
  extraReducers: {
    [noticeCreate.fulfilled]: (state, action) => {
      console.log("noticeCreate fulfilled", action.payload);
      if (action.payload.status === 200) {
      }
    },
    [noticeCreate.rejected]: (state, action) => {
      console.log("noticeCreate rejected", action.payload);
    },
    [noticeUpdate.fulfilled]: (state, action) => {
      console.log("noticeUpdate fulfilled", action.payload);
      if (action.payload.status === 200) {
      }
    },
    [noticeUpdate.rejected]: (state, action) => {
      console.log("noticeUpdate rejected", action.payload);
    },
    [noticeDelete.fulfilled]: (state, action) => {
      console.log("noticeDelete fulfilled", action.payload);
      if (action.payload.status === 200) {
      }
    },
    [noticeDelete.rejected]: (state, action) => {
      console.log("noticeDelete rejected", action.payload);
    },
    [noticeList.fulfilled]: (state, action) => {
      console.log("noticeList fulfilled", action.payload);
      if (action.payload.status === 200) {
      }
    },
    [noticeList.rejected]: (state, action) => {
      console.log("noticeList rejected", action.payload);
    },
    [noticeDetail.fulfilled]: (state, action) => {
      console.log("noticeDetail fulfilled", action.payload);
      if (action.payload.status === 200) {
      }
    },
    [noticeDetail.rejected]: (state, action) => {
      console.log("noticeDetail rejected", action.payload);
    },
  },
});

export const noticeActions = noticeSlice.actions;

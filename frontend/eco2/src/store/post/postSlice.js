import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosService from "../axiosService";

// 전체 게시물 조회
export const postList = createAsyncThunk(
  "postSlice/postList",
  async (args, rejectWithValue) => {
    try {
      const response = await axiosService.get("/post");
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response);
    }
  }
);

// 특정 게시물 조회
export const post = createAsyncThunk(
  "postSlice/post",
  async (args, rejectWithValue) => {
    try {
      const response = await axiosService.get(`/post/${args.postId}`);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response);
    }
  }
);

// 특정 게시물 수정
export const postUpdate = createAsyncThunk(
  "postSlice/postUpdate",
  async (args, rejectWithValue) => {
    try {
      const response = await axiosService.put(
        `/post/${args.postId}`,
        args.formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response);
    }
  }
);

// 특정 게시물 삭제
export const postDelete = createAsyncThunk(
  "postSlice/postDelete",
  async (args, rejectWithValue) => {
    try {
      const response = await axiosService.delete(`/post/${args.postId}`);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response);
    }
  }
);

// 게시물 작성
export const postCreate = createAsyncThunk(
  "postSlice/postCreate",
  async (args, rejectWithValue) => {
    try {
      for (let value of args.formData.values()) {
        console.log(value);
      }
      const response = await axiosService.post("/post", args.formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response);
    }
  }
);

// 게시물 좋아요
export const postLike = createAsyncThunk(
  "postSlice/postLike",
  async (args, rejectWithValue) => {
    try {
      const response = await axiosService.post("/post/like", {
        postId: args.postId,
        userId: args.userId,
      });
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response);
    }
  }
);

// 신고
export const report = createAsyncThunk(
  "postSlice/report",
  async (args, rejectWithValue) => {
    try {
      console.log(args.userId, args.retId);
      const response = await axiosService.post(`/report/${args.userId}`, {
        retId: args.retId,
        posId: args.posId,
        comId: args.comId,
        message: args.message,
      });
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response);
    }
  }
);

// 신고 취소
export const reportCancle = createAsyncThunk(
  "postSlice/reportCancle",
  async (args, rejectWithValue) => {
    try {
      console.log(args.userId, args.retId);
      const response = await axiosService.delete(`/report/${args.userId}`, {
        posId: args.posId,
      });
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response);
    }
  }
);

export const postSlice = createSlice({
  name: "post",
  initialState: [],
  reducers: {},
  extraReducers: {
    [postList.fulfilled]: (state, action) => {
      console.log("postList fulfilled", action.payload);
      if (action.payload.status === 200) {
      }
    },
    [postList.rejected]: (state, action) => {
      console.log("postList rejected", action.payload);
    },
    [post.fulfilled]: (state, action) => {
      console.log("post fulfilled", action.payload);
      if (action.payload.status === 200) {
      }
    },
    [post.rejected]: (state, action) => {
      console.log("post rejected", action.payload);
    },
    [postDelete.fulfilled]: (state, action) => {
      console.log("postDelete fulfilled", action.payload);
      if (action.payload.status === 200) {
      }
    },
    [postDelete.rejected]: (state, action) => {
      console.log("postDelete rejected", action.payload);
    },
    [postCreate.fulfilled]: (state, action) => {
      console.log("postCreate fulfilled", action.payload);
      if (action.payload.status === 200) {
      }
    },
    [postCreate.rejected]: (state, action) => {
      console.log("postCreate rejected", action.payload);
    },
    [postUpdate.fulfilled]: (state, action) => {
      console.log("postUpdate fulfilled", action.payload);
      if (action.payload.status === 200) {
      }
    },
    [postUpdate.rejected]: (state, action) => {
      console.log("postUpdate rejected", action.payload);
    },
    [postLike.fulfilled]: (state, action) => {
      console.log("postLike fulfilled", action.payload);
      if (action.payload.status === 200) {
      }
    },
    [postLike.rejected]: (state, action) => {
      console.log("postLike rejected", action.payload);
    },
    [report.fulfilled]: (state, action) => {
      console.log("report fulfilled", action.payload);
      if (action.payload.status === 200) {
      }
    },
    [report.rejected]: (state, action) => {
      console.log("report rejected", action.payload);
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

export const postActions = postSlice.actions;

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { axiosService } from "../axiosService";

// 전체 댓글 조회
export const commentList = createAsyncThunk(
  "commentSlice/commentList",
  async (args, rejectWithValue) => {
    try {
      const response = await axiosService.get(
        `/post/${args.postId}/comment?postId=${args.postId}`
      );
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response);
    }
  }
);

// 댓글 작성
export const commentCreate = createAsyncThunk(
  "commentSlice/commentCreate",
  async (args, rejectWithValue) => {
    try {
      const response = await axiosService.post(
        `/post/${args.postId}/comment?postId=${args.postId}`,
        {
          userId: args.userId,
          content: args.content,
          postId: args.postId,
        }
      );
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response);
    }
  }
);

// 댓글 수정
export const commentUpdate = createAsyncThunk(
  "commentSlice/commentUpdate",
  async (args, rejectWithValue) => {
    try {
      const response = await axiosService.put(
        `/post/${args.postId}/comment/${args.commentId}?postId=${args.postId}&commentId=${args.commentId}`,
        { content: args.content }
      );
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response);
    }
  }
);

// 댓글 삭제
export const commentDelete = createAsyncThunk(
  "commentSlice/commentDelete",
  async (args, rejectWithValue) => {
    try {
      const response = await axiosService.delete(
        `/post/${args.postId}/comment/${args.commentId}?postId=${args.postId}&commentId=${args.commentId}`
      );
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response);
    }
  }
);

export const commentSlice = createSlice({
  name: "comment",
  initialState: [],
  reducers: {},
  extraReducers: {
    [commentList.fulfilled]: (state, action) => {
      console.log("commentList fulfilled", action.payload);
      if (action.payload.status === 200) {
      }
    },
    [commentList.rejected]: (state, action) => {
      console.log("commentList rejected", action.payload);
    },
    [commentCreate.fulfilled]: (state, action) => {
      console.log("commentCreate fulfilled", action.payload);
      if (action.payload.status === 200) {
      }
    },
    [commentCreate.rejected]: (state, action) => {
      console.log("commentCreate rejected", action.payload);
    },
    [commentUpdate.fulfilled]: (state, action) => {
      console.log("commentUpdate fulfilled", action.payload);
      if (action.payload.status === 200) {
      }
    },
    [commentUpdate.rejected]: (state, action) => {
      console.log("commentUpdate rejected", action.payload);
    },
    [commentDelete.fulfilled]: (state, action) => {
      console.log("commentDelete fulfilled", action.payload);
      if (action.payload.status === 200) {
      }
    },
    [commentDelete.rejected]: (state, action) => {
      console.log("commentDelete rejected", action.payload);
    },
  },
});

export const commentActions = commentSlice.actions;

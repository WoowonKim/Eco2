import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosService from "../axiosService";

// 채팅방 조회
export const chattingList = createAsyncThunk(
  "chattingSlice/chattingList",
  async (args, rejectWithValue) => {
    try {
      const response = await axiosService.get(`/chat/room/${args.userId}`);
      console.log(response.data);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response);
    }
  }
);

// 채팅 메시지 조회
export const chattingMessageList = createAsyncThunk(
  "chattingSlice/chattingMessageList",
  async (args, rejectWithValue) => {
    try {
      const response = await axiosService.get(`/chat/message/${args.roomId}`);
      console.log(response.data);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response);
    }
  }
);
// 채팅방 친구 조회
export const chattingFriendList = createAsyncThunk(
  "chattingSlice/chattingFriendList",
  async (args, rejectWithValue) => {
    try {
      const response = await axiosService.get(
        `/account/friend?id=${args.userId}`
      );
      console.log(response.data);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response);
    }
  }
);

// 채팅방 생성
export const createRoom = createAsyncThunk(
  "chattingSlice/createRoom",
  async (args, rejectWithValue) => {
    try {
      const response = await axiosService.post(`/chat/room`, {
        toUserId: args.id,
        fromUserId: args.userId,
      });
      console.log(response.data);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response);
    }
  }
);

// 채팅방 삭제
export const deleteRoom = createAsyncThunk(
  "chattingSlice/deleteRoom",
  async (args, rejectWithValue) => {
    try {
      const response = await axiosService.delete(`/chat/room/${args.roodId}`);
      console.log(response.data);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response);
    }
  }
);

export const chattingSlice = createSlice({
  name: "chatting",
  initialState: [],
  reducers: {},
  extraReducers: {
    [chattingList.fulfilled]: (state, action) => {
      console.log("chattingList fulfilled", action.payload);
      if (action.payload.status === 200) {
      }
    },
    [chattingList.rejected]: (state, action) => {
      console.log("chattingList rejected", action.payload);
    },

    [chattingMessageList.fulfilled]: (state, action) => {
      console.log("chattingMessageList fulfilled", action.payload);
      if (action.payload.status === 200) {
      }
    },
    [chattingMessageList.rejected]: (state, action) => {
      console.log("chattingMessageList rejected", action.payload);
    },
    [chattingFriendList.fulfilled]: (state, action) => {
      console.log("chattingFriendList fulfilled", action.payload);
      if (action.payload.status === 200) {
      }
    },
    [chattingFriendList.rejected]: (state, action) => {
      console.log("chattingFriendList rejected", action.payload);
    },

    [deleteRoom.fulfilled]: (state, action) => {
      console.log("deleteRoom fulfilled", action.payload);
      if (action.payload.status === 200) {
      }
    },
    [deleteRoom.rejected]: (state, action) => {
      console.log("deleteRoom rejected", action.payload);
    },
  },
});

export const chattingActions = chattingSlice.actions;

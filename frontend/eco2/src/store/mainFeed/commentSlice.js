import { createSlice } from "@reduxjs/toolkit";


export const commentSlice = createSlice({
  name: "comment",
  initialState: [],
  reducers: {
    addComment: (state, action) => {
      const newComment = {
        id: Date.now(),
        postId: action.payload.postId,
        content: action.payload.content,
        user: 'user1',
      };
      state.push(newComment)
    },
    updateComment: (state, action) => {
      const index = state.findIndex((comment) => comment.id === action.payload.id);
      state[index].content = action.payload.content
    },
    deleteComment: (state, action) => {
      return state.filter((comment) => comment.id !== action.payload.id);
    }
  }
});

export const { addComment, updateComment, deleteComment } = commentSlice.actions;
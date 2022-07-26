import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


const feedState = {
  feedList: [
    {id: 1, user: 'user1', category: 'do', content: '실천하기', src: 'logo.png'},
    {id: 2, user: 'user1', category: 'use', content: '사용하기', src: 'logo.png'},
    {id: 3, user: 'user2', category: 'save', content: '절약하기', src: 'logo.png'},
    {id: 4, user: 'user3', category: 'buy', content: '구매하기', src: 'logo.png'},
    {id: 5, user: 'user3', category: 'recycle', content: '재활용하기', src: 'logo.png'},
    {id: 6, user: 'user4', category: 'do', content: '실천하기', src: 'logo.png'},
    {id: 7, user: 'user5', category: 'buy', content: '구매하기', src: 'logo.png'},
    {id: 8, user: 'user6', category: 'save', content: '절약하기', src: 'logo.png'},
    {id: 9, user: 'user1', category: 'do', content: '실천하기', src: 'logo.png'},
    {id: 10, user: 'user7', category: 'use', content: '사용하기', src: 'logo.png'},
    {id: 11, user: 'user8', category: 'save', content: '절약하기', src: 'logo.png'},
    {id: 12, user: 'user9', category: 'use', content: '사용하기', src: 'logo.png'},
    {id: 13, user: 'user10', category: 'buy', content: '구매하기', src: 'logo.png'},
    {id: 14, user: 'user3', category: 'recycle', content: '재활용하기', src: 'logo.png'},
    {id: 15, user: 'user11', category: 'do', content: '실천하기', src: 'logo.png'},
    {id: 16, user: 'user12', category: 'do', content: '실천하기', src: 'logo.png'},
  ]
  
};
export const feedSlice = createSlice({
  name: "feed",
  initialState: feedState,
  reducers: {
  },
  extraReducers: {
  },
});

export const feedActions = feedSlice.actions;

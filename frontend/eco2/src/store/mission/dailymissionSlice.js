import { createSlice } from "@reduxjs/toolkit";

const DummyMissionState = {
  dailyMissionList: [
    { id: 81, content: "쓰레기 줍기", category: 3, find: 0 },
    { id: 82, content: "분리수거 해보기", category: 1, find: 0 },
    { id: 83, content: "에어컨 끄기", category: 2, find: 0 },
    { id: 84, content: "절약하기", category: 5, find: 0 },
    { id: 85, content: "재활용 해보기", category: 4, find: 0 },
    { id: 86, content: "샤워 짧게 하기", category: 2, find: 0 },
    { id: 87, content: "방청소 열심히 하기", category: 4, find: 0 },
    { id: 88, content: "환경물품 사용", category: 1, find: 0 },
    { id: 89, content: "의류수거함 활용", category: 3, find: 0 },
    { id: 90, content: "텀블러 사용", category: 1, find: 0 },
    { id: 91, content: "일회용 재사용", category: 2, find: 0 },
  ],
};

export const dailymissionSlice = createSlice({
  name: "dailyMission",
  initialState: DummyMissionState,
  reducers: {},
  extraReducers: {},
});

export const dailymissionActions = dailymissionSlice.actions;

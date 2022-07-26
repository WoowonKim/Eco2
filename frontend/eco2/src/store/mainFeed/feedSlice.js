import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";


const feedState = {
  feedList: [
    {id: 1, user: 'user1', category: 'do', content: '실천하기 제안된 헌법개정안은 대통령이 20일 이상의 기간 이를 공고하여야 한다. 근로자는 근로조건의 향상을 위하여 자주적인 단결권·단체교섭권 및 단체행동권을 가진다.', src: `${process.env.PUBLIC_URL}/logo.png`},
    {id: 2, user: 'user1', category: 'use', content: '사용하기 제안된 헌법개정안은 대통령이 20일 이상의 기간 이를 공고하여야 한다. 근로자는 근로조건의 향상을 위하여 자주적인 단결권·단체교섭권 및 단체행동권을 가진다.', src: `${process.env.PUBLIC_URL}/logo.png`},
    {id: 3, user: 'user2', category: 'save', content: '절약하기 제안된 헌법개정안은 대통령이 20일 이상의 기간 이를 공고하여야 한다. 근로자는 근로조건의 향상을 위하여 자주적인 단결권·단체교섭권 및 단체행동권을 가진다.', src: `${process.env.PUBLIC_URL}/logo.png`},
    {id: 4, user: 'user3', category: 'buy', content: '구매하기 제안된 헌법개정안은 대통령이 20일 이상의 기간 이를 공고하여야 한다. 근로자는 근로조건의 향상을 위하여 자주적인 단결권·단체교섭권 및 단체행동권을 가진다.', src: `${process.env.PUBLIC_URL}/logo.png`},
    {id: 5, user: 'user3', category: 'recycle', content: '재활용하기 제안된 헌법개정안은 대통령이 20일 이상의 기간 이를 공고하여야 한다. 근로자는 근로조건의 향상을 위하여 자주적인 단결권·단체교섭권 및 단체행동권을 가진다.', src: `${process.env.PUBLIC_URL}/logo.png`},
    {id: 6, user: 'user4', category: 'do', content: '실천하기 제안된 헌법개정안은 대통령이 20일 이상의 기간 이를 공고하여야 한다. 근로자는 근로조건의 향상을 위하여 자주적인 단결권·단체교섭권 및 단체행동권을 가진다.', src: `${process.env.PUBLIC_URL}/logo.png`},
    {id: 7, user: 'user5', category: 'buy', content: '구매하기 제안된 헌법개정안은 대통령이 20일 이상의 기간 이를 공고하여야 한다. 근로자는 근로조건의 향상을 위하여 자주적인 단결권·단체교섭권 및 단체행동권을 가진다.', src: `${process.env.PUBLIC_URL}/logo.png`},
    {id: 8, user: 'user6', category: 'save', content: '절약하기 제안된 헌법개정안은 대통령이 20일 이상의 기간 이를 공고하여야 한다. 근로자는 근로조건의 향상을 위하여 자주적인 단결권·단체교섭권 및 단체행동권을 가진다.', src: `${process.env.PUBLIC_URL}/logo.png`},
    {id: 9, user: 'user1', category: 'do', content: '실천하기 제안된 헌법개정안은 대통령이 20일 이상의 기간 이를 공고하여야 한다. 근로자는 근로조건의 향상을 위하여 자주적인 단결권·단체교섭권 및 단체행동권을 가진다.', src: `${process.env.PUBLIC_URL}/logo.png`},
    {id: 10, user: 'user7', category: 'use', content: '사용하기 제안된 헌법개정안은 대통령이 20일 이상의 기간 이를 공고하여야 한다. 근로자는 근로조건의 향상을 위하여 자주적인 단결권·단체교섭권 및 단체행동권을 가진다.', src: `${process.env.PUBLIC_URL}/logo.png`},
    {id: 11, user: 'user8', category: 'save', content: '절약하기 제안된 헌법개정안은 대통령이 20일 이상의 기간 이를 공고하여야 한다. 근로자는 근로조건의 향상을 위하여 자주적인 단결권·단체교섭권 및 단체행동권을 가진다.', src: `${process.env.PUBLIC_URL}/logo.png`},
    {id: 12, user: 'user9', category: 'use', content: '사용하기 제안된 헌법개정안은 대통령이 20일 이상의 기간 이를 공고하여야 한다. 근로자는 근로조건의 향상을 위하여 자주적인 단결권·단체교섭권 및 단체행동권을 가진다.', src: `${process.env.PUBLIC_URL}/logo.png`},
    {id: 13, user: 'user10', category: 'buy', content: '구매하기 제안된 헌법개정안은 대통령이 20일 이상의 기간 이를 공고하여야 한다. 근로자는 근로조건의 향상을 위하여 자주적인 단결권·단체교섭권 및 단체행동권을 가진다.', src: `${process.env.PUBLIC_URL}/logo.png`},
    {id: 14, user: 'user3', category: 'recycle', content: '재활용하기 제안된 헌법개정안은 대통령이 20일 이상의 기간 이를 공고하여야 한다. 근로자는 근로조건의 향상을 위하여 자주적인 단결권·단체교섭권 및 단체행동권을 가진다.', src: `${process.env.PUBLIC_URL}/logo.png`},
    {id: 15, user: 'user11', category: 'do', content: '실천하기 제안된 헌법개정안은 대통령이 20일 이상의 기간 이를 공고하여야 한다. 근로자는 근로조건의 향상을 위하여 자주적인 단결권·단체교섭권 및 단체행동권을 가진다.', src: `${process.env.PUBLIC_URL}/logo.png`},
    {id: 16, user: 'user12', category: 'do', content: '실천하기 제안된 헌법개정안은 대통령이 20일 이상의 기간 이를 공고하여야 한다. 근로자는 근로조건의 향상을 위하여 자주적인 단결권·단체교섭권 및 단체행동권을 가진다.', src: `${process.env.PUBLIC_URL}/logo.png`},
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

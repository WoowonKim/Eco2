import styles from "./App.module.css";
import { Routes, Route } from "react-router-dom";
import EcoName from "./pages/ecoName/EcoName";
import Login from "./pages/login/Login";
import FindPassword from "./pages/findPassword/FindPassword";
import Regist from "./pages/regist/Regist";

import MainFeed from "./pages/mainFeed/MainFeed";

import Header from "./components/NavFooter/Header";

/* DailyMission */
import DailyMissionDetail from "./pages/dmission/dailyMissionDetail/dailyMissionDetail";
import DailyEcoMissionList from "./pages/dmission/dailyMissionDetail/dailyEcoMissionList";
import DailyEcoMissionEcoFolder from "./pages/dmission/dailyMissionDetail/dailyEcoMissionEcoFolder";
/* DailyMission End */
import React, { useCallback, useEffect, useMemo, useReducer, useRef } from "react";

import React, {
  useCallback,
  useEffect,
  useMemo,
  useReducer,
  useRef,
} from "react";


import Footer from "./components/NavFooter/Footer";
import { useSelector } from "react-redux";
import MainTree from "./pages/mainTree/MainTree";

import FeedCategory from "./pages/feedCategory/FeedCategory";
import PostDetail from "./pages/postDetail/PostDetail";
import PostForm from "./pages/postForm/PostForm";

function App() {
  let currUser = useSelector((state) => state.user);
  return (
    <div className={styles.App}>
      {currUser.isLoggedIn === 1 ? <Header></Header> : null}
      <div className={styles.body}>
        <Routes>
          <Route path="/" element={<Login />}></Route>
          <Route path="/regist" element={<Regist />}></Route>
          <Route path="/findPassword" element={<FindPassword />}></Route>
          <Route path="/ecoName" element={<EcoName />}></Route>
          {/*DailyMission */}
          <Route path="/dailymission" element={<DailyMissionDetail />} />
          <Route path="/dailymissionlist" element={<DailyEcoMissionList />} />
          <Route path="/dailymissionEcoFolder" element={<DailyEcoMissionEcoFolder />} />
          {/*DailyMission */}
          <Route path="/mainFeed" element={<MainFeed />}></Route>
          <Route path="/mainFeed/:feedCategory" element={<FeedCategory />}></Route>
          <Route path="/post/:postId" element={<PostDetail />}></Route>
          <Route path="/mainTree" element={<MainTree></MainTree>}></Route>
        </Routes>
      </div>
      {currUser.isLoggedIn === 1 ? <Footer></Footer> : null}
    </div>
  );
}

export default App;

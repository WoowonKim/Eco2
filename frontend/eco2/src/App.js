import styles from "./App.module.css";
import { Routes, Route } from "react-router-dom";
import EcoName from "./pages/ecoName/EcoName";
import Login from "./pages/login/Login";
import FindPassword from "./pages/findPassword/FindPassword";
import Regist from "./pages/regist/Regist";

import MainFeed from "./pages/mainFeed/MainFeed";

import Header from "./components/NavFooter/Header";

/* DailyMission */
import DailyMissionMain from "./pages/dmission/dailyMissionMain/dailyMissionMain";
import DailyMissionDetail from "./pages/dmission/dailyMissionDetail/dailyMissionDetail";

/* DailyMission End */
import React, { useCallback, useEffect, useMemo, useReducer, useRef } from "react";

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
      <Header></Header>
      <div className={styles.body}>
        <Routes>
          <Route path="/" element={<Login />}></Route>
          <Route path="/regist" element={<Regist />}></Route>
          <Route path="/findPassword" element={<FindPassword />}></Route>
          <Route path="/ecoName" element={<EcoName />}></Route>
          {/*DailyMission */}
          <Route path="/dailymissionmain" element={<DailyMissionMain />} />
          <Route path="/dailymissiondetail" element={<DailyMissionDetail />} />

          {/*DailyMission */}
          <Route path="/mainFeed" element={<MainFeed />}></Route>
          <Route
            path="/mainFeed/:feedCategory"
            element={<FeedCategory />}
          ></Route>
          <Route path="/post/:postId" element={<PostDetail />}></Route>
          <Route path="/post" element={<PostForm />}></Route>
          <Route path="/mainTree" element={<MainTree></MainTree>}></Route>
        </Routes>
      </div>
      <Footer></Footer>
    </div>
  );
}

export default App;

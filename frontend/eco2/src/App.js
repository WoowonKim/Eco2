import styles from "./App.module.css";
import React, { Routes, Route } from "react-router-dom";
import EcoName from "./pages/ecoName/EcoName";
import Login from "./pages/login/Login";
import FindPassword from "./pages/findPassword/FindPassword";
import Regist from "./pages/regist/Regist";

import Header from "./components/NavFooter/Header";

/* DailyMission */
import MissionMain from "./pages/dailyMission/missionMain/missionMain";
import MissionDetail from "./pages/dailyMission/missionDetail/missionDetail";
import MissionCustom from "./pages/dailyMission/missionCustom/missionCustom";
import MissionUpdate from "./pages/dailyMission/missionUpdate/missionUpdate";
import Footer from "./components/NavFooter/Footer";
import { useSelector } from "react-redux";
import MainTree from "./pages/mainTree/MainTree";

import MainFeed from "./pages/mainFeed/MainFeed";
import FeedCategory from "./pages/feedCategory/FeedCategory";
import PostDetail from "./pages/postDetail/PostDetail";

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
          <Route path="/missionMain" element={<MissionMain />} />
          <Route path="/missionDetail" element={<MissionDetail />} />
          <Route path="/missionUpdate" element={<MissionUpdate />} />
          <Route path="/missionCustom" element={<MissionCustom />} />
          <Route path="/mainFeed" element={<MainFeed />}></Route>
          <Route
            path="/mainFeed/:feedCategory"
            element={<FeedCategory />}
          ></Route>
          <Route path="/post/:postId" element={<PostDetail />}></Route>
          <Route path="/mainTree" element={<MainTree></MainTree>}></Route>
        </Routes>
      </div>
      {currUser.isLoggedIn === 1 ? <Footer></Footer> : null}
    </div>
  );
}

export default App;

import styles from "./App.module.css";
import React, { Routes, Route } from "react-router-dom";
import EcoName from "./pages/ecoName/EcoName";
import Login from "./pages/login/Login";
import FindPassword from "./pages/findPassword/FindPassword";
import Regist from "./pages/regist/Regist";

/* DailyMission */
import MissionMain from "./pages/dailyMission/missionMain/missionMain";
import MissionDetail from "./pages/dailyMission/missionDetail/missionDetail";
import MissionCustom from "./pages/dailyMission/missionCustom/missionCustom";
import MissionUpdate from "./pages/dailyMission/missionUpdate/missionUpdate";

import MainFeed from './pages/mainFeed/MainFeed'
import FeedCategory from "./pages/feedCategory/FeedCategory";
import PostDetail from "./pages/postDetail/PostDetail";

function App() {
  return (
    <div className={styles.App}>
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
        <Route path="/mainFeed/:feedCategory" element={<FeedCategory />}></Route>
        <Route path="/post/:postId" element={<PostDetail />}></Route>
      </Routes>
    </div>
  );
}

export default App;

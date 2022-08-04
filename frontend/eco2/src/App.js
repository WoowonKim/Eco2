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
import MissionCom from "./components/dailyMission/missionClear/missionCom";
import DailyCustomMissionList from "./components/dailyMission/missionList/dailyCustomMissionList";
import CustomPlus from "./components/dailyMission/missionItem/customPlus";
/* DailyMission End */
import React, {
  useCallback,
  useEffect,
  useMemo,
  useReducer,
  useRef,
  useState,
} from "react";

import Footer from "./components/NavFooter/Footer";
import { useSelector } from "react-redux";
import MainTree from "./pages/mainTree/MainTree";

import FeedCategory from "./pages/feedCategory/FeedCategory";
import PostDetail from "./pages/postDetail/PostDetail";
import PostForm from "./pages/postForm/PostForm";
import Profile from "./pages/profile/Profile";
import UserSettings from "./pages/userSettings/UserSettings";
import UserFriends from "./pages/userFriends/UserFriends";
import { dbService, firestore } from "./store/firebase";
import QuestMain from "./pages/quest/questMain/QuestMain";

function App() {
  let currUser = useSelector((state) => state.user);

  // 친구 신청 알림 기능 구현 예정
  // const [alarm, setAlarm] = useState([]);

  // useEffect(() => {
  //   firestore.onSnapshot(
  //     firestore.collection(dbService, "test/2/alarm"),
  //     (snapshot) => {
  //       const alarmArray = snapshot.docs.map((doc) => ({
  //         id: doc.id,
  //         ...doc.data(),
  //       }));
  //       console.log(alarmArray);
  //       setAlarm(alarmArray);
  //     }
  //   );
  // }, []);
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
          <Route path="/missionClear" element={<MissionCom />} />
          <Route
            path="/dailyCustomMissionList"
            element={<DailyCustomMissionList />}
          />
          <Route path="/customPlus" element={<CustomPlus />} />
          {/*DailyMission */}
          <Route path="/mainFeed" element={<MainFeed />}></Route>
          <Route
            path="/mainFeed/:feedCategory"
            element={<FeedCategory />}
          ></Route>
          <Route path="/post/:postId" element={<PostDetail />}></Route>
          <Route path="/post" element={<PostForm />}></Route>
          <Route path="/mainTree" element={<MainTree></MainTree>}></Route>

          <Route path="/profile" element={<Profile />}></Route>
          <Route path="/user/settings" element={<UserSettings />}></Route>
          <Route path="/user/friends" element={<UserFriends />}></Route>

          <Route path="/quest" element={<QuestMain />}></Route>
        </Routes>
      </div>
      <Footer></Footer>
    </div>
  );
}

export default App;

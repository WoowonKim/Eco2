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
import NoticeForm from "./pages/notice/noticeForm/NoticeForm";
import NoticeDetail from "./pages/notice/noticeDetail/NoticeDetail";
import { getUserEmail } from "./store/user/common";
import RequireAuth from "./components/auth/requireAuth/RequireAuth";
import Error from "./pages/error/Error";
import KakaoLogin from "./pages/login/KakaoLogin";
import Chatting from "./pages/chat/chatting/Chatting";
import ChattingRoom from "./pages/chat/chattingRoom/ChattingRoom";

function App() {
  const [userdata, setUserdata] = useState(null);

  // 친구 신청 알림 기능 구현 예정
  // const [alarm, setAlarm] = useState([]);

  useEffect(() => {

    setUserdata(getUserEmail());
    // firestore.onSnapshot(
    //   firestore.collection(dbService, "test/2/alarm"),
    //   (snapshot) => {
    //     const alarmArray = snapshot.docs.map((doc) => ({
    //       id: doc.id,
    //       ...doc.data(),
    //     }));
    //     console.log(alarmArray);
    //     setAlarm(alarmArray);
    //   }
    // );
  }, []);
  return (
    <div className={styles.App}>
      {userdata && <Header></Header>}
      <div className={styles.body}>
        <Routes>
          <Route path="/" element={<Login />}></Route>
          <Route path="/kakao" element={<KakaoLogin />}></Route>
          <Route path="/regist" element={<Regist />}></Route>
          <Route path="/findPassword" element={<FindPassword />}></Route>
          <Route path="/ecoName" element={<EcoName />}></Route>
          {/*DailyMission */}
          <Route
            path="/dailymissionmain"
            element={
              <RequireAuth>
                <DailyMissionMain />
              </RequireAuth>
            }
          />
          <Route
            path="/dailymissiondetail"
            element={
              <RequireAuth>
                <DailyMissionDetail />
              </RequireAuth>
            }
          />
          <Route
            path="/missionClear"
            element={
              <RequireAuth>
                <MissionCom />
              </RequireAuth>
            }
          />
          <Route
            path="/dailyCustomMissionList"
            element={
              <RequireAuth>
                <DailyCustomMissionList />
              </RequireAuth>
            }
          />
          <Route
            path="/customPlus"
            element={
              <RequireAuth>
                <CustomPlus />
              </RequireAuth>
            }
          />
          {/*DailyMission */}
          <Route
            path="/mainFeed"
            element={
              <RequireAuth>
                <MainFeed />
              </RequireAuth>
            }
          ></Route>
          <Route
            path="/mainFeed/:feedCategory"
            element={
              <RequireAuth>
                <FeedCategory />
              </RequireAuth>
            }
          ></Route>
          <Route
            path="/post/:postId"
            element={
              <RequireAuth>
                <PostDetail />
              </RequireAuth>
            }
          ></Route>
          <Route
            path="/post"
            element={
              <RequireAuth>
                <PostForm />
              </RequireAuth>
            }
          ></Route>
          <Route
            path="/mainTree"
            element={
              <RequireAuth>
                <MainTree />
              </RequireAuth>
            }
          ></Route>

          <Route
            path="/profile"
            element={
              <RequireAuth>
                <Profile />
              </RequireAuth>
            }
          ></Route>
          <Route
            path="/user/settings"
            element={
              <RequireAuth>
                <UserSettings />
              </RequireAuth>
            }
          ></Route>
          <Route
            path="/user/friends"
            element={
              <RequireAuth>
                <UserFriends />
              </RequireAuth>
            }
          ></Route>

          <Route
            path="/quest"
            element={
              <RequireAuth>
                <QuestMain />
              </RequireAuth>
            }
          ></Route>

          <Route
            path="/notice"
            element={
              <RequireAuth>
                <NoticeForm />
              </RequireAuth>
            }
          ></Route>
          <Route
            path="/notice/:noticeId"
            element={
              <RequireAuth>
                <NoticeDetail />
              </RequireAuth>
            }
          ></Route>

          <Route
            path="/chatting"
            element={
              <RequireAuth>
                <Chatting />
              </RequireAuth>
            }
          ></Route>

          <Route
            path="/chatting/room"
            element={
              <RequireAuth>
                <ChattingRoom />
              </RequireAuth>
            }
          ></Route>
          <Route path="/*" element={<Error />}></Route>
        </Routes>
      </div>
      {userdata && <Footer></Footer>}
    </div>
  );
}

export default App;

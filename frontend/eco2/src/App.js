import styles from "./App.module.css";
import { Routes, Route } from "react-router-dom";
import EcoName from "./pages/ecoName/EcoName";
import Login from "./pages/login/Login";
import FindPassword from "./pages/findPassword/FindPassword";
import Regist from "./pages/regist/Regist";

import MainFeed from "./pages/mainFeed/MainFeed";

import Header from "./components/NavFooter/Header";

import Alarm from "./pages/alarm/Alarm";

/* DailyMission */
import DailyMissionMain from "./pages/dmission/dailyMissionMain/dailyMissionMain";
import DailyMissionDetail from "./pages/dmission/dailyMissionDetail/dailyMissionDetail";
import DailyCustomMissionList from "./components/dailyMission/missionList/dailyCustomMissionList";
/* DailyMission End */
import React, { useCallback, useEffect, useMemo, useReducer, useRef, useState } from "react";

import Footer from "./components/NavFooter/Footer";
import { useDispatch, useSelector } from "react-redux";
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
import { getUserEmail, getUserId } from "./store/user/common";
import RequireAuth from "./components/auth/requireAuth/RequireAuth";
import Error from "./pages/error/Error";
import KakaoLogin from "./pages/login/KakaoLogin";
import Chatting from "./pages/chat/chatting/Chatting";
import ChattingRoom from "./pages/chat/chattingRoom/ChattingRoom";
import Report from "./pages/admin/report/Report";
import ReportDetail from "./pages/admin/reportDetail/ReportDetail";
import Spinner from "./components/spinner/Spinner";
import { userInformation } from "./store/user/userSettingSlice";
import RequireAdmin from "./components/auth/requireAuth/RequireAdmin";

function App() {
  const [userdata, setUserdata] = useState(false);
  const pending = useSelector((state) => state.user.isPending);
  const recommendPending = useSelector((state) => state.missionMain.isPending);
  const friendPending = useSelector((state) => state.account.isPending);
  const [admin, setAdmin] = useState(false);
  const [userId, setUserId] = useState(getUserId());
  const dispatch = useDispatch();

  useEffect(() => {
    document.getElementById("scroll-container").scrollTop = 0;
    setUserdata(getUserEmail());
  }, []);

  useEffect(() => {
    setUserId(getUserId());
    if (!userId) {
      return;
    }
    dispatch(userInformation({ email: getUserEmail(), userId: getUserId() })).then((res) => {
      if (res.payload.user.role === "[ROLE_ADMIN]") {
        setAdmin(true);
      }
    });
  }, [userId]);
  return (
    <div className={styles.App} id="scroll-container">
      {userdata && <Header admin={admin}></Header>}
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
            path="/dailyCustomMissionList"
            element={
              <RequireAuth>
                <DailyCustomMissionList />
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
            path="/profile/:userId"
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
                <RequireAdmin userRole={admin}>
                  <NoticeForm />
                </RequireAdmin>
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
            path="/report"
            element={
              <RequireAuth>
                <RequireAdmin userRole={admin}>
                  <Report />
                </RequireAdmin>
              </RequireAuth>
            }
          ></Route>
          <Route
            path="/report/detail"
            element={
              <RequireAuth>
                <RequireAdmin userRole={admin}>
                  <ReportDetail />
                </RequireAdmin>
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
          <Route
            path="/alarm"
            element={
              // <RequireAuth>
              <Alarm />
              // </RequireAuth>
            }
          ></Route>
          <Route path="/*" element={<Error />}></Route>
        </Routes>
        <div className={`${styles.spinner} ${pending || recommendPending || friendPending ? styles.visible : styles.hidden}`}>
          <Spinner
            visible={pending || recommendPending || friendPending}
            message={pending ? "인증 메일을 전송 중입니다 :D" : recommendPending ? "오늘의 추천 미션을 불러오는 중입니다 :D" : "친구 요청을 보내는 중입니다 :D"}
          />
        </div>
      </div>
      {userdata && <Footer></Footer>}
    </div>
  );
}

export default App;

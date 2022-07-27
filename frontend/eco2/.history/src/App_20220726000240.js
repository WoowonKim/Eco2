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
import { useReducer } from "react";
/*더미Reducer */
const reducer = (state, action) => {
  switch (action.type) {
    case "INIT": {
      return action.data;
    }
    default:
      return state;
  }
};
/* 더미데이터 */
const Dummy = [
  {
    id: 1,
    content: "텀블러 사용해서 지구 지키기",
  },
  {
    id: 2,
    content: "밖에 나갈때 멀티땝 뽑기",
  },
  {
    id: 3,
    content: "더운날에는 찬물 샤워 해보기!",
  },
];

export const DummyDailyMission = React.createContext();
function App() {
  const [data, setData] = useReducer(reducer, Dummy);
  return (
    <DummyDailyMission.Provider value={data}>
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
        </Routes>
      </div>
    </DummyDailyMission.Provider>
  );
}

export default App;

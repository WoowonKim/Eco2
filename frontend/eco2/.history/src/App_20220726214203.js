import styles from "./App.module.css";
import { Routes, Route } from "react-router-dom";
import EcoName from "./pages/ecoName/EcoName";
import Login from "./pages/login/Login";
import FindPassword from "./pages/findPassword/FindPassword";
import Regist from "./pages/regist/Regist";
import MainFeed from "./pages/mainFeed/MainFeed";

/* DailyMission */
import MissionMain from "./pages/dailyMission/missionMain/missionMain";
import MissionDetail from "./pages/dailyMission/missionDetail/missionDetail";
import MissionCustom from "./pages/dailyMission/missionCustom/missionCustom";
import MissionUpdate from "./pages/dailyMission/missionUpdate/missionUpdate";
import React, {
  useCallback,
  useEffect,
  useMemo,
  useReducer,
  useRef,
} from "react";

/* 더미객체 Start */
const reducer = (state, action) => {
  switch (action.type) {
    case "INIT": {
      return action.data;
    }
    case "CREATE": {
      const newItem = {
        ...action.data,
      };
      return [newItem, ...state];
    }
    case "REMOVE": {
      return state.filter(it => it.id !== action.targetId);
    }

    default:
      return state;
  }
};

// 내보내기.
export const DummyStateContext = React.createContext();
export const DummyDispathContext = React.createContext();
/* 더미객체 End */

function App() {
  /* 더미 객체 Start */
  const [data, dispatch] = useReducer(reducer, []);
  const dataId = useRef(0);

  const getData = async () => {
    const res = await fetch(
      "https://jsonplaceholder.typicode.com/comments"
    ).then(res => res.json());

    const initData = res.slice(0, 20).map(it => {
      return {
        author: it.email,
        content: it.body,
        id: dataId.current++,
      };
    });

    dispatch({ type: "INIT", data: initData });
  };

  useEffect(() => {
    getData();
  }, []);

  const onCreate = useCallback((auth, content) => {
    dispatch({
      type: "CREATE",
      data: { auth, content, id: dataId.current },
    });
    dataId.current += 1;
  }, []);

  const onRemove = useCallback(targetId => {
    dispatch({ type: "REMOVE", targetId });
  }, []);

  const memoizedDispatches = useMemo(() => {
    return { onCreate, onRemove };
  }, []);
  /* 더미객체 End */

  return (
    <DummyStateContext.Provider value={data}>
      <DummyDispathContext.Provider value={memoizedDispatches}>
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
          </Routes>
        </div>
      </DummyDispathContext.Provider>
    </DummyStateContext.Provider>
  );
}

export default App;

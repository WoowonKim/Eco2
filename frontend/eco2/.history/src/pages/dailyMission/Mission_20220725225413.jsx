import React from "react";
import { Routes, Route } from "react-router-dom";

/* 데일리 미션 경로 */
import MissionMain from "./pages/dailyMission/missionMain/missionMain";
import MissionDetail from "./pages/dailyMission/missionDetail/missionDetail";
import MissionCustom from "./missionCustom/missionCustom";
import MissionUpdate from "./missionUpdate/missionUpdate";

const Mission = () => {
  return (
    <div>
      <Routes>
        <Route path="/missionMain" element={<MissionMain />} />
        <Route path="/missionDetail" element={<MissionDetail />} />
        <Route path="/missionUpdate" element={<MissionUpdate />} />
        <Route path="/missionCustom" element={<MissionCustom />} />
      </Routes>
    </div>
  );
};

export default Mission;

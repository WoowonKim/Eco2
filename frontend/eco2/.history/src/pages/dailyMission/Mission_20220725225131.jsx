import React from "react";
import { Routes, Route } from "react-router-dom";

/* 데일리 미션 경로 */
import MissionMain from "./pages/dailyMission/missionMain/missionMain";

const Mission = () => {
  return (
    <div>
      <Routes>
        <Route path="/missionMain" element={<MissionMain />} />
        <Route path="/missionDetail" element={<missionDetail />} />
        <Route path="/missionUpdate" element={<missionUpdate />} />
        <Route path="/missionCustom" element={<missionCustom />} />
      </Routes>
    </div>
  );
};

export default Mission;

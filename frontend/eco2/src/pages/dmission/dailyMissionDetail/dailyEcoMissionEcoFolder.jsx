import React from "react";
import { useLocation } from "react-router-dom";
const DailyEcoMissionEcoFolder = () => {
  const location = useLocation();
  const ecoArr = location.state.eco;
  return (
    <div>
      <div>
        {ecoArr.map((it) => (
          <span key={it.id}>{it.content}</span>
        ))}
      </div>
    </div>
  );
};

export default DailyEcoMissionEcoFolder;

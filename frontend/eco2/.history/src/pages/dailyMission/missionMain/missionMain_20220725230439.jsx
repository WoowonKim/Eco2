import React from "react";
import { Link } from "react-router-dom";
const missionMain = () => {
  return (
    <div>
      미션 메인
      <Link to="/missionDetail">
        <button> GoDetail</button>
      </Link>
    </div>
  );
};

export default missionMain;

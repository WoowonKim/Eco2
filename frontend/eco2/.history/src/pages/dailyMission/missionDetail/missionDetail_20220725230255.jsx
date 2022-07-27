import React from "react";
import { Link } from "react-router-dom";

const missionDetail = () => {
  return (
    <div>
      미션 상세
      <Link to="/missionMain">
        <button>GoDetail</button>
      </Link>
    </div>
  );
};

export default missionDetail;

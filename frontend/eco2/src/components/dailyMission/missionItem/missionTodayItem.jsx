// React
import React from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux/es/exports";

// Store
import { deleteMission, clearMission } from "../../../store/mission/missionMainSlice";

// CSS
import styles from "./dailyMission.module.css";

const MissionTodayItem = ({ content }) => {
  return (
    <div>
      <div className={styles.mainList}>
        <i className={`fa-solid fa-circle`}></i>
        <div>{content}</div>
        <i className={"fa-solid fa-trash-can"}></i>
      </div>
    </div>
  );
};

export default MissionTodayItem;

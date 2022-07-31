import React from "react";
import { Link } from "react-router-dom";
import DailyMissionMainList from "../../../components/dailyMission/missionList/dailyMissionMainList";
import styles from "./dailyMission.module.css";
import { GreenBtn } from "../../../components/styled";
const DailyMissionMain = () => {
  return (
    <div className={styles.headerMain}>
      <div className={styles.mainHeader}>
        <span className={styles.mainHeaderLeft}>오늘의 도전과제</span>
        <Link to="/dailymissionDetail" className={styles.mainHeaderRight}>
          <span>
            추가하기
            <i className={`${"fa-solid fa-circle-plus"} ${styles.mainColor}`}></i>
          </span>
        </Link>
      </div>
      <div>
        <DailyMissionMainList />
      </div>
    </div>
  );
};

export default DailyMissionMain;

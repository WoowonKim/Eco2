import React, { useState } from "react";
import { Link } from "react-router-dom";
import styles from "./dailyMission.module.css";
import { GreenBtn } from "../../../components/styled";
import { useSelector } from "react-redux";
import MissionMain from "../../../components/dailyMission/missionList/missionMain";
const DailyMissionMain = () => {
  const test = useSelector((state) => state.missionMain.ecoMissionList);
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
        {test.map((it) => (
          <MissionMain key={it.id} content={it.content} id={it.id} />
        ))}
      </div>
      <div className={styles.btn}>
        <GreenBtn>오늘 미션 보상 받기</GreenBtn>
      </div>
    </div>
  );
};

export default DailyMissionMain;

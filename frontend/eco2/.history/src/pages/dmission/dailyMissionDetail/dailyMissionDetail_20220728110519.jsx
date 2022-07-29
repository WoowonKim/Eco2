import React from "react";
import styles from "./dailyMissionDetail.module.css";
import DailyEcoMissionList from "./dailyEcoMissionList";

const dailyMissionDetail = () => {
  return (
    <div>
      <div className={styles.Font}>
        <p>오늘은 어떤 도전을 해볼까?</p>
      </div>
      <span className={styles.trending}>텀블러 사용해서 지구 지키기</span>
      <div>
        <button className={styles.test} onClick={<DailyEcoMissionList />}>
          EcoMission
        </button>
        <button>CustomMission</button>
      </div>
      <div></div>
    </div>
  );
};

export default dailyMissionDetail;

import React from "react";
import styles from "./dailyMissionDetail.module.css";
import DailyEcoMissionList from "../../../components/dailyMission/missionList/dailyEcoMissionList";
import DailyCustomMissionList from "../../../components/dailyMission/missionList/dailyCustomMissionList";
import { useState } from "react";

const DailyMissionDetail = () => {
  const [list, getList] = useState(<DailyEcoMissionList />);

  const onCustom = () => {
    getList(<DailyCustomMissionList />);
  };
  const onMain = () => {
    getList(<DailyEcoMissionList />);
  };
  return (
    <div>
      <div className={styles.Font}>
        <p>오늘은 어떤 도전을 해볼까?</p>
      </div>
      <fieldset>
        <legend className={styles.word}>Trending</legend>
        <span className={styles.trending}>텀블러 사용해서 지구 지키기</span>
      </fieldset>
      <div className={styles.heading}>
        <span className={styles.basicMission} onClick={onMain}>
          {" "}
          기본
        </span>
        <span className={styles.basicMission} onClick={onCustom}>
          {" "}
          내목록{" "}
        </span>
      </div>
      <div>{list}</div>
    </div>
  );
};

export default DailyMissionDetail;

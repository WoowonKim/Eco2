import React from "react";
import styles from "./dailyMissionDetail.module.css";
import DailyEcoMissionList from "../../../components/dailyMission/missionList/dailyEcoMissionList";
import DailyCustomMissionList from "../../../components/dailyMission/missionList/dailyCustomMissionList";
import { useState } from "react";
import { useSelector } from "react-redux/es/exports";

const DailyMissionDetail = () => {
  const ecomissionList = useSelector((state) => state.dailyMission.dailyMissionList);
  const [list, getList] = useState(true);
  const [ecoArr, setEcoArr] = useState([]);

  const onArr = (eco) => {
    setEcoArr(eco);
    console.log(eco);
  };

  const onCompo = list ? <DailyEcoMissionList ecomissionList={ecomissionList} onArr={onArr} /> : <DailyCustomMissionList />;
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
        <span
          className={styles.basicMission}
          onClick={() => {
            getList(true);
          }}
        >
          {" "}
          기본
        </span>
        <span
          className={styles.basicMission}
          onClick={() => {
            getList(false);
          }}
        >
          {" "}
          내목록{" "}
        </span>
      </div>
      <div>{onCompo}</div>
    </div>
  );
};

export default DailyMissionDetail;

import React, { useState } from "react";
import { Link } from "react-router-dom";
import styles from "./dailyMission.module.css";
import { GreenBtn } from "../../../components/styled";
import { useSelector } from "react-redux";
import MissionMain from "../../../components/dailyMission/missionList/missionMain";
import { useNavigate } from "react-router-dom";
import MissionModal from "../../../components/dailyMission/missionClear/missionModal";

const DailyMissionMain = () => {
  const ecoMainList = useSelector((state) => state.missionMain.ecoMissionList);
  const ecoLength = ecoMainList.length;
  const [tCnt, setTCnt] = useState(0);
  const naviGate = useNavigate();

  const trashCnt = (trash) => {
    if (!trash) {
      setTCnt(tCnt + 1);
    } else {
      setTCnt(tCnt - 1);
    }
  };

  const onSucsses = () => {
    if (tCnt === ecoLength) {
      alert("나뭇잎 획득 메인페이지로 이동합니다.");
      naviGate("/mainFeed");
    } else {
      alert("미션을 완료하고 눌러주세요!");
    }
  };

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
        {ecoMainList.map((it) => (
          <MissionMain key={it.id} content={it.content} id={it.id} trashCnt={trashCnt} />
        ))}
      </div>
      <div className={styles.btn}>
        <GreenBtn onClick={onSucsses}>오늘 미션 보상 받기</GreenBtn>
      </div>
    </div>
  );
};

export default DailyMissionMain;

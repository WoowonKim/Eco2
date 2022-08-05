import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import styles from "./dailyMission.module.css";
import { GreenBtn } from "../../../components/styled";
import { useSelector, useDispatch } from "react-redux";
import MissionMain from "../../../components/dailyMission/missionList/missionMain";
import { useNavigate } from "react-router-dom";
import { getMission } from "../../../store/mission/missionMainSlice";
import { userInformation } from "../../../store/user/userSettingSlice";
import { getUserEmail } from "../../../store/user/common";

const DailyMissionMain = () => {
  const ecoMainList = useSelector((state) => state.missionMain.ecoMissionList);
  const ecoLength = ecoMainList.length;
  const [tCnt, setTCnt] = useState(0);
  const naviGate = useNavigate();
  const dispatch = useDispatch();
  const [id, setId] = useState(0);
  const [main, setMain] = useState([]);
  useEffect(() => {
    dispatch(userInformation({ email: getUserEmail() })).then((res) => {
      if (res.payload.status === 200) {
        dispatch(getMission({ id: res.payload.user.id })).then((res) => {
          console.log(res.payload.dailyMissionList);
          setMain(res.payload.dailyMissionList);
        });
      }
    });
  }, []);

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
        {main.map((it) => (
          <MissionMain key={it.id} content={it.mission.title} id={it.user.id} trashCnt={trashCnt} missionType={it.mission.category} missionId={it.mission.id} />
        ))}
      </div>
      <div className={styles.btn}>
        <GreenBtn onClick={onSucsses}>오늘 미션 보상 받기</GreenBtn>
      </div>
    </div>
  );
};

export default DailyMissionMain;

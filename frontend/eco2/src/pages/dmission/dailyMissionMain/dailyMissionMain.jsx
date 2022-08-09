// React
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

// Component
import { GreenBtn } from "../../../components/styled";
import MissionMain from "../../../components/dailyMission/missionItem/missionMainItem";

// Store
import { getMission, postTodayMission } from "../../../store/mission/missionMainSlice";
import { getUserId } from "../../../store/user/common";
import { getLocation } from "../../../utils";

// css
import styles from "./dailyMission.module.css";

const DailyMissionMain = () => {
  const [tCnt, setTCnt] = useState(0); // 미션 완료 시 필요한 State
  const [id, setId] = useState(0); // 서버 접속에 필요한 userid State
  const [main, setMain] = useState([]); // user가 추가한 미션을 보여주기 위한 State
  const [lat, setLat] = useState(""); // 위도를 담기 위한 State
  const [lng, setLng] = useState(""); // 경도를 담기 위한 State
  const [nowTime, setNowTime] = useState(""); // 현재 시간을 담기 위한 State
  const [todayMission, setTodayMission] = useState([]); // 추천 미션을 담기 위한 State

  const naviGate = useNavigate();
  const dispatch = useDispatch();

  /**
   * 현재 위치를 불러오기 위한 getLocation
   * setNowTime : 현재시간
   * setLat : 위도?
   * setLng : 경도?
   */
  useEffect(() => {
    getLocation().then((res) => {
      setNowTime(res.timeTwo);
      setLat(res.latitude);
      setLng(res.longitude);
    });
  });

  /**
   * 나의 미션을 불러오기 위한 getMission
   */
  useEffect(() => {
    setId(getUserId());
    dispatch(getMission({ id: getUserId() })).then((res) => {
      setMain(res.payload.dailyMissionList);
    });
  }, []);

  /**
   * 매일 추천 미션제공을 위한 postTodayMission
   */
  useEffect(() => {
    dispatch(postTodayMission({ id, lat, lng, date: nowTime })).then((res) => {
      if (res.payload?.status === 200) {
        setTodayMission(res.payload.recommendedMission);
      }
    });
  }, [id]);

  /**
   * 미션 완료 버튼 클릭 시 미션을 모두 완료 했는지 여부 확인
   */
  const trashCnt = (trash) => {
    if (!trash) {
      setTCnt(tCnt + 1);
    } else {
      setTCnt(tCnt - 1);
    }
  };

  /**
   *  미션들의 길이와 tCnt값이 동일할 경우 오늘 미션 완료로 간주.
   */
  const onSucsses = () => {
    if (tCnt === main.length + todayMission.length) {
      alert("나뭇잎 획득 메인페이지로 이동합니다.");
      naviGate("/mainTree");
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
        {todayMission.map((it) => (
          <div key={it.id}>{it.title}</div>
        ))}
      </div>

      <div>
        {main.map((it) => (
          <MissionMain
            key={it.id}
            content={it.mission.title}
            idTest={id}
            trashCnt={trashCnt}
            missionType={it.mission.category}
            missionIdTest={it.id}
            missionFlag={it.achieveFlag}
          />
        ))}
      </div>
      <div className={styles.btn}>
        <GreenBtn onClick={onSucsses}>오늘 미션 보상 받기</GreenBtn>
      </div>
    </div>
  );
};

export default DailyMissionMain;

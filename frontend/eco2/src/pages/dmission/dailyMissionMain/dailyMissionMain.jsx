// React
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

// Component
import { GreenBtn } from "../../../components/styled";
import MissionMain from "../../../components/dailyMission/missionItem/missionMainItem";
import MissionCustomItem from "../../../components/dailyMission/missionItem/missionCustomItem";
import MissionTodayItem from "../../../components/dailyMission/missionItem/missionTodayItem";

// Store
import {
  getMission,
  missionPost,
  postTodayMission,
  missionItem,
} from "../../../store/mission/missionMainSlice";
import { getUserId } from "../../../store/user/common";
import { getLocation } from "../../../utils";

// css
import styles from "./dailyMission.module.css";

const DailyMissionMain = () => {
  const [tCnt, setTCnt] = useState(0); // 미션 완료 시 필요한 State
  const [id, setId] = useState(0); // 서버 접속에 필요한 userid State

  const [main, setMain] = useState([]); // user가 추가한 미션을 보여주기 위한 State
  const [cusMain, setcusMain] = useState([]); // user가 추가한 커스텀 미션을 보여주기 위한 State
  const [todayMission, setTodayMission] = useState([]); // 추천 미션을 담기 위한 State

  const [lat, setLat] = useState(""); // 위도를 담기 위한 State
  const [lng, setLng] = useState(""); // 경도를 담기 위한 State
  const [nowTime, setNowTime] = useState(""); // 현재 시간을 담기 위한 State

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
      setcusMain(res.payload.dailyCustomMissionList);
    });
  }, []);

  /**
   * 매일 추천 미션제공을 위한 postTodayMission
   */
  useEffect(() => {
    dispatch(postTodayMission({ id, lat, lng, date: nowTime })).then((res) => {
      if (res.payload?.status === 200) {
        setTodayMission(res.payload.recommendedMission);
        //console.log("오늘의 미션 ===> ", res.payload.recommendedMission);
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
  function getToday() {
    var date = new Date();
    var year = date.getFullYear();
    var month = ("0" + (1 + date.getMonth())).slice(-2);
    var day = ("0" + date.getDate()).slice(-2);

    return year + "-" + month + "-" + day;
  }
  const toDayGet = getToday();
  // console.log(toDayGet);

  // useEffect(() => {
  //   dispatch(missionItem({ id, date: toDayGet }));
  // }, [id]);

  /**
   *  미션들의 길이와 미션 완료값이 동일할 경우 오늘 미션 완료로 간주.
   */
  //완료한 미션들의 길이를 구하기 위한 변수들
  const mainResult = main.filter((it) => it.achieveFlag === true);
  const cusMainResult = cusMain.filter((it) => it.achieveFlag === true);
  const sumClearMission = mainResult.length + cusMainResult.length;
  const sumMission = main.length + cusMain.length;

  const onSucsses = () => {
    // if (sumClearMission === sumMission) {
    //   alert(`축하합니다! 모든 미션을 완료하셨군요!\n나뭇잎 획득 메인페이지로 이동합니다.`);
    //   naviGate("/mainTree");
    // } else {
    //   alert("미션을 완료하고 눌러주세요!");
    // }
    dispatch(missionPost({ id })).then((res) => {
      if (res.payload.status === 200) {
        console.log("성공했다.");
        console.log("RES정보 ===>", res.payload);
      }
    });
  };

  useEffect(() => {
    dispatch(missionItem({ id, date: toDayGet })).then((res) => {
      if (res.payload.status === 200) {
        console.log("res.payload===>", res.payload.rewardFlag);
      }
    });
  }, [id]);

  // console.log("메인이다===>", main[0].mission.category);
  return (
    <div className={styles.headerMain}>
      <div className={styles.mainHeader}>
        <span className={styles.mainHeaderLeft}>오늘의 도전과제</span>
        <Link to="/dailymissionDetail" className={styles.mainHeaderRight}>
          <span>
            추가하기
            <i
              className={`${"fa-solid fa-circle-plus"} ${styles.mainColor}`}
            ></i>
          </span>
        </Link>
      </div>

      {/* 추천 미션 테이블에 안들어 와있으면 활성화 해야함. */}
      {/* <div>
        {todayMission.map((it) => (
          <MissionTodayItem key={it.id} content={it.title} />
        ))}
      </div> */}

      <div>
        {cusMain.map((it) => (
          <MissionCustomItem
            key={it.id}
            content={it.customMission.title}
            idTest={id}
            missionIdTest={it.id}
            missionFlag={it.achieveFlag}
            customMissionId={it.customMission.id}
          />
        ))}
      </div>

      <div>
        {main.map((it) => (
          <MissionMain
            key={it.id}
            content={it.mission.title}
            idTest={id}
            missionIdTest={it.id}
            missionFlag={it.achieveFlag}
            category={it.mission.category}
            missionId={it.mission.id}
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

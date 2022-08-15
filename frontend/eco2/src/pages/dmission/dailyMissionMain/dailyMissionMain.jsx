// React
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

// Component
import { GreenBtn } from "../../../components/styled";
import MissionMain from "../../../components/dailyMission/missionItem/missionMainItem";
import MissionCustomItem from "../../../components/dailyMission/missionItem/missionCustomItem";

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

import PostModal from "../../../components/modal/postModal/PostModal";

import PopupModal from "../../../components/popup/PopupModal";


const DailyMissionMain = () => {
  const [id, setId] = useState(getUserId()); // 서버 접속에 필요한 userid State

  const [main, setMain] = useState([]); // user가 추가한 미션을 보여주기 위한 State
  const [cusMain, setcusMain] = useState([]); // user가 추가한 커스텀 미션을 보여주기 위한 State

  const [lat, setLat] = useState("33.450701"); // 위도를 담기 위한 State
  const [lng, setLng] = useState("126.570667"); // 경도를 담기 위한 State
  const [nowTime, setNowTime] = useState(""); // 현재 시간을 담기 위한 State

  const [missionDelete, setMissionDelete] = useState(false);
  const [cusMissionDelete, setCusMissionDelete] = useState(false);
  const recommendedMission = useSelector((state) => state.missionMain.data);
  const modalOpen = useSelector((state) => state.missionMain.open);

  const [open, setOpen] = useState(false);

  const naviGate = useNavigate();
  const dispatch = useDispatch();
  function getToday() {
    var date = new Date();
    var year = date.getFullYear();
    var month = ("0" + (1 + date.getMonth())).slice(-2);
    var day = ("0" + date.getDate()).slice(-2);
    return year + "-" + month + "-" + day;
  }
  const toDayGet = getToday();
  const successBtn = useSelector(state => state.missionMain.successBtn);
  const [visible, setVisible] = useState(false);
  const [modalType, setModalType] = useState("");
  const displayType = visible ? styles.visible : styles.hidden;

  /**
   * 현재 위치를 불러오기 위한 getLocation
   * setNowTime : 현재시간
   * setLat : 위도?
   * setLng : 경도?
   */
  useEffect(() => {
    getLocation().then(res => {
      setNowTime(res.timeTwo);
      setLat(res.latitude);
      setLng(res.longitude);
    });
  }, [main]);

  /**
   * 매일 추천 미션제공을 위한 postTodayMission
   */
  useEffect(() => {
    if (id !== 0) {
      dispatch(postTodayMission({ id: id, lat, lng, date: nowTime })).then(
        res => {
          if (res.payload?.status === 200) {
            if (id !== 0) {
              dispatch(getMission({ id: getUserId() })).then(res => {
                setMain(res.payload.dailyMissionList);
                setcusMain(res.payload.dailyCustomMissionList);
              });
            }
            setOpen(modalOpen);
          }
        }
      );
    }
  }, [id, missionDelete, cusMissionDelete]);

  /**
   *  미션들의 길이와 미션 완료값이 동일할 경우 오늘 미션 완료로 간주.
   */
  const mainResult = main.filter(it => it.achieveFlag === true);
  const cusMainResult = cusMain.filter(it => it.achieveFlag === true);
  const sumClearMission = mainResult.length + cusMainResult.length;
  const sumMission = main.length + cusMain.length;

  /**
   * false이면 오늘 미션 보상받기 활성화
   * true 이면 오늘 미션 보상받기 비 활성화
   */
  useEffect(() => {
    dispatch(missionItem({ id: id, date: toDayGet }));
  }, []);

  const onSucsses = () => {
    if (sumClearMission === sumMission) {
      alert(
        `축하합니다! 모든 미션을 완료하셨군요!\n나뭇잎 획득 메인페이지로 이동합니다.`
      );
      dispatch(missionPost({ id })).then(res => {
        dispatch(missionItem({ id, date: toDayGet }));
      });
      naviGate("/mainTree");
    } else {
      alert("미션을 완료하고 눌러주세요!");
    }
  };

  //console.log("main ===>", main);
  // console.log("cusMain===>", cusMain);

  return (
    <div className={styles.headerMain}>
      {successBtn ? (
        <div className={styles.mainHeader}>
          <span className={styles.mainHeaderLeft}>오늘의 도전과제</span>
          <span className={styles.mainHeaderRight}>
            추가하기
            <i
              className={`${"fa-solid fa-circle-plus"} ${styles.mainColor}`}
            ></i>
          </span>
        </div>
      ) : (
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
      )}
      <div>
        {cusMain.map(it => (
          <MissionCustomItem
            key={it.id}
            content={it.customMission.title}
            idTest={id}
            missionIdTest={it.id}
            missionFlag={it.achieveFlag}
            category={it.customMission.category}
            customMissionId={it.customMission.id}
            cusMissionDelete={cusMissionDelete}
            setCusMissionDelete={setCusMissionDelete}
          />
        ))}
      </div>

      <div>
        {main.map(it => (
          <MissionMain
            key={it.id}
            content={it.mission.title}
            idTest={id}
            missionIdTest={it.id}
            missionFlag={it.achieveFlag}
            category={it.mission.category}
            missionId={it.mission.id}
            missionDelete={missionDelete}
            setMissionDelete={setMissionDelete}
          />
        ))}
      </div>

      <div className={styles.btn}>
        {successBtn ? (
          <GreenBtn>오늘 미션 보상 완료!</GreenBtn>
        ) : (
          <div>
            {sumClearMission !== sumMission ? (
              <GreenBtn>미션완료시 눌러주세요 :)</GreenBtn>
            ) : (
              <GreenBtn
                onClick={() => {
                  setVisible(!visible);
                  setModalType("미션등록");
                }}
                // onClick={onSucsses}
              >
                오늘 미션 보상 받기
              </GreenBtn>
            )}
          </div>
        )}
        {visible && modalType === "미션등록" && (
          <PostModal
            className={`${displayType}`}
            title={"오늘 미션 완료!"}
            content={"클릭 시 오늘 미션은 추가가 안됩니다!"}
            type={"미션등록"}
            successId={id}
            toDayGet={toDayGet}
          />
        )}
      </div>
      <button
        onClick={() => {
          setOpen(true);
        }}
      >
        열려라
      </button>
      {recommendedMission && (
        <PopupModal
          open={open}
          setOpen={setOpen}
          recommendedMission={recommendedMission}
        ></PopupModal>
      )}
    </div>
  );
};

export default DailyMissionMain;

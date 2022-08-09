// React
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux/es/exports";

// Store
import { deleteMission, clearMission } from "../../../store/mission/missionMainSlice";

// CSS
import styles from "./dailyMission.module.css";

const MissionMain = ({ idTest, content, trashCnt, missionIdTest, missionFlag }) => {
  const [trash, setTrash] = useState(true); // 미션 인증 완료 시 쓰레기통 변화 하는 State
  const [doitMission, setDoitMission] = useState(true); // 미션 인증 하기 위한 State
  const [clearMissionT, setClearMission] = useState(false); // 미션 인증 완료 시 동그라미 색 변화 State

  const clearMissionType = !clearMissionT ? "fa-regular fa-circle" : "fa-solid fa-circle"; // 미션 인증 색 변화
  const flagType = missionFlag ? "fa-solid fa-circle" : "fa-regular fa-circle"; // 미션 인증 색 변화
  const trashType = trash ? styles.greenTrash : styles.whiteTrash; // 쓰레기통 색 변화

  const naviGate = useNavigate();
  const dispatch = useDispatch();

  /**
   * user 추가 미션 삭제 클릭 시 삭제를 위한 함수
   */
  const onDeleButton = () => {
    if (window.confirm("미션을 삭제 하시겠습니까?")) {
      dispatch(deleteMission({ id: idTest, missionId: missionIdTest }));
      alert("삭제 완료!");
      window.location.replace("/dailymissionMain");
    } else {
      alert("포기하지 말고 화이팅!");
    }
  };

  /**
   * 미션 완료 동그라미 클릭 시 인증게시글 이동하기 위한 함수.
   */
  const boolCheck = () => {
    console.log(doitMission);
    if (doitMission) {
      if (window.confirm("미션완료!! 인증게시글 업로드 하시겠어요?")) {
        naviGate("/post");
      } else {
        alert("인증게시글 업로드도 부탁해요 ㅠㅠ!");
      }
    }
  };

  /**
   * 동그라미 클릭 시 미션 완료 플래그 변환을 위한 함수
   */
  const onClear = (idTest, missionIdTest) => {
    dispatch(clearMission({ id: idTest, missionId: missionIdTest }));
  };

  return (
    <div>
      <div className={styles.mainList}>
        <i
          className={`${flagType} ${clearMissionType}`}
          onClick={() => {
            onClear(idTest, missionIdTest);
            setClearMission(!clearMissionT);
            setDoitMission(!doitMission);
            setTrash(!trash);
            trashCnt(!trash);
            boolCheck();
          }}
        ></i>
        <span>{content}</span>
        <i className={`${"fa-solid fa-trash-can"} ${trashType}`} onClick={onDeleButton}></i>
      </div>
    </div>
  );
};

export default MissionMain;

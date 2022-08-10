import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux/es/exports";

//Store
import { deleteMission, clearMission } from "../../../store/mission/missionMainSlice";

// CSS
import styles from "./dailyMission.module.css";

const MissionCustomItem = ({ idTest, content, missionIdTest, missionFlag }) => {
  const flagType = missionFlag ? "fa-solid fa-circle" : "fa-regular fa-circle"; // 미션 인증 색 변화
  const realTrashType = missionFlag ? styles.greenTrash : styles.greenTrash; // 미션 여부에 따른 쓰레기통

  const naviGate = useNavigate();
  const dispatch = useDispatch();

  /**
   * user 추가 미션 삭제 클릭 시 삭제를 위한 함수
   */
  const onDeleButton = () => {
    if (!missionFlag) {
      if (window.confirm("미션 목록을 변경하시겠습니까?")) {
        dispatch(deleteMission({ id: idTest, missionId: missionIdTest }));
        alert("이동 완료!");
        window.location.replace("/dailymissionMain");
      } else {
        alert("포기하지 말고 화이팅!");
      }
    } else {
      alert("커스텀 미션 목록으로 변경 합니다!");
      dispatch(deleteMission({ id: idTest, missionId: missionIdTest }));
      //alert("미션 완료시 삭제 불가합니다!");
    }
  };

  /**
   * 미션 완료 동그라미 클릭 시 인증게시글 이동하기 위한 함수.
   */
  const boolCheck = () => {
    if (!missionFlag) {
      if (window.confirm("미션완료!! 인증게시글 업로드 하시겠어요?")) {
        dispatch(clearMission({ id: idTest, missionId: missionIdTest }));
        naviGate("/post", { customId: idTest });
      } else {
        alert("인증게시글 업로드시 완료 인증됩니다!!");
      }
    } else {
      alert("완료한 미션입니다!");
    }
  };

  return (
    <div>
      <div className={styles.mainList}>
        <i
          className={`${flagType}`}
          onClick={() => {
            boolCheck(idTest, missionIdTest);
          }}
        ></i>
        <span>{content}</span>
        <i className={`${"fa-solid fa-trash-can"} ${realTrashType}`} onClick={onDeleButton}></i>
      </div>
    </div>
  );
};

export default MissionCustomItem;

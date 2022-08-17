import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux/es/exports";

//Store
import {
  deleteMission,
  clearMission,
} from "../../../store/mission/missionMainSlice";

// CSS
import styles from "./dailyMission.module.css";
import PostModal from "../../modal/postModal/PostModal";

const MissionCustomItem = ({
  idTest,
  content,
  missionIdTest,
  missionFlag,
  category,
  customMissionId,
  cusMissionDelete,
  setCusMissionDelete,
}) => {
  const flagType = missionFlag ? "fa-solid fa-circle" : "fa-regular fa-circle"; // 미션 인증 색 변화
  const realTrashType = missionFlag ? styles.greenTrash : styles.greenTrash; // 미션 여부에 따른 쓰레기통

  const naviGate = useNavigate();
  const dispatch = useDispatch();
  const [visible, setVisible] = useState(false);
  const [modalType, setModalType] = useState("");
  const displayType = visible ? styles.visible : styles.hidden;

  /**
   * user 추가 미션 삭제 클릭 시 삭제를 위한 함수
   */
  const onDeleButton = () => {
    if (!missionFlag) {
      if (window.confirm("커스텀 미션 목록으로 이동하시겠습니까?")) {
        dispatch(deleteMission({ id: idTest, missionId: missionIdTest })).then(
          res => {
            setCusMissionDelete(!cusMissionDelete);
          }
        );
      } else {
        alert("포기하지 말고 화이팅!");
      }
    } else {
      alert("완료 시 이동 불가합니다!");
    }
  };

  /**
   * 미션 완료 동그라미 클릭 시 인증게시글 이동하기 위한 함수.
   */
  const boolCheck = () => {
    if (!missionFlag) {
      if (window.confirm("미션완료!! 인증게시글 업로드 하시겠어요?")) {
        dispatch(clearMission({ id: idTest, missionId: missionIdTest }));
        naviGate("/post", { state: { customId: customMissionId } });
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
        {missionFlag ? (
          <img
            src={process.env.PUBLIC_URL + `/tree_leaves/Leaf${category}.png`}
            className={styles.leafSize}
          ></img>
        ) : (
          <i
            className={`${"fa-regular fa-circle"} ${styles.circleType}`}
            onClick={() => {
              // boolCheck(idTest, missionIdTest);
              setVisible(!visible);
              setModalType("미션완료");
            }}
          ></i>
        )}
        <span className={styles.itemContent}>{content}</span>
        <i
          className={`${"fa-solid fa-trash-can"} ${realTrashType} ${
            styles.trashType
          }`}
          onClick={() => {
            setVisible(!visible);
            setModalType("미션삭제");
          }}
        ></i>
      </div>
      {visible && modalType === "미션완료" && (
        <PostModal
          className={`${displayType}`}
          title={"인증 게시글 이동"}
          content={"게시글 미 작성시 나뭇잎 획득이 불가합니다!"}
          type={"미션완료"}
          missionId={missionId}
          missionIdTest={missionIdTest}
        />
      )}
      {visible && modalType === "미션삭제" && (
        <PostModal
          className={`${displayType}`}
          title={"미션 삭제"}
          content={"미션 삭제시 미션 목록으로 이동합니다."}
          type={"미션삭제"}
          idTest={idTest}
          missiondeleteIdTest={missionIdTest}
          setMissionDelete={setMissionDelete}
          missionDelete={missionDelete}
        />
      )}
    </div>
  );
};

export default MissionCustomItem;

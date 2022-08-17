import React, { useState } from "react";

// CSS
import styles from "./dailyMission.module.css";
import PostModal from "../../modal/postModal/PostModal";

const MissionCustomItem = ({
  idTest,
  content,
  missionIdTest,
  missionFlag,
  category,
  cusMissionDelete,
  setCusMissionDelete,
  customMissionId,
}) => {
  const realTrashType = missionFlag ? styles.whiteTrash : styles.greenTrash; // 미션 여부에 따른 쓰레기통

  const [visible, setVisible] = useState(false);
  const [modalType, setModalType] = useState("");
  const displayType = visible ? styles.visible : styles.hidden;

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
              setVisible(!visible);
              setModalType("커스텀 미션완료");
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
            setModalType("내목록이동");
          }}
        ></i>
      </div>
      {visible && modalType === "커스텀 미션완료" && (
        <PostModal
          className={`${displayType}`}
          title={"인증 게시글 이동"}
          content={"게시글 미 작성시 나뭇잎 획득이 불가합니다!"}
          type={"커스텀 미션완료"}
          customMissionId={customMissionId}
          missionIdTest={missionIdTest}
        />
      )}
      {visible && modalType === "내목록이동" && (
        <PostModal
          className={`${displayType}`}
          title={"내목록이동 삭제"}
          content={"내 미션 목록으로 이동합니다."}
          type={"내목록이동"}
          customidTest={idTest}
          custommissiondeleteIdTest={missionIdTest}
          setCusMissionDelete={setCusMissionDelete}
          cusMissionDelete={cusMissionDelete}
        />
      )}
    </div>
  );
};

export default MissionCustomItem;

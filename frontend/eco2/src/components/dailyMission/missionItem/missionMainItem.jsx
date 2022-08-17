// React
import React, { useState } from "react";

// Store
import PostModal from "../../modal/postModal/PostModal";

// CSS
import styles from "./dailyMission.module.css";

const MissionMain = ({ idTest, content, missionIdTest, missionFlag, category, missionId, missionDelete, setMissionDelete }) => {
  const realTrashType = missionFlag ? styles.whiteTrash : styles.greenTrash; // 미션 여부에 따른 쓰레기통

  const [visible, setVisible] = useState(false);
  const [modalType, setModalType] = useState("");
  const displayType = visible ? styles.visible : styles.hidden;

  return (
    <div>
      <div className={styles.mainList}>
        {missionFlag ? (
          <img src={process.env.PUBLIC_URL + `/tree_leaves/Leaf${category}.png`} className={styles.leafSize}></img>
        ) : (
          <i
            className={`${"fa-regular fa-circle"} ${styles.circleType}`}
            onClick={() => {
              setVisible(!visible);
              setModalType("미션완료");
            }}
          ></i>
        )}
        <span className={styles.itemContent}>{content}</span>
        <i
          className={`${"fa-solid fa-trash-can"} ${realTrashType} ${styles.trashType}`}
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

export default MissionMain;

import React from "react";
import styles from "./custom.module.css";
const NotZeroCustom = ({
  content,
  cosId,
  onDelete,
  onCusMission,
  id,
  category,
}) => {
  return (
    <div>
      <div>
        <img
          src={process.env.PUBLIC_URL + `/tree_leaves/Leaf${category}.png`}
          className={styles.leafSize}
        ></img>
        <span>{content}</span>
        {/* <button
          onClick={() => {
            onDelete(cosId);
          }}
        >
          삭제
        </button>
        <button
          onClick={() => {
            onCusMission(id, cosId);
          }}
        >
          저장
        </button> */}
        <div>
          <i
            className={`${"fa-solid fa-plus"} ${styles.favoriteadd}`}
            onClick={() => {
              const faId = it.id;
              favoMissionSub(id, faId);
            }}
          ></i>
          <i
            className={`${"fa-solid fa-trash-can"} ${styles.favoritetrash}`}
            onClick={() => {
              const faId = it.id;
              onDeleButton(id, favoriteBoolean, faId, favoriteTrue);
            }}
          ></i>
        </div>
      </div>
    </div>
  );
};

export default NotZeroCustom;

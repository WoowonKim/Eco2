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
              onCusMission(id, cosId);
            }}
          ></i>
          <i
            className={`${"fa-solid fa-trash-can"} ${styles.favoritetrash}`}
            onClick={() => {
              onDelete(cosId);
            }}
          ></i>
        </div>
      </div>
    </div>
  );
};

export default NotZeroCustom;

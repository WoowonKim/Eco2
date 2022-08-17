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
      <div className={styles.content}>
        <img
          src={process.env.PUBLIC_URL + `/tree_leaves/Leaf${category}.png`}
          className={styles.leafSize}
        ></img>
        <span className={styles.itemFont}>{content}</span>
        {/* 모달 */}
        <div className={styles.dropdown}>
          <i className={`fa-solid fa-ellipsis-vertical ${styles.icon}`}></i>
          <div className={styles.dropdownContent}></div>
        </div>
        {/* <div className={styles.itemIcon}>
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
        </div> */}
      </div>
    </div>
  );
};

export default NotZeroCustom;

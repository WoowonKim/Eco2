import React, { useState } from "react";
import styles from "./custom.module.css";
import PostModal from "../../modal/postModal/PostModal";
const NotZeroCustom = ({
  content,
  cosId,
  onDelete,
  onCusMission,
  id,
  category,
}) => {
  const [visible, setVisible] = useState(false);
  const [modalType, setModalType] = useState("");
  const displayType = visible ? styles.visible : styles.hidden;
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
          <div className={styles.dropdownContent}>
            <button
              onClick={() => {
                setVisible(!visible);
                setModalType("삭제");
              }}
              className={styles.dropdownItem}
            >
              옮기기
              <i
                className={`fa-solid fa-right-to-bracket ${styles.dropdownIcon}`}
              ></i>
            </button>
            <button
              onClick={() => {
                setVisible(!visible);
                setModalType("삭제");
              }}
              className={styles.dropdownItem}
            >
              삭제
              <i className={`fa-solid fa-trash-can ${styles.dropdownIcon}`}></i>
            </button>
          </div>
        </div>
        {visible && modalType === "삭제" && (
          <PostModal
            className={`${displayType}`}
            title={"게시물 삭제"}
            content={"게시물을 삭제하시겠습니까?"}
            type={"삭제"}
            postId={feedItem.id}
            closeModal={() => setVisible(!visible)}
          />
        )}
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

import React, { useState } from "react";
import styles from "./custom.module.css";
import PostModal from "../../modal/postModal/PostModal";
import PostzeroModal from "../../modal/postModal/PostzeroModal";
const NotZeroCustom = ({
  content,
  cosId,
  onDelete,
  onCusMission,
  id,
  category,
  setCusDelete,
  cusDelete,
  setCusSubmit,
  cusSubmit,
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
                setModalType("옮기기");
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
            title={"나만의 미션 삭제"}
            content={"미션을 삭제하시겠습니까?"}
            type={"삭제"}
            cosId={cosId}
            closeModal={() => setVisible(!visible)}
            setCusDelete={setCusDelete}
            cusDelete={cusDelete}
          />
        )}
        {visible && modalType === "옮기기" && (
          <PostModal
            className={`${displayType}`}
            title={"오늘할 미션으로 옮기기"}
            content={"다음날 다시 내 미션목록으로 돌아옵니다!"}
            type={"옮기기"}
            cosId={cosId}
            userID={id}
            closeModal={() => setVisible(!visible)}
            setCusSubmit={setCusSubmit}
            cusSubmit={cusSubmit}
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

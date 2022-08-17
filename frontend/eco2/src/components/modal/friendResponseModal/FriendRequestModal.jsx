import React, { useEffect } from "react";
import styles from "./friendRequestModal.module.css";

const FriendRequestModal = ({ title, content, accept, acceptArgs, closeModal }) => {
  useEffect(() => {
    document.body.style = `overflow: hidden`;
    return () => (document.body.style = `overflow: auto`);
  }, []);
  return (
    <div className={`${styles.modal}`} onClick={closeModal}>
      <div onClick={(e) => e.stopPropagation()} className={styles.modalBody}>
        <div className={styles.modalTitle}>
          <i className={`fa-solid fa-circle-exclamation ${styles.deleteIcon}`}></i>
          <h2 className={styles.title}>{title}</h2>
        </div>
        <p className={styles.content}>{content}</p>
        <div className={styles.buttonGroup}>
          <button
            onClick={() => {
              closeModal();
              accept(acceptArgs);
              document.body.style = `overflow: auto`;
            }}
            className={`${styles.button} ${styles.acceptButton}`}
          >
            확인
          </button>
          <button
            onClick={() => {
              document.body.style = `overflow: auto`;
              closeModal();
            }}
            className={`${styles.button} ${styles.cancleButton}`}
          >
            취소
          </button>
        </div>
      </div>
    </div>
  );
};

export default FriendRequestModal;

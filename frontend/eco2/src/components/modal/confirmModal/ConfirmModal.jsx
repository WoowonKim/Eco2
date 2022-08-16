import React, { useEffect, useState } from "react";
import styles from "./ConfirmModal.module.css";
const ConfirmModal = ({ type, title, content, closeModal }) => {
  const [hidden, setHidden] = useState(false);
  const displayType = hidden ? styles.hidden : null;

  useEffect(() => {
    document.body.style = `overflow: hidden`;
    return () => (document.body.style = `overflow: auto`);
  }, []);
  return (
    <div className={`${displayType} ${styles.modal}`} onClick={closeModal}>
      <div onClick={(e) => e.stopPropagation()} className={styles.modalBody}>
        <div className={styles.modalTitle}>
          <i
            className={`fa-solid fa-circle-exclamation ${styles.deleteIcon}`}
          ></i>
          <h2 className={styles.title}>{title}</h2>
        </div>
        <p className={styles.content}>{content}</p>
        <div className={styles.buttonGroup}>
          <button
            onClick={() => {
              closeModal();
              document.body.style = `overflow: auto`;
            }}
            className={`${styles.cancleButton}`}
          >
            닫기
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;

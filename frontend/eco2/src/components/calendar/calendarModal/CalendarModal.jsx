import React, { useEffect, useState } from "react";
import styles from "./CalendarModal.module.css";

const CalendarModal = ({ calendarId, month, day, closeModal }) => {
  const [hidden, setHidden] = useState(false);
  const displayType = hidden ? styles.hidden : null;
  // const navigate = useNavigate();

  useEffect(() => {
    document.body.style = `overflow: hidden`;
    return () => (document.body.style = `overflow: auto`);
  }, []);
  console.log(calendarId);
  return (
    <div className={`${displayType} ${styles.modal}`} onClick={closeModal}>
      <div onClick={(e) => e.stopPropagation()} className={styles.modalBody}>
        <div className={styles.header}>
          <div className={styles.date}>
            <p className={styles.text}>
              {month}월 {day}일
            </p>
          </div>
          <div className={styles.iconGroup}>
            <i className={`fa-solid fa-share-nodes ${styles.icon}`}></i>
            <i className={`fa-solid fa-cloud-arrow-down ${styles.icon}`}></i>
          </div>
        </div>
        <img
          src={`http://localhost:8002/img/reward/${calendarId}`}
          alt="rewardImg"
          className={styles.img}
        />
        <div className={styles.buttonGroup}>
          <button
            onClick={() => {
              setHidden(true);
              document.body.style = `overflow: auto`;
              closeModal();
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

export default CalendarModal;

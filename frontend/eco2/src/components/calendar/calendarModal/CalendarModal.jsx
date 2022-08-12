import React, { useEffect, useState } from "react";
import styles from "./CalendarModal.module.css";

const CalendarModal = ({ calendarId, month, day, closeModal }) => {
  const [hidden, setHidden] = useState(false);
  const displayType = hidden ? styles.hidden : null;
  // const navigate = useNavigate();

  const download = (e) => {
    // 이미지가 저장이 될 때도 있고 안 될 때도 있음
    // 거의 안되는 듯,,,ㅎㅎ

    console.log(e.target.href);
    fetch(e.target.href, {
      method: "GET",
      headers: {},
    })
      .then((response) => {
        console.log(response);
        response.arrayBuffer().then(function (buffer) {
          console.log(buffer);
          const url = window.URL.createObjectURL(new Blob([buffer]));
          const link = document.createElement("a");
          link.href = url;
          link.setAttribute("download", `${month}_${day}_reward.jpg`);
          document.body.appendChild(link);
          link.click();
        });
      })
      .catch((err) => console.log(err));
    //   const element = document.createElement("a");
    //   const file = new Blob([`http://localhost:8002/img/reward/${calendarId}`], {
    //     type: "image/*",
    //   });
    //   element.href = URL.createObjectURL(file);
    //   element.download = `${month}_${day}_reward.jpg`;
    //   element.click();
  };

  useEffect(() => {
    document.body.style = `overflow: hidden`;
    return () => (document.body.style = `overflow: auto`);
  }, []);
  console.log(day);
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
            <a
              href={`http://localhost:8002/img/reward/${calendarId}`}
              onClick={(e) => {
                download(e);
              }}
            >
              <i className={`fa-solid fa-share-nodes ${styles.icon}`}></i>
            </a>
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

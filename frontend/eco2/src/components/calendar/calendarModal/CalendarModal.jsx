import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./CalendarModal.module.css";
import { getUserId } from "../../../store/user/common";

const CalendarModal = ({ calendarId, month, day, closeModal }) => {
  const [hidden, setHidden] = useState(false);
  const displayType = hidden ? styles.hidden : null;
  const navigate = useNavigate();

  const download = (e) => {
    // e.preventClcik();
    fetch(e.target.href, {
      method: "GET",
      headers: {},
    })
      .then((response) => {
        response.arrayBuffer().then(function (buffer) {
          const url = window.URL.createObjectURL(new Blob([buffer]));
          const link = document.createElement("a");
          link.href = url;
          link.setAttribute("download", `${month}_${day}_reward.png`);
          document.body.appendChild(link);
          link.click();
        });
      })
      .catch((err) => console.log(err));
    // const element = document.createElement("a");
    // const file = new Blob([`http://localhost:8002/img/reward/${calendarId}`], {
    //   type: "image/*",
    // });
    // element.href = URL.createObjectURL(file);
    // element.download = `${month}_${day}_reward.png`;
    // element.click();
  };
  // const file = URL.createObjectURL(
  //   new Blob([`http://localhost:8002/img/reward/${calendarId}`], {
  //     type: "image/*",
  //   })
  // );

  // useEffect(() => {
  //   shareKakao()
  // }, []);
  const shareKakao = () => {
    if (window.Kakao) {
      const kakao = window.Kakao;

      if (!kakao.isInitialized()) {
        kakao.init(process.env.REACT_APP_KAKAO_JAVASCRIPT_KEY);
      }

      kakao.Link.sendDefault({
        objectType: "feed",
        content: {
          title: "미션 보상 완료",
          description: "오늘의 미션 완료를 축하드립니다 :D",
          imageUrl: `http://localhost:8002/img/reward/${calendarId}`,
          link: {
            mobileWebUrl: `http://localhost:3000/profile/${getUserId()}`,
            webUrl: `http://localhost:3000/profile/${getUserId()}`,
          },
        },
      });
    }
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
              // href={file}
              onClick={(e) => {
                download(e);
                // console.log(file);
              }}
              // type="jpg"
              // target="_self"
              // download={`${month}_${day}_reward.png`}
            >
              <i className={`fa-solid fa-cloud-arrow-down ${styles.icon}`}></i>
            </a>
            <i
              className={`fa-solid fa-share-nodes ${styles.icon}`}
              onClick={shareKakao}
            ></i>
          </div>
        </div>
        <img
          src={`http://localhost:8002/img/reward/${calendarId}`}
          alt="rewardImg"
          className={styles.img}
        />
        {/* <div className={styles.buttonGroup}>
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
        </div> */}
      </div>
    </div>
  );
};

export default CalendarModal;

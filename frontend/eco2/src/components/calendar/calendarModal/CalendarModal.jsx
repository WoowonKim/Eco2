import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./CalendarModal.module.css";
import { getUserId } from "../../../store/user/common";
import axiosService from "../../../store/axiosService";

const CalendarModal = ({ calendarId, month, day, closeModal }) => {
  const [hidden, setHidden] = useState(false);
  const [imgUrl, setImgUrl] = useState("");
  const displayType = hidden ? styles.hidden : null;
  const navigate = useNavigate();

  const download = () => {
    axiosService({
      url: `http://localhost:8002/img/reward/${calendarId}`,
      method: "GET",
      responseType: "blob",
    }).then((res) => {
      const url = window.URL.createObjectURL(new Blob([res.data]));
      const link = document.createElement("a");
      link.href = url;
      setImgUrl(url);
      link.setAttribute("download", "image.jpg");
      document.body.appendChild(link);
      link.click();
    });
  };

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
          imageUrl: imgUrl,
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
            <a onClick={download}>
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

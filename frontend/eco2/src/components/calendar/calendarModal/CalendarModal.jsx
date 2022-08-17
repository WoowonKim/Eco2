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
      url: `${process.env.REACT_APP_BE_HOST}img/reward/${calendarId}`,
      method: "GET",
      responseType: "blob",
    }).then((res) => {
      const url = window.URL.createObjectURL(new Blob([res.data]));
      const link = document.createElement("a");
      link.href = url;
      setImgUrl(new Blob([res.data]));
      link.setAttribute("download", `${month}_${day}_rewardImage.jpg`);
      document.body.appendChild(link);
      link.click();
    });
  };

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
          imageUrl: `${process.env.REACT_APP_BE_HOST}img/reward/${calendarId}`,
          link: {
            mobileWebUrl: `${process.env.REACT_APP_BE_HOST}profile/${getUserId()}`,
            webUrl: `${process.env.REACT_APP_BE_HOST}profile/${getUserId()}`,
          },
        },
      });
    }
  };
  useEffect(() => {
    document.body.style = `overflow: hidden`;
    return () => (document.body.style = `overflow: auto`);
  }, []);
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
            <i className={`fa-solid fa-share-nodes ${styles.icon}`} onClick={shareKakao}></i>
          </div>
        </div>
        <img src={`${process.env.REACT_APP_BE_HOST}img/reward/${calendarId}`} alt="rewardImg" className={styles.img} />
      </div>
    </div>
  );
};

export default CalendarModal;

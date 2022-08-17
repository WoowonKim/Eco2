import React, { useEffect } from "react";
import { useRef } from "react";
import styles from "./PopupModal.module.css";
const PopupModal = ({ recommendedMission, open, setOpen, weather }) => {
  let modal = useRef();
  useEffect(() => {}, []);
  return (
    <div ref={modal} className={weather !== null && open ? `${styles.popup} ${styles.center} ${styles.active}` : `${styles.popup} ${styles.center}`}>
      <div className={styles.icon}>
        <i className={`fa fa-check ${styles.fa}`}></i>
      </div>
      <div className={styles.title}>오늘의 추천 도전 목록!</div>
      {weather.sunny === 1 ? (
        <h4>오늘 날씨가 맑아요! 이런 미션 어때요?</h4>
      ) : weather.sunny === 2 ? (
        <h4>오늘은 비가 올 수도 있어요... 이런 미션 어때요?</h4>
      ) : weather.temperature === 4 ? (
        <h4>오늘은 좀 덥네요 이런 미션 어때요?</h4>
      ) : weather.temperature === 1 ? (
        <h4>오늘은 좀 춥네요 이런미션 어때요?</h4>
      ) : null}
      {recommendedMission.map((mission, i) => {
        return (
          <div className={styles.description} key={i}>
            {mission.title}
          </div>
        );
      })}
      <div className={styles.dismissBtn}>
        <button
          id="dismiss-popup-btn"
          onClick={() => {
            setOpen(false);
          }}
        >
          확인
        </button>
      </div>
    </div>
  );
};

export default PopupModal;

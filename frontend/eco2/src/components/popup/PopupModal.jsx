import React, { useEffect } from "react";
import { useRef } from "react";
import { useDispatch } from "react-redux";
import { changeOpenFlag } from "../../store/mission/missionMainSlice";
import styles from "./PopupModal.module.css";
const PopupModal = ({ recommendedMission, open, setOpen }) => {
  let modal = useRef();
  let dispatch = useDispatch();
  useEffect(() => {}, []);
  return (
    <div
      ref={modal}
      className={
        open
          ? `${styles.popup} ${styles.center} ${styles.active}`
          : `${styles.popup} ${styles.center}`
      }
    >
      <div className={styles.icon}>
        <i className={`fa fa-check ${styles.fa}`}></i>
      </div>
      <div className={styles.title}>오늘의 추천 도전 목록!</div>
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

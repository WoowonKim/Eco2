import React from "react";
import styles from "./Profile.module.css";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const navigate = useNavigate();
  return (
    <div>
      <div className={styles.calender}>달력</div>
      <div className={styles.userInfo}>
        <div className={styles.user}>
          <p>UserName</p>
          <button
            onClick={() => navigate("/user/settings")}
            className={styles.button}
          >
            <i className={`fa-solid fa-gear ${styles.settingIcon}`}></i>
          </button>
        </div>
        <div className={styles.friend}>
          <button
            onClick={() => navigate("/user/friends")}
            className={styles.button}
          >
            <i className={`fa-solid fa-users ${styles.friendIcon}`}></i>
          </button>
          30
        </div>
      </div>
      <div className={styles.missionList}>
        <div className={styles.missionTitle}>
          <p className={styles.dailyText}>데일리</p>
          <hr className={styles.line} />
        </div>
        <div className={styles.missionTitle}>
          <p className={styles.questText}>퀘스트</p>
          <hr className={styles.line} />
        </div>
      </div>
    </div>
  );
};

export default Profile;

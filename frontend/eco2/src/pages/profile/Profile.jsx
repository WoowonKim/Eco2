import React, { useEffect, useState } from "react";
import styles from "./Profile.module.css";
import {
  getUserName,
  setUserName,
  getUserEmail,
} from "../../store/user/common";
import { useNavigate } from "react-router-dom";
import { userInformation } from "../../store/user/userSettingSlice";
import { useDispatch } from "react-redux";

const Profile = () => {
  const [socialType, setSocialType] = useState(0);
  const [userId, setUserId] = useState(0);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const email = getUserEmail();

  useEffect(() => {
    // 유저 객체 받아오기
    dispatch(userInformation({ email })).then((res) => {
      setUserId(res.payload.user.id);
      setSocialType(res.payload.user.socialType);
      if (res.payload.user.name) {
        setUserName(res.payload.user.name);
      } else if (getUserName()) {
        setUserName(getUserName());
      } else {
        navigate("/");
      }
    });
  }, []);
  return (
    <div>
      <div className={styles.calender}>달력</div>
      <div className={styles.userInfo}>
        <div className={styles.user}>
          <p>UserName</p>
          <button
            onClick={() =>
              navigate("/user/settings", {
                state: { socialType: socialType, name: getUserName() },
              })
            }
            className={styles.button}
          >
            <i className={`fa-solid fa-gear ${styles.settingIcon}`}></i>
          </button>
        </div>
        <div className={styles.friend}>
          <button
            onClick={() => navigate("/user/friends", { state: userId })}
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

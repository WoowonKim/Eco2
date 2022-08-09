import React, { useEffect, useState } from "react";
import styles from "./Profile.module.css";
import { getUserName, getUserEmail, getUserId } from "../../store/user/common";
import { useNavigate } from "react-router-dom";
import { userInformation } from "../../store/user/userSettingSlice";
import { useDispatch } from "react-redux";
import Calendar from "../../components/calendar/calendar/Calendar";
import { profileImg } from "../../store/img/imgSlice";
// import { test } from "../../store/user/accountSlice";

const Profile = () => {
  const [userSetting, setUserSetting] = useState(1);
  const [socialType, setSocialType] = useState(0);
  const [userId, setUserId] = useState(0);
  const [imgSrc, setImgSrc] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const email = getUserEmail();

  const displayType = userSetting === 1 ? styles.selectedMenu : null;
  const displayType2 = userSetting === 2 ? styles.selectedMenu : null;

  useEffect(() => {
    // 유저 객체 받아오기
    dispatch(userInformation({ email })).then((res) => {
      setUserId(getUserId());
      setSocialType(res.payload.user.socialType);
    });
  }, []);
  return (
    <div className={styles.container}>
      <Calendar id={userId} />
      <div className={styles.userInfo}>
        {/* <button
          onClick={() => {
            dispatch(test({ id: userId }));
          }}
        >
          test
        </button> */}
        <div className={styles.user}>
          <img
            src={`http://localhost:8002/img/profile/${userId}`}
            alt="profileImg"
            className={styles.profileImg}
          />
          <p>{getUserName()}</p>
          <button
            onClick={() =>
              navigate("/user/settings", {
                state: { socialType: socialType, name: getUserName(), userId },
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
        <div onClick={() => setUserSetting(1)} className={styles.missionTitle}>
          <p className={`${styles.dailyText} ${displayType}`}>데일리</p>
          {userSetting === 1 && <hr className={styles.line} />}
        </div>
        <div onClick={() => setUserSetting(2)} className={styles.missionTitle}>
          <p className={`${styles.questText} ${displayType2}`}>퀘스트</p>
          {userSetting === 2 && <hr className={styles.line} />}
        </div>
      </div>
    </div>
  );
};

export default Profile;

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
  const [missionList, setMissionList] = useState([]);
  const [questList, setQuestList] = useState([]);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const email = getUserEmail();

  const displayType = userSetting === 1 ? styles.selectedMenu : null;
  const displayType2 = userSetting === 2 ? styles.selectedMenu : null;

  useEffect(() => {
    // 유저 객체 받아오기
    dispatch(userInformation({ email })).then((res) => {
      setUserId(getUserId());
      setMissionList(res.payload.postList);
      setQuestList(res.payload.questPostList);
      setSocialType(res.payload.user.socialType);
    });

    const options = {
      headers: {
        "Auth-accessToken":
          "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJza2EwNTE0MkBuYXZlci5jb20iLCJyb2xlcyI6WyJST0xFX0FETUlOIl0sImlhdCI6MTY2MDExMjQ1NywiZXhwIjoxNjYwMjMyNDU3fQ.Z8ihJRXyWxk-H30hVqE8fX4AYuvdcWBp8UUV9FJm1ww",
      },
    };
    // dispatch(profileImg({ userId: getUserId() }))
    fetch(`http://localhost:8002/img/profile/${userId}`, options)
      .then((res) => res.blob())
      .then((blob) => setImgSrc(URL.createObjectURL(blob)));
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
            // src={`http://localhost:8002/img/profile/${userId}`}
            src={`${imgSrc}`}
            // alt="profileImg"
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
      {userSetting === 1 && (
        <div className={`${styles.mission}`}>
          {missionList.map((mission) => (
            <img
              key={mission.id}
              src={`http://localhost:8002/img/post/${mission.id}`}
              alt="profileImg"
              className={styles.missionImg}
            />
          ))}
        </div>
      )}
      {userSetting === 2 && (
        <div className={`${styles.quest} ${displayType2}`}>
          {questList.map((mission) => (
            <img
              key={mission.id}
              src={`http://localhost:8002/img/post/${mission.id}`}
              alt="profileImg"
              className={styles.missionImg}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Profile;

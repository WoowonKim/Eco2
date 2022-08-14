import React, { useEffect, useState } from "react";
import styles from "./Profile.module.css";
import {
  getUserName,
  getUserEmail,
  getUserId,
  getAccessToken,
} from "../../store/user/common";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { userInformation } from "../../store/user/userSettingSlice";
import { useDispatch } from "react-redux";
import Calendar from "../../components/calendar/calendar/Calendar";
// import { postImage, profilImage } from "../../store/fetchService";
import { friendRequest, friends } from "../../store/user/accountSlice";
import { createRoom } from "../../store/chat/chattingSlice";
import PostModal from "../../components/modal/postModal/PostModal";
// import { test } from "../../store/user/accountSlice";

const Profile = () => {
  const [userSetting, setUserSetting] = useState(1);
  const [socialType, setSocialType] = useState(0);
  const [userId, setUserId] = useState(getUserId());
  const [userName, setUserName] = useState(0);
  const [imgSrc, setImgSrc] = useState("");
  const [missionImgSrc, setMissionImgSrc] = useState("");
  const [missionList, setMissionList] = useState([]);
  const [questList, setQuestList] = useState([]);
  const [friendList, setFriendList] = useState([]);
  const [visible, setVisible] = useState(false);
  const [modalType, setModalType] = useState("");
  // const [admin, setAdmin] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const params = useParams();
  const email = location.state?.userEmail || getUserEmail();
  // const email = getUserEmail();

  const displayType = userSetting === 1 ? styles.selectedMenu : null;
  const displayType2 = userSetting === 2 ? styles.selectedMenu : null;

  useEffect(() => {
    // 유저 객체 받아오기
    dispatch(userInformation({ email })).then((res) => {
      setUserId(res.payload.user.id);
      setUserName(res.payload.user.name);
      setMissionList(res.payload.postList);
      setQuestList(res.payload.questPostList);
      setSocialType(res.payload.user.socialType);

      // if (res.payload.user.role === "[ROLE_ADMIN]") {
      //   setAdmin(true);
      // }
    });

    // 친구조회
    dispatch(friends({ id: getUserId() })).then((res) => {
      if (res.payload?.status === 200) {
        setFriendList(res.payload?.friendList);
      }
    });
  }, []);

  return (
    <div className={styles.container}>
      <Calendar id={userId} />
      <div className={styles.userInfo}>
        <div className={styles.user}>
          <img
            src={`http://localhost:8002/img/profile/${userId}`}
            // alt="profileImg"
            className={styles.profileImg}
          />
          <p>{userName}</p>
          {getUserId() === params.userId ? (
            <button
              onClick={() =>
                navigate("/user/settings", {
                  state: {
                    socialType: socialType,
                    name: getUserName(),
                    userId,
                    // admin,
                  },
                })
              }
              className={styles.button}
            >
              <i className={`fa-solid fa-gear ${styles.settingIcon}`}></i>
            </button>
          ) : (
            <div className={styles.buttonGroup}>
              <button
                className={styles.button}
                onClick={() => {
                  setVisible(!visible);
                  setModalType("친구");
                }}
              >
                <i className={`fa-solid fa-user-plus ${styles.icon}`}></i>
              </button>
              <button
                className={styles.button}
                onClick={() => {
                  dispatch(
                    createRoom({ userId: getUserId(), id: params.userId })
                  )
                    .then((res) => {
                      if (res.payload?.status === 200) {
                        navigate("/chatting/room", {
                          state: {
                            roomId: res.payload.roomId,
                            userId: params.userId,
                          },
                        });
                      }
                    })
                    .catch((err) => console.log(err));
                }}
              >
                <i className={`fa-solid fa-paper-plane ${styles.icon}`}></i>
              </button>
            </div>
          )}
        </div>
        {visible && (
          <PostModal
            title={"친구 신청"}
            content={"친구 신청을 하시겠습니까?"}
            type={"친구"}
            fromId={getUserId()}
            toId={params.userId}
            closeModal={() => setVisible(!visible)}
          />
        )}
        {getUserId() === params.userId && (
          <div className={styles.friend}>
            <button
              onClick={() =>
                navigate("/user/friends", {
                  state: { userId: userId, friendList: friendList },
                })
              }
              className={styles.button}
            >
              <i className={`fa-solid fa-users ${styles.friendIcon}`}></i>
            </button>
            {friendList.length}
          </div>
        )}
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
              alt="missionImg"
              className={styles.missionImg}
              onClick={() => navigate(`/post/${mission.id}`)}
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
              onClick={() => navigate(`/post/${mission.id}`)}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Profile;

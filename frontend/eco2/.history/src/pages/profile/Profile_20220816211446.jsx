import React, { useEffect, useState } from "react";
import styles from "./Profile.module.css";
import {
  getUserName,
  getUserEmail,
  getUserId,
  getAccessToken,
} from "../../store/user/common";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import {
  profileImgChange,
  userInformation,
} from "../../store/user/userSettingSlice";
import { useDispatch } from "react-redux";
import Calendar from "../../components/calendar/calendar/Calendar";
// import { postImage, profilImage } from "../../store/fetchService";
import {
  accountSetting,
  friendRequest,
  friends,
  isFriend,
} from "../../store/user/accountSlice";
import { createRoom } from "../../store/chat/chattingSlice";
import PostModal from "../../components/modal/postModal/PostModal";
import axiosService from "../../store/axiosService";
import ConfirmModal from "../../components/modal/confirmModal/ConfirmModal";
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
  const [friend, setFriend] = useState(null);
  const [profileEdit, setProfileEdit] = useState(false);
  const [fileImage, setFileImage] = useState("");
  const [file, setFile] = useState("");
  const [originalImg, setOriginalImg] = useState("");
  const [isPublic, setIsPublic] = useState(true);
  const [confirm, setConfirm] = useState(false);

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
    dispatch(userInformation({ email, userId: getUserId() })).then(res => {
      setUserId(res.payload.user.id);
      setUserName(res.payload.user.name);
      setMissionList(res.payload.postList);
      setQuestList(res.payload.questPostList);
      setSocialType(res.payload.user.socialType);
    });

    dispatch(accountSetting({ email })).then(res => {
      if (res.payload?.status === 200) {
        setIsPublic(res.payload.userSetting.publicFlag);
      }
    });

    // 친구조회
    dispatch(friends({ id: getUserId() })).then(res => {
      if (res.payload?.status === 200) {
        setFriendList(res.payload?.friendList);
      }
    });
  }, [params.userId]);

  const saveFileImage = e => {
    setFile(e.target.files[0]);
    setFileImage(URL.createObjectURL(e.target.files[0]));
  };

  const deleteFileImage = e => {
    URL.revokeObjectURL(fileImage);
    setFileImage("");
    setFile("");
    console.log(fileImage);
  };

  const profileImg = () => {
    // 현재 수정한 이미지가 없을 경우 기존 이미지를 백으로 보내고 있음
    dispatch(profileImgChange({ email, img: file ? file : originalImg })).then(
      res => {
        if (res.payload.status === 200) {
          setProfileEdit(false);
          // location.state?.setCheckImg((curr) => curr + 1);
          window.location.replace(`/profile/${getUserId()}`);
        }
      }
    );
  };

  useEffect(() => {
    // 백에서 받아온 이미지를 file 형식으로 변환
    axiosService({
      url: `${process.env.REACT_APP_BE_HOST}img/profile/${getUserId()}`,
      method: "GET",
      responseType: "blob",
    }).then(res => {
      const file = new File([res.data], "profileImg.png", {
        type: "image/png",
      });
      setOriginalImg(file);
    });
  }, []);

  useEffect(() => {
    // 다른 유저 프로필 -> 나와 친구인지 판별
    if (getUserId() !== userId) {
      dispatch(isFriend({ id: getUserId(), friendId: userId })).then(res => {
        if (res.payload?.status === 200) {
          setFriend(res.payload.isFriend);
        } else {
          setFriend(res.payload.isFriend);
        }
      });
    }
  }, [friend, userId]);
  console.log(confirm);
  return (
    <div className={styles.container}>
      <div className={styles.userInfo}>
        <div className={styles.user}>
          <div>
            {fileImage ? (
              <img
                className={styles.profileImg}
                alt="profileImg"
                src={fileImage}
              />
            ) : (
              <img
                className={styles.profileImg}
                alt="profileImg"
                src={`${process.env.REACT_APP_BE_HOST}img/profile/${userId}`}
              />
            )}
          </div>
          {getUserId() === params.userId && (
            <>
              {!profileEdit ? (
                // <label htmlFor="file" className={styles.imgLabel}>
                <i
                  className={`fa-solid fa-pencil ${styles.editIcon}`}
                  onClick={() => setProfileEdit(true)}
                ></i>
              ) : (
                // </label>
                <div>
                  <label htmlFor="file" className={styles.imgLabel}>
                    <i
                      className={`fa-solid fa-pencil ${styles.editIcon}`}
                      onClick={() => setProfileEdit(true)}
                    ></i>
                  </label>
                  <button onClick={profileImg} className={styles.button}>
                    <i className="fa-solid fa-check"></i>
                  </button>
                  <button
                    onClick={() => deleteFileImage()}
                    className={styles.button}
                  >
                    <i className="fa-solid fa-xmark"></i>
                  </button>
                </div>
              )}
              <input
                encType="multipart/form-data"
                type="file"
                id="file"
                name="profile_file"
                onChange={saveFileImage}
                className={`${styles.fileInput} ${styles.baseFileInput}`}
              />
            </>
          )}
          <div className={styles.userSettingAndFriends}>
            <p className={styles.userName}>{userName}</p>
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
                {!friend && (
                  <button
                    className={styles.button}
                    onClick={() => {
                      setVisible(!visible);
                      setModalType("친구");
                    }}
                  >
                    <i className={`fa-solid fa-user-plus ${styles.icon}`}></i>
                  </button>
                )}
                <button
                  className={styles.button}
                  onClick={() => {
                    dispatch(
                      createRoom({ userId: getUserId(), id: params.userId })
                    )
                      .then(res => {
                        if (res.payload?.status === 200) {
                          navigate("/chatting/room", {
                            state: {
                              roomId: res.payload.roomId,
                              userId: params.userId,
                            },
                          });
                          window.location.reload(`/chatting/room`);
                        }
                      })
                      .catch(err => console.log(err));
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
              setConfirm={setConfirm}
            />
          )}
          {confirm === 202 && (
            <ConfirmModal
              title={"친구 신청"}
              content={"이미 친구 신청한 유저입니다."}
              closeModal={() => setConfirm(!confirm)}
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
          <div
            onClick={() => setUserSetting(1)}
            className={`${styles.missionTitle} ${
              userSetting === 1 ? styles.selectedMenu1 : null
            }`}
          >
            <p className={`${styles.calendarText} ${displayType}`}>달력</p>
            {userSetting === 1}
          </div>
          <div
            onClick={() => setUserSetting(2)}
            className={`${styles.missionTitle} ${
              userSetting === 2 ? styles.selectedMenu2 : null
            }`}
          >
            <p className={`${styles.dailyText} ${displayType}`}>데일리</p>
            {userSetting === 2}
            {/* {userSetting === 2 && <hr className={styles.line} />} */}
          </div>
          <div
            onClick={() => setUserSetting(3)}
            className={`${styles.missionTitle} ${
              userSetting === 3 ? styles.selectedMenu3 : null
            }`}
          >
            <p className={`${styles.questText} ${displayType2}`}>퀘스트</p>
            {userSetting === 3}
          </div>
        </div>
        {isPublic || friend || getUserId() === params.userId ? (
          <>
            {userSetting === 1 && <Calendar id={userId} />}
            {userSetting === 2 && (
              <div>
                <div className={`${styles.mission}`}>
                  {missionList.map(mission =>
                    getUserId() !== params.userId ? (
                      !!mission.publicFlag && (
                        <img
                          key={mission.id}
                          src={`${process.env.REACT_APP_BE_HOST}img/post/${mission.id}`}
                          alt="missionImg"
                          className={styles.missionImg}
                          onClick={() => navigate(`/post/${mission.id}`)}
                        />
                      )
                    ) : (
                      <img
                        key={mission.id}
                        src={`${process.env.REACT_APP_BE_HOST}img/post/${mission.id}`}
                        alt="missionImg"
                        className={styles.missionImg}
                        onClick={() => navigate(`/post/${mission.id}`)}
                      />
                    )
                  )}
                </div>
              </div>
            )}
            {userSetting === 3 && (
              <div className={`${styles.mission} ${displayType2}`}>
                {questList.map(mission => (
                  <img
                    key={mission.id}
                    src={`${process.env.REACT_APP_BE_HOST}img/post/${mission.id}`}
                    alt="profileImg"
                    className={styles.missionImg}
                    onClick={() => navigate(`/post/${mission.id}`)}
                  />
                ))}
              </div>
            )}
          </>
        ) : (
          <div>
            <p>
              <i className="fa-solid fa-lock"></i>
              {""} 이 계정은 비공개 계정입니다.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;

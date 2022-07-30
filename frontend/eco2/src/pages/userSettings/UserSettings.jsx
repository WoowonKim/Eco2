import React, { useState } from "react";
import { useDispatch } from "react-redux";
import Toggle from "../../components/toggle/Toggle";
import { accountSetting } from "../../store/user/accountSlice";
import styles from "./UserSettings.module.css";

const UserSettings = () => {
  const [userSetting, setUserSetting] = useState(true);
  const [account, setAccount] = useState(false);
  const [comment, setComment] = useState(false);
  const [chatting, setChatting] = useState(false);
  const [friendPost, setFriendsPost] = useState(false);
  const [darkmode, setDarkmode] = useState(false);

  const displayType = userSetting ? styles.selectedMenu : null;
  const displayType2 = userSetting ? null : styles.selectedMenu;

  const dispatch = useDispatch();

  const onClick = () => {
    // 이메일 정보 받아와서 추가해야함
    dispatch(
      accountSetting({
        // email: email,
        publicFlag: account,
        commentAlarmFlag: comment,
        chatAlarmFlag: chatting,
        darkmodeFlag: darkmode,
      })
    );
  };

  return (
    <div>
      <div className={styles.header}>
        <div onClick={() => setUserSetting(true)} className={styles.userInfo}>
          <p className={`styles.userInfoText ${displayType}`}>회원정보</p>
          {userSetting && <hr className={styles.titleLine} />}
        </div>
        <div onClick={() => setUserSetting(false)} className={styles.userInfo}>
          <p className={`styles.userInfoText ${displayType2}`}>계정 및 알림</p>
          {!userSetting && <hr className={styles.titleLine} />}
        </div>
      </div>
      {userSetting ? (
        <div>
          <div className={styles.profileImg}>
            <img
              src={`${process.env.PUBLIC_URL}/logo.png`}
              alt="earth"
              className={styles.img}
            />
            <div className={styles.profileImgGroup}>
              <p className={styles.profileImgText}>프로필 사진</p>
              <i className={`fa-solid fa-pencil ${styles.editIcon}`}></i>
            </div>
          </div>
          <div className={styles.emailGroup}>
            <p className={styles.emailText}>이메일</p>
            <p className={styles.email}>abcd@abcd.com</p>
          </div>
          <div className={styles.econameGroup}>
            <div className={styles.econameTitle}>
              <p className={styles.econameText}>EcoName</p>
              <i className={`fa-solid fa-pencil ${styles.editIcon}`}></i>
            </div>
            <p className={styles.econame}>EcoName</p>
          </div>
          <div className={styles.passwordGroup}>
            <p className={styles.passwordText}>비밀번호 변경 / 탈퇴</p>
            <p className={styles.passwordText}>
              비밀번호를 변경하시거나 탈퇴를 하시려면 비밀번호를 확인해주세요
            </p>
            <form className={styles.passwordForm}>
              <input className={styles.passwordFormInput} type="text" />
              <button className={styles.passwordFormButton}>변경</button>
            </form>
          </div>
        </div>
      ) : (
        <div>
          <div className={styles.setting}>
            <div className={styles.settingGroup}>
              <p className={styles.settingTitle}>계정 비공개</p>
              <p className={styles.settingContent}>
                계정을 비공개로 설정하면 다른 유저들이 게시물을 볼 수 없습니다.
              </p>
            </div>
            <div
              className={styles.toggleGroup}
              onClick={() => setAccount(!account)}
            >
              <Toggle
                type="account"
                account={account}
                className={styles.toggle}
              />
            </div>
          </div>
          <hr className={styles.line} />
          <div className={styles.setting}>
            <div className={styles.settingGroup}>
              <p className={styles.settingTitle}>게시물 댓글</p>
              <p className={styles.settingContent}>
                게시물 댓글 알림을 끄면 게시물에 댓글이 달려도 알림이 가지
                않습니다.
              </p>
            </div>
            <div
              className={styles.toggleGroup}
              onClick={() => setComment(!comment)}
            >
              <Toggle
                type="comment"
                comment={comment}
                className={styles.toggle}
              />
            </div>
          </div>
          <hr className={styles.line} />
          <div className={styles.setting}>
            <div className={styles.settingGroup}>
              <p className={styles.settingTitle}>채팅</p>
              <p className={styles.settingContent}>
                채팅 알림을 끄면 채팅 팝업 알림이 가지 않습니다.
              </p>
            </div>
            <div
              className={styles.toggleGroup}
              onClick={() => setChatting(!chatting)}
            >
              <Toggle
                type="chatting"
                chatting={chatting}
                className={styles.toggle}
              />
            </div>
          </div>
          <hr className={styles.line} />
          <div className={styles.setting}>
            <div className={styles.settingGroup}>
              <p className={styles.settingTitle}>친구의 인증글</p>
              <p className={styles.settingContent}>
                친구 인증글 알림을 끄면 친구가 글을 올려도 알림이 가지 않습니다.
              </p>
            </div>
            <div
              className={styles.toggleGroup}
              onClick={() => setFriendsPost(!friendPost)}
            >
              <Toggle
                type="friendPost"
                friendPost={friendPost}
                className={styles.toggle}
              />
            </div>
          </div>
          <hr className={styles.line} />
          <div className={styles.setting}>
            <div className={styles.settingGroup}>
              <p className={styles.settingTitle}>다크모드</p>
            </div>
            <div
              className={styles.toggleGroup}
              onClick={() => setDarkmode(!darkmode)}
            >
              <Toggle
                type="darkmode"
                darkmode={darkmode}
                className={styles.toggle}
              />
            </div>
          </div>
          <button className={styles.settingButton} onClick={onClick}>
            설정 저장하기
          </button>
        </div>
      )}
    </div>
  );
};

export default UserSettings;

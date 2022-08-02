import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  LoginInput,
  ShortGreenBtn,
  WarningText,
} from "../../components/styled";
import {
  accountSetting,
  accountSettingChange,
} from "../../store/user/accountSlice";
import { getUserEmail } from "../../store/user/common";
import {
  deleteUser,
  passwordChange,
  passwordCheck,
  userInformation,
} from "../../store/user/userSettingSlice";
import {
  authActions,
  ecoName,
  ecoNameVerify,
} from "../../store/user/userSlice";
import styles from "./UserSettings.module.css";
import { useNavigate } from "react-router-dom";

const UserSettings = () => {
  const [userSetting, setUserSetting] = useState(true);
  const [checked, setChecked] = useState({
    publicFlag: false,
    commentAlarmFlag: false,
    chatAlarmFlag: false,
    darkmodeFlag: false,
  });

  const [userId, setUserId] = useState(0);
  const [socialType, setSocialType] = useState(0);
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [passwordForm, setPasswordForm] = useState(false);

  const email = getUserEmail();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const displayType = userSetting ? styles.selectedMenu : null;
  const displayType2 = userSetting ? null : styles.selectedMenu;
  // const formDisplayType = passwordForm ?

  const onClick = () => {
    // 토글로 변경된 유저 설정 return
    dispatch(
      accountSettingChange({
        email,
        publicFlag: checked.publicFlag,
        commentAlarmFlag: checked.commentAlarmFlag,
        chatAlarmFlag: checked.chatAlarmFlag,
        darkmodeFlag: checked.darkmodeFlag,
      })
    ).then((res) => console.log(checked));
  };

  const handlePasswordForm = (e) => {
    e.preventDefault();
    dispatch(passwordCheck({ email, password })).then((res) => {
      if (res.payload.status === 200) {
        setPasswordForm(true);
      }
    });
  };

  useEffect(() => {
    // 계정 설정 불러오기
    dispatch(accountSetting({ email })).then((res) => {
      setChecked({
        ...checked,
        publicFlag: res.payload.userSetting.publicFlag,
        commentAlarmFlag: res.payload.userSetting.commentAlarmFlag,
        chatAlarmFlag: res.payload.userSetting.chatAlarmFlag,
        darkmodeFlag: res.payload.userSetting.darkmodeFlag,
      });
    });

    // 유저 객체 받아오기
    dispatch(userInformation({ email })).then((res) => {
      setUserId(res.payload.user.id);
      setSocialType(res.payload.user.socialType);
      setName(res.payload.user.name);
    });
  }, []);

  return (
    <div className={styles.userSettingPage}>
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
            <div className={styles.emailTitleGroup}>
              <p className={styles.emailText}>이메일</p>
              {socialType === 1 && (
                <img
                  src={`${process.env.PUBLIC_URL}/google_logo.png`}
                  alt="social_logo"
                  className={styles.socialLogo}
                />
              )}
            </div>
            <p className={styles.email}>abcd@abcd.com</p>
          </div>
          <div className={styles.econameGroup}>
            <div className={styles.econameTitle}>
              <label htmlFor="EcoName" className={styles.econameText}>
                EcoName
              </label>
              {/* <i className={`fa-solid fa-pencil ${styles.editIcon}`}></i> */}
            </div>
            {/* <p className={styles.econame}>EcoName</p> */}
            <div className={styles.passwordForm}>
              <input
                id="EcoName"
                className={styles.passwordFormInput}
                placeholder="EcoName을 입력해주세요"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                  console.log(email, name);
                  dispatch(ecoNameVerify({ econame: name }));
                }}
              />
              <button
                onClick={() => {
                  dispatch(ecoName({ email, econame: name }));
                }}
                className={styles.passwordFormButton}
              >
                변경
              </button>
            </div>
          </div>
          <div className={styles.passwordGroup}>
            <p className={styles.passwordText}>비밀번호 변경 / 탈퇴</p>
            <p className={styles.passwordSmallText}>
              비밀번호를 변경하시거나 탈퇴를 하시려면 비밀번호를 확인해주세요
            </p>
            {!passwordForm ? (
              <div>
                <form
                  onSubmit={handlePasswordForm}
                  className={styles.passwordForm}
                >
                  <input
                    type="password"
                    onChange={(e) => setPassword(e.target.value)}
                    className={styles.passwordFormInput}
                  />
                  <button className={styles.passwordFormButton}>확인</button>
                </form>
                <hr className={styles.line} />
                <button
                  onClick={() => {
                    dispatch(authActions.logout());
                    navigate("/");
                  }}
                  className={styles.userButton}
                >
                  로그아웃
                </button>
              </div>
            ) : (
              <div>
                <input
                  type="password"
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="새 비밀번호"
                  className={styles.passwordFormInput}
                />
                <input
                  type="password"
                  onChange={(e) => setPassword2(e.target.value)}
                  placeholder="새 비밀번호 확인"
                  className={styles.passwordFormInput}
                />
                <button
                  className={styles.passwordFormButton}
                  onClick={() => dispatch(passwordChange({ email, password }))}
                  type="button"
                >
                  변경
                </button>
                {password !== password2 && (
                  <WarningText>비밀번호가 일치하지 않습니다.</WarningText>
                )}
                <hr className={styles.line} />
                <div className={styles.userButtonGroup}>
                  <button
                    onClick={() => dispatch(authActions.logout())}
                    className={styles.userButton}
                  >
                    로그아웃
                  </button>
                  <button
                    onClick={() =>
                      dispatch(deleteUser({ email, password })).then((res) => {
                        if (res.payload.status === 200) {
                          dispatch(authActions.logout());
                        }
                      })
                    }
                    className={styles.userButton}
                  >
                    회원탈퇴
                  </button>
                </div>
              </div>
            )}
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
            <div className={styles.toggleGroup}>
              <input
                type="checkbox"
                id="publicFlag"
                hidden
                className={styles.toggle}
                onClick={() => {
                  let data = { ...checked };
                  data.publicFlag = !checked.publicFlag;
                  setChecked(data);
                }}
                defaultChecked={checked.publicFlag}
              />
              <label htmlFor="publicFlag" className={styles.toggleSwitch}>
                <span className={styles.toggleButton}></span>
              </label>
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
            <div className={styles.toggleGroup}>
              <input
                type="checkbox"
                id="commentAlarmFlag"
                hidden
                className={styles.toggle}
                onClick={() => {
                  let data = { ...checked };
                  data.commentAlarmFlag = !checked.commentAlarmFlag;
                  setChecked(data);
                }}
                defaultChecked={checked.commentAlarmFlag}
              />
              <label htmlFor="commentAlarmFlag" className={styles.toggleSwitch}>
                <span className={styles.toggleButton}></span>
              </label>
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
            <div className={styles.toggleGroup}>
              <input
                type="checkbox"
                id="chatAlarmFlag"
                hidden
                className={styles.toggle}
                onClick={() => {
                  let data = { ...checked };
                  data.chatAlarmFlag = !checked.chatAlarmFlag;
                  setChecked(data);
                }}
                defaultChecked={checked.chatAlarmFlag}
              />
              <label htmlFor="chatAlarmFlag" className={styles.toggleSwitch}>
                <span className={styles.toggleButton}></span>
              </label>
            </div>
          </div>
          <hr className={styles.line} />
          <div className={styles.setting}>
            <div className={styles.settingGroup}>
              <p className={styles.settingTitle}>다크모드</p>
            </div>
            <div className={styles.toggleGroup}>
              <input
                type="checkbox"
                id="darkmodeFlag"
                hidden
                className={styles.toggle}
                onClick={() => {
                  let data = { ...checked };
                  data.darkmodeFlag = !checked.darkmodeFlag;
                  setChecked(data);
                }}
                defaultChecked={checked.darkmodeFlag}
              />
              <label htmlFor="darkmodeFlag" className={styles.toggleSwitch}>
                <span className={styles.toggleButton}></span>
              </label>
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

import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {
  accountSetting,
  accountSettingChange,
} from "../../store/user/accountSlice";
import { getUserEmail } from "../../store/user/common";
import {
  deleteUser,
  passwordChange,
  passwordCheck,
} from "../../store/user/userSettingSlice";
import {
  authActions,
  ecoName,
  ecoNameVerify,
} from "../../store/user/userSlice";
import styles from "./UserSettings.module.css";
import { useLocation, useNavigate } from "react-router-dom";
import { nameLengthValidation, passwordValidationCheck } from "../../utils";

const UserSettings = () => {
  const [userSetting, setUserSetting] = useState(true);
  const [checked, setChecked] = useState({
    publicFlag: false,
    commentAlarmFlag: false,
    chatAlarmFlag: false,
    darkmodeFlag: false,
  });

  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [passwordForm, setPasswordForm] = useState(false);
  const [isName, setIsName] = useState(false);
  const [nameMessage, setNameMessage] = useState("");
  const [passwordMessage, setPasswordMessage] = useState("");
  const [passwordConfirmMessage, setPasswordConfirmMessage] = useState("");

  const [isPassword, setIsPassword] = useState(false);
  const [isPasswordConfirm, setIsPasswordConfirm] = useState(false);

  const email = getUserEmail();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const socialType = location?.state;
  const displayType = userSetting ? styles.selectedMenu : null;
  const displayType2 = userSetting ? null : styles.selectedMenu;

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
    );
  };

  // 현재 비밀번호 확인 오류 있음
  const handlePassword = () => {
    dispatch(passwordCheck({ email, password })).then((res) => {
      if (res.payload.status === 200) {
        setPasswordForm(true);
      }
    });
  };

  const ecoNameValidation = (e) => {
    setName(e.target.value);
    if (nameLengthValidation(e.target.value)) {
      setNameMessage("3글자 이상 8글자 이하로 입력해주세요.");
      setIsName(false);
    } else {
      dispatch(ecoNameVerify({ econame: e.target.value })).then((res) => {
        if (res.payload.status === 200) {
          setNameMessage("올바른 이름 형식입니다 :)");
          setIsName(true);
        } else {
          setIsName(false);
          setNameMessage(`${res.payload.msg}`);
        }
      });
    }
  };

  const passwordValidation = (e) => {
    setPassword(e.target.value);

    if (passwordValidationCheck(e.target.value)) {
      setPasswordMessage(
        "숫자+영문자+특수문자 조합으로 6자리 이상 입력해주세요!"
      );
      setIsPassword(false);
    } else {
      setPasswordMessage("안전한 비밀번호에요 : )");
      setIsPassword(true);
    }
  };

  const passwordConfirmValidation = (e) => {
    const passwordConfirmCurrent = e.target.value;
    setPassword2(passwordConfirmCurrent);

    if (password === passwordConfirmCurrent) {
      setPasswordConfirmMessage("비밀번호를 똑같이 입력했어요 : )");
      setIsPasswordConfirm(true);
    } else {
      setPasswordConfirmMessage("비밀번호가 틀려요. 다시 확인해주세요");
      setIsPasswordConfirm(false);
    }
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
            <p className={styles.email}>{email}</p>
          </div>
          <div className={styles.econameGroup}>
            <div className={styles.econameTitle}>
              <label htmlFor="EcoName" className={styles.econameText}>
                EcoName
              </label>
            </div>
            <div className={styles.passwordForm}>
              <input
                id="EcoName"
                className={styles.passwordFormInput}
                placeholder="EcoName을 입력해주세요"
                value={name}
                onChange={ecoNameValidation}
              />

              <button
                onClick={() => {
                  dispatch(ecoName({ email, econame: name }));
                }}
                disabled={!isName}
                className={styles.passwordFormButton}
              >
                변경
              </button>
            </div>
            <p className={isName ? styles.success : styles.fail}>
              {nameMessage}
            </p>
          </div>
          <div className={styles.passwordGroup}>
            <p className={styles.passwordText}>비밀번호 변경 / 탈퇴</p>
            <p className={styles.passwordSmallText}>
              비밀번호를 변경하시거나 탈퇴를 하시려면 비밀번호를 확인해주세요
            </p>
            {!passwordForm ? (
              <div>
                <input
                  type="password"
                  // onChange={(e) => set}
                  className={styles.passwordFormInput}
                />
                <button
                  onClick={handlePassword}
                  className={styles.passwordFormButton}
                >
                  확인
                </button>
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
                  onChange={passwordValidation}
                  placeholder="새 비밀번호"
                  className={styles.passwordFormInput}
                />
                {password.length > 0 && (
                  <p className={isPassword ? styles.success : styles.fail}>
                    {passwordMessage}
                  </p>
                )}
                <input
                  type="password"
                  onChange={passwordConfirmValidation}
                  placeholder="새 비밀번호 확인"
                  className={styles.passwordFormInput}
                />
                {password2.length > 0 && (
                  <p
                    className={isPasswordConfirm ? styles.success : styles.fail}
                  >
                    {passwordConfirmMessage}
                  </p>
                )}
                <button
                  className={styles.passwordFormButton}
                  onClick={() => dispatch(passwordChange({ email, password }))}
                  type="button"
                  disabled={!(isPassword && isPasswordConfirm)}
                >
                  변경
                </button>
                <hr className={styles.line} />
                <div className={styles.userButtonGroup}>
                  <button
                    onClick={() => {
                      dispatch(authActions.logout());
                      navigate("/");
                    }}
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

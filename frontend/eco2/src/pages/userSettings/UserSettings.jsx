import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getUserEmail, getUserName, setUserName } from "../../store/user/common";
import { passwordChange, passwordCheck } from "../../store/user/userSettingSlice";
import { ecoName, ecoNameVerify, newPassword } from "../../store/user/userSlice";
import styles from "./UserSettings.module.css";
import { useLocation, useNavigate } from "react-router-dom";
import { nameLengthValidation, passwordValidationCheck } from "../../utils";
import Settings from "./settings/Settings";
import Notice from "./notice/Notice";
import PostModal from "../../components/modal/postModal/PostModal";
import ConfirmModal from "../../components/modal/confirmModal/ConfirmModal";

const UserSettings = () => {
  const [userSetting, setUserSetting] = useState(1);
  const [visible, setVisible] = useState(false);
  const [modalType, setModalType] = useState("");

  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [newpassword, setNewPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [passwordForm, setPasswordForm] = useState(false);
  const [isName, setIsName] = useState(false);
  const [nameMessage, setNameMessage] = useState("");
  const [passwordMessage, setPasswordMessage] = useState("");
  const [passwordMessage2, setPasswordMessage2] = useState("");
  const [passwordConfirmMessage, setPasswordConfirmMessage] = useState("");

  const [autoLogin, setAutoLogin] = useState(false);
  const [isPassword, setIsPassword] = useState(false);
  const [isPasswordConfirm, setIsPasswordConfirm] = useState(false);

  const email = getUserEmail();
  const dispatch = useDispatch();

  const location = useLocation();

  const socialType = location.state?.socialType;
  const modalDisplayType = visible ? styles.visible : styles.hidden;
  const displayType = userSetting === 1 ? styles.selectedMenu : null;
  const displayType2 = userSetting === 2 ? styles.selectedMenu : null;
  const displayType3 = userSetting === 3 ? styles.selectedMenu : null;

  const handlePassword = () => {
    dispatch(passwordCheck({ email, password: password.trim() }))
      .then((res) => {
        if (res.payload?.status === 200) {
          setPasswordForm(true);
        } else {
          setPasswordMessage2(res.payload?.msg);
        }
      })
      .catch((err) => console.log(err, email, password));
  };

  const ecoNameValidation = (e) => {
    setName(e.target.value);
    if (nameLengthValidation(e.target.value.trim())) {
      setNameMessage("3글자 이상 8글자 이하로 입력해주세요.");
      setIsName(false);
    } else {
      dispatch(ecoNameVerify({ econame: e.target.value.trimStart() })).then((res) => {
        if (res.payload.status === 200) {
          console.log(e.target.value.trim());
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
    setNewPassword(e.target.value);
    if (passwordValidationCheck(e.target.value)) {
      setPasswordMessage("숫자+영문자+특수문자 조합으로 6자리 이상 입력해주세요!");
      setIsPassword(false);
    } else {
      setPasswordMessage("안전한 비밀번호에요 : )");
      setIsPassword(true);
    }
  };

  const passwordConfirmValidation = (e) => {
    const passwordConfirmCurrent = e.target.value.trim();
    setPassword2(passwordConfirmCurrent);

    if (newpassword === passwordConfirmCurrent) {
      setPasswordConfirmMessage("비밀번호를 똑같이 입력했어요 : )");
      setIsPasswordConfirm(true);
    } else {
      setPasswordConfirmMessage("비밀번호가 틀려요. 다시 확인해주세요");
      setIsPasswordConfirm(false);
    }
  };

  useEffect(() => {
    setName(getUserName());
    setUserSetting(location.state?.notice === 3 ? 3 : 1);
    setAutoLogin(localStorage.getItem("email") ? true : false);
  }, []);

  return (
    <div className={styles.userSettingPage}>
      <div className={styles.header}>
        <div onClick={() => setUserSetting(1)} className={styles.userInfo}>
          <p className={`styles.userInfoText ${displayType}`}>회원정보</p>
          {userSetting === 1 && <hr className={styles.titleLine} />}
        </div>
        <div onClick={() => setUserSetting(2)} className={styles.userInfo}>
          <p className={`styles.userInfoText ${displayType2}`}>계정 및 알림</p>
          {userSetting === 2 && <hr className={styles.titleLine} />}
        </div>
        <div onClick={() => setUserSetting(3)} className={styles.userInfo}>
          <p className={`styles.userInfoText ${displayType3}`}>공지사항</p>
          {userSetting === 3 && <hr className={styles.titleLine} />}
        </div>
      </div>
      {userSetting === 1 ? (
        <div>
          <div className={styles.emailGroup}>
            <div className={styles.emailTitleGroup}>
              <p className={styles.emailTitle}>이메일</p>
              {socialType === 1 && <img src={`${process.env.PUBLIC_URL}/google_logo.png`} alt="social_logo" className={styles.socialLogo} />}
              {socialType === 2 && <img src={`${process.env.PUBLIC_URL}/kakao_logo.png`} alt="social_logo" className={styles.socialLogo} />}
            </div>
            <p className={styles.email}>{email}</p>
          </div>
          <div className={styles.econameGroup}>
            <div className={styles.econameTitle}>
              <label htmlFor="EcoName" className={styles.label}>
                EcoName
              </label>
            </div>
            <div className={styles.passwordForm}>
              <input id="EcoName" className={styles.passwordFormInput} placeholder="EcoName" value={name} onChange={ecoNameValidation} />
              <button
                onClick={() => {
                  dispatch(ecoName({ email, econame: name.trim() })).then((res) => {
                    if (res.payload?.status === 200) {
                      setUserName(autoLogin, name.trim());
                      setVisible(!visible);
                      setModalType("확인");
                    }
                  });
                }}
                disabled={!isName}
                className={styles.passwordFormButton}
              >
                변경
              </button>
            </div>
            <p className={isName ? styles.success : styles.fail}>{nameMessage}</p>
          </div>
          {visible && modalType === "로그아웃" && (
            <PostModal
              title={"로그아웃"}
              className={`${modalDisplayType}`}
              content={"로그아웃 하시겠습니까"}
              type={"로그아웃"}
              closeModal={() => setVisible(!visible)}
            />
          )}
          {visible && modalType === "탈퇴" && (
            <PostModal
              className={`${modalDisplayType}`}
              title={"회원탈퇴"}
              content={"회원탈퇴 하시겠습니까"}
              type={"탈퇴"}
              closeModal={() => setVisible(!visible)}
            />
          )}
          {visible && modalType === "확인" && (
            <ConfirmModal title={"EcoName 변경"} content={"EcoName 변경이 완료되었습니다."} closeModal={() => setVisible(!visible)} />
          )}
          {visible && modalType === "비밀번호" && (
            <ConfirmModal title={"비밀번호"} content={"비밀번호 변경이 완료되었습니다."} closeModal={() => setVisible(!visible)} />
          )}
          {visible && modalType === "동일" && (
            <ConfirmModal title={"비밀번호"} content={"이전과 동일한 비밀번호 입니다."} closeModal={() => setVisible(!visible)} />
          )}
          {!!socialType && (
            <div>
              <hr className={styles.line} />
              <button
                onClick={() => {
                  setVisible(!visible);
                  setModalType("로그아웃");
                }}
                className={styles.userButton}
              >
                로그아웃
              </button>
              <button
                onClick={() => {
                  setVisible(!visible);
                  setModalType("탈퇴");
                }}
                className={styles.userButton}
              >
                회원탈퇴
              </button>
            </div>
          )}
          {!socialType && (
            <div className={styles.passwordGroup}>
              <p className={styles.label}>비밀번호 변경 / 탈퇴</p>
              <p className={styles.passwordSmallText}>비밀번호를 변경하시거나 탈퇴를 하시려면 비밀번호를 확인해주세요</p>
              {!passwordForm ? (
                <div>
                  <label htmlFor="passwordCheck" className={styles.passwordText}></label>
                  <input
                    id="passwordCheck"
                    type="password"
                    placeholder="비밀번호"
                    onChange={(e) => setPassword(e.target.value.trimStart())}
                    className={styles.passwordFormInput}
                  />
                  <button onClick={handlePassword} disabled={!password} className={styles.passwordFormButton}>
                    확인
                  </button>
                  <p className={passwordForm ? styles.success : styles.fail}>{passwordMessage2}</p>
                  <hr className={styles.line} />
                </div>
              ) : (
                <form>
                  <label htmlFor="newPassword"></label>
                  <input id="newPassword" type="password" onChange={passwordValidation} placeholder="새 비밀번호" className={styles.passwordFormInput} />
                  {newPassword.length > 0 && <p className={isPassword ? styles.success : styles.fail}>{passwordMessage}</p>}
                  {newPassword.length === 0 && <div className={styles.test}></div>}
                  <label htmlFor="newPasswordCheck"></label>
                  <input
                    id="newPasswordCheck"
                    type="password"
                    onChange={passwordConfirmValidation}
                    placeholder="새 비밀번호 확인"
                    className={styles.passwordFormInput}
                  />
                  <button
                    className={styles.passwordFormButton}
                    onClick={() =>
                      dispatch(passwordChange({ email, password: newpassword.trim() })).then((res) => {
                        if (res.payload.status === 200) {
                          setVisible(!visible);
                          setModalType("비밀번호");
                        } else if (res.payload.status === 202) {
                          setVisible(!visible);
                          setModalType("동일");
                        }
                      })
                    }
                    type="button"
                    disabled={!(isPassword && isPasswordConfirm)}
                  >
                    변경
                  </button>
                  {password2.length > 0 && <p className={isPasswordConfirm ? styles.success : styles.fail}>{passwordConfirmMessage}</p>}
                  {password2.length === 0 && <div className={styles.test}></div>}

                  <hr className={styles.line} />
                </form>
              )}
              {!passwordForm ? (
                <div className={styles.userButtonGroup}>
                  <button
                    onClick={() => {
                      setVisible(!visible);
                      setModalType("로그아웃");
                    }}
                    className={styles.userButton}
                  >
                    로그아웃
                  </button>
                </div>
              ) : (
                <div className={styles.userButtonGroup}>
                  <button
                    onClick={() => {
                      setVisible(!visible);
                      setModalType("로그아웃");
                    }}
                    className={styles.userButton}
                  >
                    로그아웃
                  </button>
                  <button
                    onClick={() => {
                      setVisible(!visible);
                      setModalType("탈퇴");
                    }}
                    className={styles.userButton}
                  >
                    회원탈퇴
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      ) : userSetting === 2 ? (
        <Settings email={email} />
      ) : (
        <Notice />
      )}
    </div>
  );
};

export default UserSettings;

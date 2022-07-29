import React from "react";
import { useState } from "react";
import styles from "./FindPassword.module.css";
import { useNavigate } from "react-router-dom";
import { GreenBtn, LoginInput, WarningText } from "../../components/styled";
import { useDispatch, useSelector } from "react-redux";
import {
  emailVerify,
  emailVerifyCode,
  newPassword,
} from "../../store/user/userSlice";
import { store } from "../../store/index";
const FindPassword = () => {
  const [visibility, setVisibility] = useState(false);
  const [formVisibility, setFormVisibility] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [code, setCode] = useState(null);

  const isEmailValid = useSelector((state) => state.user.isEmailValid);
  const isEmailVerified = useSelector((state) => state.user.isEmailVerified);
  const isPasswordValid = useSelector((state) => state.user.isPasswordValid);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const message = visibility ? "인증 메일 다시 보내기" : "이메일 인증하기";
  const displayType = visibility ? styles.visible : styles.hidden;
  const formDisplayType = formVisibility
    ? styles.formHidden
    : styles.formVisible;
  const changeFormDisplayType = formVisibility
    ? styles.changeFormVisible
    : styles.changeFormHidden;

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const handleEmail = () => {
    dispatch(emailVerify({ email }))
      .then((res) => {
        setVisibility(true);
      })
      .catch((err) => {
        setVisibility(false);
      });
  };

  const handleEmailCheck = () => {
    dispatch(emailVerifyCode({ email, code }))
      .then((res) => {
        setFormVisibility(true);
      })
      .catch((err) => {
        setFormVisibility(false);
      });
  };

  const handleNewPassword = () => {
    dispatch(newPassword({ email, password }))
      .then((res) => {
        if (password === password2) {
          navigate("/mainTree");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div>
      <h2 className={styles.title}>비밀번호 재설정</h2>
      <form onSubmit={handleSubmit} className={`${formDisplayType}`}>
        <LoginInput
          onChange={(e) => setEmail(e.target.value)}
          type="text"
          placeholder="이메일"
          className={styles.input}
        />
        {visibility && !isEmailValid && <p>인증 메일을 전송할 수 없습니다.</p>}
        <GreenBtn onClick={handleEmail} className={styles.button}>
          {message}
        </GreenBtn>
        <div className={`${styles.EmailInput}, ${displayType}`}>
          <input
            type="text"
            className={styles.inputEmail}
            onChange={(e) => setCode(e.target.value)}
            placeholder="인증 번호"
          />
          <button onClick={handleEmailCheck} className={styles.buttonEmail}>
            인증하기
          </button>
        </div>
      </form>
      <form onSubmit={handleSubmit} className={`${changeFormDisplayType}`}>
        <LoginInput
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          placeholder="새 비밀번호"
        />
        <LoginInput
          onChange={(e) => setPassword2(e.target.value)}
          type="password"
          placeholder="새 비밀번호 확인"
        />
        {password !== password2 && (
          <WarningText className={styles.warningText}>
            비밀번호가 같지 않습니다.
          </WarningText>
        )}
        <GreenBtn className={styles.button} onClick={handleNewPassword}>
          비밀번호 변경
        </GreenBtn>
      </form>
    </div>
  );
};

export default FindPassword;

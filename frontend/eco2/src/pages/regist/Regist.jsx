import React, { useEffect, useRef } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import {
  emailCheck,
  emailVerify,
  emailVerifyCode,
  signUp,
} from "../../store/user/userSlice";
import styles from "./Regist.module.css";
import {
  GreenBtn,
  LoginInput,
  WarningText,
  ShortGreenBtn,
} from "../../components/styled";

const Regist = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [socialType, setSocialType] = useState(0);
  const [visibility, setVisibility] = useState(false);
  const [code, setCode] = useState(null);
  const [min, setMin] = useState(5);
  const [sec, setSec] = useState(0);
  const [emailCheckVisible, setEmailCheckVisible] = useState(false);

  const displayType = visibility ? styles.visible : styles.hidden;
  const message = visibility ? "인증 메일 다시 보내기" : "이메일 인증하기";
  const dispatch = useDispatch();
  const isEmailValid = useSelector((state) => state.user.isEmailValid);
  const isEmailVerified = useSelector((state) => state.user.isEmailVerified);
  const isEmailOnly = useSelector((state) => state.user.isEmailOnly);
  const accessToken = useSelector((state) => state.user.token);
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    setSocialType(0);
    dispatch(
      signUp({ email: email, password: password, socialType: socialType })
    );
  };

  const countRef = useRef(null);
  const startHandler = () => {
    countRef.current = setInterval(() => {
      if (0 < sec) {
        setSec(sec - 1);
      } else if (sec === 0) {
        if (min === 0) {
          clearInterval(countRef.current);
        } else {
          setMin(min - 1);
          setSec(59);
        }
      }
    }, 1000);
  };

  const stopHandler = () => {
    clearInterval(0);
    countRef.current = null;
  };

  const resetHandler = () => {
    stopHandler();
    setMin(5);
    setSec(0);
  };

  const onclick = () => {
    // if (isEmailValid) {
    //   setVisibility(true);
    //   // startHandler();
    // } else {
    //   setVisibility(true);
    //   // resetHandler();
    //   // startHandler();
    // }
    setVisibility(true);
    // dispatch(emailCheck({ email: email }));
    // console.log(isEmailOnly);
    dispatch(emailVerify({ email: email }));
  };

  const handleEcoName = () => {
    if (accessToken) {
      navigate("/ecoName", { state: email });
    }
  };

  // useEffect(() => {
  //   const timer = setInterval(() => {
  //     if (0 < sec) {
  //       setSec(sec - 1);
  //     } else if (sec === 0) {
  //       if (min === 0) {
  //         clearInterval(timer);
  //       } else {
  //         setMin(min - 1);
  //         setSec(59);
  //       }
  //     }
  //   }, 1000);
  //   return () => clearInterval(timer);
  // }, [min, sec]);
  return (
    <div className={styles.signup}>
      <img
        src={process.env.PUBLIC_URL + "logo.png"}
        alt="earth"
        className={styles.img}
      />
      <form onSubmit={handleSubmit}>
        <LoginInput
          type="email"
          onChange={(e) => setEmail(e.target.value)}
          placeholder="이메일"
        />
        {emailCheckVisible && !isEmailOnly && (
          <p className={styles.emailCheckText}>중복된 이메일입니다.</p>
        )}
        {emailCheckVisible && isEmailOnly && (
          <p className={styles.emailCheckText}>사용 가능한 이메일입니다.</p>
        )}
        {isEmailOnly ? (
          <GreenBtn type="button" onClick={onclick} className={styles.button}>
            {message}
          </GreenBtn>
        ) : (
          <GreenBtn
            type="button"
            onClick={() => {
              dispatch(emailCheck({ email }));
              setEmailCheckVisible(true);
            }}
            className={styles.button}
          >
            중복 확인
          </GreenBtn>
        )}
        {visibility && isEmailValid && (
          <div className={`${styles.EmailInput}, ${displayType}`}>
            <input
              type="text"
              className={styles.inputEmail}
              onChange={(e) => setCode(e.target.value)}
              placeholder="인증 번호"
            />
            <button
              className={styles.buttonEmail}
              type="button"
              onClick={() =>
                dispatch(emailVerifyCode({ email: email, code: code }))
              }
            >
              인증하기
            </button>
            <div className={styles.timer}>
              {min} : {sec}
            </div>
          </div>
        )}
        {isEmailVerified && (
          <div>
            <LoginInput
              type="password"
              onChange={(e) => setPassword(e.target.value)}
              className={styles.input}
              placeholder="비밀번호"
            />
            <LoginInput
              type="password"
              onChange={(e) => setPassword2(e.target.value)}
              className={styles.input}
              placeholder="비밀번호 확인"
            />
            {password !== password2 && (
              <WarningText className={styles.warningText}>
                비밀번호가 같지 않습니다.
              </WarningText>
            )}
            <ShortGreenBtn type="submit" onClick={handleEcoName}>
              가입하기
            </ShortGreenBtn>
          </div>
        )}
      </form>
      <div className={styles.lineGroup}>
        <hr className={styles.shortLine} />
        <span className={styles.lineText}>이미 회원이신가요?</span>
        <hr className={styles.longLine} />
      </div>
      <Link to="/" className={styles.link}>
        <p className={styles.text}>로그인 하기</p>
      </Link>
    </div>
  );
};

export default Regist;

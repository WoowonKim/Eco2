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
import { setUserEmail } from "../../store/user/common";

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
  const [isEmailVerified, setIsEmailVerified] = useState(false);
  const [emailCodeVisible, setEmailCodeVisible] = useState(false);
  const [message, setMessage] = useState("");
  const [messageVisible, setMessageVisible] = useState(true);

  const displayType = visibility ? styles.visible : styles.hidden;
  const buttonText = visibility ? "인증 메일 다시 보내기" : "이메일 인증하기";

  const isEmailValid = useSelector((state) => state.user.isEmailValid);
  const isEmailOnly = useSelector((state) => state.user.isEmailOnly);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onclick = () => {
    setVisibility(true);
    dispatch(emailVerify({ email })).then((res) => {
      setMessage(`${res.payload.msg}`);
    });
    setMessageVisible(false);
  };

  return (
    <div className={styles.signup}>
      <img
        src={process.env.PUBLIC_URL + "logo.png"}
        alt="earth"
        className={styles.img}
      />
      <form onSubmit={(e) => e.preventDefault()}>
        <LoginInput
          type="email"
          onChange={(e) => setEmail(e.target.value)}
          placeholder="이메일"
        />
        {messageVisible && emailCheckVisible && !isEmailOnly && (
          <WarningText>{message}</WarningText>
        )}
        {messageVisible && emailCheckVisible && isEmailOnly && (
          <WarningText>{message}</WarningText>
        )}
        {isEmailOnly ? (
          <GreenBtn type="button" onClick={onclick} className={styles.button}>
            {buttonText}
          </GreenBtn>
        ) : (
          <GreenBtn
            type="button"
            onClick={() => {
              dispatch(emailCheck({ email })).then((res) => {
                setEmailCheckVisible(true);
                setMessage(`${res.payload.msg}`);
              });
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
                dispatch(emailVerifyCode({ email, code })).then((res) => {
                  if (res.payload.status === 200) {
                    setIsEmailVerified(true);
                    setVisibility(false);
                  }
                  setEmailCodeVisible(true);
                  setMessage(`${res.payload.msg}`);
                })
              }
            >
              인증하기
            </button>
            {/* <div className={styles.timer}>
              {min} : {sec}
            </div> */}
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
              <WarningText>비밀번호가 일치하지 않습니다.</WarningText>
            )}
            <ShortGreenBtn
              type="button"
              onClick={() => {
                if (password === password2) {
                  setSocialType(0);
                  dispatch(
                    signUp({
                      email: email,
                      password: password,
                      socialType: socialType,
                    })
                  )
                    .then((res) => {
                      setUserEmail(email);
                      navigate("/ecoName", { state: email });
                    })
                    .catch((err) => console.log(err));
                }
              }}
            >
              가입하기
            </ShortGreenBtn>
          </div>
        )}
        {visibility && !isEmailVerified && emailCodeVisible && (
          <WarningText>{message}</WarningText>
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

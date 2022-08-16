import { useEffect, useState } from "react";
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
import {
  getUserId,
  getUserName,
  setAccessToken,
  setUserEmail,
  setUserId,
} from "../../store/user/common";
import { emailValidationCheck, passwordValidationCheck } from "../../utils";
import axiosService from "../../store/axiosService";

const Regist = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [socialType, setSocialType] = useState(0);
  const [code, setCode] = useState("");

  const [visibility, setVisibility] = useState(false);

  const [message, setMessage] = useState("");
  const [emailMessage, setEmailMessage] = useState("");
  const [passwordMessage, setPasswordMessage] = useState("");
  const [passwordConfirmMessage, setPasswordConfirmMessage] = useState("");

  const [isEmail, setIsEmail] = useState(false);
  const [isCode, setIsCode] = useState(false);
  const [isPassword, setIsPassword] = useState(false);
  const [isPasswordConfirm, setIsPasswordConfirm] = useState(false);

  const displayType = visibility ? styles.visible : styles.hidden;
  const buttonText = visibility ? "재전송" : "인증";

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // 이메일 발송 요청에 성공 시 코드 입력 칸 생성
  const onclick = () => {
    setVisibility(true);
    dispatch(emailVerify({ email })).then((res) => {
      setMessage(`${res.payload.msg}`);
    });
  };

  // 이메일 형식 확인 -> 중복 확인
  const emailValidation = (e) => {
    setEmail(e.target.value);
    if (emailValidationCheck(e.target.value)) {
      setEmailMessage("이메일 형식이 틀렸어요! 다시 확인해주세요");
      setIsEmail(false);
    } else {
      dispatch(emailCheck({ email: e.target.value })).then((res) => {
        if (res.payload?.status === 200) {
          setEmailMessage("올바른 이메일 형식이에요 : )");
          setIsEmail(true);
        } else {
          setEmailMessage(res.payload.msg);
          setIsEmail(false);
        }
      });
    }
  };

  // 비밀번호 유효성 검사
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

  // 위의 비밀번호와 똑같은지 검증
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
    if (!!getUserId() && getUserId() != null) {
      navigate("/mainTree");
    }
  });
  return (
    <div className={styles.signup}>
      <img
        src={process.env.PUBLIC_URL + "logo2.png"}
        alt="earth"
        className={styles.img}
      />
      <label htmlFor="emailInput" className={styles.label}>
        이메일
      </label>
      <div className={styles.EmailInput}>
        <input
          id="emailInput"
          type="email"
          className={styles.input}
          onChange={emailValidation}
          placeholder="이메일"
        />
        <button
          type="button"
          onClick={onclick}
          className={styles.button}
          disabled={!isEmail}
        >
          {buttonText}
        </button>
      </div>
      {email.length > 0 && (
        <p className={isEmail ? styles.success : styles.fail}>{emailMessage}</p>
      )}
      {email.length === 0 && <div className={styles.test}></div>}
      {visibility && isEmail && !isCode && (
        <div>
          <div className={`${styles.EmailInput}, ${displayType}`}>
            <input
              type="text"
              className={styles.input}
              onChange={(e) => setCode(e.target.value)}
              placeholder="인증 번호"
            />
            <button
              disabled={isCode || code.trim().length == 0}
              className={styles.buttonEmail}
              type="button"
              onClick={() =>
                dispatch(emailVerifyCode({ email, code })).then((res) => {
                  if (res.payload.status === 200) {
                    setVisibility(false);
                    setIsCode(true);
                  }
                  setMessage(`${res.payload.msg}`);
                })
              }
            >
              인증
            </button>
          </div>
          <p className={isPassword ? styles.success : styles.fail}>{message}</p>
        </div>
      )}
      <div>
        <label htmlFor="passwordInput" className={styles.label}>
          비밀번호
        </label>
        <LoginInput
          type="password"
          onChange={passwordValidation}
          className={styles.input}
          placeholder="비밀번호"
        />
        {password.length > 0 && (
          <p className={isPassword ? styles.success : styles.fail}>
            {passwordMessage}
          </p>
        )}
        {password.length === 0 && <div className={styles.test}></div>}
        <label htmlFor="passwordInput2" className={styles.label}>
          비밀번호 확인
        </label>
        <LoginInput
          type="password"
          onChange={passwordConfirmValidation}
          className={styles.input}
          placeholder="비밀번호 확인"
        />
        {password2.length > 0 && (
          <p className={isPasswordConfirm ? styles.success : styles.fail}>
            {passwordConfirmMessage}
          </p>
        )}
        {password2.length === 0 && <div className={styles.test}></div>}
        <GreenBtn
          type="button"
          className={styles.signupButton}
          disabled={!(isPassword && isPasswordConfirm && isEmail && isCode)}
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
                  setUserEmail(false, email);
                  setUserId(false, res.payload.user.id);
                  setAccessToken(false, res.payload.accessToken);
                  navigate("/ecoName");
                })
                .catch((err) => console.log(err));
            }
          }}
        >
          가입하기
        </GreenBtn>
      </div>
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

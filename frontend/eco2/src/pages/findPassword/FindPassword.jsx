import React from "react";
import { useState } from "react";
import styles from "./FindPassword.module.css";
import { useNavigate } from "react-router-dom";
import { GreenBtn, LoginInput, WarningText } from "../../components/styled";
import { useDispatch, useSelector } from "react-redux";
import {
  emailCheck,
  emailVerify,
  emailVerifyCode,
  newPassword,
} from "../../store/user/userSlice";
import { emailValidationCheck, passwordValidationCheck } from "../../utils";

const FindPassword = () => {
  const [visibility, setVisibility] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [code, setCode] = useState(null);

  const [message, setMessage] = useState("");
  const [emailMessage, setEmailMessage] = useState("");
  const [passwordMessage, setPasswordMessage] = useState("");
  const [passwordConfirmMessage, setPasswordConfirmMessage] = useState("");

  const [isEmail, setIsEmail] = useState(false);
  const [isCode, setIsCode] = useState(false);
  const [isPassword, setIsPassword] = useState(false);
  const [isPasswordConfirm, setIsPasswordConfirm] = useState(false);

  const isEmailValid = useSelector((state) => state.user.isEmailValid);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const buttonText = visibility ? "재전송" : "인증";

  const handleSubmit = (e) => {
    e.preventDefault();
  };

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
      setEmailMessage("올바른 이메일 형식이에요 : )");
      setIsEmail(true);
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

  return (
    <div>
      <h2 className={styles.title}>비밀번호 재설정</h2>
      <form onSubmit={handleSubmit}>
        <input
          onChange={emailValidation}
          type="email"
          placeholder="이메일"
          className={styles.input}
        />
        <button onClick={onclick} className={styles.button}>
          {buttonText}
        </button>
        {email.length > 0 && (
          <p className={isEmail ? styles.success : styles.fail}>
            {emailMessage}
          </p>
        )}
        {email.length === 0 && <div className={styles.test}></div>}
        {visibility && isEmail && (
          <div>
            <div className={styles.EmailInput}>
              <input
                type="text"
                className={styles.inputEmail}
                onChange={(e) => setCode(e.target.value)}
                placeholder="인증 번호"
              />
              <button
                onClick={() =>
                  dispatch(emailVerifyCode({ email, code })).then((res) => {
                    if (res.payload.status === 200) {
                      setVisibility(false);
                      setIsCode(true);
                    }
                    setMessage(`${res.payload.msg}`);
                  })
                }
                className={styles.buttonEmail}
              >
                인증
              </button>
            </div>
            <p className={isPassword ? styles.success : styles.fail}>
              {message}
            </p>
          </div>
        )}
      </form>
      <form onSubmit={handleSubmit}>
        <LoginInput
          onChange={passwordValidation}
          type="password"
          placeholder="새 비밀번호"
        />
        {password.length > 0 && (
          <p className={isPassword ? styles.success : styles.fail}>
            {passwordMessage}
          </p>
        )}
        {password.length === 0 && <div className={styles.test}></div>}

        <LoginInput
          onChange={passwordConfirmValidation}
          type="password"
          placeholder="새 비밀번호 확인"
        />
        {password2.length > 0 && (
          <p className={isPasswordConfirm ? styles.success : styles.fail}>
            {passwordConfirmMessage}
          </p>
        )}
        {password2.length === 0 && <div className={styles.test}></div>}
        <GreenBtn
          className={styles.changeButton}
          disabled={!(isPassword && isPasswordConfirm && isEmail && isCode)}
          onClick={() => {
            dispatch(
              newPassword({
                email: email,
                password: password,
              })
            );
          }}
        >
          비밀번호 변경
        </GreenBtn>
      </form>
    </div>
  );
};

export default FindPassword;

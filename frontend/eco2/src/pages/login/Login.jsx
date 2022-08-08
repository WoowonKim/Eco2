import { React, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { login, googleLogin } from "../../store/user/userSlice";
import styles from "./Login.module.css";
import { GreenBtn, LoginInput, WarningText } from "../../components/styled";
import { signInGoogle, auth } from "../../store/firebase";
import {
  getToken,
  setAccessToken,
  setUserEmail,
  setUserId,
  setUserName,
} from "../../store/user/common";
import { emailValidationCheck } from "../../utils";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginFailMsg, setLoginFailMsg] = useState(false);
  const [autoLogin, setAutoLogin] = useState(false);

  const [emailMessage, setEmailMessage] = useState("");
  const [isEmail, setIsEmail] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();

  const redirectPath = location.state?.path || "/mainTree";

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

  // 로그인 요청
  // 요청 성공시 localstorage에 이메일과 이름 저장 후 메인피드로 이동
  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(login({ email: email, password: password, socialType: 0 }))
      .then((res) => {
        if (res.payload.status === 200) {
          setLoginFailMsg(false);
          setUserEmail(autoLogin, email);
          setUserName(autoLogin, res.payload.user.name);
          setUserId(autoLogin, res.payload.user.id);
          setAccessToken(autoLogin, res.payload.accessToken);
          navigate(redirectPath, { replace: true });
        }
        setLoginFailMsg(true);
      })
      .catch((err) => console.log(err));
  };

  // 구글 로그인
  // 요청 성공시 localstorage에 이메일과 이름 저장 후 메인피드로 이동
  const onGoogleLogin = async () => {
    const data = await signInGoogle();
    auth.currentUser
      .getIdToken(true)
      .then(function (idToken) {
        dispatch(
          googleLogin({
            socialType: 1,
            idToken: idToken,
          })
        ).then((res) => {
          setUserEmail(autoLogin, data.additionalUserInfo.profile.email);
          setUserName(autoLogin, data.additionalUserInfo.profile.name);
          setAccessToken(autoLogin, res.payload.accessToken);
          // setUserId(data.additionalUserInfo.profile.id);
          navigate(redirectPath, { replace: true });
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  useEffect(() => {
    if (!!getToken()) {
      navigate("/mainTree");
    }
  }, []);

  const onKakaoLogin = async () => {
    window.location.href = `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${process.env.REACT_APP_KAKAO_REST_API_KEY}&redirect_uri=http://localhost:3000/kakao&scope=account_email`;
  }

  return (
    <div className={styles.login}>
      <img
        src={`${process.env.PUBLIC_URL}/logo.png`}
        alt="earth"
        className={styles.img}
      />
      <form onSubmit={handleSubmit} className={styles.form}>
        <LoginInput
          type="email"
          className={styles.input}
          required
          value={email}
          placeholder="이메일"
          onChange={emailValidation}
        />
        {email.length > 0 && (
          <p className={isEmail ? styles.success : styles.fail}>
            {emailMessage}
          </p>
        )}
        {email.length === 0 && <div className={styles.test}></div>}
        <LoginInput
          type="password"
          className={styles.input}
          required
          value={password}
          placeholder="비밀번호"
          onChange={(e) => setPassword(e.target.value)}
        />
        <div className={styles.radio}>
          <input
            type="checkbox"
            onChange={(e) => setAutoLogin(e.target.checked)}
          />
          <span className={styles.radioText}>자동 로그인</span>
        </div>
        {loginFailMsg ? (
          <WarningText>
            등록된 이메일이 없거나 비밀번호가 일치하지 않습니다.
          </WarningText>
        ) : null}
        <GreenBtn
          type="submit"
          disabled={!(isEmail && password)}
          className={styles.loginButton}
        >
          로그인
        </GreenBtn>
      </form>
      <div className={styles.lineGroup}>
        <hr className={styles.shortLine} />
        <span className={styles.lineText}>SNS로 3초만에 시작하기</span>
        <hr className={styles.longLine} />
      </div>
      <div className={styles.socialGroup}>
        <button onClick={onGoogleLogin} className={styles.socialButton}>
          <img
            src="google_logo.png"
            alt="social_logo"
            className={styles.socialLogo}
          />
        </button>
        <button onClick={onKakaoLogin} className={styles.socialButton}>
          <img
            src="kakao_logo.png"
            alt="social_logo"
            className={styles.socialLogo}
          />
        </button>
      </div>
      <div className={styles.lineGroup}>
        <hr className={styles.shortLine2} />
        <span className={styles.lineText}>제가</span>
        <hr className={styles.longLine2} />
      </div>
      <Link to="/regist" className={styles.link}>
        <p className={styles.text}>아직 회원이 아니에요</p>
      </Link>
      <Link to="/findpassword" className={styles.link}>
        <p className={styles.text}>비밀번호를 잊어버렸어요</p>
      </Link>
    </div>
  );
}

export default Login;

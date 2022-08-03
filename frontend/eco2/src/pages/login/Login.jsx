import { React, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { login, googleLogin } from "../../store/user/userSlice";
import styles from "./Login.module.css";
import { GreenBtn, LoginInput, WarningText } from "../../components/styled";
import { signInGoogle, auth } from "../../store/firebase";
import { setUserEmail, setUserName } from "../../store/user/common";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // const [socialType, setSocialType] = useState("email");
  const [loginFailMsg, setLoginFailMsg] = useState(false);

  let currUser = useSelector((state) => state.user);
  let navigate = useNavigate();

  const dispatch = useDispatch();
  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(login({ email: email, password: password, socialType: 0 }))
      .then((res) => {
        if (res.payload.status === 200) {
          setLoginFailMsg(false);
          setUserEmail(email);
          setUserName(res.payload.user.name);
          navigate("/mainFeed");
        }
        setLoginFailMsg(true);
      })
      .catch((err) => console.log(err));
  };

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
          console.log(data.additionalUserInfo.profile.name);
          setUserEmail(data.additionalUserInfo.profile.email);
          setUserName(data.additionalUserInfo.profile.name);
          navigate("/mainFeed");
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  };
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
          required
          value={email}
          placeholder="이메일"
          onChange={(e) => setEmail(e.target.value)}
        />
        <LoginInput
          type="password"
          required
          value={password}
          placeholder="비밀번호"
          onChange={(e) => setPassword(e.target.value)}
        />
        <div className={styles.radio}>
          <input type="checkbox" />
          <span className={styles.radioText}>자동 로그인</span>
        </div>
        {loginFailMsg ? (
          <WarningText>
            등록된 이메일이 없거나 비밀번호가 일치하지 않습니다.
          </WarningText>
        ) : null}
        <GreenBtn type="submit">로그인</GreenBtn>
      </form>
      <div className={styles.lineGroup}>
        <span className={styles.lineText}>SNS로 3초만에 시작하기</span>
      </div>
      <div className={styles.socialGroup}>
        <button onClick={onGoogleLogin} className={styles.socialButton}>
          <img
            src="google_logo.png"
            alt="social_logo"
            className={styles.socialLogo}
          />
        </button>
        <button
          // onClick={() => {
          //   setSocialType(2);
          // }}
          className={styles.socialButton}
        >
          <img
            src="kakao_logo.png"
            alt="social_logo"
            className={styles.socialLogo}
          />
        </button>
      </div>
      <div className={styles.lineGroup}>
        <span className={styles.lineText}>제가</span>
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

import { React, useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { login } from "../../store/user/userSlice";
import styles from "./Login.module.css";
import { GreenBtn } from "../../components/styled";
function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [socialType, setSocialType] = useState(0);

  const dispatch = useDispatch();

  const handleSubmit = event => {
    event.preventDefault();
    dispatch(
      login({ email: email, password: password, socialType: socialType })
    );
  };

  return (
    <div className={styles.login}>
      <img
        src={process.env.PUBLIC_URL + "logo.png"}
        alt="earth"
        className={styles.img}
      />
      <form onSubmit={handleSubmit} className={styles.form}>
        <input
          type="email"
          required
          value={email}
          placeholder="이메일"
          className={styles.input}
          onChange={e => setEmail(e.target.value)}
        />
        <input
          type="password"
          required
          value={password}
          placeholder="비밀번호"
          className={styles.input}
          onChange={e => setPassword(e.target.value)}
        />
        <div className={styles.radio}>
          <input type="checkbox" />
          <span className={styles.radioText}>자동 로그인</span>
        </div>
        <GreenBtn type="submit" className={styles.button}>
          로그인
        </GreenBtn>
      </form>
      <div className={styles.lineGroup}>
        <hr className={styles.shortLine} />
        <span className={styles.lineText}>SNS로 3초만에 시작하기</span>
        <hr className={styles.longLine} />
      </div>
      <div className={styles.socialGroup}>
        <button
          onClick={() => {
            setSocialType(1);
          }}
          className={styles.socialButton}
        >
          <img
            src="google_logo.png"
            alt="social_logo"
            className={styles.socialLogo}
          />
        </button>
        <button
          onClick={() => {
            setSocialType(2);
          }}
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
      <Link to="/missionMain">
        <button>GoMission</button>
      </Link>
    </div>
  );
}

export default Login;

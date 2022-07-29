import React, { useState } from "react";
import styles from "./Econame.module.css";
import { GreenBtn, LoginInput, WarningText } from "../../components/styled";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { ecoName, ecoNameVerify } from "../../store/user/userSlice";

const Econame = () => {
  const [econame, setEconame] = useState("");
  const [ecoNameCheck, setEcoNameCheck] = useState(false);

  const isEcoNameValid = useSelector((state) => state.user.isEcoNameValid);
  const isEcoNameVerified = useSelector(
    (state) => state.user.isEcoNameVerified
  );

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const handleSubmit = (event) => {
    event.preventDefault();
  };

  const onClick = () => {
    dispatch(ecoName({ econame, email: location?.state }));
    console.log(isEcoNameVerified);
    if (isEcoNameVerified) {
      navigate("/mainFeed");
    }
  };
  return (
    <div className={styles.login}>
      <img
        src={process.env.PUBLIC_URL + "logo.png"}
        alt="earth"
        className={styles.img}
      />
      <h2 className={styles.text}>가입을 축하드립니다!</h2>
      <h3 className={styles.text}>
        Eco2에서 사용할 개성있는 이름을 정해주세요
      </h3>
      <form onSubmit={handleSubmit} className={styles.form}>
        <input
          type="text"
          placeholder="최대 8글자"
          className={styles.input}
          onChange={(e) => setEconame(e.target.value)}
        />
        {isEcoNameValid ? (
          <button onClick={onClick} className={styles.button}>
            시작하기
          </button>
        ) : (
          <button
            onClick={() => {
              dispatch(ecoNameVerify({ econame }));
              setEcoNameCheck(true);
            }}
            className={styles.button}
          >
            중복 확인하기
          </button>
        )}
      </form>
    </div>
  );
};

export default Econame;

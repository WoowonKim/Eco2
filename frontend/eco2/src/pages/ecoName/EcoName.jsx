import React, { useState } from "react";
import styles from "./Econame.module.css";
import { WarningText } from "../../components/styled";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { ecoName, ecoNameVerify } from "../../store/user/userSlice";

const Econame = () => {
  const [econame, setEconame] = useState("");
  const [ecoNameCheck, setEcoNameCheck] = useState(false);
  const [isEcoNameValid, setIsEcoNameValid] = useState(false);
  const [user, setUser] = useState(false);
  const [message, setMessage] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const onClick = () => {
    dispatch(ecoName({ econame, email: location?.state }))
      .then((res) => {
        if (res.payload.status === 200) {
          navigate("/mainTree");
        }
        setUser(true);
        setMessage(`${res.payload.msg}`);
      })
      .catch((err) => {
        console.log(err);
      });
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
      <form onSubmit={(e) => e.preventDefault()} className={styles.form}>
        <input
          type="text"
          placeholder="최대 8글자"
          className={styles.input}
          onChange={(e) => setEconame(e.target.value)}
        />
        {isEcoNameValid && !ecoNameCheck && (
          <WarningText>{message}</WarningText>
        )}
        {user && <WarningText>{message}</WarningText>}
        {isEcoNameValid && ecoNameCheck ? (
          <button onClick={onClick} className={styles.button}>
            시작하기
          </button>
        ) : (
          <button
            onClick={() => {
              dispatch(ecoNameVerify({ econame })).then((res) => {
                if (res.payload.status === 200) {
                  setEcoNameCheck(true);
                }
                setIsEcoNameValid(true);
                setMessage(`${res.payload.msg}`);
              });
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

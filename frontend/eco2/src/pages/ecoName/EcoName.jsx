import React, { useState } from "react";
import styles from "./Econame.module.css";
import { WarningText } from "../../components/styled";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { ecoName, ecoNameVerify } from "../../store/user/userSlice";
import { getUserEmail, setUserName } from "../../store/user/common";
import { nameLengthValidation } from "../../utils";

const Econame = () => {
  const [econame, setEconame] = useState("");
  const [isName, setIsName] = useState(false);
  const [nameMessage, setNameMessage] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const email = getUserEmail();

  const ecoNameValidation = (e) => {
    setEconame(e.target.value);
    if (nameLengthValidation(e.target.value)) {
      setNameMessage("3글자 이상 8글자 이하로 입력해주세요.");
      setIsName(false);
    } else {
      dispatch(ecoNameVerify({ econame: e.target.value })).then((res) => {
        if (res.payload.status === 200) {
          setNameMessage("올바른 이름 형식입니다 :)");
          setIsName(true);
        } else {
          setIsName(false);
          setNameMessage(`${res.payload.msg}`);
        }
      });
    }
  };

  const onClick = () => {
    dispatch(ecoName({ econame, email }))
      .then((res) => {
        if (res.payload.status === 200) {
          setUserName(econame);
          navigate("/mainTree");
        }
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
          onChange={ecoNameValidation}
        />
        <WarningText>{nameMessage}</WarningText>
        <button onClick={onClick} className={styles.button} disabled={!isName}>
          시작하기
        </button>
      </form>
    </div>
  );
};

export default Econame;

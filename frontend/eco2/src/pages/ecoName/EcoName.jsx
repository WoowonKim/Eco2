import React from "react";
import styles from "./Econame.module.css";
import { GreenBtn, LoginInput, WarningText } from "../../components/styled";

const Econame = () => {
  const handleSubmit = (event) => {
    event.preventDefault();
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
        <input type="text" placeholder="최대 8글자" className={styles.input} />
        <button className={styles.button}>시작하기</button>
      </form>
    </div>
  );
};

export default Econame;

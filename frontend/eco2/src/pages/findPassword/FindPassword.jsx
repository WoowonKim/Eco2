import React from "react";
import { useState } from "react";
import styles from "./FindPassword.module.css";
import { useNavigate } from "react-router-dom";

const FindPassword = () => {
  const navigate = useNavigate();
  const [visibility, setVisibility] = useState(false);
  const [formVisibility, setFormVisibility] = useState(false);

  const displayType = visibility ? styles.visible : styles.hidden;
  const formDisplayType = formVisibility
    ? styles.formHidden
    : styles.formVisible;
  const changeFormDisplayType = formVisibility
    ? styles.changeFormVisible
    : styles.changeFormHidden;

  const handleSubmit = (event) => {
    event.preventDefault();
  };
  return (
    <div>
      <h2 className={styles.title}>비밀번호 재설정</h2>
      <form onSubmit={handleSubmit} className={`${formDisplayType}`}>
        <input type="text" placeholder="이메일" className={styles.input} />
        <button onClick={() => setVisibility(true)} className={styles.button}>
          인증 메일 보내기
        </button>
        <div className={`${styles.EmailInput}, ${displayType}`}>
          <input
            type="text"
            className={styles.inputEmail}
            placeholder="인증 번호"
          />
          <button
            onClick={() => setFormVisibility(true)}
            className={styles.buttonEmail}
          >
            인증하기
          </button>
        </div>
      </form>
      <form onSubmit={handleSubmit} className={`${changeFormDisplayType}`}>
        <input type="text" placeholder="새 비밀번호" className={styles.input} />
        <input
          type="password"
          placeholder="새 비밀번호 확인"
          className={styles.input}
        />
        <button
          className={styles.button}
          onClick={() => {
            navigate("/");
          }}
        >
          비밀번호 변경
        </button>
      </form>
    </div>
  );
};

export default FindPassword;

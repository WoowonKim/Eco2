import React from "react";
import styles from "./Error.module.css";
import { useLocation, useNavigate } from "react-router-dom";

const Error = () => {
  let navigate = useNavigate();

  return (
    <div>
      <div className={styles.text}>페이지를 찾을 수 없습니다.</div>
      <div
      onClick={() => {
          navigate("/mainTree");
        }}>
      <i
        className={`fa-solid fa-tree ${styles.icon}`}
      ></i>
      <div className={styles.home}>홈으로 이동하기</div>
      </div>
    </div>
  );
};

export default Error;

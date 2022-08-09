import React from "react";
import { useNavigate } from "react-router-dom";
import { getUserId } from "../../store/user/common";
import styles from "./Header.module.css";

const Header = () => {
  let navigate = useNavigate();
  return (
    <header className={styles.Header}>
      <div
        onClick={() => {
          navigate("/mainTree");
        }}
      >
        <img
          src={`${process.env.PUBLIC_URL}/logo.png`}
          className={styles.Img}
        ></img>
        <img
          src={`${process.env.PUBLIC_URL}/logoText.png`}
          className={styles.Img}
        ></img>
      </div>
      <nav>
        <img
          src={`http://localhost:8002/img/profile/${getUserId()}`}
          alt="profileImg"
          className={styles.profileImg}
          onClick={() => {
            navigate("/profile");
          }}
        />
        <i className="fa-solid fa-comments"></i>
      </nav>
    </header>
  );
};

export default Header;

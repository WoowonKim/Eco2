import React from "react";
import { useNavigate } from "react-router-dom";
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
        <i
          onClick={() => {
            navigate("/profile");
          }}
          className="fa-solid fa-users"
        ></i>
        <i className="fa-solid fa-comments"></i>
      </nav>
    </header>
  );
};

export default Header;

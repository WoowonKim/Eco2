import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getUserEmail, getUserId } from "../../store/user/common";
import styles from "./Header.module.css";

const Header = () => {
  const [userId, setUserId] = useState(null);
  let navigate = useNavigate();

  useEffect(() => {
    setUserId(getUserId());
  }, [userId]);
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
        <button
          className={styles.profileButton}
          onClick={() => {
            navigate(`/profile/${getUserId()}`);
          }}
        >
          <img
            src={`http://localhost:8002/img/profile/${getUserId()}`}
            alt="profileImg"
            className={styles.profileImg}
          />
        </button>

        <button
          className={styles.profileButton}
          onClick={() => {
            navigate("/chatting");
          }}
        >
          <i className="fa-solid fa-comments"></i>
        </button>
      </nav>
    </header>
  );
};

export default Header;

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  getAccessToken,
  getUserEmail,
  getUserId,
} from "../../store/user/common";
import { userInformation } from "../../store/user/userSettingSlice";
import styles from "./Header.module.css";
import { useDispatch } from "react-redux";

const Header = ({ admin }) => {
  const [userId, setUserId] = useState(getUserId());

  let navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    setUserId(getUserId());
    if (!userId) {
      return;
    }
  }, [userId]);
  return (
    <header className={styles.Header}>
      <div
        onClick={() => {
          navigate("/mainTree");
        }}
      >
        <img
          src={`${process.env.PUBLIC_URL}/logo2.png`}
          className={styles.Img}
        ></img>
        <img
          src={`${process.env.PUBLIC_URL}/logoText2.png`}
          className={styles.Img}
        ></img>
      </div>
      <nav>
        {admin && (
          <button
            className={styles.profileButton}
            onClick={() => {
              navigate(`/report`);
            }}
          >
            <i
              className={`fa-solid fa-circle-exclamation ${styles.headerIcon}`}
            ></i>
          </button>
        )}

        <button
          className={styles.profileButton}
          onClick={() => {
            navigate("/chatting");
          }}
        >
          <i className={`fa-solid fa-comments ${styles.headerIcon}`}></i>
        </button>
        <button
          className={styles.profileButton}
          onClick={() => {
            navigate(`/profile/${getUserId()}`);
          }}
        >
          <img
            src={`${process.env.REACT_APP_BE_HOST}img/profile/${userId}`}
            alt="profileImg"
            className={styles.profileImg}
          />
        </button>
      </nav>
    </header>
  );
};

export default Header;

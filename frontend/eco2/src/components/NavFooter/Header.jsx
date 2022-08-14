import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  getAccessToken,
  getUserEmail,
  getUserId,
} from "../../store/user/common";
import styles from "./Header.module.css";

const Header = () => {
  const [userId, setUserId] = useState(getUserId());
  const [imgSrc, setImgSrc] = useState("");

  let navigate = useNavigate();

  useEffect(() => {
    setUserId(getUserId());
    if (!userId) {
      return;
    }
    const headers = new Headers();
    headers.append("Auth-accessToken", getAccessToken());
    const options = {
      method: "GET",
      headers: headers,
    };
    fetch(`http://localhost:8002/img/profile/${userId}`, options)
      .then((res) => {
        res.arrayBuffer().then(function (buffer) {
          const url = window.URL.createObjectURL(new Blob([buffer]));
          setImgSrc(url);
        });
      })
      .catch((err) => {
        console.log(err);
      });
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
            navigate(`/profile/${getUserId()}`, { replace: true });
          }}
        >
          <img
            src={process.env.REACT_APP_BE_HOST + `img/profile/${getUserId()}`}
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

        <button
          className={styles.profileButton}
          onClick={() => {
            navigate("/report");
          }}
        >
          <i className="fa-solid">신고</i>
        </button>
      </nav>
    </header>
  );
};

export default Header;

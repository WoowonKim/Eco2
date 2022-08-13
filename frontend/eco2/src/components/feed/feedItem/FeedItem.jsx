import React from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./FeedItem.module.css";

const FeedItem = ({
  id,
  userId,
  userName,
  category,
  content,
  postImgUrl,
  like,
  userEmail,
}) => {
  const navigate = useNavigate();
  return (
    <Link to={`/post/${id}`} className={styles.link}>
      <div className={styles.list}>
        {/* <div className={styles.title}>
          <div
            className={styles.profile}
            onClick={() =>
              navigate(`/profile/${userId}`, { state: { userEmail } })
            }
          >
            <img
              src={`${process.env.REACT_APP_BE_HOST}img/profile/${userId}`}
              alt="profileImg"
              className={styles.profileImg}
            />
            <p className={styles.user}>{userName}님</p>
          </div>
          <div className={styles.buttonGroup}>
            <button className={styles.button}>
              <i className={`fa-solid fa-user-plus ${styles.icon}`}></i>
            </button>
            <button className={styles.button}>
              <i className={`fa-solid fa-paper-plane ${styles.icon}`}></i>
            </button>
          </div>
        </div> */}
        {/* <hr className={styles.line} /> */}
        <img
          src={`${process.env.REACT_APP_BE_HOST}img/post/${id}`}
          alt="postImg"
          className={styles.postImg}
        />
        <div
            className={styles.profile}
            onClick={() =>
              navigate(`/profile/${userId}`, { state: { userEmail } })
            }
          >
            <img
              src={`http://localhost:8002/img/profile/${userId}`}
              alt="profileImg"
              className={styles.profileImg}
            />
            <p className={styles.user}>{userName}님</p>
            <div className={styles.heart}>
            <i className={`fa-solid fa-heart ${styles.heartIcon}`}></i> {like}
          </div>
          </div>
        
        {/* <p className={styles.content}>{content}</p> */}
      </div>
    </Link>
  );
};

export default FeedItem;

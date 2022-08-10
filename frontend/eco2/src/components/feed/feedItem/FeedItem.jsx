import React from "react";
import { Link } from "react-router-dom";
import styles from "./FeedItem.module.css";

const FeedItem = ({
  id,
  userId,
  userName,
  category,
  content,
  postImgUrl,
  like,
}) => {
  // console.log(key)
  return (
    <Link to={`/post/${id}`} className={styles.link}>
      <div className={styles.list}>
        <div className={styles.title}>
          <img
            // src={`http://localhost:8002/img/profile/${userId}`}
            alt="profileImg"
            className={styles.profileImg}
          />
          <p className={styles.user}>{userName}님</p>
          {/* <div className={styles.buttonGroup}>
            <button className={styles.button}>
              <i className={`fa-solid fa-user-plus ${styles.icon}`}></i>
            </button>
            <button className={styles.button}>
              <i className={`fa-solid fa-paper-plane ${styles.icon}`}></i>
            </button>
          </div> */}
        </div>
        <hr className={styles.line} />
        <img
          // src={`http://localhost:8002/img/post/${id}`}
          alt="postImg"
          className={styles.postImg}
        />
        <div className={styles.iconGroup}>
          <div className={styles.heart}>
            <i className={`fa-solid fa-heart ${styles.heartIcon}`}></i> {like}
          </div>
        </div>
        <p className={styles.content}>{content}</p>
      </div>
    </Link>
  );
};

export default FeedItem;

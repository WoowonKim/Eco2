import React from "react";
import { Link } from "react-router-dom";
import styles from "./FeedItem.module.css";

const FeedItem = ({ id, user, category, content, src }) => {
  // console.log(key)
  return (
    <Link to={`/post/${id}`} className={styles.link}>
      <div className={styles.list}>
        <div className={styles.title}>
          <p className={styles.user}>{user}님의 인증글</p>
          <div className={styles.buttonGroup}>
            <button className={styles.button}>
              <i className={`fa-solid fa-user-plus ${styles.icon}`}></i>
            </button>
            <button className={styles.button}>
              <i className={`fa-solid fa-paper-plane ${styles.icon}`}></i>
            </button>
          </div>
        </div>
        <img className={styles.img} src={src} alt="img" />
        <p className={styles.content}>{content}</p>
      </div>
    </Link>
  );
};

export default FeedItem;

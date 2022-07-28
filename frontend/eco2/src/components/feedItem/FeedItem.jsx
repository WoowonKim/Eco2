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
        <img className={styles.img} src={src} alt="img" />
        <div className={styles.iconGroup}>
          <div className={styles.heart}>
            <i className={`fa-solid fa-heart ${styles.heartIcon}`}></i> 30
          </div>
          <div className={styles.comment}>
            <i className={`fa-regular fa-comment ${styles.commentIcon}`}></i> 12
          </div>
        </div>
        <p className={styles.content}>{content}</p>
      </div>
    </Link>
  );
};

export default FeedItem;

import React from 'react';
import styles from './FeedItem.module.css'

const FeedItem = ({ user, category, content, src }) => {
  return (
    <div className={styles.list}>
      <div className={styles.title}>
        <div>
          <p className={styles.user}>{user}님의 인증글</p>
        </div>
        <div className={styles.buttonGroup}>
          <button className={styles.button}>
            <i className="fa-solid fa-user-plus"></i>
          </button>
          <button className={styles.button}>
            <i className="fa-solid fa-paper-plane"></i>
          </button>
        </div>
      </div>
      <img className={styles.img} src={src} alt="img" />
      <p className={styles.content}>{content}</p>
    </div>
  );
};

export default FeedItem;
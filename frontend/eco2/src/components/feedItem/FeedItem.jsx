import React from 'react';
import styles from './FeedItem.module.css'

const FeedItem = ({ user, category, content, src }) => {
  return (
    <div className={styles.list}>
      <p className={styles.user}>{user}님의 인증글</p>
      <img className={styles.img} src={src} alt="" />
      <p className={styles.content}>{content}</p>
    </div>
  );
};

export default FeedItem;
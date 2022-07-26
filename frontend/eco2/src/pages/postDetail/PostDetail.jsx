import React from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import styles from './PostDetail.module.css'

const PostDetail = () => {
  const feedList = useSelector((state) => state.feed.feedList)
  const params = useParams()
  const feedItem = feedList.find((feed) => feed.id === Number(params.postId))

  return (
    <div>
      <h1 className={styles.title}>{ feedItem.category }</h1>
      <img className={styles.img} src={feedItem.src} alt="img" />
      <div className={styles.info}>
        <p className={styles.user}>{ feedItem.user }</p>
        <button className={styles.button}>
          <i className={`fa-solid fa-heart ${styles.heart}`}></i> 30
        </button>
      </div>
      <p className={styles.content}>{ feedItem.content }</p>
    </div>
  );
};

export default PostDetail;
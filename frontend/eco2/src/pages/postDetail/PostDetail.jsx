import React from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import CommentForm from '../../components/commentForm/CommentForm';
import CommentList from '../../components/commentList/CommentList';
import styles from './PostDetail.module.css'

const PostDetail = () => {
  const feedList = useSelector((state) => state.feed.feedList)
  const params = useParams()
  const feedItem = feedList.find((feed) => feed.id === Number(params.postId))

  return (
    <div>
      <div className={styles.title}>
        <h1 className={styles.text}>{ feedItem.category }</h1>
        <div className={styles.dropdown}>
          <i className={`fa-solid fa-ellipsis-vertical ${styles.icon}`}></i>
          <div className={styles.dropdownContent}>
            <div className={styles.dropdownItem}>
              수정 
              <i className="fa-solid fa-pencil"></i>
            </div>
            <div className={styles.dropdownItem}>
              삭제
              <i className="fa-solid fa-trash-can"></i>
            </div>
            <div className={styles.dropdownItem}>
              비공개
              <i className="fa-solid fa-lock"></i>
            </div>
          </div>
        </div>
      </div>
      <img className={styles.img} src={feedItem.src} alt="img" />
      <div className={styles.info}>
        <p className={styles.user}>{ feedItem.user }</p>
        <button className={styles.button}>
          <i className={`fa-solid fa-heart ${styles.heart}`}></i> 30
        </button>
      </div>
      <p className={styles.content}>{ feedItem.content }</p>
      <CommentList />
      <CommentForm postId={feedItem.id}/>
    </div>
  );
};

export default PostDetail;
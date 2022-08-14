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
        <img
          src={`http://localhost:8002/img/post/${id}`}
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
          <p className={styles.user}>{userName}</p>
          <div className={styles.heart}>
            {like}<i className={`fa-solid fa-heart ${styles.heartIcon}`}></i>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default FeedItem;

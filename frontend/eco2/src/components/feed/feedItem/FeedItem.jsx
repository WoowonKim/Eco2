import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { postLike } from "../../../store/post/postSlice";
import { getUserId } from "../../../store/user/common";
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
  likeUsers,
  setLikeCount,
}) => {
  const [likeUserId, setLikeUserId] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handlePostLike = () => {
    dispatch(postLike({ postId: id, userId: getUserId() })).then((res) => {
      if (res.payload.status === 200) {
        if (likeUsers !== null) {
          setLikeUserId(
            likeUsers.some((id) => {
              return id == getUserId();
            })
          );
          setLikeCount((curr) => curr + 1);
        }
      }
    });
  };

  useEffect(() => {
    if (likeUsers !== null) {
      setLikeUserId(
        likeUsers.some((id) => {
          return id == getUserId();
        })
      );
    }
  }, [likeUsers]);

  return (
    <div className={styles.list}>
      <img
        src={`${process.env.REACT_APP_BE_HOST}img/post/${id}`}
        alt="postImg"
        className={styles.postImg}
        onClick={() => navigate(`/post/${id}`)}
      />
      <div className={styles.profile}>
        <div
          className={styles.userInfo}
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
        <button className={styles.heartButton} onClick={handlePostLike}>
          {likeUserId ? (
            <i className={`fa-solid fa-heart ${styles.heart}`}></i>
          ) : (
            <i className={`fa-regular fa-heart ${styles.heart}`}></i>
          )}
          <span className={styles.likeText}>{like}</span>
        </button>
      </div>
    </div>
  );
};

export default FeedItem;

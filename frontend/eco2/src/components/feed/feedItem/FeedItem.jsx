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

      {/* <p className={styles.content}>{content}</p> */}
    </div>
  );
};

export default FeedItem;

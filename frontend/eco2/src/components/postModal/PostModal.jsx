import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { deletePost } from "../../store/mainFeed/feedSlice";
import styles from "./PostModal.module.css";

const PostModal = ({
  title,
  content,
  type,
  id,
  img,
  category,
  postContent,
  closeModal,
}) => {
  const [hidden, setHidden] = useState(false);
  const displayType = hidden ? styles.hidden : null;
  const colorType = type === "수정" ? styles.editButton : styles.warningButton;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onClick = () => {
    if (type === "삭제") {
      dispatch(deletePost({ id: id }));
      navigate("/mainFeed");
    } else {
      window.location.replace(`/post/${id}`);
    }
  };
  return (
    <div className={`${displayType} ${styles.modal}`} onClick={closeModal}>
      <div onClick={(e) => e.stopPropagation()} className={styles.modalBody}>
        <div className={styles.modalTitle}>
          {type === "수정" ? (
            <i className={`fa-regular fa-circle-check ${styles.editIcon}`}></i>
          ) : (
            <i className={`fa-regular fa-bell ${styles.deleteIcon}`}></i>
          )}
          <h2 className={styles.title}>{title}</h2>
        </div>
        <p className={styles.content}>{content}</p>
        <div className={styles.buttonGroup}>
          {type === "수정" ? (
            <Link
              to="/post"
              state={{ id, img, category, content: postContent }}
            >
              <button className={`${colorType}`}>{type}</button>
            </Link>
          ) : (
            <button onClick={onClick} className={`${colorType}`}>
              {type}
            </button>
          )}
          <button
            onClick={() => setHidden(true)}
            className={`${styles.cancleButton}`}
          >
            취소
          </button>
        </div>
      </div>
    </div>
  );
};

export default PostModal;

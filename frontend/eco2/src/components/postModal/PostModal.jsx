import React, { useState } from "react";
import { Link } from "react-router-dom";
import styles from "./PostModal.module.css";

const PostModal = ({
  title,
  content,
  type,
  id,
  img,
  category,
  postContent,
}) => {
  const [hidden, setHidden] = useState(false);
  const displayType = hidden ? styles.hidden : null;
  const colorType = type === "수정" ? styles.editButton : styles.warningButton;

  return (
    <div className={`${displayType} ${styles.modal}`}>
      <div className={styles.modalTitle}>
        <h2 className={styles.title}>{title}</h2>
      </div>
      <p className={styles.content}>{content}</p>
      <div className={styles.buttonGroup}>
        <Link to="/post" state={{ id, img, category, content: postContent }}>
          <button className={`${colorType}`}>{type}</button>
        </Link>
        <button
          onClick={() => setHidden(true)}
          className={`${styles.cancleButton}`}
        >
          취소
        </button>
      </div>
    </div>
  );
};

export default PostModal;

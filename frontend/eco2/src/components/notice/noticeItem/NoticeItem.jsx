import React from "react";
import styles from "./NoticeItem.module.css";
import { Link } from "react-router-dom";

const NoticeItem = ({
  id,
  content,
  hit,
  modifyFlag,
  registTime,
  title,
  urgentFlag,
  userName,
}) => {
  return (
    <Link to={`/notice/${id}`} className={styles.link}>
      <div className={styles.list}>
        <div className={styles.leftContent}>
          <span
            className={`${styles.number} ${styles.text} ${
              urgentFlag ? styles.urgent : null
            }`}
          >
            {urgentFlag ? "긴급" : id}
          </span>
          <span className={`${styles.text}`}>
            {title}
            <span
              className={`${styles.text} ${modifyFlag ? styles.modify : null}`}
            >
              {modifyFlag ? "수정" : null}
            </span>
          </span>
        </div>
        <div className={styles.rightContent}>
          <span className={`${styles.text}`}>{registTime}</span>
          <span className={`${styles.text}`}>{hit}</span>
        </div>
      </div>
      <hr className={styles.line} />
    </Link>
  );
};

export default NoticeItem;

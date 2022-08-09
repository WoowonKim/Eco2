import React from "react";
import styles from "./ChattingItem.module.css";
import { Link } from "react-router-dom";

const ChattingItem = ({
  key,
  id,
  toUser,
  fromUser,
  lastSendTime
}) => {
  return (
    <Link to={`/chatting/room/${id}`} className={styles.link}>
      <div className={styles.list}>
        <div className={styles.leftContent}>


        </div>
        <div className={styles.rightContent}>
          <span className={`${styles.text}`}>{id}</span>
          <span className={`${styles.text}`}>{toUser}</span>
          <span className={`${styles.text}`}>{fromUser}</span>
          <span className={`${styles.text}`}>{lastSendTime}</span>
        </div>
      </div>
      <hr className={styles.line} />
    </Link>
  );
};

export default ChattingItem;

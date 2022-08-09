import React from "react";
import styles from "./ChattingMessageItem.module.css";
import { Link } from "react-router-dom";

const ChattingMessageItem = ({
  key,
  id,
  user,
  sendDate
}) => {
  return (
      <div className={styles.list}>
        <div className={styles.leftContent}>


        </div>
        <div className={styles.rightContent}>
          <span className={`${styles.text}`}>{id}</span>
          <span className={`${styles.text}`}>{user}</span>
          <span className={`${styles.text}`}>{sendDate}</span>
        </div>
      </div>
  );
};

export default ChattingMessageItem;

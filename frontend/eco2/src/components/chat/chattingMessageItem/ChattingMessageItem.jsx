import React from "react";
import styles from "./ChattingMessageItem.module.css";
import { Link } from "react-router-dom";
import { getUserName } from "../../../store/user/common";

const ChattingMessageItem = ({ user, message, sendDate, toUser }) => {
  const name = getUserName();
  return (
    <div className={styles.list}>
      {user === name ? (
        <div className={styles.userContent}>
          <span className={`${styles.userSendDate}`}>{sendDate}</span>
          <span className={`${styles.userMessage}`}>{message}</span>
        </div>
      ) : (
        <div className={styles.friendContent}>
          <div className={styles.content}>
            <div className={styles.profileImg}>
              <img src={`${process.env.REACT_APP_BE_HOST}img/profile/${toUser.id}`} alt="profileImg" className={styles.img} />
            </div>
            <span className={`${styles.userName}`}>{user}</span>
            <span className={`${styles.message}`}>{message}</span>
            <span className={`${styles.sendDate}`}>{sendDate}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChattingMessageItem;

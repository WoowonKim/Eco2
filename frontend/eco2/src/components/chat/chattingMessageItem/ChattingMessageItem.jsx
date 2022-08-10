import React from "react";
import styles from "./ChattingMessageItem.module.css";
import { Link } from "react-router-dom";
import { getUserName } from "../../../store/user/common";

const ChattingMessageItem = ({
  key,
  id,
  user,
  message,
  sendDate
}) => {
  const name = getUserName();

  return (
    <div className={styles.list}>
      {user === name ? (
        <div className={styles.userContent}>
          <span className={`${styles.userMessage}`}>{message}</span>
          <span className={`${styles.userSendDate}`}>{sendDate}</span>
        </div>
      ) : (
        <div>
          {/* <div className={styles.leftContent}> */}
            <div className={styles.profileImg}>
              <img
                src={`${process.env.PUBLIC_URL}/logo.png`}
                alt="earth"
                className={styles.img}
              />
            </div>
          {/* </div> */}
          {/* <div className={styles.rightContent}> */}
            <span className={`${styles.userName}`}>{user}</span>
            <span className={`${styles.message}`}>{message}</span>
            <span className={`${styles.sendDate}`}>{sendDate}</span>
          {/* </div> */}
        </div>
      )}

    </div>
  );
};

export default ChattingMessageItem;

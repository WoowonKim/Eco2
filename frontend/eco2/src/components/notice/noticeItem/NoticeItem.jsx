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
      <tr className={styles.list} align="start">
        <td
          width="10%"
          className={`${styles.number} ${styles.text} ${
            urgentFlag ? styles.urgent : null
          }`}
        >
          {urgentFlag ? "긴급" : id}
        </td>
        <td width="45%" className={`${styles.text}`}>
          {urgentFlag && (
            <i className={`fa-solid fa-exclamation ${styles.urgent}`}></i>
          )}{" "}
          {""}
          {title}
          <span
            className={`${styles.text} ${modifyFlag ? styles.modify : null}`}
          >
            {modifyFlag ? "수정" : null}
          </span>
        </td>
        <td width="28%" className={`${styles.text}`}>
          {registTime.split(" ")[0]}
        </td>
        <td width="10%" className={`${styles.text}`}>
          {hit}
        </td>
      </tr>
      {/* <hr className={styles.line} /> */}
    </Link>
  );
};

export default NoticeItem;

import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./NoticeItem.module.css";

const NoticeItem = ({
  id,
  content,
  hit,
  modifyFlag,
  registTime,
  title,
  urgentFlag,
  userName,
  admin,
}) => {
  const navigate = useNavigate();
  return (
    <tr
      className={styles.list}
      align="start"
      onClick={() => navigate(`/notice/${id}`, { state: { admin } })}
    >
      <td
        width="10%"
        className={`${styles.number} ${styles.text} ${
          urgentFlag ? styles.urgent : null
        }`}
      >
        {urgentFlag ? "긴급" : id}
      </td>
      <td width="45%" className={`${styles.text} ${styles.title}`}>
        {urgentFlag && (
          <i className={`fa-solid fa-exclamation ${styles.urgent}`}></i>
        )}{" "}
        {""}
        {title}
        <span className={`${styles.text} ${modifyFlag ? styles.modify : null}`}>
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
  );
};

export default NoticeItem;

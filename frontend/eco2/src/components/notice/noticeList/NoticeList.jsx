import React from "react";
import NoticeItem from "../noticeItem/NoticeItem";
import styles from "./NoticeList.module.css";

const NoticeList = ({ notices }) => {
  return (
    <>
      {!!notices.content &&
        notices.content.map((notice) => (
          <NoticeItem
            key={notice.id}
            id={notice.id}
            content={notice.content}
            hit={notice.hit}
            modifyFlag={notice.modifyFlag}
            registTime={notice.registTime}
            title={notice.title}
            urgentFlag={notice.urgentFlag}
            userName={notice.user.name}
          />
        ))}
    </>
  );
};

export default NoticeList;

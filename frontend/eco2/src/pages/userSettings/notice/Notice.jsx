import React, { useEffect, useState } from "react";
import styles from "./Notice.module.css";
import SearchForm from "../../../components/searchForm/SearchForm";
import NoticeList from "../../../components/notice/noticeList/NoticeList";
import { useDispatch } from "react-redux";
import { noticeList } from "../../../store/admin/noticeSlice";
const Notice = () => {
  const [notices, setNotices] = useState({});
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(noticeList()).then((res) => {
      if (res.payload.status === 200) {
        setNotices(res.payload.noticeList);
      }
    });
  }, []);
  return (
    <div>
      <SearchForm />
      <div className={styles.header}>
        <div className={styles.rightHeader}>
          <span className={styles.title}>번호</span>
          <span className={styles.title}>제목</span>
        </div>
        <div className={styles.leftHeader}>
          <span className={styles.title}>등록일</span>
          <span className={styles.title}>조회수</span>
        </div>
      </div>
      <NoticeList notices={notices} />
    </div>
  );
};

export default Notice;

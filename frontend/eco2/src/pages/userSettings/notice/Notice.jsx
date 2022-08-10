import React, { useEffect, useState } from "react";
import styles from "./Notice.module.css";
import SearchForm from "../../../components/searchForm/SearchForm";
import NoticeList from "../../../components/notice/noticeList/NoticeList";
import { useDispatch } from "react-redux";
import { noticeList } from "../../../store/admin/noticeSlice";
import { getUserName } from "../../../store/user/common";
const Notice = () => {
  const [notices, setNotices] = useState({});
  const [pages, setPages] = useState(0);
  const [query, setQuery] = useState("");
  // const [pageNumber, setPageNumber] = useState(0);

  const dispatch = useDispatch();

  const pagenation = [];

  for (let i = 0; i < pages; i++) {
    pagenation.push(
      <span
        key={i}
        onClick={() => {
          dispatch(noticeList({ page: i, query })).then((res) => {
            if (res.payload.status === 200) {
              setNotices(res.payload.noticeList);
              setPages(res.payload.noticeList.totalPages);
            }
          });
        }}
        className={styles.pageNumber}
      >
        {i + 1}
      </span>
    );
  }

  const onSearch = (query) => {
    setQuery(query);
    dispatch(noticeList({ query })).then((res) => {
      if (res.payload.status === 200) {
        setNotices(res.payload.noticeList);
        setPages(res.payload.noticeList.totalPages);
      }
    });
  };

  useEffect(() => {
    dispatch(noticeList()).then((res) => {
      if (res.payload.status === 200) {
        setNotices(res.payload.noticeList);
        setPages(res.payload.noticeList.totalPages);
      }
    });
  }, []);
  return (
    <div>
      <SearchForm type={"notice"} onSearch={onSearch} />
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
      {!!pages && (
        <div className={styles.pageGroup}>
          <i className={`fa-solid fa-chevron-left ${styles.icon}`}></i>
          <span className={styles.pages}>{pagenation}</span>
          <i className={`fa-solid fa-chevron-right ${styles.icon}`}></i>
        </div>
      )}
    </div>
  );
};

export default Notice;

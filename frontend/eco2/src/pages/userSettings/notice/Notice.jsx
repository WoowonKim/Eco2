import React, { useEffect, useState } from "react";
import styles from "./Notice.module.css";
import SearchForm from "../../../components/searchForm/SearchForm";
import NoticeList from "../../../components/notice/noticeList/NoticeList";
import { useDispatch } from "react-redux";
import { noticeList } from "../../../store/admin/noticeSlice";
import { getUserName, getUserEmail } from "../../../store/user/common";
import { useLocation, useNavigate } from "react-router-dom";
import { userInformation } from "../../../store/user/userSettingSlice";
import { useRef } from "react";

const Notice = () => {
  const [notices, setNotices] = useState({});
  const [pages, setPages] = useState(0);
  const [query, setQuery] = useState("");
  const [admin, setAdmin] = useState(false);
  const [isSelected, setIsSelected] = useState(0);

  // const [pageNumber, setPageNumber] = useState(0);

  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const pageRef = useRef();

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
              setIsSelected(i);
            }
          });
        }}
        ref={pageRef}
        className={`${styles.pageNumber} ${
          isSelected === i ? styles.active : null
        }`}
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

  useEffect(() => {
    // 유저 객체 받아오기
    dispatch(userInformation({ email: getUserEmail() })).then((res) => {
      if (res.payload.user.role === "[ROLE_ADMIN]") {
        setAdmin(true);
      }
    });
  }, []);
  // console.log(pageRef.current.innerText, pages);
  return (
    <div>
      {admin && (
        <div className={styles.button}>
          <button
            className={styles.noticePost}
            onClick={() => navigate("/notice")}
          >
            작성
          </button>
        </div>
      )}
      <SearchForm type={"notice"} onSearch={onSearch} />
      <table className={styles.table}>
        <thead>
          <tr className={styles.header} align="center">
            <th width="10%" className={styles.title}>
              번호
            </th>
            <th width="45%" className={styles.title}>
              제목
            </th>
            <th width="25%" className={styles.title}>
              등록일
            </th>
            <th width="14%" className={styles.title}>
              조회수
            </th>
          </tr>
        </thead>
        {/* <div className={styles.leftHeader}> */}
        {/* </div> */}
        <tbody>
          <NoticeList notices={notices} admin={admin} />
        </tbody>
      </table>
      {!!pages && (
        <div className={styles.pageGroup}>
          <span className={styles.pages}>{pagenation}</span>
        </div>
      )}
    </div>
  );
};

export default Notice;

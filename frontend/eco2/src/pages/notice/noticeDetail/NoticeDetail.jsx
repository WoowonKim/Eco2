import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { noticeDetail } from "../../../store/admin/noticeSlice";
import styles from "./NoticeDetail.module.css";
import Notice from "../../userSettings/notice/Notice";
import { getUserName } from "../../../store/user/common";
import PostModal from "../../../components/modal/postModal/PostModal";

const NoticeDetail = () => {
  const [notice, setNotice] = useState({});
  const [visible, setVisible] = useState(false);
  const [modalType, setModalType] = useState("");
  const [name, setName] = useState("");
  const [registTime, setRegistTime] = useState("");
  const [next, setNext] = useState(0);
  const [prev, setPrev] = useState(0);
  const [index, setIndex] = useState(-1);

  const params = useParams();
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  const displayType = visible ? styles.visible : styles.hidden;

  useEffect(() => {
    if (!name || !notice.registTime) {
      return;
    }
    setRegistTime(notice.registTime.split(" ")[0]);
  }, [name, notice.registTime, registTime]);

  useEffect(() => {
    // console.log(
    //   "now",
    //   location.state.notices[location.state.index - 1].id,
    //   location.state.notices[location.state.index].id,
    //   location.state.notices[location.state.index + 1].id,
    //   location.state?.index
    // );
    setName(getUserName());
    dispatch(noticeDetail({ noticeId: params.noticeId })).then((res) => {
      if (res.payload.status === 200) {
        setNotice(res.payload.notice);
        if (location.state?.index) {
          setIndex(location.state.index);
          if (location.state?.notices.length > location.state.index + 1) {
            dispatch(
              noticeDetail({
                noticeId: location.state.notices[location.state.index + 1].id,
              })
            ).then((res) => {
              if (res.payload?.status === 200) {
                setPrev(res.payload?.notice);
              }
            });
          } else {
            setPrev(false);
          }
          if (0 <= location.state.index - 1) {
            dispatch(
              noticeDetail({
                noticeId: location.state.notices[location.state.index - 1].id,
              })
            ).then((res) => {
              if (res.payload?.status === 200) {
                setNext(res.payload?.notice);
              }
            });
          } else {
            setNext(false);
          }
        }
      }
    });
  }, [params.noticeId, location.state?.index]);
  return (
    <div className={styles.notice}>
      <div className={styles.header}>
        <span
          className={`${styles.title} ${
            notice.urgentFlag ? styles.urgent : null
          }`}
        >
          {notice.urgentFlag ? `[긴급] ${notice.title}` : notice.title}
        </span>
        {location.state?.admin && (
          <div className={styles.dropdown}>
            <i className={`fa-solid fa-ellipsis-vertical ${styles.icon}`}></i>
            <div className={styles.dropdownContent}>
              {name === notice.user?.name && (
                <div>
                  <button
                    onClick={() => {
                      setVisible(!visible);
                      setModalType("수정");
                    }}
                    className={styles.dropdownItem}
                  >
                    수정
                    <i
                      className={`fa-solid fa-pencil ${styles.dropdownIcon}`}
                    ></i>
                  </button>
                  <button
                    onClick={() => {
                      setVisible(!visible);
                      setModalType("삭제");
                    }}
                    className={styles.dropdownItem}
                  >
                    삭제
                    <i
                      className={`fa-solid fa-trash-can ${styles.dropdownIcon}`}
                    ></i>
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
      {visible && modalType === "수정" && (
        <PostModal
          title={"게시물 수정"}
          content={"게시물을 수정하시겠습니까"}
          type={"수정"}
          noticeId={notice.id}
          noticeContent={notice.content}
          noticeTitle={notice.title}
          closeModal={() => setVisible(!visible)}
        />
      )}
      {visible && modalType === "삭제" && (
        <PostModal
          className={`${displayType}`}
          title={"게시물 삭제"}
          content={"게시물을 삭제하시겠습니까"}
          type={"삭제"}
          noticeId={notice.id}
          closeModal={() => setVisible(!visible)}
        />
      )}
      <div className={styles.info}>
        {/* <span className={styles.text}>{notice.user?.name}</span> */}
        <span className={styles.text}>등록일 : {registTime}</span>
        <span className={styles.text}>조회수 : {notice.hit}</span>
      </div>
      <pre className={styles.content}>{notice.content}</pre>
      <div className={styles.otherPage}>
        {prev ? (
          <div
            className={styles.pageContainer}
            onClick={() => {
              navigate(`/notice/${location.state.prev.id}`, {
                state: {
                  admin: location.state?.admin,
                  next,
                  prev,
                  index: index + 1,
                  notices: location.state?.notices,
                },
              });
            }}
          >
            <span className={styles.page}>이전</span>
            <span className={styles.pageTitle}>
              {location.state.prev.title}
            </span>
          </div>
        ) : (
          <div className={styles.pageContainer}>
            <span className={styles.page}>이전</span>
            <span className={styles.pageTitle}>이전글이 없습니다.</span>
          </div>
        )}
        {next ? (
          <div
            className={styles.pageContainer}
            onClick={() => {
              navigate(`/notice/${location.state.next.id}`, {
                state: {
                  admin: location.state?.admin,
                  next,
                  prev,
                  index: index - 1,
                  notices: location.state?.notices,
                },
              });
            }}
          >
            <span className={styles.page}>다음</span>
            <span className={styles.pageTitle}>
              {location.state.next.title}
            </span>
          </div>
        ) : (
          <div className={styles.pageContainer}>
            <span className={styles.page}>다음</span>
            <span className={styles.pageTitle}>다음글이 없습니다.</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default NoticeDetail;

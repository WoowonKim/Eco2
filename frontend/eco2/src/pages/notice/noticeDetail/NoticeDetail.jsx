import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
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

  const params = useParams();
  const dispatch = useDispatch();

  const displayType = visible ? styles.visible : styles.hidden;

  useEffect(() => {
    setName(getUserName());
    dispatch(noticeDetail({ noticeId: params.noticeId })).then((res) => {
      if (res.payload.status === 200) {
        setNotice(res.payload.notice);
      }
    });
  }, []);
  console.log(name, notice.user?.name);
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
      </div>
      {visible && modalType === "수정" && (
        <PostModal
          // className={`${displayType} ${scrollType}`}
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
        <span className={styles.text}>{notice.user?.name}</span>
        <span className={styles.text}>등록일 : {notice.registTime}</span>
        <span className={styles.text}>조회수 : {notice.hit}</span>
      </div>
      <p className={styles.content}>{notice.content}</p>
      <hr />
      <Notice />
    </div>
  );
};

export default NoticeDetail;

import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import CommentForm from "../../components/commentForm/CommentForm";
import CommentList from "../../components/commentList/CommentList";
import styles from "./PostDetail.module.css";
import PostModal from "../../components/postModal/PostModal";
import ReportModal from "../../components/reportModal/ReportModal";

const PostDetail = () => {
  const [visible, setVisible] = useState(null);
  const [modalType, setModalType] = useState("");
  const feedList = useSelector((state) => state.feed);
  const params = useParams();
  const feedItem = feedList.find((feed) => feed.id === Number(params.postId));
  const displayType = visible ? styles.visible : styles.hidden;

  return (
    <div>
      <div className={styles.title}>
        <h1 className={styles.text}>{feedItem.category}</h1>
        <div className={styles.dropdown}>
          <i className={`fa-solid fa-ellipsis-vertical ${styles.icon}`}></i>
          <div className={styles.dropdownContent}>
            <button
              onClick={() => {
                setVisible(!visible);
                setModalType("수정");
              }}
              className={styles.dropdownItem}
            >
              수정
              <i className={`fa-solid fa-pencil ${styles.dropdownIcon}`}></i>
            </button>
            <button
              onClick={() => {
                setVisible(!visible);
                setModalType("삭제");
              }}
              className={styles.dropdownItem}
            >
              삭제
              <i className={`fa-solid fa-trash-can ${styles.dropdownIcon}`}></i>
            </button>
            <button className={styles.dropdownItem}>
              비공개
              <i className={`fa-solid fa-lock ${styles.dropdownIcon}`}></i>
            </button>
            <button 
              onClick={() => {
                setVisible(!visible);
                setModalType("신고");
              }}
              className={styles.dropdownItem}
            >
              신고
              <i className={`fa-solid fa-circle-exclamation ${styles.dropdownIcon}`}></i>
            </button>
          </div>
        </div>
      </div>
      {visible && modalType === "수정" && (
        <PostModal
          className={`${displayType}`}
          title={"게시물 수정"}
          content={"게시물을 수정하시겠습니다."}
          type={"수정"}
          id={feedItem.id}
          img={feedItem.src}
          category={feedItem.category}
          postContent={feedItem.content}
        />
      )}
      {visible && modalType === "삭제" && (
        <PostModal
          className={`${displayType}`}
          title={"게시물 삭제"}
          content={"게시물을 삭제하시겠습니다."}
          type={"삭제"}
          id={feedItem.id}
        />
      )}
      {visible && modalType === "신고" && (
        <ReportModal
          className={`${displayType}`}
          title={"게시물 삭제"}
          content={"게시물을 삭제하시겠습니다."}
          type={"삭제"}
          id={feedItem.id}
        />
      )}
      <img className={styles.img} src={feedItem.src} alt="img" />
      <div className={styles.info}>
        <p className={styles.user}>{feedItem.user}</p>
        <button className={styles.button}>
          <i className={`fa-solid fa-heart ${styles.heart}`}></i> 30
        </button>
      </div>
      <p className={styles.content}>{feedItem.content}</p>
      <CommentList id={feedItem.id} />
      <CommentForm postId={feedItem.id} />
    </div>
  );
};

export default PostDetail;

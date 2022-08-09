import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { noticeDelete } from "../../../store/admin/noticeSlice";
import { commentDelete } from "../../../store/post/commentSlice";
import { postDelete, report } from "../../../store/post/postSlice";
import { getUserId } from "../../../store/user/common";
import styles from "./PostModal.module.css";

const PostModal = ({
  title,
  content,
  type,
  postId,
  img,
  category,
  postContent,
  closeModal,
  noticeId,
  noticeContent,
  noticeTitle,
  commentId,
  selected,
}) => {
  const [hidden, setHidden] = useState(false);
  const displayType = hidden ? styles.hidden : null;
  const colorType = type === "수정" ? styles.editButton : styles.warningButton;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onClick = () => {
    if (type === "삭제") {
      if (postId) {
        if (commentId) {
          dispatch(commentDelete({ postId, commentId })).then((res) => {
            if (res.payload?.status === 200) {
              window.location.replace(`/post/${postId}`);
            }
          });
        } else {
          dispatch(postDelete({ postId })).then((res) => {
            navigate("/mainFeed");
          });
        }
      } else if (noticeId) {
        dispatch(noticeDelete({ noticeId })).then((res) => {
          navigate("/user/settings/");
        });
      }
    } else if (type === "신고") {
      dispatch(
        report({ userId: getUserId(), retId: selected, posId: postId })
      ).then((res) => {
        if (res.payload.status === 200) {
          window.location.replace(`/post/${postId}`);
        }
      });
    } else if (type === "로그아웃") {
      dispatch();
    } else if (type === "탈퇴") {
    } else {
      window.location.replace(`/post/${postId}`);
    }
  };
  useEffect(() => {
    console.log(type);
    document.body.style = `overflow: hidden`;
    return () => (document.body.style = `overflow: auto`);
  }, []);
  return (
    <div className={`${displayType} ${styles.modal}`} onClick={closeModal}>
      <div onClick={(e) => e.stopPropagation()} className={styles.modalBody}>
        <div className={styles.modalTitle}>
          {type === "수정" ? (
            <i className={`fa-regular fa-circle-check ${styles.editIcon}`}></i>
          ) : type === "삭제" ? (
            <i className={`fa-regular fa-bell ${styles.deleteIcon}`}></i>
          ) : (
            <i
              className={`fa-solid fa-circle-exclamation ${styles.deleteIcon}`}
            ></i>
          )}
          <h2 className={styles.title}>{title}</h2>
        </div>
        <p className={styles.content}>{content}</p>
        <div className={styles.buttonGroup}>
          {type === "수정" ? (
            postId ? (
              <Link
                to="/post"
                state={{ postId, img, category, content: postContent }}
              >
                <button className={`${colorType}`}>{type}</button>
              </Link>
            ) : (
              <Link
                to="/notice"
                state={{ noticeId, noticeContent, noticeTitle }}
              >
                <button className={`${colorType}`}>{type}</button>
              </Link>
            )
          ) : (
            <button onClick={onClick} className={`${colorType}`}>
              {type}
            </button>
          )}
          <button
            onClick={() => {
              setHidden(true);
              document.body.style = `overflow: auto`;
            }}
            className={`${styles.cancleButton}`}
          >
            취소
          </button>
        </div>
      </div>
    </div>
  );
};

export default PostModal;

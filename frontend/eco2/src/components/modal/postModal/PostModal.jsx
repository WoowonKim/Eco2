import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { noticeDelete } from "../../../store/admin/noticeSlice";
import { commentDelete } from "../../../store/post/commentSlice";
import { postDelete, report } from "../../../store/post/postSlice";
import { friendDelete, friendRequest } from "../../../store/user/accountSlice";
import {
  getUserEmail,
  getUserId,
  removeUserSession,
} from "../../../store/user/common";
import { deleteUser, logout } from "../../../store/user/userSettingSlice";
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
  setTest,
  message,
  fromId,
  toId,
  friendId,
  setFriendDelete,
}) => {
  console.log(friendId, type);
  const [hidden, setHidden] = useState(false);
  const displayType = hidden ? styles.hidden : null;
  const colorType =
    type === "수정"
      ? styles.editButton
      : type === "친구"
      ? styles.friendButton
      : styles.warningButton;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const email = getUserEmail();

  const onClick = () => {
    if (type === "삭제") {
      console.log(commentId, postId);
      if (postId) {
        if (commentId) {
          dispatch(commentDelete({ postId, commentId })).then((res) => {
            if (res.payload?.status === 200) {
              navigate(`/post/${postId}`, { replace: true });
              closeModal();
              setTest((curr) => curr + 1);
            }
          });
        } else {
          dispatch(postDelete({ postId })).then((res) => {
            closeModal();
            navigate("/mainFeed");
          });
        }
      } else if (noticeId) {
        dispatch(noticeDelete({ noticeId })).then((res) => {
          closeModal();
          navigate("/user/settings/");
        });
      }
    } else if (type === "신고") {
      dispatch(
        report({
          userId: getUserId(),
          retId: selected,
          posId: postId,
          comId: commentId,
          message: message,
        })
      ).then((res) => {
        if (res.payload?.status === 200) {
          setHidden(true);
        }
      });
    } else if (type === "로그아웃") {
      dispatch(logout()).then((res) => {
        removeUserSession();
        closeModal();
        // navigate("/");
        window.location.replace("/");
      });
    } else if (type === "탈퇴") {
      dispatch(deleteUser({ email })).then((res) => {
        if (res.payload.status === 200) {
          removeUserSession();
          closeModal();
          // navigate("/");
          window.location.replace("/");
        }
      });
    } else if (type === "친구") {
      dispatch(friendRequest({ fromId, toId })).then((res) => {
        closeModal();
        if (res.payload?.status === 202) {
          alert("이미 친구 신청한 유저입니다!");
        }
      });
    } else if (type === "친구삭제") {
      dispatch(friendDelete({ id: getUserId(), friendId: friendId })).then(
        (res) => {
          if (res.payload.status === 200) {
            setFriendDelete((curr) => curr + 1);
            closeModal();
          }
        }
      );
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
            <i
              className={`fa-solid fa-circle-exclamation ${styles.deleteIcon}`}
            ></i>
          ) : type === "친구" ? (
            <i className={`fa-regular fa-bell ${styles.friendIcon}`}></i>
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
                className={styles.link}
                to="/post"
                state={{ postId, img, category, content: postContent }}
              >
                <button className={`${colorType}`}>{type}</button>
              </Link>
            ) : (
              <Link
                className={styles.link}
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

import React, { useState } from "react";
import { useDispatch } from "react-redux";
import CommentForm from "../commentForm/CommentForm";
import ReportModal from "../../modal/reportModal/ReportModal";
import styles from "./ReplyItem.module.css";
import { commentDelete } from "../../../store/post/commentSlice";
import { getUserName } from "../../../store/user/common";
import PostModal from "../../modal/postModal/PostModal";
import { useNavigate } from "react-router-dom";

const ReplyItem = ({ id, content, user, postId, commentUserId, setTest, userEmail, registTime }) => {
  const dispatch = useDispatch();
  const [visible, setVisible] = useState(false);
  const [modalType, setModalType] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  const name = getUserName();
  const navigate = useNavigate();
  const displayType = modalType ? styles.visible : styles.hidden;
  return (
    <div>
      {!visible && (
        <div className={styles.commentContainer}>
          <div className={styles.comment}>
            <div
              className={styles.userInfo}
              onClick={() =>
                navigate(`/profile/${commentUserId}`, {
                  state: { userEmail },
                })
              }
            >
              <img src={`${process.env.REACT_APP_BE_HOST}img/profile/${commentUserId}`} alt="profileImg" className={styles.profileImg} />
              <p className={styles.user}>{user}</p>
            </div>
            <div>
              <p className={styles.content}>{content}</p>
              <p className={styles.registTime}>{registTime.split("T")[0]}</p>
            </div>
          </div>
          {name === user && (
            <div className={styles.dropdown}>
              <i className={`fa-solid fa-ellipsis-vertical ${styles.icon}`}></i>
              <div className={styles.dropdownContent}>
                <div>
                  <button
                    onClick={() => {
                      setVisible(!visible);
                    }}
                    className={styles.dropdownItem}
                  >
                    수정
                    <i className={`fa-solid fa-pencil ${styles.dropdownIcon}`}></i>
                  </button>
                  <button
                    onClick={() => {
                      setModalVisible(!modalVisible);
                      setModalType("삭제");
                    }}
                    className={styles.dropdownItem}
                  >
                    삭제
                    <i className={`fa-solid fa-trash-can ${styles.dropdownIcon}`}></i>
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
      {modalVisible && modalType === "삭제" && (
        <PostModal
          className={`${displayType}`}
          title={"댓글 삭제"}
          content={"댓글을 삭제하시겠습니까"}
          type={"삭제"}
          postId={postId}
          commentId={id}
          setTest={setTest}
          closeModal={() => setModalVisible(!modalVisible)}
        />
      )}

      {visible && (
        <div className={styles.editFormGroup}>
          <div
            className={styles.userInfo}
            onClick={() =>
              navigate(`/profile/${commentUserId}`, {
                state: { userEmail },
              })
            }
          >
            <img src={`${process.env.REACT_APP_BE_HOST}img/profile/${commentUserId}`} alt="profileImg" className={styles.profileImg} />
            <p className={styles.user}>{user}</p>
          </div>
          <div className={styles.editForm}>
            <CommentForm id={id} postId={postId} content={content} setTest={setTest} closeModal={() => setVisible(!visible)} />
          </div>
        </div>
      )}
    </div>
  );
};

export default ReplyItem;

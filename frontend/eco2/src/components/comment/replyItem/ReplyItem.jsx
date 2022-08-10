import React, { useState } from "react";
import { useDispatch } from "react-redux";
import CommentForm from "../commentForm/CommentForm";
import ReportModal from "../../modal/reportModal/ReportModal";
import styles from "./ReplyItem.module.css";
import { commentDelete } from "../../../store/post/commentSlice";
import { getUserName } from "../../../store/user/common";
import PostModal from "../../modal/postModal/PostModal";

const ReplyItem = ({ id, content, user, postId, commentUserId }) => {
  const dispatch = useDispatch();
  const [visible, setVisible] = useState(false);
  const [modalType, setModalType] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  const name = getUserName();
  const displayType = modalType ? styles.visible : styles.hidden;

  const handleDelete = () => {
    dispatch(commentDelete({ id }));
  };
  return (
    <div>
      {!visible && (
        <li className={styles.list}>
          <div className={styles.commentContainer}>
            <div className={styles.comment}>
              <div className={styles.userInfo}>
                <img
                  src={`http://localhost:8002/img/profile/${commentUserId}`}
                  // src={`${imgSrc}`}
                  alt="profileImg"
                  className={styles.profileImg}
                />
                <p className={styles.user}>{user}</p>
              </div>{" "}
              <p className={styles.content}>{content}</p>
            </div>
            <div className={styles.dropdown}>
              <i className={`fa-solid fa-ellipsis-vertical ${styles.icon}`}></i>
              <div className={styles.dropdownContent}>
                {name === user && (
                  <div>
                    <button
                      onClick={() => {
                        setVisible(!visible);
                      }}
                      className={styles.dropdownItem}
                    >
                      수정
                      <i
                        className={`fa-solid fa-pencil ${styles.dropdownIcon}`}
                      ></i>
                    </button>
                    <button
                      onClick={() => handleDelete()}
                      className={styles.dropdownItem}
                    >
                      삭제
                      <i
                        className={`fa-solid fa-trash-can ${styles.dropdownIcon}`}
                      ></i>
                    </button>
                  </div>
                )}
                {name !== user && (
                  <button
                    onClick={() => {
                      setModalType(!modalType);
                      setModalType("신고");
                    }}
                    className={styles.dropdownItem}
                  >
                    신고
                    <i
                      className={`fa-solid fa-circle-exclamation ${styles.dropdownIcon}`}
                    ></i>
                  </button>
                )}
              </div>
            </div>
          </div>
          {modalVisible && modalType === "삭제" && (
            <PostModal
              className={`${displayType}`}
              title={"댓글 삭제"}
              content={"댓글을 삭제하시겠습니까"}
              type={"삭제"}
              postId={postId}
              commentId={id}
              closeModal={() => setModalVisible(!modalVisible)}
            />
          )}
          {modalType && (
            <ReportModal
              className={`${displayType}`}
              title={"댓글 신고"}
              content={"해당 댓글을 신고하시겠습니까?"}
              id={postId}
              type="댓글"
              closeModal={() => setVisible(!visible)}
            />
          )}
        </li>
      )}
      {visible && (
        <div className={styles.editFormGroup}>
          <span className={styles.editFormUser}>{user}</span>
          <div className={styles.editForm}>
            <CommentForm
              id={id}
              postId={postId}
              content={content}
              closeModal={() => setVisible(!visible)}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default ReplyItem;

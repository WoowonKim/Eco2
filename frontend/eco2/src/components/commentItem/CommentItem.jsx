import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { deleteComment } from "../../store/mainFeed/commentSlice";
import CommentForm from "../commentForm/CommentForm";
import ReplyList from "../replyList/ReplyList";
import ReportModal from "../reportModal/ReportModal";
import styles from "./CommentItem.module.css";

const CommentItem = ({ id, content, user, postId }) => {
  const dispatch = useDispatch();
  const [visible, setVisible] = useState(false);
  const [replyVisible, setReplyVisible] = useState(false);
  const [modalType, setModalType] = useState(false);
  const displayType = modalType ? styles.visible : styles.hidden;

  const handleDelete = () => {
    dispatch(deleteComment({ id }));
  };
  return (
    <div>
      {!visible && (
        <li className={styles.list}>
          <div className={styles.commentContainer}>
            <div className={styles.comment}>
              <p className={styles.user}>{user}</p>
              <p className={styles.content}>{content}</p>
            </div>
            <div>
              <button
                onClick={() => {
                  setReplyVisible(!replyVisible);
                }}
                className={styles.replyButton}
              >
                답글
              </button>
              <div className={styles.dropdown}>
                <i
                  className={`fa-solid fa-ellipsis-vertical ${styles.icon}`}
                ></i>
                <div className={styles.dropdownContent}>
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
                </div>
              </div>
            </div>
          </div>
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
          {/* <div>
          <button 
            onClick={() => {setVisible(!visible)}}
            className={styles.editButton}
          >
            { visible ? '숨기기' : '수정' }
          </button>
          <button onClick={handleDelete} className={styles.deleteButton}>삭제</button>
        </div> */}
        </li>
      )}
      {visible && (
        <div className={styles.editFormGroup}>
          <span className={styles.editFormUser}>{user}</span>
          <div className={styles.editForm}>
            <CommentForm
              id={id}
              content={content}
              closeModal={() => setVisible(!visible)}
            />
          </div>
        </div>
      )}
      {replyVisible && (
        <CommentForm
          id={id}
          replyVisible={replyVisible}
          closeModal={() => setReplyVisible(!replyVisible)}
        />
      )}
      <ReplyList id={id} />
    </div>
  );
};

export default CommentItem;

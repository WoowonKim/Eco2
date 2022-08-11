import React, { useEffect } from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import CommentForm from "../commentForm/CommentForm";
import ReplyList from "../replyList/ReplyList";
import ReportModal from "../../modal/reportModal/ReportModal";
import styles from "./CommentItem.module.css";
import { getUserId, getUserName } from "../../../store/user/common";
import PostModal from "../../modal/postModal/PostModal";
import ReplyItem from "../replyItem/ReplyItem";

const CommentItem = ({
  id,
  commentUserId,
  content,
  user,
  postId,
  commentId,
  replys,
  setTest,
}) => {
  const dispatch = useDispatch();
  const [visible, setVisible] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [replyVisible, setReplyVisible] = useState(false);
  const [modalType, setModalType] = useState("");
  const [name, setName] = useState("");
  const [userId, setUserId] = useState(0);

  const displayType = modalType ? styles.visible : styles.hidden;

  useEffect(() => {
    setName(getUserName());
    setUserId(getUserId());
  }, []);
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
              </div>
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
                        onClick={() => {
                          setModalVisible(!modalVisible);
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
          </div>
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
              userId={userId}
              postId={postId}
              id={id}
              content={content}
              setTest={setTest}
              closeModal={() => setVisible(!visible)}
            />
          </div>
        </div>
      )}
      {replyVisible && (
        <CommentForm
          userId={userId}
          postId={postId}
          id={id}
          replyVisible={replyVisible}
          setTest={setTest}
          closeModal={() => setReplyVisible(!replyVisible)}
        />
      )}

      <ReplyList
        commentId={commentId}
        id={id}
        replys={replys}
        commentUserId={commentUserId}
        setTest={setTest}
      />
    </div>
  );
};

export default CommentItem;

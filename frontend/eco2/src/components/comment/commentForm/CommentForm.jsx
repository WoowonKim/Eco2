import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { commentCreate, commentUpdate } from "../../../store/post/commentSlice";
import { getUserId } from "../../../store/user/common";
import styles from "./CommentForm.module.css";

const CommentForm = ({
  replyVisible,
  postId,
  content,
  id,
  closeModal,
  userId,
  setTest,
  type,
}) => {
  const [value, setValue] = useState("");
  const [editValue, setEditValue] = useState(content);

  const buttonType = type ? styles.largeButton : styles.smallButton;
  const dispatch = useDispatch();

  const onSubmit = (e) => {
    e.preventDefault();
    if (content) {
      dispatch(
        commentUpdate({ postId, commentId: id, content: editValue })
      ).then((res) => {
        if (res.payload?.status === 200) {
          setTest((curr) => curr + 1);
          // window.location.reload(`/post/${postId}`);
        }
      });
      closeModal();
    } else if (replyVisible) {
      dispatch(
        commentCreate({
          postId,
          content: value,
          userId: getUserId(),
          commentId: id,
        })
      ).then((res) => {
        if (res.payload?.status === 200) {
          setTest((curr) => curr + 1);
          // window.location.reload(`/post/${postId}`);
        }
      });
      closeModal();
    } else {
      dispatch(commentCreate({ postId, content: value, userId })).then(
        (res) => {
          if (res.payload?.status === 200) {
            setTest((curr) => curr + 1);
            // window.location.replace(`/post/${postId}`);
          }
        }
      );
    }
    setValue("");
  };

  const onChange = (e) => {
    setValue(e.target.value);
    setEditValue(e.target.value);
  };
  return (
    <form onSubmit={onSubmit} className={styles.form}>
      <input
        value={content ? editValue : value}
        type="text"
        onChange={onChange}
        className={`${buttonType} ${styles.input}`}
        placeholder="댓글을 작성해주세요"
      />
      <button
        className={styles.button}
        type="submit"
        disabled={value.trim().length == 0 || editValue.trim().length == 0}
      >
        작성
      </button>
      {!type && (
        <button
          type="button"
          onClick={closeModal}
          className={styles.closeButton}
        >
          닫기
        </button>
      )}
    </form>
  );
};

export default CommentForm;

import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { commentCreate, commentUpdate } from "../../../store/post/commentSlice";
import styles from "./CommentForm.module.css";

const CommentForm = ({
  replyVisible,
  postId,
  content,
  id,
  closeModal,
  userId,
}) => {
  const [value, setValue] = useState("");
  const [editValue, setEditValue] = useState(content);
  const dispatch = useDispatch();

  const onSubmit = (e) => {
    e.preventDefault();
    if (content) {
      dispatch(
        commentUpdate({ postId, commentId: id, content: editValue })
      ).then((res) => {
        if (res.payload?.status === 200) {
          window.location.replace(`/post/${postId}`);
        }
      });
      closeModal();
    } else if (replyVisible) {
      dispatch(
        commentCreate({ postId, content: value, userId, commentId: id })
      ).then((res) => {
        if (res.payload?.status === 200) {
          window.location.replace(`/post/${postId}`);
        }
      });
      closeModal();
    } else {
      dispatch(commentCreate({ postId, content: value, userId })).then(
        (res) => {
          if (res.payload?.status === 200) {
            window.location.replace(`/post/${postId}`);
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
        className={styles.input}
        placeholder="댓글을 작성해주세요"
      />
      <button className={styles.button} type="submit">
        작성
      </button>
    </form>
  );
};

export default CommentForm;

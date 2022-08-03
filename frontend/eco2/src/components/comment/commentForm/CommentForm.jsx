import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import {
  addComment,
  updateComment,
} from "../../../store/mainFeed/commentSlice";
import styles from "./CommentForm.module.css";

const CommentForm = ({ replyVisible, postId, content, id, closeModal }) => {
  const [value, setValue] = useState("");
  const [editValue, setEditValue] = useState(content);
  const dispatch = useDispatch();

  const onSubmit = (e) => {
    e.preventDefault();
    if (content) {
      dispatch(updateComment({ id, content: editValue }));
      closeModal();
    } else if (replyVisible) {
      dispatch(addComment({ postId, content: value, commentId: id }));
      closeModal();
    } else {
      dispatch(addComment({ postId, content: value }));
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

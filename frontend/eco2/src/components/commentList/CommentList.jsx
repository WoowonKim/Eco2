import React from "react";
import { useSelector } from "react-redux";
import CommentItem from "../commentItem/CommentItem";
import styles from "./CommentList.module.css";

const CommentList = ({ id }) => {
  const comments = useSelector((state) => state.comment);
  return (
    <ul className={styles.ul}>
      {comments.map(
        (comment) =>
          id === comment.postId && (
            <CommentItem
              key={comment.id}
              id={comment.id}
              content={comment.content}
              user={comment.user}
            />
          )
      )}
    </ul>
  );
};

export default CommentList;

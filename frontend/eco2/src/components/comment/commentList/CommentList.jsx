import React from "react";
import { useSelector } from "react-redux";
import CommentItem from "../commentItem/CommentItem";
import styles from "./CommentList.module.css";

const CommentList = ({ id, comments }) => {
  return (
    <ul className={styles.ul}>
      {comments.length > 0 &&
        comments.map(
          (comment) =>
            id === comment.postId && (
              <CommentItem
                key={comment.id}
                id={comment.id}
                content={comment.content}
                user={comment.user}
                postId={comment.postId}
              />
            )
        )}
    </ul>
  );
};

export default CommentList;

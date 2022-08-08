import React from "react";
import { useSelector } from "react-redux";
import CommentItem from "../commentItem/CommentItem";
import styles from "./CommentList.module.css";

const CommentList = ({ id, comments }) => {
  console.log(comments);
  return (
    <ul className={styles.ul}>
      {comments?.length > 0 &&
        comments.map(
          (comment) =>
            id === comment.postId && (
              <CommentItem
                key={comment.commentId}
                id={comment.commentId}
                content={comment.content}
                user={comment.userId}
                postId={comment.postId}
                replys={comment.comments}
              />
            )
        )}
    </ul>
  );
};

export default CommentList;

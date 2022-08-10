import React from "react";
import { useSelector } from "react-redux";
import CommentItem from "../commentItem/CommentItem";
import styles from "./CommentList.module.css";

const CommentList = ({ comments, replys }) => {
  console.log(replys);
  return (
    <ul className={styles.ul}>
      {comments?.length > 0 &&
        comments.map((comment) => (
          <CommentItem
            key={comment.id}
            id={comment.id}
            content={comment.content}
            user={comment.userName}
            postId={comment.postId}
            commentId={comment.commentId}
            replys={replys}
          />
        ))}
    </ul>
  );
};

export default CommentList;

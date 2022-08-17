import React from "react";
import CommentItem from "../commentItem/CommentItem";
import styles from "./CommentList.module.css";

const CommentList = ({ comments, replys, setTest }) => {
  return (
    <div className={styles.commentList}>
      {comments?.length > 0 &&
        comments.map((comment) => (
          <CommentItem
            key={comment.id}
            id={comment.id}
            content={comment.content}
            user={comment.userName}
            commentUserId={comment.userId}
            postId={comment.postId}
            commentId={comment.id}
            replys={replys}
            setTest={setTest}
            userEmail={comment.userEmail}
            registTime={comment.registTime}
          />
        ))}
    </div>
  );
};

export default CommentList;

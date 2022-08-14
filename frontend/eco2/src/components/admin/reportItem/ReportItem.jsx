import React from "react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import styles from "./ReportItem.module.css";
import { commentDetail } from "../../../store/post/commentSlice";

const ReportItem = ({ id, count, post, commentId, postCategory }) => {
  const [category, setCategory] = useState("");
  const [comment, setComment] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    if (postCategory === 1) {
      setCategory("실천하기");
    } else if (postCategory === 2) {
      setCategory("사용하기");
    } else if (postCategory === 3) {
      setCategory("절약하기");
    } else if (postCategory === 4) {
      setCategory("구매하기");
    } else if (postCategory === 5) {
      setCategory("재활용하기");
    }
  }, []);

  useEffect(() => {
    if (commentId !== null) {
      dispatch(commentDetail({ commentId: commentId })).then((res) => {
        if (res.payload.status === 200) {
          setComment(res.payload.comment);
        }
      });
    }
  }, []);

  return (
    <div className={styles.list}>
      <Link
        to={`/report/detail`}
        state={{ reportId: id, post: post, comment: comment }}
        className={styles.link}
      >
        <div className={styles.leftContent}>
          {comment === null ? (
            <div>
              <div className={styles.typeBox}>
                <span className={styles.type}>게시물</span>
              </div>
              <span className={styles.text}>
                [{category}] {post.user.name}님의 게시물
              </span>
            </div>
          ) : (
            <div>
              <div className={styles.typeBox}>
                <span className={styles.type}> 댓글</span>
              </div>
              <span className={styles.text}>{comment.user.name}님의 댓글</span>
            </div>
          )}
        </div>
        <div className={styles.rightContent}>
          <span className={styles.report}>신고({count}건)</span>
        </div>
      </Link>
    </div>
  );
};

export default ReportItem;

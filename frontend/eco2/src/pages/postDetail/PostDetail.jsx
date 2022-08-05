import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import CommentForm from "../../components/comment/commentForm/CommentForm";
import CommentList from "../../components/comment/commentList/CommentList";
import styles from "./PostDetail.module.css";
import PostModal from "../../components/modal/postModal/PostModal";
import ReportModal from "../../components/modal/reportModal/ReportModal";
import { post } from "../../store/post/postSlice";

const PostDetail = () => {
  const [visible, setVisible] = useState(false);
  const [modalType, setModalType] = useState("");
  const [feedItem, setFeedItem] = useState({});
  const params = useParams();
  const displayType = visible ? styles.visible : styles.hidden;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(post({ postId: params.postId })).then((res) => {
      if (res.payload?.status === 200) {
        setFeedItem(res.payload.post);
        console.log(res.payload.post.postImgUrl);
      }
    });
  }, []);

  return (
    <div>
      <div className={styles.title}>
        <h1 className={styles.text}>{feedItem.category}</h1>
        <div className={styles.dropdown}>
          <i className={`fa-solid fa-ellipsis-vertical ${styles.icon}`}></i>
          <div className={styles.dropdownContent}>
            <button
              onClick={() => {
                setVisible(!visible);
                setModalType("수정");
              }}
              className={styles.dropdownItem}
            >
              수정
              <i className={`fa-solid fa-pencil ${styles.dropdownIcon}`}></i>
            </button>
            <button
              onClick={() => {
                setVisible(!visible);
                setModalType("삭제");
              }}
              className={styles.dropdownItem}
            >
              삭제
              <i className={`fa-solid fa-trash-can ${styles.dropdownIcon}`}></i>
            </button>
            <button className={styles.dropdownItem}>
              비공개
              <i className={`fa-solid fa-lock ${styles.dropdownIcon}`}></i>
            </button>
            <button
              onClick={() => {
                setVisible(!visible);
                setModalType("신고");
              }}
              className={styles.dropdownItem}
            >
              신고
              <i
                className={`fa-solid fa-circle-exclamation ${styles.dropdownIcon}`}
              ></i>
            </button>
          </div>
        </div>
      </div>
      {visible && modalType === "수정" && (
        <PostModal
          // className={`${displayType} ${scrollType}`}
          title={"게시물 수정"}
          content={"게시물을 수정하시겠습니까"}
          type={"수정"}
          postId={feedItem.id}
          img={feedItem.postImgUrl}
          category={feedItem.mission.category}
          postContent={feedItem.content}
          closeModal={() => setVisible(!visible)}
        />
      )}
      {visible && modalType === "삭제" && (
        <PostModal
          className={`${displayType}`}
          title={"게시물 삭제"}
          content={"게시물을 삭제하시겠습니까"}
          type={"삭제"}
          postId={feedItem.id}
          closeModal={() => setVisible(!visible)}
        />
      )}
      {visible && modalType === "신고" && (
        <ReportModal
          className={`${displayType}`}
          title={"게시물 신고"}
          content={"해당 게시물을 신고하시겠습니까?"}
          postId={feedItem.id}
          type="게시물"
          closeModal={() => setVisible(!visible)}
        />
      )}
      <img className={styles.img} src={feedItem.postImgUrl} alt="img" />
      <div className={styles.info}>
        <p className={styles.user}>{feedItem.userName}</p>
        <button className={styles.button}>
          <i className={`fa-solid fa-heart ${styles.heart}`}></i> 30
        </button>
      </div>
      <p className={styles.content}>{feedItem.content}</p>
      <hr className={styles.line} />
      <div className={styles.CommentForm}>
        <CommentForm postId={feedItem.id} />
      </div>
      <CommentList id={feedItem.id} />
    </div>
  );
};

export default PostDetail;

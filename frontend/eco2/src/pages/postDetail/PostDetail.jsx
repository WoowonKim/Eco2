import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import CommentForm from "../../components/comment/commentForm/CommentForm";
import CommentList from "../../components/comment/commentList/CommentList";
import styles from "./PostDetail.module.css";
import PostModal from "../../components/modal/postModal/PostModal";
import ReportModal from "../../components/modal/reportModal/ReportModal";
import { post, postLike } from "../../store/post/postSlice";
import { getUserId, getUserName } from "../../store/user/common";

const PostDetail = () => {
  const [visible, setVisible] = useState(false);
  const [modalType, setModalType] = useState("");
  const [feedItem, setFeedItem] = useState({});
  const [comments, setComments] = useState([]);
  const [replys, setReplys] = useState([]);
  const [like, setLike] = useState(false);
  const [test, setTest] = useState(0);

  const params = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const displayType = visible ? styles.visible : styles.hidden;
  const name = getUserName();

  const handlePostLike = () => {
    dispatch(postLike({ postId: feedItem.id, userId: getUserId() })).then(
      (res) => {
        if (res.payload.status === 200) {
          setLike(!like);
          dispatch(post({ postId: params.postId })).then((res) => {
            if (res.payload?.status === 200) {
              setFeedItem(res.payload.post);
            }
          });
        } else {
          setLike(!like);
          dispatch(post({ postId: params.postId })).then((res) => {
            if (res.payload?.status === 200) {
              setFeedItem(res.payload.post);
            }
          });
        }
      }
    );
  };

  useEffect(() => {
    dispatch(post({ postId: params.postId })).then((res) => {
      if (res.payload?.status === 200) {
        setFeedItem(res.payload.post);
        if (res.payload.post.comments !== null) {
          setComments(
            res.payload.post?.comments.filter((comment) => !comment.commentId)
          );
          setReplys(
            res.payload.post?.comments.filter((comment) => !!comment.commentId)
          );
        }
      }
    });
    // dispatch(commentList({ postId: params.postId })).then((res) => {
    //   if (res.payload?.status === 200) {
    //     setComments(res.payload.commentDto);
    //   }
    // });
  }, [test]);

  return (
    <div className={styles.container}>
      <div className={styles.title}>
        <h1 className={styles.text}>{feedItem.category}</h1>
        <div className={styles.dropdown}>
          <i className={`fa-solid fa-ellipsis-vertical ${styles.icon}`}></i>
          <div className={styles.dropdownContent}>
            {name === feedItem.userName ? (
              <div>
                <button
                  onClick={() => {
                    setVisible(!visible);
                    setModalType("수정");
                  }}
                  className={styles.dropdownItem}
                >
                  수정
                  <i
                    className={`fa-solid fa-pencil ${styles.dropdownIcon}`}
                  ></i>
                </button>
                <button
                  onClick={() => {
                    setVisible(!visible);
                    setModalType("삭제");
                  }}
                  className={styles.dropdownItem}
                >
                  삭제
                  <i
                    className={`fa-solid fa-trash-can ${styles.dropdownIcon}`}
                  ></i>
                </button>
                <button className={styles.dropdownItem}>
                  비공개
                  <i className={`fa-solid fa-lock ${styles.dropdownIcon}`}></i>
                </button>
              </div>
            ) : (
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
            )}
          </div>
        </div>
      </div>
      {visible && modalType === "수정" && (
        <PostModal
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
      <img
        src={`http://localhost:8002/img/post/${feedItem.id}`}
        alt="postImg"
        className={styles.postImg}
      />
      <div className={styles.info}>
        <div
          className={styles.userProfile}
          // 추후 이메일 정보 추가하기
          onClick={() => navigate(`/profile/${feedItem.userId}`)}
        >
          <img
            src={`http://localhost:8002/img/profile/${feedItem.userId}`}
            alt="profileImg"
            className={styles.profileImg}
          />
          <p className={styles.user}>{feedItem.userName}</p>
        </div>
        <button className={styles.button} onClick={handlePostLike}>
          {like ? (
            <i className={`fa-solid fa-heart ${styles.heart}`}></i>
          ) : (
            <i className={`fa-regular fa-heart ${styles.heart}`}></i>
          )}
          {feedItem.likeCount}
        </button>
      </div>
      <p className={styles.content}>{feedItem.content}</p>
      <hr className={styles.line} />
      {feedItem.commentFlag && (
        <div>
          <div className={styles.CommentForm}>
            <CommentForm
              postId={feedItem.id}
              userId={getUserId()}
              setTest={setTest}
            />
          </div>
          <CommentList
            id={feedItem.id}
            comments={comments}
            replys={replys}
            setTest={setTest}
          />
        </div>
      )}
    </div>
  );
};

export default PostDetail;

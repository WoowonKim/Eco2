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
  const [test, setTest] = useState(0);
  const [likeUsers, setLikeUsers] = useState(false);
  const [registTime, setRegistTime] = useState("");
  const [missionTitle, setMissionTitle] = useState("");

  const params = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const displayType = visible ? styles.visible : styles.hidden;
  const name = getUserName();

  const handlePostLike = () => {
    dispatch(postLike({ postId: feedItem.id, userId: getUserId() })).then(
      (res) => {
        if (res.payload.status === 200) {
          dispatch(post({ postId: params.postId })).then((res) => {
            if (res.payload?.status === 200) {
              setFeedItem(res.payload.post);
              if (res.payload.post.postLikeUserIds !== null) {
                setLikeUsers(
                  res.payload.post.postLikeUserIds.some((id) => {
                    return id == getUserId();
                  })
                );
              }
            }
          });
        } else {
          dispatch(post({ postId: params.postId })).then((res) => {
            if (res.payload?.status === 200) {
              setFeedItem(res.payload.post);
              if (res.payload.post.postLikeUserIds !== null) {
                setLikeUsers(
                  res.payload.post.postLikeUserIds.some((id) => {
                    return id == getUserId();
                  })
                );
              }
            }
          });
        }
      }
    );
  };

  useEffect(() => {
    dispatch(post({ postId: params.postId })).then((res) => {
      if (res.payload?.status === 200) {
        console.log(res.payload);
        if (res.payload?.msg === "비공개 계정입니다.") {
          navigate("/mainFeed");
        }
        setFeedItem(res.payload.post);
        if (res.payload.post.mission !== null) {
          setMissionTitle(res.payload.post.mission.title);
        } else if (res.payload.post.customMission !== null) {
          setMissionTitle(res.payload.post.customMission.title);
        }
        if (res.payload.post.comments !== null) {
          setComments(
            res.payload.post?.comments.filter((comment) => !comment.commentId)
          );
          setReplys(
            res.payload.post?.comments.filter((comment) => !!comment.commentId)
          );
        }
        if (res.payload.post.postLikeUserIds !== null) {
          setLikeUsers(
            res.payload.post.postLikeUserIds.some((id) => {
              return id == getUserId();
            })
          );
        }
      }
    });
  }, [test, likeUsers]);

  useEffect(() => {
    if (!feedItem?.registTime) {
      return;
    }
    setRegistTime(feedItem?.registTime.split("T")[0]);
  }, [feedItem?.registTime]);
  console.log(missionTitle);
  return (
    <div className={styles.container}>
      <div className={styles.title}>
        <div className={styles.info}>
          <div
            className={styles.userProfile}
            onClick={() =>
              navigate(`/profile/${feedItem.userId}`, {
                state: { userEmail: feedItem.userEmail },
              })
            }
          >
            <img
              src={`${process.env.REACT_APP_BE_HOST}img/profile/${feedItem.userId}`}
              alt="profileImg"
              className={styles.profileImg}
            />
            <p className={styles.user}>{feedItem.userName}</p>
          </div>
        </div>
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
          content={"게시물을 수정하시겠습니까?"}
          type={"수정"}
          postId={feedItem.id}
          img={feedItem.postImgUrl}
          postContent={feedItem.content}
          closeModal={() => setVisible(!visible)}
        />
      )}
      {visible && modalType === "삭제" && (
        <PostModal
          className={`${displayType}`}
          title={"게시물 삭제"}
          content={"게시물을 삭제하시겠습니까?"}
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
        src={`${process.env.REACT_APP_BE_HOST}img/post/${feedItem.id}`}
        alt="postImg"
        className={styles.postImg}
      />
      <div className={styles.heartAndRegistTime}>
        <button className={styles.button} onClick={handlePostLike}>
          {likeUsers ? (
            <i className={`fa-solid fa-heart fa-2x ${styles.heart}`}></i>
          ) : (
            <i className={`fa-regular fa-heart fa-2x ${styles.heart}`}></i>
          )}
          {feedItem.likeCount}
        </button>
        <span className={styles.registTime}>{registTime}</span>
      </div>
      {missionTitle && (
        <button className={styles.hashTag}>
          <i className="fa-solid fa-hashtag"></i>
          <span className={styles.hashTagContent}>{missionTitle}</span>
        </button>
      )}
      {!missionTitle && (
        <button className={styles.hashTag}>
          <i className="fa-solid fa-hashtag"></i>
          <span className={styles.hashTagContent}>Quest</span>
        </button>
      )}
      <pre className={styles.content}>{feedItem.content}</pre>
      <hr className={styles.line} />
      {feedItem.commentFlag && (
        <>
          <div className={styles.CommentForm}>
            <CommentForm
              postId={feedItem.id}
              userId={getUserId()}
              setTest={setTest}
              type={true}
            />
          </div>
          <CommentList
            id={feedItem.id}
            comments={comments}
            replys={replys}
            setTest={setTest}
          />
        </>
      )}
    </div>
  );
};

export default PostDetail;

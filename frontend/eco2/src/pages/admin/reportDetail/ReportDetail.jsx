import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import styles from "./ReportDetail.module.css";
import { useLocation } from 'react-router-dom';
import { reportDetailList } from "../../../store/admin/reportSlice";
import { reportAccept } from "../../../store/admin/reportSlice";
import { reportCancle } from "../../../store/admin/reportSlice";
import ReportDetailList from "../../../components/admin/reportDetailList/ReportDetailList";

const ReportDetail = () => {
  const post = useLocation().state.post;
  const comment = useLocation().state.comment;
  const [reportDetails, setReportDetails] = useState([]);
  const dispatch = useDispatch();
  const [id, setId] = useState("");
  const [type, setType] = useState("");
  const [category, setCategory] = useState("");

  useEffect(() => {
    if (comment === null) {
      setId(post.id);
      setType(0);
      dispatch(reportDetailList({ id: post.id, type: 0 })).then((res) => {
        if (res.payload.status === 200) {
          console.log(res.payload.reportDetailList);
          setReportDetails(res.payload.reportDetailList);
        }
      });
    } else {
      setId(comment.id);
      setType(1);
      dispatch(reportDetailList({ id: comment.id, type: 1 })).then((res) => {
        if (res.payload.status === 200) {
          console.log(res.payload.reportDetailList);
          setReportDetails(res.payload.reportDetailList);
        }
      });
    }

    if (post.category === 1) {
      setCategory("실천하기");
    } else if (post.category === 2) {
      setCategory("사용하기");
    } else if (post.category === 3) {
      setCategory("절약하기");
    } else if (post.category === 4) {
      setCategory("구매하기");
    } else if (post.category === 5) {
      setCategory("재활용하기");
    }
  }, []);

  const sendReportAccept = () => {
    dispatch(reportAccept({ id: id, type: type })).then((res) => {
      console.log("승인 id:   " + id, "   type: " + type);
      if (res.payload.status === 200) {
        alert("신고 승인되었습니다.");
        window.location.replace("/report");
      }
    });

  }
  const sendReportCancle = () => {
    dispatch(reportCancle({ id: id, type: type })).then((res) => {
      console.log("반려 id:   " + id, "   type: " + type);
      if (res.payload.status === 200) {
        alert("신고 반려되었습니다.");
        window.location.replace("/report");
      }
    });
  }

  return (
    <div className={styles.reportDetail}>
      <div className={styles.reportDetailTitle}>신고 내역 상세</div>
      <Link to={`/post/${post.id}`} className={styles.link}>
      <div className={styles.post}>

        <div className={styles.postTitle}>
          <img
            src={`http://localhost:8002/img/profile/${post.user.id}`}
            alt="profileImg"
            className={styles.profileImg}
          />
          <div className={styles.postUser}>{post.user.name}</div>
        </div>
        <hr className={styles.line}></hr>
        <div className={styles.postBody}>
          <div className={styles.postCategory}>
            {post.mission === null ? (
              //커스텀 미션
              <span className={styles.category}>[{category}] {post.customMission.content}</span>
            ) : (
              //기본 미션
              <span className={styles.category}>[{category}] {post.mission.title}</span>
            )}
          </div>
          <img
            src={`http://localhost:8002/img/post/${post.id}`}
            alt="postImg"
            className={styles.postImg}
          />
          <div className={styles.postContent}>{post.content}</div>
          <div className={styles.postRegistTime}>작성일: {post.registTime}</div>
        </div>
        </div>
      </Link>
      {comment && (
        <div className={styles.comment}>
          <div className={styles.commentBody}>
            <img
              src={`http://localhost:8002/img/profile/${comment.user.id}`}
              alt="profileImg"
              className={styles.profileImg}
            />
            <div className={styles.commentUser}>{comment.user.name}님이 작성한 댓글입니다.</div>
            <div className={styles.commentContent}>{comment.content}</div>
          </div>
        </div>
      )}

      <div className={styles.reportDetailList}>
        <div className={styles.table}>
          <table>
            <tr>
              <th width="8%">유형</th>
              <th width="17%">신고내용</th>
              <th width="9%">신고자</th>
            </tr>
          </table>
        </div>
        <ReportDetailList reportDetails={reportDetails} />
      </div>

      <button
        onClick={sendReportAccept}
        className={`${styles.acceptButton}`}
      >
        승인
      </button>
      <button
        onClick={sendReportCancle}
        className={`${styles.cancleButton}`}
      >
        반려
      </button>




    </div>
  );
};

export default ReportDetail;

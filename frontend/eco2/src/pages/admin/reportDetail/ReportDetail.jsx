import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import styles from "./ReportDetail.module.css";
import { useLocation } from "react-router-dom";
import { reportDetailList } from "../../../store/admin/reportSlice";
import ReportDetailItem from "../../../components/admin/reportDetailItem/ReportDetailItem";
import AdminModal from "../../../components/modal/adminModal/AdminModal";

const ReportDetail = () => {
  const post = useLocation().state.post;
  const comment = useLocation().state.comment;
  const reportDetails = useSelector((state) => state.report.detail);
  const dispatch = useDispatch();
  const [id, setId] = useState("");
  const [type, setType] = useState("");
  const [category, setCategory] = useState("");
  const [registTime, setRegistTime] = useState("");
  const [acceptModalVisible, setAcceptModalVisible] = useState(false);
  const [cancleModalVisible, setCancleModalVisible] = useState(false);
  const [modalType, setModalType] = useState("");
  useEffect(() => {
    if (comment === null) {
      setId(post.id);
      setType(0);
      dispatch(reportDetailList({ id: post.id, type: 0 }));
    } else {
      setId(comment.id);
      setType(1);
      dispatch(reportDetailList({ id: comment.id, type: 1 }));
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
  useEffect(() => {
    if (!post.registTime) {
      return;
    }
    setRegistTime(post.registTime.split("T")[0]);
  }, [post.registTime]);

  const sendReportAccept = () => {
    setAcceptModalVisible(!acceptModalVisible);
    setModalType("신고승인");
  };
  const sendReportCancle = () => {
    setCancleModalVisible(!cancleModalVisible);
    setModalType("신고반려");
  };

  return (
    <div className={styles.reportDetail}>
      <div className={styles.reportDetailTitle}>신고 내역 상세</div>
      <Link to={`/post/${post.id}`} className={styles.link}>
        <div className={styles.post}>
          <div className={styles.postTitle}>
            <img
              src={`${process.env.REACT_APP_BE_HOST}img/profile/${post.user.id}`}
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
                <span className={styles.category}>
                  [{category}] {post.customMission.content}
                </span>
              ) : (
                //기본 미션
                <span className={styles.category}>
                  [{category}] {post.mission.title}
                </span>
              )}
            </div>
            <img

              src={`${process.env.REACT_APP_BE_HOST}img/post/${post.id}`}
              alt="postImg"
              className={styles.postImg}
            />
            <div className={styles.postContent}>{post.content}</div>
            <div className={styles.postRegistTime}>작성일: {registTime}</div>
          </div>
        </div>
      </Link>
      {comment && (
        <div className={styles.comment}>
          <div className={styles.commentBody}>
            <img
              src={`${process.env.REACT_APP_BE_HOST}img/profile/${comment.user.id}`}
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
            <tbody>
              <tr>
                <th width="5%">유형</th>
                <th width="15%">신고내용</th>
                <th width="7%">신고자</th>
              </tr>
            </tbody>
          </table>
        </div>
      <div className={styles.listBox}>
        {reportDetails.length === 0 ? (
          <div>없음</div>
        ) : (
          reportDetails.map((reportDetail, i) => {
            return <ReportDetailItem key={i} reportType={reportDetail.reportType} content={reportDetail.content} name={reportDetail.user.name} />;
          })
        )}
        </div>
      </div>
      <div className={styles.reportButton}>
        <button onClick={sendReportAccept} className={`${styles.acceptButton}`}>
          승인
        </button>
        <button onClick={sendReportCancle} className={`${styles.cancleButton}`}>
          반려
        </button>
      </div>
      {acceptModalVisible && modalType === "신고승인" && (
        <AdminModal
          title={"신고 승인"}
          content={"신고 승인하시겠습니까?"}
          type="승인"
          id={id}
          postType={type}
          closeModal={() => setAcceptModalVisible(!acceptModalVisible)}
        />
      )}

      {cancleModalVisible && modalType === "신고반려" && (
        <AdminModal
          title={"신고 반려"}
          content={"신고 반려하시겠습니까?"}
          type="반려"
          id={id}
          postType={type}
          closeModal={() => setCancleModalVisible(!cancleModalVisible)}
        />
      )}
    </div>
  );
};

export default ReportDetail;

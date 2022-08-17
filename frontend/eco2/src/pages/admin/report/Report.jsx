import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ReportItem from "../../../components/admin/reportItem/ReportItem";
import { reportList } from "../../../store/admin/reportSlice";
import styles from "./Report.module.css";

const Report = () => {
  const reports = useSelector((state) => state.report.data);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(reportList());
  }, []);
  return (
    <div className={styles.report}>
      <div className={styles.title}>신고 내역</div>
      <div className={styles.table}>
        <table>
          <tbody>
            <tr>
              <th width="8%">유형</th>
              <th width="8%">신고내용</th>
              <th width="10%"></th>
              <th width="8%"></th>
              <th width="8%"></th>
              <th width="7%">내역</th>
            </tr>
          </tbody>
        </table>
      </div>
      <div className={styles.post}>
        {reports.length === 0 ? (
          <div className={styles.noPostList}>
            <span className={styles.noPostMessage}>신고 내역이 없습니다.</span>
          </div>
        ) : (
          reports.map((report, i) => {
            return (
              <ReportItem key={i} id={report.id} count={report.count} post={report.post} commentId={report.commentId} postCategory={report.postCategory} />
            );
          })
        )}
      </div>
    </div>
  );
};

export default Report;

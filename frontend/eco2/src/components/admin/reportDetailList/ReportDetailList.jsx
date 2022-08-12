import React from "react";
import styles from "./ReportDetailList.module.css";

const ReportDetailList = ({ reportDetails }) => {
  console.log(reportDetails);
  return (
    <div>
      {reportDetails &&
        reportDetails.map((reportDetail) => (

          <div className={styles.list}>
            <div className={styles.type}>
              <div className={styles.text}>{reportDetail.reportType.type}</div>
            </div>
            <div className={styles.content}>
              <div className={styles.text}>{reportDetail.content}</div>
            </div>
            <div className={styles.name}>
              <div className={styles.text}>{reportDetail.user.name}</div>
            </div>
            <hr className={styles.line}></hr>
          </div>
        ))}
    </div>
  );
};

export default ReportDetailList;
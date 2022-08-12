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
              <span className={styles.text}>{reportDetail.reportType.type}</span>
            </div>
            <div className={styles.content}>
            <span className={styles.text}>{reportDetail.content}</span>
            </div>
            <div className={styles.name}>
            <span className={styles.text}>{reportDetail.user.name}</span>
            </div>
            <hr className={styles.line}></hr>
          </div> 
 
        ))}
    </div>
  );
};

export default ReportDetailList;
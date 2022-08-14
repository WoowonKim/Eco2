import React from "react";
import styles from "./ReportDetailItem.module.css";

const ReportDetailList = ({ reportType, content, name }) => {
  return (
    <div>
      <div className={styles.list}>
        <div className={styles.leftContent}>
          <div className={styles.type}>
            <div className={styles.text}>{reportType.type}</div>
          </div>
          <span className={styles.text}>{content}</span>
        </div>
        <div className={styles.rightContent}>
          <div className={styles.text}>{name}</div>
        </div>
        {/* <hr className={styles.line}></hr> */}
      </div>
    </div>
  );
};

export default ReportDetailList;
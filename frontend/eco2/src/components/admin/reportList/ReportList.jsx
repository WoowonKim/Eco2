import React from "react";
import ReportItem from "../reportItem/ReportItem";

const ReportList = ({ reports }) => {
  return (
    <div>
      {reports &&
        reports.map((report) => (
          <ReportItem
            key={report.id}
            id={report.id}
            count={report.count}
            post={report.post}
            comment={report.comment}
            postCategory={report.postCategory}
          />
        ))}
    </div>
  );
};

export default ReportList;
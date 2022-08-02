import React from "react";
import styles from "./dailyMissionDetail.module.css";

const DailyMissionFavoritesList = ({ id, content }) => {
  return (
    <div>
      <div className={styles.conBack}>{content}</div>
    </div>
  );
};

export default DailyMissionFavoritesList;

import React, { useState } from "react";
import styles from "./dailyMissionDetail.module.css";

const DailyEcoMissionitem = ({ id, content, onCreate }) => {
  const [color, setColor] = useState(true);
  const colorType = color ? styles.gray : styles.skyblue;

  return (
    <div>
      <div className={`${styles.content} ${colorType}`}>
        <input type={"checkbox"}></input>
        <span
          onClick={() => {
            setColor(!color);
            onCreate(!color, id, content);
          }}
        >
          {content}
        </span>
        <i className={`${"fa-regular fa-bookmark"} ${styles.plus}`}></i>
      </div>
    </div>
  );
};

export default DailyEcoMissionitem;

import React, { useState } from "react";
import styles from "./dailyMissionDetail.module.css";

const DailyEcoMissionitem = ({ id, content, onCreate }) => {
  const [color, setColor] = useState(true);
  const [favorites, setFavorites] = useState(true);
  // const favoritesType = favorites ? styles.green :
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
        <i className={`${"fa-regular fa-bookmark"} `}></i>
      </div>
    </div>
  );
};

export default DailyEcoMissionitem;

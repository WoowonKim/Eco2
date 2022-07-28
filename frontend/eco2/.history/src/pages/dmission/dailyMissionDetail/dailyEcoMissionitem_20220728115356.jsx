import React, { useState } from "react";
import styles from "./dailyMissionDetail.module.css";

const DailyEcoMissionitem = ({ id, content, onCreate }) => {
  const [color, setColor] = useState(true);
  const [favorites, setFavorites] = useState(true);
  const favoritesType = favorites
    ? "fa-regular fa-bookmark"
    : "fa-solid fa-bookmark";
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
        <i className={`${favoritesType} `}></i>
      </div>
    </div>
  );
};

export default DailyEcoMissionitem;

import React, { useState } from "react";
import styles from "./dailyMissionDetail.module.css";
import { GreenBtn } from "../../styled";

const DailyEcoMissionitem = ({ id, content, onCreate, onFavorites, onEco }) => {
  const [color, setColor] = useState(true);
  const [favorites, setFavorites] = useState(true);
  const favoritesType = favorites ? "fa-regular fa-bookmark" : "fa-solid fa-bookmark";
  const colorType = color ? styles.gray : styles.skyblue;

  return (
    <div>
      <div className={`${styles.content} ${colorType}`}>
        <input type={"checkbox"}></input>
        <span
          onClick={() => {
            setColor(!color);
            onCreate(!color, id, content);
            onEco(!color, id, content);
          }}
          className={styles.itemFont}
        >
          {content}
        </span>
        <i
          className={`${favoritesType} `}
          onClick={() => {
            setFavorites(!favorites);
            onFavorites(!favorites, id, content);
          }}
        ></i>
      </div>
    </div>
  );
};

export default DailyEcoMissionitem;

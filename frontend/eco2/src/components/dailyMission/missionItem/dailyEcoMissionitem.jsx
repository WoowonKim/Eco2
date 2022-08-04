import React, { useState } from "react";
import styles from "./dailyMissionDetail.module.css";
import { GreenBtn } from "../../styled";
import { useDispatch } from "react-redux";
import { putFavorite } from "../../../store/mission/favoriteSlice";

const DailyEcoMissionitem = ({ ecoId, content, onCreate, onFavorites, id, category }) => {
  const dispatch = useDispatch();
  const [color, setColor] = useState(true);
  const [favorites, setFavorites] = useState(true);
  const favoritesType = favorites ? "fa-regular fa-bookmark" : "fa-solid fa-bookmark";
  const colorType = color ? styles.gray : styles.skyblue;
  const favoriteTrue = true;

  const onFavorite = (id, favorites, ecoId, favoriteTrue) => {
    dispatch(putFavorite({ id, likeFlag: favorites, missionType: favoriteTrue, missionId: ecoId }));
  };

  return (
    <div>
      <div className={`${styles.content} ${colorType}`}>
        <input type={"checkbox"}></input>
        <span
          onClick={() => {
            setColor(!color);
            onCreate(!color, ecoId, content);
          }}
          className={styles.itemFont}
        >
          {content}
        </span>
        <i
          className={`${favoritesType} `}
          onClick={() => {
            setFavorites(!favorites);
            onFavorites(!favorites, ecoId, content);
            onFavorite(id, favorites, ecoId, favoriteTrue);
          }}
        ></i>
      </div>
    </div>
  );
};

export default DailyEcoMissionitem;

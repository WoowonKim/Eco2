import React, { useEffect, useState } from "react";
import styles from "./dailyMissionDetail.module.css";
import { GreenBtn } from "../../styled";
import { useDispatch } from "react-redux";
import { putFavorite, getFavorite } from "../../../store/mission/favoriteSlice";
import { useNavigate } from "react-router-dom";
//onFavorites
const DailyEcoMissionitem = ({ ecoId, content, onCreate, id, category, cnt, setCnt, faAdd, setFaAdd }) => {
  const dispatch = useDispatch();
  const [color, setColor] = useState(true);
  const [favorites, setFavorites] = useState(false);
  const favoritesType = !favorites ? "fa-regular fa-bookmark" : "fa-solid fa-bookmark";
  const colorType = color ? styles.gray : styles.skyblue;
  const favoriteTrue = true;
  const favoritesTrue = true;
  const naviGate = useNavigate();

  const onFavorite = (id, favoritesTrue, ecoId, favoriteTrue) => {
    dispatch(putFavorite({ id, likeFlag: favoritesTrue, missionType: favoriteTrue, missionId: ecoId })).then((res) => {
      if (res.payload?.status === 200) {
        setFaAdd(!faAdd);
        console.log("onFavorite ===> ", res.payload);
      }
    });
  };

  return (
    <div>
      <div className={`${styles.content} ${colorType}`}>
        <img src={process.env.PUBLIC_URL + `/tree_leaves/Leaf${category}.png`} className={styles.leafSize}></img>
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
          // `${favoritesType} `
          className={"fa-solid fa-circle-plus"}
          onClick={() => {
            // setFavorites(!favorites);
            onFavorite(id, favoritesTrue, ecoId, favoriteTrue);
            setCnt(cnt + 1);
          }}
        ></i>
      </div>
    </div>
  );
};

export default DailyEcoMissionitem;

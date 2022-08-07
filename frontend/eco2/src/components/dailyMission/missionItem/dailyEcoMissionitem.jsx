import React, { useState } from "react";
import styles from "./dailyMissionDetail.module.css";
import { GreenBtn } from "../../styled";
import { useDispatch } from "react-redux";
import { putFavorite } from "../../../store/mission/favoriteSlice";
//onFavorites
const DailyEcoMissionitem = ({ ecoId, content, onCreate, id, onFavorites, category }) => {
  //console.log("ecoId ====> ", ecoId);
  const dispatch = useDispatch();
  const [color, setColor] = useState(true);
  const [favorites, setFavorites] = useState(true);
  const favoritesType = favorites ? "fa-regular fa-bookmark" : "fa-solid fa-bookmark";
  const colorType = color ? styles.gray : styles.skyblue;
  const favoriteTrue = true;
  const [testItem, setTestItem] = useState(false);
  const onFavorite = (id, favorites, ecoId, favoriteTrue) => {
    console.log("여기서 ecoId는 뭘까? ===> ", ecoId);
    dispatch(putFavorite({ id, likeFlag: favorites, missionType: favoriteTrue, missionId: ecoId })).then((res) => {
      if (res.payload.status === 200) {
        console.log("putFavorite 성공 ");
      }
    });
  };

  return (
    <div>
      <div className={`${styles.content} ${colorType}`}>
        <img src={process.env.PUBLIC_URL + `/tree_leaves/Leaf3.png`} className={styles.leafSize}></img>
        {/* <input type={"checkbox"}></input> */}
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

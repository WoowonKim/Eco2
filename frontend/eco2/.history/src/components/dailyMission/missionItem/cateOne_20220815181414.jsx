import React, { useState } from "react";
import styles from "./dailyMissionDetail.module.css";
import { useDispatch } from "react-redux";
import { putFavorite } from "../../../store/mission/favoriteSlice";
const CateOne = ({
  setStartTrue,
  starTrue,
  setStar,
  star,
  content,
  ecoId,
  onCreate,
  id,
  cnt,
  setCnt,
  faAdd,
  setFaAdd,
  category,
}) => {
  const dispatch = useDispatch();
  const [color, setColor] = useState(true);
  const colorType = color ? styles.gray : styles.skyblue;
  const favoriteTrue = true;
  const favoritesTrue = true;

  const onFavorite = (id, favoritesTrue, ecoId, favoriteTrue) => {
    dispatch(
      putFavorite({
        id,
        likeFlag: favoritesTrue,
        missionType: favoriteTrue,
        missionId: ecoId,
      })
    ).then(res => {
      if (res.payload?.status === 200) {
        setFaAdd(!faAdd);
      }
    });
  };

  return (
    <div>
      <div>
        <div className={`${styles.content} ${colorType}`}>
          <img
            src={process.env.PUBLIC_URL + `/tree_leaves/Leaf${category}.png`}
            className={styles.leafSize}
          ></img>
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
            // "fa-solid fa-star"
            className={`${"fa-regular fa-star"} ${styles.star}`}
            onClick={() => {
              onFavorite(id, favoritesTrue, ecoId, favoriteTrue);
              setCnt(cnt + 1);
              setStar(...star, ecoId);
            }}
          ></i>
        </div>
      </div>
    </div>
  );
};

export default CateOne;

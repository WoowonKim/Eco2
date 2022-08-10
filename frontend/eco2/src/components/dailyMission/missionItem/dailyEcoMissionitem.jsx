import React, { useEffect, useState } from "react";
import styles from "./dailyMissionDetail.module.css";
import { GreenBtn } from "../../styled";
import { useDispatch } from "react-redux";
import { putFavorite, getFavorite } from "../../../store/mission/favoriteSlice";
import { useNavigate } from "react-router-dom";
//onFavorites
const DailyEcoMissionitem = ({ ecoId, content, onCreate, id, category, cnt, setCnt }) => {
  const dispatch = useDispatch();
  const [color, setColor] = useState(true);
  const [favorites, setFavorites] = useState(false);
  const favoritesType = !favorites ? "fa-regular fa-bookmark" : "fa-solid fa-bookmark";
  const colorType = color ? styles.gray : styles.skyblue;
  const favoriteTrue = true;
  const favoritesTrue = true;
  const [testItem, setTestItem] = useState([]);
  const naviGate = useNavigate();

  useEffect(() => {
    dispatch(getFavorite({ id })).then((res) => {
      if (res.payload.status === 200) {
        setTestItem(res.payload.missionList);
      }
    });
  }, []);
  // console.log("TestITEM이다아아아===>", testItem);

  const onFavorite = (id, favoritesTrue, ecoId, favoriteTrue) => {
    const fa = testItem.filter((it) => it.id === ecoId);
    console.log("fa===>", fa);

    if (window.confirm("즐겨찾기에 추가하시겠어요?")) {
      if (fa.length >= 1) {
        alert("이미 추가된 미션입니다.");
      } else {
        dispatch(putFavorite({ id, likeFlag: favoritesTrue, missionType: favoriteTrue, missionId: ecoId })).then((res) => {
          if (res.payload.status === 200) {
            console.log("putFavorite 성공 ===>  ", res.payload);
          }
          window.location.replace("/dailymissionDetail");
        });
      }
    }
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
            setFavorites(!favorites);
            onFavorite(id, favoritesTrue, ecoId, favoriteTrue);
            setCnt(cnt + 1);
          }}
        ></i>
      </div>
    </div>
  );
};

export default DailyEcoMissionitem;

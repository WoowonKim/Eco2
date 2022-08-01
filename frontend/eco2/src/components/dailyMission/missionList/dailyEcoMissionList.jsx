import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import DailyEcoMissionitem from "../missionItem/dailyEcoMissionitem";
import styles from "./dailyMissionDetail.module.css";
import DailyMissionFavoritesList from "./dailyMissionFavoritesList";
import { GreenBtn } from "../../styled";

const DailyEcoMissionList = ({ ecomissionList, onArr }) => {
  //const ecomissionList = useSelector((state) => state.dailyMission.dailyMissionList);

  const [eco, setEco] = useState([]);
  const [arrFavorites, setArrFavorites] = useState([]);
  const ecoCount = eco.length;
  const naviGate = useNavigate();

  const onCreate = (color, id, content) => {
    if (color === false) {
      const newEco = {
        color: color,
        id: id,
        content: content,
      };
      setEco([...eco, newEco]);
      onArr(eco);
    } else {
      const reEco = eco.filter((it) => it.id !== id);
      setEco(reEco);
      onArr(eco);
    }
  };

  const onFavorites = (favorites, id, content) => {
    if (!favorites) {
      const newArrFavorites = {
        favorites: favorites,
        id: id,
        content,
      };
      setArrFavorites([...arrFavorites, newArrFavorites]);
    } else {
      const reArrFavorits = arrFavorites.filter((it) => it.id !== id);
      setArrFavorites(reArrFavorits);
    }
  };

  const onStore = () => {
    if (ecoCount >= 1) {
      alert(`${ecoCount}개 저장 완료 메인페이지로 이동합니다.`);
      naviGate("/DailyMissionmain");
    }
  };

  return (
    <div>
      <div>
        {arrFavorites.map((it) => (
          <DailyMissionFavoritesList key={it.id} content={it.content} id={it.id} />
        ))}
      </div>
      <div>
        {ecomissionList.map((it) => (
          <DailyEcoMissionitem key={it.id} content={it.content} id={it.id} onCreate={onCreate} onFavorites={onFavorites} />
        ))}
      </div>

      <div className={styles.plusP}>
        <i className={"fa-solid fa-circle-plus"}></i>
      </div>
      <div>
        <div className={styles.onmove}>
          <p className={styles.btn}>{ecoCount}</p>
        </div>
        <GreenBtn onClick={onStore}> 선택한 미션 추가하기</GreenBtn>
      </div>
    </div>
  );
};

export default DailyEcoMissionList;

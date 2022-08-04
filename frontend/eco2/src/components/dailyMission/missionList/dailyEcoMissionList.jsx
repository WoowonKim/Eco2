import React, { useState, useEffect, useMemo } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import DailyEcoMissionitem from "../missionItem/dailyEcoMissionitem";
import styles from "./dailyMissionDetail.module.css";
import DailyMissionFavoritesList from "./dailyMissionFavoritesList";
import DailyCustomMissionList from "./dailyCustomMissionList";
import { postMission } from "../../../store/mission/missionMainSlice";
import { GreenBtn } from "../../styled";
import { getFavorite } from "../../../store/mission/favoriteSlice";

const DailyEcoMissionList = ({ id, ecomissionList }) => {
  const [eco, setEco] = useState([]);
  const [ecoId, setEcoId] = useState([]);
  const [arrFavorites, setArrFavorites] = useState([]);
  //const [favoriteArr, setFavoriteArr] = useState([]);
  const [list, getList] = useState(true);

  const dispatch = useDispatch();
  const ecoCount = eco.length;

  // useEffect(() => {
  //   dispatch(getFavorite({ id })).then((res) => {
  //     if (res.payload.status === 200) {
  //       setFavoriteArr(res.payload.missionList);
  //     }
  //   });
  // }, [setFavoriteArr]);
  // console.log(favoriteArr);

  const onCreate = (color, id, content) => {
    if (color === false) {
      const newEco = {
        color: color,
        id: id,
        content: content,
      };
      setEco([...eco, newEco]);
      setEcoId([...ecoId, newEco.id]);
    } else {
      const reEco = eco.filter((it) => it.id !== id);
      const reEcoId = ecoId.filter((it) => it !== id);
      setEco(reEco);
      setEcoId(reEcoId);
    }
  };

  const onFavorites = (favorites, id, content) => {
    if (favorites === false) {
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

  const onMissionSub = () => {
    if (ecoCount >= 1) {
      dispatch(postMission({ id, ecoId })).then((res) => {
        if (res.payload?.status === 200) {
          alert(`${ecoCount}개 저장 완료 메인페이지로 이동합니다.`);
        }
      });
    }
  };

  return (
    <div className={styles.zero}>
      <div className={styles.Font}>
        <p>오늘은 어떤 도전을 해볼까?</p>
      </div>

      <fieldset>
        <legend className={styles.word}>Trending</legend>
        <span className={styles.trending}>텀블러 사용해서 지구 지키기</span>
      </fieldset>

      <div>
        <div className={styles.faHeading}>
          <span className={styles.basicMission}>즐겨찾기</span>
        </div>
        <div>
          {arrFavorites.map((it) => (
            <DailyMissionFavoritesList key={it.id} content={it.content} ecoId={it.id}></DailyMissionFavoritesList>
          ))}
        </div>
      </div>

      <div className={styles.heading}>
        <span
          className={styles.basicMission}
          onClick={() => {
            getList(true);
          }}
        >
          기본
        </span>
        <span
          className={styles.basicMission}
          onClick={() => {
            getList(false);
          }}
        >
          내목록
        </span>
      </div>

      <div>
        {list === true ? (
          <div>
            {ecomissionList.map((it) => (
              <DailyEcoMissionitem key={it.id} content={it.title} ecoId={it.id} onCreate={onCreate} onFavorites={onFavorites} id={id} category={it.category} />
            ))}
          </div>
        ) : (
          <div>
            <DailyCustomMissionList id={id} />
          </div>
        )}
      </div>

      <div>
        <div className={styles.onmove}>
          <p className={styles.btn}>{ecoCount}</p>
        </div>
        <GreenBtn onClick={onMissionSub}> 선택한 미션 추가하기</GreenBtn>
      </div>
    </div>
  );
};

export default DailyEcoMissionList;

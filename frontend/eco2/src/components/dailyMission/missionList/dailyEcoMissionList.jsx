import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import DailyEcoMissionitem from "../missionItem/dailyEcoMissionitem";
import styles from "./dailyMissionDetail.module.css";
import DailyMissionFavoritesList from "./dailyMissionFavoritesList";
import DailyCustomMissionList from "./dailyCustomMissionList";
import { postMission } from "../../../store/mission/missionMainSlice";
import { GreenBtn } from "../../styled";
import { onEcoArr } from "../../../store/mission/missionMainSlice";

const DailyEcoMissionList = ({ id, ecomissionList }) => {
  // const ecomissionList = useSelector((state) => state.dailyMission.dailyMissionList);
  const ecoArr = useSelector((state) => state.missionMain);
  const [eco, setEco] = useState([]);
  const [ecoId, setEcoId] = useState([]);
  const [arrFavorites, setArrFavorites] = useState([]);
  const [list, getList] = useState(true); // 기본 & 내 목록 창
  const ecoCount = eco.length;
  const naviGate = useNavigate();
  const dispatch = useDispatch();

  const onEco = (color, id, content) => {
    if (color === false) {
    }
  };

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

  // 즐겨찾기
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

  const onStore = () => {
    if (ecoCount >= 1) {
      alert(`${ecoCount}개 저장 완료 메인페이지로 이동합니다.`);
      naviGate("/DailyMissionmain");
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
      {/* 최 상단 글 */}
      <div className={styles.Font}>
        <p>오늘은 어떤 도전을 해볼까?</p>
      </div>
      {/* 최 상단 글 end*/}

      {/* 트렌딩 - 인기 검색어 확인 */}
      <fieldset>
        <legend className={styles.word}>Trending</legend>
        <span className={styles.trending}>텀블러 사용해서 지구 지키기</span>
      </fieldset>
      {/* 트렌딩 - 인기 검색어 확인 end*/}

      {/* 기본 미션 + 커스텀 미션 즐겨찾기 */}
      <div>
        <div className={styles.faHeading}>
          <span className={styles.basicMission}>즐겨찾기</span>
        </div>
        <div>
          {arrFavorites.map((it) => (
            <DailyMissionFavoritesList key={it.id} content={it.content} id={it.id}></DailyMissionFavoritesList>
          ))}
        </div>
      </div>
      {/* 기본 미션 + 커스텀 미션 즐겨찾기 end*/}

      {/* 기본 버튼 + 커스텀 버튼 */}
      <div className={styles.heading}>
        <span
          className={styles.basicMission}
          onClick={() => {
            getList(true);
          }}
        >
          {" "}
          기본
        </span>
        <span
          className={styles.basicMission}
          onClick={() => {
            getList(false);
          }}
        >
          {" "}
          내목록{" "}
        </span>
      </div>
      {/* 기본 버튼 + 커스텀 버튼 end */}

      {/* 미션 리스트 불러오기 */}
      <div>
        {list === true ? (
          <div>
            {ecomissionList.map((it) => (
              <DailyEcoMissionitem key={it.id} content={it.title} id={it.id} onCreate={onCreate} onEco={onEco} onFavorites={onFavorites} />
              // <DailyEcoMissionitem key={it.id} content={it.content} id={it.id} onCreate={onCreate} onEco={onEco} onFavorites={onFavorites} />
            ))}
          </div>
        ) : (
          <div>
            <DailyCustomMissionList id={id} />
          </div>
        )}
      </div>
      {/* 미션 리스트 불러오기 end */}

      <div>
        {/* 미션 카운트 */}
        <div className={styles.onmove}>
          <p className={styles.btn}>{ecoCount}</p>
        </div>
        {/* 미션 카운트 end*/}

        {/* 버튼 클릭 시 데일리 미션 메인으로 항목 이동 */}
        <GreenBtn onClick={onMissionSub}> 선택한 미션 추가하기</GreenBtn>
        {/* 버튼 클릭 시 데일리 미션 메인으로 항목 이동 end*/}
      </div>
    </div>
  );
};

export default DailyEcoMissionList;

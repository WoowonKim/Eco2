//React
import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

//Store
import { postMission } from "../../../store/mission/missionMainSlice";
import { getFavorite, putFavorite } from "../../../store/mission/favoriteSlice";

//Component
import DailyEcoMissionitem from "../missionItem/dailyEcoMissionitem";
import DailyCustomMissionList from "./dailyCustomMissionList";

// CSS
import { GreenBtn } from "../../styled";
import styles from "./dailyMissionDetail.module.css";

const DailyEcoMissionList = ({ id, ecomissionList }) => {
  const [ecoId, setEcoId] = useState([]);
  const [list, getList] = useState(true); //미션 목록과 커스텀 미션을 구분하기 위한 State
  const [favoriteArr, setFavoriteArr] = useState([]); // 즐겨찾기 화면노출을 위한 State
  const [cnt, setCnt] = useState(0); //리렌더링을 방지하기 위한 State

  const ecoCount = ecoId.length; // user 미션 목록에 추가하기 위한 count
  const favoriteTrue = true; // 서버 연동에 필요한 값 : 미션목록 이 true여서
  const favoriteBoolean = false; // 서버에 삭제 요청에 필요한 값 : 삭제할 때 false값을 전달 하기 위함.

  const naviGate = useNavigate();
  const dispatch = useDispatch();

  /**
   * 서버의 즐겨찾기 목록을 갖고 오기 위한 함수.
   * id : id가 접속 되었을 때 첫 번째 렌더링
   * cnt : cnt 값이 변경 될 때 마다 렌더링 => 현재 완성X 한박자 느리게 화면에 노출됨.
   * ==> 추가시 새로고침으로 임시적으로 해결 상태
   */
  useEffect(() => {
    dispatch(getFavorite({ id })).then(res => {
      if (res.payload.status === 200) {
        setFavoriteArr(res.payload.missionList);
      }
    });
  }, [id, cnt]);

  /**
   * user 미션 목록에 보내기 위한 함수
   * item에 prop으로 전달하여 ecoState 증가.
   */
  const onCreate = (color, id, content) => {
    if (color === false) {
      const newEco = {
        color: color,
        id: id,
        content: content,
      };
      setEcoId([...ecoId, newEco.id]);
    } else {
      const reEcoId = ecoId.filter(it => it !== id);
      setEcoId(reEcoId);
    }
  };

  /**
   * 선택한 미션들을 서버에 전송하기 위한 함수.
   */
  const onMissionSub = () => {
    if (ecoCount >= 1) {
      dispatch(postMission({ id, dailyMissionList: ecoId })).then(res => {
        if (res.payload?.status === 200) {
          alert(`${ecoId.length}개 저장 완료 메인페이지로 이동합니다.`);
          naviGate("/dailymissionMain");
        }
      });
    }
  };

  /**
   * 즐겨찾기 목록에서 삭제 하기 위한 함수.
   */
  const onDeleButton = (id, favoriteBoolean, faId, favoriteTrue) => {
    if (window.confirm("미션을 삭제 하시겠습니까?")) {
      dispatch(
        putFavorite({
          id,
          likeFlag: favoriteBoolean,
          missionType: favoriteTrue,
          missionId: faId,
        })
      );
      alert("삭제 완료!");
      window.location.replace("/dailymissionDetail");
    } else {
      alert("포기하지 말고 화이팅!");
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
          {favoriteArr.map((it, idx) => (
            <div key={idx}>
              {it.title}
              <button
                onClick={() => {
                  const faId = it.id;
                  onDeleButton(id, favoriteBoolean, faId, favoriteTrue);
                }}
              >
                삭제
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* <div style={{ height: "700px", overflow: "auto" }}>
        <InfiniteScroll
          pageStart={0}
          loadMore={loadFunc}
          hasMore={true||false}
          loader={<div className="loader" key={0}>Loading...</div>}
          useWindow={false}
        ></InfiniteScroll>
      </div> */}

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
          <div className={styles.scrollMission}>
            {ecomissionList.map(it => (
              <DailyEcoMissionitem
                key={it.id}
                content={it.title}
                ecoId={it.id}
                onCreate={onCreate}
                id={id}
                category={it.category}
                cnt={cnt}
                setCnt={setCnt}
              />
            ))}
          </div>
        ) : (
          <div>
            <DailyCustomMissionList id={id} />
          </div>
        )}
      </div>

      {list === true ? (
        <div>
          <div className={styles.onmove}>
            <p className={styles.btn}>{ecoCount}</p>
          </div>
          <GreenBtn onClick={onMissionSub}> 선택한 미션 추가하기</GreenBtn>
        </div>
      ) : (
        <div></div>
      )}
    </div>
  );
};

export default DailyEcoMissionList;

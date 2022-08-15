import React, { useState } from "react";
import CateOne from "../missionItem/cateOne";
import { useNavigate } from "react-router-dom";
import { postMission } from "../../../store/mission/missionMainSlice";
import { GreenBtn } from "../../styled";
import { useDispatch } from "react-redux";
import styles from "./dailyMissionDetail.module.css";
const CateOneList = ({
  id,
  categoryOne,
  setCateNum,
  cnt,
  setCnt,
  faAdd,
  setFaAdd,
  favoriteArr,
}) => {
  const [ecoId, setEcoId] = useState([]);
  const dispatch = useDispatch();
  const naviGate = useNavigate();
  const ecoCount = ecoId.length; // user 미션 목록에 추가하기 위한 count
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
  console.log("List 내부 FAVO===>", favoriteArr);

  console.log("categoryOne ===>", categoryOne);
  const result = favoriteArr.filter(it => it.id === categoryOne.id);
  //console.log("result ===> ", result);
  return (
    <div>
      {/* <p
        className={styles.back}
        onClick={() => {
          setCateNum(0);
        }}
      >
        돌아가기
      </p> */}
      <div className={styles.backTitle}>
        <i
          onClick={() => {
            setCateNum(5);
          }}
          className={`${"fa-solid fa-caret-left"} ${styles.backLeft}`}
        ></i>
        <span className={styles.cateSmallTitle}> 실천하기</span>
        <i
          onClick={() => {
            setCateNum(2);
          }}
          className={`${"fa-solid fa-caret-left"} ${styles.backRight}`}
        ></i>
      </div>
      <div className={styles.scrollMission}>
        {categoryOne.map(it => (
          <CateOne
            key={it.id}
            content={it.title}
            ecoId={it.id}
            onCreate={onCreate}
            id={id}
            cnt={cnt}
            setCnt={setCnt}
            faAdd={faAdd}
            setFaAdd={setFaAdd}
            setCateNum={setCateNum}
            category={it.category}
          />
        ))}
      </div>
      <div>
        <div>
          <p className={styles.btn}>{ecoCount}</p>
        </div>
        <GreenBtn onClick={onMissionSub}> 선택한 미션 추가하기</GreenBtn>
      </div>
    </div>
  );
};

export default CateOneList;

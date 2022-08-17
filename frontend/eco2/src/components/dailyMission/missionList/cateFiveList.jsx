import React, { useState } from "react";
import CateFive from "../missionItem/cateFive";
import { GreenBtn } from "../../styled";
import styles from "./dailyMissionDetail.module.css";
import PostModal from "../../modal/postModal/PostModal";

const CateFiveList = ({ id, categoryFive, setCateNum, cnt, setCnt, faAdd, setFaAdd }) => {
  const [ecoId, setEcoId] = useState([]);
  const [visible, setVisible] = useState(false);
  const [modalType, setModalType] = useState("");
  const displayType = visible ? styles.visible : styles.hidden;
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
      const reEcoId = ecoId.filter((it) => it !== id);
      setEcoId(reEcoId);
    }
  };

  return (
    <div>
      <div className={styles.backTitle}>
        <i
          onClick={() => {
            setCateNum(4);
          }}
          className={`${"fa-solid fa-caret-left"} ${styles.backLeft}`}
        ></i>
        <span className={styles.cateSmallTitle}> 재활용하기</span>
        <i
          onClick={() => {
            setCateNum(1);
          }}
          className={`${"fa-solid fa-caret-left"} ${styles.backRight}`}
        ></i>
      </div>
      <div className={styles.scrollMission}>
        {categoryFive.map((it) => (
          <CateFive
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
      <div className={styles.btnAdd}>
        <div>
          <p className={styles.btn}>{ecoCount}</p>
        </div>
        <GreenBtn
          onClick={() => {
            setVisible(!visible);
            setModalType("등록하기");
          }}
        >
          {" "}
          선택한 미션 추가하기
        </GreenBtn>
      </div>
      <div>
        {visible && modalType === "등록하기" && (
          <PostModal className={`${displayType}`} title={"미션 등록하기"} content={"실천하기 미션 등록"} type={"등록"} userID={id} ecoId={ecoId} />
        )}
      </div>
    </div>
  );
};

export default CateFiveList;

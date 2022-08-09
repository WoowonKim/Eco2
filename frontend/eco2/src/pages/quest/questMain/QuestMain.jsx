import React, { useState } from "react";
import Map from "../../../components/map/Map";
import { getUserName } from "../../../store/user/common";
import styles from "./QuestMain.module.css";

const QuestMain = () => {
  const [count, setCount] = useState(0);
  const [makeFlag, setMakeFlag] = useState(true);
  const name = getUserName();
  return (
    <div>
      <div className={styles.titleGroup}>
        <p className={styles.title}>퀘스트 조회하기</p>
        <button
          className={styles.button}
          onClick={() => {
            setMakeFlag(!makeFlag);
          }}
        >
          {makeFlag ? "취소하기" : "생성하기"}
        </button>
      </div>
      <Map makeFlag={makeFlag} />
      <div>
        <p className={styles.text}>
          {name}님 주변에는 현재 {count}개의 퀘스트가 있습니다.
        </p>
      </div>
    </div>
  );
};

export default QuestMain;

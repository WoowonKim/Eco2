import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { DummyStateContext } from "../../../App";
import { GreenBtn } from "../../../components/styled";
import styles from "./missionDetail.module.css";

const missionDetail = () => {
  const dummyList = useContext(DummyStateContext);
  return (
    <div>
      <div className={styles.Font}>
        <p>오늘은 어떤 도전을 해볼까?</p>
      </div>

      <span className={styles.trending}>텀블러 사용해서 지구 지키기</span>

      <div className={styles.tablehead}>
        <span
          className={styles.plus}
          onClick={() => {
            alert("뇸");
          }}
        >
          기본
        </span>
        <span
          className={styles.plus}
          onClick={() => {
            alert("뇸");
          }}
        >
          내 목록
        </span>
      </div>
      <div>
        {DummyDailyMission.map(it => (
          <div className={styles.box} key={it.id}>
            <input type={"checkbox"}></input>
            <span>{it.content}</span>
            <i className={`${"fa-regular fa-bookmark"} ${styles.plus}`}></i>
          </div>
        ))}
      </div>
      <div className={styles.plusbutton}>
        <i className={`${"fa-solid fa-circle-plus"} ${styles.plus} `}></i>
      </div>
      <div>
        <GreenBtn>선택한 미션 추가하기</GreenBtn>
      </div>
    </div>
  );
};

export default missionDetail;

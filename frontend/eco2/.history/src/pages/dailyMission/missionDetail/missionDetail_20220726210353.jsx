import React, { useState } from "react";
import { Link } from "react-router-dom";
import { GreenBtn } from "../../../components/styled";
import styles from "./missionDetail.module.css";

const missionDetail = () => {
  /* 더미객체  */
  const DummyDailyMission = [
    {
      id: 1,
      content: "텀블러 사용해서 지구 지키기",
    },
    {
      id: 2,
      content: "밖에 나갈때 멀티탭 뽑기",
    },
    {
      id: 3,
      content: "더운날 찬물 샤워 해보기",
    },
    {
      id: 4,
      content: "텀블러 사용해서 지구 지키기",
    },
    {
      id: 5,
      content: "밖에 나갈때 멀티탭 뽑기",
    },
    {
      id: 6,
      content: "더운날 찬물 샤워 해보기",
    },
  ];
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

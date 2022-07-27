import React from "react";
import styles from "./missionMain.module.css";
import { Link } from "react-router-dom";

import Header from "../../HeadaerAndFooter/Header";
import Footer from "../../HeadaerAndFooter/Footer";

import { GreenBtn } from "../../../components/styled";

const missionMain = () => {
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
  ];

  const missionClear = e => {
    alert("미션완료버튼 클릭");
  };
  return (
    <div className="missionMain">
      <Header></Header>
      <div className={styles.mainHeader}>
        <span className={styles.mainHeaderLeft}>오늘의 도전과제</span>
        <Link to="/missionDetail" className={styles.mainHeaderRight}>
          <span>
            추가하기
            <i className={"fa-solid fa-circle-plus" + "styles.mainColor"}></i>
          </span>
        </Link>
      </div>
      <div>
        {DummyDailyMission.map(it => (
          <div className={styles.box} key={it.id}>
            <input type={"checkbox"}></input>
            <span>{it.content}</span>
            <input type={"checkbox"}></input>
          </div>
        ))}
      </div>
      <div className={styles.btn}>
        <GreenBtn
          onClick={() => {
            missionClear();
          }}
        >
          오늘 미션 보상 받기
        </GreenBtn>
      </div>
      <Footer />
    </div>
  );
};

export default missionMain;

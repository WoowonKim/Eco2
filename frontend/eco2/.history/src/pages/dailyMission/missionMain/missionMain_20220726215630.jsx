import React, { useContext, useState } from "react";
import styles from "./missionMain.module.css";
import { Link } from "react-router-dom";

import Header from "../../HeadaerAndFooter/Header";
import Footer from "../../HeadaerAndFooter/Footer";

import { GreenBtn } from "../../../components/styled";
import { DummyDispathContext, DummyStateContext } from "../../../App";

const MissionMain = ({ id, auth, content }) => {
  const { onRemove, onEdit } = useContext(DummyDispathContext);

  const handleClickRemove = () => {
    if (window.confirm(`${id}번째 미션을 정말 삭제 할겁니까?`)) {
      onRemove(id);
    }
  };

  const dummyList = useContext(DummyStateContext);
  return (
    <div className="missionMain">
      <Header></Header>
      <div className={styles.mainHeader}>
        <span className={styles.mainHeaderLeft}>오늘의 도전과제</span>
        <Link to="/missionDetail" className={styles.mainHeaderRight}>
          <span>
            추가하기
            <i
              className={`${"fa-solid fa-circle-plus"} ${styles.mainColor}`}
            ></i>
          </span>
        </Link>
      </div>
      <div>
        {dummyList.map(it => (
          <div className={styles.box} key={it.id}>
            <input type={"checkbox"}></input>
            <span className={styles.missionList}>{it.content}</span>
            <i
              className={`${"fa-solid fa-trash-can"} ${styles.trashColor}`}
            ></i>
          </div>
        ))}
      </div>
      <div className={styles.btn}>
        <GreenBtn>오늘 미션 보상 받기</GreenBtn>
      </div>
      <Footer />
    </div>
  );
};

export default MissionMain;

import React from "react";
import styles from "./missionCom.module.css";
import { Link, useNavigate } from "react-router-dom";

const MissionCom = () => {
  const naviGate = useNavigate();

  const goTree = () => {
    if (window.confirm("인증하기 완료! 나뭇잎 꾸미러 가기")) {
      naviGate("/mainTree");
    }
  };

  const goMission = () => {
    naviGate("/dailymissionmain");
  };
  return (
    <div className={styles.header}>
      <div className={styles.headerTag}>
        <span className={styles.headerFont}>인증하기</span>
      </div>
      <div className={styles.photo}>
        <span className={styles.photoFont}>사진 업로드 하기</span>
      </div>
      <div>
        <label htmlFor="cate" className={styles.cateName}>
          카테고리 :{" "}
        </label>
        <input type="text" id="cate" className={styles.testInpu} />
      </div>
      <div>
        <label htmlFor="head" className={styles.cateName}>
          제목 :{" "}
        </label>
        <input type="text" id="head" />
      </div>
      <div>
        <label htmlFor="conte" className={styles.cateName}>
          내용 :{" "}
        </label>
        <input type="textarea" id="conte" />
      </div>
      <div>
        <button onClick={goTree}> 인증 하기</button>
      </div>
      <div>
        <button onClick={goMission}> 돌아가기</button>
      </div>
    </div>
  );
};

export default MissionCom;

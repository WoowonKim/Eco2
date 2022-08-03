import React from "react";
import styles from "./missionCom.module.css";

const MissionCom = () => {
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
        <button> 인증 하기</button>
      </div>
      <div>
        <button> 나중에 하기</button>
      </div>
    </div>
  );
};

export default MissionCom;

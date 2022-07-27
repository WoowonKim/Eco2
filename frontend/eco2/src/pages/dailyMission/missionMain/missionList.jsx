import React, { useContext, useEffect } from "react";
import styles from "./missionMain.module.css";
import { DummyDispathContext, DummyStateContext } from "../../../App";
const MissionList = () => {
  const dummyList = useContext(DummyStateContext);
  return (
    <div>
      {dummyList.map((it) => (
        <div className={styles.box} key={it.id}>
          <input type={"checkbox"}></input>
          <span className={styles.missionList}>{it.content}</span>
          <i className={`${"fa-solid fa-trash-can"} ${styles.trashColor}`}></i>
          <p></p>
        </div>
      ))}
    </div>
  );
};

export default MissionList;

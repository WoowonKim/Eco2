import React, { useState, useEffect } from "react";
import styles from "./dailyMission.module.css";

const DailyMissonMainitem = ({ id, content, trashCnt }) => {
  const [trash, setTrash] = useState(true);
  const trashType = trash ? styles.greenTrash : styles.whiteTrash;

  const onListRemove = () => {
    alert(`${id}를 삭제 완료!`);
  };
  return (
    <div className={styles.box}>
      <input
        type={"checkbox"}
        onClick={() => {
          setTrash(!trash);
          trashCnt(!trash);
        }}
      ></input>
      <div>
        <span>{content}</span>
      </div>
      <div>
        <i className={`${"fa-solid fa-trash-can"} ${trashType}`} onClick={onListRemove}></i>
      </div>
    </div>
  );
};

export default DailyMissonMainitem;

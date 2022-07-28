import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import DailyEcoMissionitem from "./dailyEcoMissionitem";
import styles from "./dailyMissionDetail.module.css";

const DailyEcoMissionList = () => {
  const ecomissionList = useSelector(
    state => state.dailyMission.dailyMissionList
  );
  const [eco, setEco] = useState([]);

  const onCreate = (color, id, content) => {
    if (color === false) {
      const newEco = {
        color: color,
        id: id,
        content: content,
      };
      setEco([...eco, newEco]);
    } else {
      const reEco = eco.filter(it => it.id !== id);
      setEco(reEco);
    }
  };

  const ecoCount = eco.length;
  return (
    <div>
      <div>
        {ecomissionList.map(it => (
          <DailyEcoMissionitem
            key={it.id}
            content={it.content}
            id={it.id}
            onCreate={onCreate}
          />
        ))}
      </div>
      <div>
        <p>{ecoCount}</p>
      </div>
    </div>
  );
};

export default DailyEcoMissionList;

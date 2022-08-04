import React, { useState, useEffect } from "react";
import styles from "./dailyMissionDetail.module.css";
import { customMission } from "../../../store/mission/customMissionSlice";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux/es/exports";
import { customDeleteMission } from "../../../store/mission/customMissionSlice";

const DailyCustomMissionList = ({ id }) => {
  const [cos, setCos] = useState([]);
  const customList = useSelector(state => state.custom);
  const dispatch = useDispatch();
  const naviGate = useNavigate();

  useEffect(() => {
    dispatch(customMission({ id })).then(res => {
      setCos(res.payload.customMissionList);
    });
  }, []);

  useEffect(() => {
    const onDelete = deleteId => {
      dispatch(customDeleteMission({ id: deleteId }));
    };
  }, [cos]);

  return (
    <div>
      {cos.length === 0 ? (
        <div>
          <h2>커스텀 미션이 없습니다.</h2>
          <h4> 아래 버튼을 눌러 생성해보세요!</h4>
        </div>
      ) : (
        <div>
          {cos.map(it => (
            <div key={it.id}>
              <span>{it.content}</span>
              <button
                onClick={() => {
                  onDelete(it.id);
                }}
              >
                삭제
              </button>
            </div>
          ))}
        </div>
      )}

      <div className={styles.plusP}>
        <i
          className={"fa-solid fa-circle-plus"}
          onClick={() => {
            naviGate("/customPlus");
          }}
        ></i>
      </div>
    </div>
  );
};

export default DailyCustomMissionList;

import React, { useState, useEffect } from "react";
import styles from "./dailyMissionDetail.module.css";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { customPostMission } from "../../../store/mission/customMissionSlice";
import { userInformation } from "../../../store/user/userSettingSlice";
import { getUserEmail } from "../../../store/user/common";
const CustomPlus = () => {
  const dispatch = useDispatch();
  const naviGate = useNavigate();
  const [id, setId] = useState(0);
  const [cate, setCate] = useState(0);
  const [tit, setTit] = useState("");
  const [cont, setCont] = useState("");
  useEffect(() => {
    dispatch(userInformation({ email: getUserEmail() })).then((res) => {
      if (res.payload.status === 200) {
        setId(res.payload.user.id);
      }
    });
  }, []);

  const subMit = () => {
    dispatch(customPostMission({ id, category: cate, title: tit, content: cont }))
      .then((res) => {
        if (res.payload.status === 200) {
          if (window.confirm("미션 목록에 추가하시겠어요?")) {
            naviGate("/dailymissiondetail", { state: { list: 0 } });
          }
        }
      })
      .catch((err) => {
        console.log("error");
      });
  };

  return (
    <div className={styles.customHeader}>
      <input
        type="text"
        onChange={(e) => {
          setCate(e.target.value);
        }}
      />
      <input
        type="text"
        onChange={(e) => {
          setTit(e.target.value);
        }}
      />
      <textarea
        cols="30"
        rows="10"
        onChange={(e) => {
          setCont(e.target.value);
        }}
      ></textarea>
      <button onClick={subMit}>완료!</button>
      <button
        onClick={() => {
          naviGate("/dailymissiondetail");
        }}
      >
        뒤로가기
      </button>
    </div>
  );
};

export default CustomPlus;
